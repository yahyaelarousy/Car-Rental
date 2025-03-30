import React, { useCallback, useEffect, useState } from 'react'
import { fr, enUS, es } from 'date-fns/locale'
import { Scheduler } from '@/components/scheduler/index'
import {
  ProcessedEvent,
  RemoteQuery,
  SchedulerRef,
} from '@/components/scheduler/types'
import * as bookcarsTypes from ':bookcars-types'
import * as helper from '@/common/helper'
import * as BookingService from '@/services/BookingService'

interface VehicleSchedulerProps {
  suppliers: string[]
  statuses: string[]
  filter?: bookcarsTypes.Filter
  user?: bookcarsTypes.User
  language: string
}

const VehicleScheduler = (
  {
    suppliers,
    statuses,
    filter: filterFromProps,
    user,
    language,
  }: VehicleSchedulerProps
) => {
  const [filter, setFilter] = useState<bookcarsTypes.Filter>()
  const [init, setInit] = useState(true)

  const schedulerRef = React.useRef<SchedulerRef>(null)

  useEffect(() => {
    setFilter(filterFromProps)
  }, [filterFromProps])

  const fetchBookings = useCallback(async (query: RemoteQuery): Promise<ProcessedEvent[]> => {
    const emptyEvents: ProcessedEvent[] = [
      {
        event_id: '1',
        title: 'Dummy Event',
        start: new Date(1970, 0, 1),
        end: new Date(1970, 0, 2),
      }
    ]

    const dateBetween = new Date(query.end.getTime() - Math.ceil(query.end.getTime() - query.start.getTime()) / 2)
    dateBetween.setHours(10, 0, 0, 0)

    const payload: bookcarsTypes.GetBookingsPayload = {
      suppliers,
      statuses,
      filter: {
        from: query.view !== 'day' ? new Date(query.start.getFullYear(), query.start.getMonth() - 1, 1) : undefined,
        dateBetween: query.view === 'day' ? dateBetween : undefined,
        to: query.view === 'month' ? new Date(query.end.getFullYear(), query.end.getMonth() + 1, 0) : new Date(query.end.getFullYear(), query.end.getMonth() + 2, 0),
        pickupLocation: filter?.pickupLocation,
        dropOffLocation: filter?.dropOffLocation,
        keyword: filter?.keyword,
      },
      user: (user && user._id) || undefined,
    }

    const data = await BookingService.getBookings(payload, 1, 10000)
    const _data = data && data.length > 0 ? data[0] : { pageInfo: { totalRecord: 0 }, resultData: [] }
    if (!_data) {
      helper.error()
      return emptyEvents
    }
    const bookings = _data.resultData

    const events = bookings.map((booking): ProcessedEvent => ({
      event_id: booking._id as string,
      title: `${(booking.car as bookcarsTypes.Car).name} / ${(booking.supplier as bookcarsTypes.User).fullName} / ${helper.getBookingStatus(booking.status)}`,
      start: new Date(booking.from),
      end: new Date(booking.to),
      color: helper.getBookingStatusBackgroundColor(booking.status),
      textColor: helper.getBookingStatusTextColor(booking.status),
    }))

    setInit(false)

    if (events.length === 0) {
      return emptyEvents
    }
    return events
  }, [filter, statuses, suppliers, user])

  useEffect(() => {
    const fetchEvents = async () => {
      schedulerRef.current?.scheduler?.handleState(fetchBookings, 'getRemoteEvents')
    }

    if (!init && statuses.length > 0 && suppliers.length > 0) {
      fetchEvents()
    }
  }, [statuses, suppliers, filter]) // eslint-disable-line react-hooks/exhaustive-deps

  const getTranslations = (_language: string) => {
    if (_language === 'fr') {
      return {
        navigation: {
          month: 'Mois',
          week: 'Semaine',
          day: 'Jour',
          today: "Aujourd'hui",
          agenda: 'Agenda',
        },
        form: {
          addTitle: 'Ajouter un événement',
          editTitle: 'Modifier un événement',
          confirm: 'Confirmer',
          delete: 'Supprimer',
          cancel: 'Annuler',
        },
        event: {
          title: 'Titre',
          subtitle: 'Sous-titre',
          start: 'Début',
          end: 'Fin',
          allDay: 'Toute la journée',
        },
        validation: {
          required: 'Obligatoire',
          invalidEmail: 'E-mail non valide',
          onlyNumbers: 'Seuls les chiffres sont autorisés',
          min: 'Minimum de {{min}} lettres',
          max: 'Maximum de {{max}} lettres',
        },
        moreEvents: 'Plus...',
        noDataToDisplay: 'Aucune donnée à afficher',
        loading: 'Chargement...',
      }
    }

    if (_language === 'es') {
      return {
        navigation: {
          month: 'Mes',
          week: 'Semana',
          day: 'Día',
          today: 'Hoy',
          agenda: 'Agenda'
        },
        form: {
          addTitle: 'Agregar evento',
          editTitle: 'Editar evento',
          confirm: 'Confirmar',
          delete: 'Eliminar',
          cancel: 'Cancelar'
        },
        event: {
          title: 'Título',
          subtitle: 'Subtítulo',
          start: 'Inicio',
          end: 'Fin',
          allDay: 'Todo el día'
        },
        validation: {
          required: 'Obligatorio',
          invalidEmail: 'Correo electrónico no válido',
          onlyNumbers: 'Solo se permiten números',
          min: 'Mínimo {{min}} letras',
          max: 'Máximo {{max}} letras'
        },
        moreEvents: 'Más...',
        noDataToDisplay: 'Sin datos para mostrar',
        loading: 'Cargando...'
      }
    }

    // default to english
    return {
      navigation: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        today: 'Today',
        agenda: 'Agenda',
      },
      form: {
        addTitle: 'Add Event',
        editTitle: 'Edit Event',
        confirm: 'Confirm',
        delete: 'Delete',
        cancel: 'Cancel',
      },
      event: {
        title: 'Title',
        subtitle: 'Subtitle',
        start: 'Start',
        end: 'End',
        allDay: 'All Day',
      },
      validation: {
        required: 'Required',
        invalidEmail: 'Invalid Email',
        onlyNumbers: 'Only Numbers Allowed',
        min: 'Minimum {{min}} letters',
        max: 'Maximum {{max}} letters',
      },
      moreEvents: 'More...',
      noDataToDisplay: 'No data to display',
      loading: 'Loading...',
    }
  }

  return (
    <Scheduler
      ref={schedulerRef}
      view="month"
      locale={language === 'fr' ? fr : language === 'es' ? es : enUS}
      disableViewer
      editable={false}
      draggable={false}
      agenda={false}
      onEventClick={(event: ProcessedEvent) => {
        const url = `/update-booking?b=${event.event_id}`
        window.open(url, '_blank')!.focus()
      }}
      getRemoteEvents={fetchBookings}
      translations={getTranslations(language)}
      height={window.innerHeight - (64 + 41 + 33 + 10)}
      onClickMore={(date: Date, goToDay: (d: Date) => void) => {
        goToDay(date)
      }}
    />
  )
}

export default VehicleScheduler
