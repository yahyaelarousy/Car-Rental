import escapeStringRegexp from 'escape-string-regexp'
import mongoose from 'mongoose'
import { Request, Response } from 'express'
import * as bookcarsTypes from ':bookcars-types'
import * as helper from '../common/helper'
import * as env from '../config/env.config'
import i18n from '../lang/i18n'
import Country from '../models/Country'
import LocationValue from '../models/LocationValue'
import Location from '../models/Location'
import * as logger from '../common/logger'

/**
 * Validate a Country name with language code.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const validate = async (req: Request, res: Response) => {
  const { body }: { body: bookcarsTypes.ValidateCountryPayload } = req
  const { language, name } = body

  try {
    const keyword = escapeStringRegexp(name)
    const options = 'i'

    const countries = await Country.aggregate(
      [
        {
          $lookup: {
            from: 'LocationValue',
            let: { values: '$values' },
            pipeline: [
              {
                $match: {
                  $and: [
                    { $expr: { $in: ['$_id', '$$values'] } },
                    { $expr: { $eq: ['$language', language] } },
                    { $expr: { $regexMatch: { input: '$value', regex: new RegExp(`^${keyword}$`), options } } },
                  ],
                },
              },
            ],
            as: 'value',
          },
        },
        { $unwind: { path: '$value', preserveNullAndEmptyArrays: false } },
      ],
      { collation: { locale: env.DEFAULT_LANGUAGE, strength: 2 } },
    )

    return countries.length > 0 ? res.sendStatus(204) : res.sendStatus(200)
  } catch (err) {
    logger.error(`[country.validate]  ${i18n.t('DB_ERROR')} ${name}`, err)
    return res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Create a Country.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const create = async (req: Request, res: Response) => {
  const { body }: { body: bookcarsTypes.CountryName[] } = req
  const names = body

  try {
    const values: string[] = []
    for (const name of names) {
      const countryValue = new LocationValue({
        language: name.language,
        value: name.name,
      })
      await countryValue.save()
      values.push(countryValue.id)
    }

    const country = new Country({ values })
    await country.save()
    return res.send(country)
  } catch (err) {
    logger.error(`[country.create] ${i18n.t('DB_ERROR')} ${JSON.stringify(req.body)}`, err)
    return res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Update a Country.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const update = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const country = await Country.findById(id).populate<{ values: env.LocationValue[] }>('values')

    if (country) {
      const names: bookcarsTypes.CountryName[] = req.body

      for (const name of names) {
        const countryValue = country.values.filter((value) => value.language === name.language)[0]
        if (countryValue) {
          countryValue.value = name.name
          await countryValue.save()
        } else {
          const lv = new LocationValue({
            language: name.language,
            value: name.name,
          })
          await lv.save()
          country.values.push(lv)
          await country.save()
        }
      }
      return res.json(country)
    }

    logger.error('[country.update] Country not found:', id)
    return res.sendStatus(204)
  } catch (err) {
    logger.error(`[country.update] ${i18n.t('DB_ERROR')} ${JSON.stringify(req.body)}`, err)
    return res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Delete a Country.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const deleteCountry = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const country = await Country.findById(id)
    if (!country) {
      const msg = `[country.delete] Country ${id} not found`
      logger.info(msg)
      return res.status(204).send(msg)
    }
    await Country.deleteOne({ _id: id })
    await LocationValue.deleteMany({ _id: { $in: country.values } })
    return res.sendStatus(200)
  } catch (err) {
    logger.error(`[country.delete] ${i18n.t('DB_ERROR')} ${id}`, err)
    return res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Get a Country by ID.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const getCountry = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const country = await Country.findById(id).populate<{ values: env.LocationValue[] }>('values').lean()

    if (country) {
      const name = (country.values as env.LocationValue[]).filter((value) => value.language === req.params.language)[0].value
      const c = { ...country, name }
      return res.json(c)
    }
    logger.error('[country.getCountry] Country not found:', id)
    return res.sendStatus(204)
  } catch (err) {
    logger.error(`[country.getCountry] ${i18n.t('DB_ERROR')} ${id}`, err)
    return res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Get Countries.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const getCountries = async (req: Request, res: Response) => {
  try {
    const page = Number.parseInt(req.params.page, 10)
    const size = Number.parseInt(req.params.size, 10)
    const { language } = req.params
    const keyword = escapeStringRegexp(String(req.query.s || ''))
    const options = 'i'

    const countries = await Country.aggregate(
      [
        {
          $lookup: {
            from: 'LocationValue',
            let: { values: '$values' },
            pipeline: [
              {
                $match: {
                  $and: [
                    { $expr: { $in: ['$_id', '$$values'] } },
                    { $expr: { $eq: ['$language', language] } },
                    { $expr: { $regexMatch: { input: '$value', regex: keyword, options } } },
                  ],
                },
              },
            ],
            as: 'value',
          },
        },
        { $unwind: { path: '$value', preserveNullAndEmptyArrays: false } },
        { $addFields: { name: '$value.value' } },
        {
          $facet: {
            resultData: [{ $sort: { name: 1, _id: 1 } }, { $skip: (page - 1) * size }, { $limit: size }],
            pageInfo: [
              {
                $count: 'totalRecords',
              },
            ],
          },
        },
      ],
      { collation: { locale: env.DEFAULT_LANGUAGE, strength: 2 } },
    )

    return res.json(countries)
  } catch (err) {
    logger.error(`[country.getCountries] ${i18n.t('DB_ERROR')} ${req.query.s}`, err)
    return res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Get Countries with locations.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const getCountriesWithLocations = async (req: Request, res: Response) => {
  try {
    const { language, imageRequired: _imageRequired, minLocations: _minLocations } = req.params
    const keyword = escapeStringRegexp(String(req.query.s || ''))
    const options = 'i'

    const imageRequired = helper.StringToBoolean(_imageRequired)
    const minLocations = Number(_minLocations)

    let $locationMatch: mongoose.FilterQuery<bookcarsTypes.Location> = {}
    if (imageRequired) {
      $locationMatch = { image: { $ne: null } }
    }

    const countries = await Country.aggregate(
      [
        {
          $lookup: {
            from: 'LocationValue',
            let: { values: '$values' },
            pipeline: [
              {
                $match: {
                  $and: [
                    { $expr: { $in: ['$_id', '$$values'] } },
                    { $expr: { $eq: ['$language', language] } },
                    { $expr: { $regexMatch: { input: '$value', regex: keyword, options } } },
                  ],
                },
              },
            ],
            as: 'value',
          },
        },
        { $unwind: { path: '$value', preserveNullAndEmptyArrays: false } },
        { $addFields: { name: '$value.value' } },

        {
          $lookup: {
            from: 'Location',
            let: { country: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ['$country', '$$country'] },
                },
              },
              {
                $match: $locationMatch,
              },
              {
                $lookup: {
                  from: 'LocationValue',
                  let: { values: '$values' },
                  pipeline: [
                    {
                      $match: {
                        $and: [
                          { $expr: { $in: ['$_id', '$$values'] } },
                          { $expr: { $eq: ['$language', language] } },
                        ],
                      },
                    },
                  ],
                  as: 'value',
                },
              },
              { $unwind: { path: '$value', preserveNullAndEmptyArrays: false } },
              { $addFields: { name: '$value.value' } },
            ],
            as: 'locations',
          },
        },

        {
          $addFields: {
            locationsSize: { $size: '$locations' },
          },
        },

        {
          $match: { locationsSize: { $gte: minLocations } },
        },

        {
          $sort: { name: 1 },
        },
      ],
      { collation: { locale: env.DEFAULT_LANGUAGE, strength: 2 } },
    )

    return res.json(countries)
  } catch (err) {
    logger.error(`[country.getCountries] ${i18n.t('DB_ERROR')} ${req.query.s}`, err)
    return res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Check if a Country is used by a Car.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const checkCountry = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const _id = new mongoose.Types.ObjectId(id)

    const count = await Location
      .find({ country: _id })
      .limit(1)
      .countDocuments()

    if (count === 1) {
      return res.sendStatus(200)
    }

    return res.sendStatus(204)
  } catch (err) {
    logger.error(`[country.checkCountry] ${i18n.t('DB_ERROR')} ${id}`, err)
    return res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Get country Id from country name (en).
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const getCountryId = async (req: Request, res: Response) => {
  const { name, language } = req.params

  try {
    if (language.length !== 2) {
      throw new Error('Language not valid')
    }
    const lv = await LocationValue.findOne({ language, value: { $regex: new RegExp(`^${escapeStringRegexp(helper.trim(name, ' '))}$`, 'i') } })
    if (lv) {
      const country = await Country.findOne({ values: lv.id })
      return res.status(200).json(country?.id)
    }
    return res.sendStatus(204)
  } catch (err) {
    logger.error(`[country.getCountryId] ${i18n.t('DB_ERROR')} ${name}`, err)
    return res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}
