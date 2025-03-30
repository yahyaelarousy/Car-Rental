import axios from 'axios'
import * as bookcarsTypes from ':bookcars-types'
import axiosInstance from './axiosInstance'
import env from '@/config/env.config'

/**
 * Sign up.
 *
 * @param {bookcarsTypes.SignUpPayload} data
 * @returns {Promise<number>}
 */
export const signup = (data: bookcarsTypes.SignUpPayload): Promise<number> =>
  axiosInstance
    .post(
      '/api/sign-up',
      data
    )
    .then((res) => res.status)

/**
 * Check validation token.
 *
 * @param {string} userId
 * @param {string} email
 * @param {string} token
 * @returns {Promise<number>}
 */
export const checkToken = (userId: string, email: string, token: string): Promise<number> =>
  axiosInstance
    .get(
      `/api/check-token/${env.APP_TYPE}/${encodeURIComponent(userId)}/${encodeURIComponent(email)}/${encodeURIComponent(token)}`
    )
    .then((res) => res.status)

/**
 * Delete validation tokens.
 *
 * @param {string} userId
 * @returns {Promise<number>}
 */
export const deleteTokens = (userId: string): Promise<number> =>
  axiosInstance
    .delete(
      `/api/delete-tokens/${encodeURIComponent(userId)}`
    )
    .then((res) => res.status)

/**
 * Resend a forgotten password or activation email.
 *
 * @param {?string} [email]
 * @param {boolean} [reset=false]
 * @returns {Promise<number>}
 */
export const resend = (email?: string, reset = false): Promise<number> =>
  axiosInstance
    .post(
      `/api/resend/${env.APP_TYPE}/${encodeURIComponent(email || '')}/${reset}`
    )
    .then((res) => res.status)

/**
 * Activate account.
 *
 * @param {bookcarsTypes.ActivatePayload} data
 * @returns {Promise<number>}
 */
export const activate = (data: bookcarsTypes.ActivatePayload): Promise<number> =>
  axiosInstance
    .post(
      '/api/activate',
      data,
      { withCredentials: true }
    )
    .then((res) => res.status)

/**
 * Validate email.
 *
 * @param {bookcarsTypes.ValidateEmailPayload} data
 * @returns {Promise<number>}
 */
export const validateEmail = (data: bookcarsTypes.ValidateEmailPayload): Promise<number> =>
  axiosInstance
    .post(
      '/api/validate-email',
      data
    )
    .then((exist) => exist.status)

/**
 * Sign in.
 *
 * @param {bookcarsTypes.SignInPayload} data
 * @returns {Promise<{ status: number, data: bookcarsTypes.User }>}
 */
export const signin = (data: bookcarsTypes.SignInPayload): Promise<{ status: number, data: bookcarsTypes.User }> =>
  axiosInstance
    .post(
      '/api/sign-in/frontend',
      data,
      { withCredentials: true }
    )
    .then((res) => {
      localStorage.setItem('bc-fe-user', JSON.stringify(res.data))
      return { status: res.status, data: res.data }
    })

/**
 * Social sign in.
 *
 * @param {bookcarsTypes.SignInPayload} data
 * @returns {Promise<{ status: number, data: bookcarsTypes.User }>}
 */
export const socialSignin = (data: bookcarsTypes.SignInPayload): Promise<{ status: number, data: bookcarsTypes.User }> =>
  axiosInstance
    .post(
      '/api/social-sign-in',
      data,
      { withCredentials: true }
    )
    .then((res) => {
      localStorage.setItem('bc-fe-user', JSON.stringify(res.data))
      return { status: res.status, data: res.data }
    })

/**
 * Sign out.
 *
 * @param {boolean} [redirect=true]
 * @param {boolean} [redirectSignin=false]
 */
export const signout = async (redirect = true, redirectSignin = false) => {
  const deleteAllCookies = () => {
    const cookies = document.cookie.split('')

    for (const cookie of cookies) {
      const eqPos = cookie.indexOf('=')
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie
      document.cookie = `${name}=expires=Thu, 01 Jan 1970 00:00:00 GMT`
    }
  }

  sessionStorage.clear()
  localStorage.removeItem('bc-fe-user')
  deleteAllCookies()

  await axiosInstance
    .post(
      '/api/sign-out',
      null,
      { withCredentials: true }
    )

  if (redirect) {
    window.location.href = '/'
  }
  if (redirectSignin) {
    window.location.href = '/sign-in'
  }
}

/**
 * Validate authentication access token.
 *
 * @returns {Promise<number>}
 */
export const validateAccessToken = (): Promise<number> =>
  axiosInstance
    .post(
      '/api/validate-access-token',
      null,
      { withCredentials: true }
    )
    .then((res) => res.status)

/**
 * Confirm email.
 *
 * @param {string} email
 * @param {string} token
 * @returns {Promise<number>}
 */
export const confirmEmail = (email: string, token: string): Promise<number> => (
  axiosInstance
    .post(
      `/api/confirm-email/${encodeURIComponent(email)}/${encodeURIComponent(token)}`
    )
    .then((res) => res.status)
)

/**
 * Resend validation email.
 *
 * @param {bookcarsTypes.ResendLinkPayload} data
 * @returns {Promise<number>}
 */
export const resendLink = (data: bookcarsTypes.ResendLinkPayload): Promise<number> =>
  axiosInstance
    .post(
      '/api/resend-link',
      data,
      { withCredentials: true }
    )
    .then((res) => res.status)

/**
 * Get language.
 *
 * @returns {string}
 */
export const getLanguage = () => {
  const user = JSON.parse(localStorage.getItem('bc-fe-user') ?? 'null')

  if (user && user.language) {
    return user.language as string
  }
  const lang = localStorage.getItem('bc-fe-language')
  if (lang && lang.length === 2) {
    return lang
  }
  return env.DEFAULT_LANGUAGE
}

/**
 * Get language from query strings.
 *
 * @returns {string}
 */
export const getQueryLanguage = () => {
  const params = new URLSearchParams(window.location.search)
  if (params.has('l')) {
    return params.get('l')
  }
  return ''
}

/**
 * Update language.
 *
 * @param {bookcarsTypes.UpdateLanguagePayload} data
 * @returns {Promise<number>}
 */
export const updateLanguage = (data: bookcarsTypes.UpdateLanguagePayload) =>
  axiosInstance
    .post(
      '/api/update-language',
      data,
      { withCredentials: true }
    )
    .then((res) => {
      if (res.status === 200) {
        const user = JSON.parse(localStorage.getItem('bc-fe-user') ?? 'null')
        user.language = data.language
        localStorage.setItem('bc-fe-user', JSON.stringify(user))
      }
      return res.status
    })

/**
 * Set language.
 *
 * @param {string} lang
 */
export const setLanguage = (lang: string) => {
  localStorage.setItem('bc-fe-language', lang)
}

/**
 * Get current user.
 *
 * @returns {bookcarsTypes.User | null}
 */
export const getCurrentUser = (): bookcarsTypes.User | null => {
  const user = JSON.parse(localStorage.getItem('bc-fe-user') ?? 'null') as bookcarsTypes.User | null
  return user
}

/**
 * Get User by ID.
 *
 * @param {string} id
 * @returns {Promise<bookcarsTypes.User|null>}
 */
export const getUser = (id?: string): Promise<bookcarsTypes.User | null> => {
  if (id) {
    return axiosInstance
      .get(
        `/api/user/${encodeURIComponent(id)}`,
        { withCredentials: true }
      )
      .then((res) => res.data)
  }
  return new Promise((resolve) => {
    resolve(null)
  })
}

/**
 * Update a User.
 *
 * @param {bookcarsTypes.UpdateUserPayload} data
 * @returns {Promise<number>}
 */
export const updateUser = (data: bookcarsTypes.UpdateUserPayload): Promise<number> =>
  axiosInstance
    .post(
      '/api/update-user',
      data,
      { withCredentials: true }
    )
    .then((res) => res.status)

/**
 * Update email notifications flag.
 *
 * @param {bookcarsTypes.UpdateEmailNotificationsPayload} data
 * @returns {Promise<number>}
 */
export const updateEmailNotifications = (data: bookcarsTypes.UpdateEmailNotificationsPayload): Promise<number> =>
  axiosInstance
    .post(
      '/api/update-email-notifications',
      data,
      { withCredentials: true }
    )
    .then((res) => {
      if (res.status === 200) {
        const user = getCurrentUser()
        if (user) {
          user.enableEmailNotifications = data.enableEmailNotifications
          localStorage.setItem('bc-fe-user', JSON.stringify(user))
        }
      }
      return res.status
    })

/**
 * Update avatar.
 *
 * @param {string} userId
 * @param {Blob} file
 * @returns {Promise<number>}
 */
export const updateAvatar = (userId: string, file: Blob): Promise<number> => {
  const formData = new FormData()
  formData.append('image', file)

  return axiosInstance
    .post(
      `/api/update-avatar/${encodeURIComponent(userId)}`,
      formData,
      {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      },
    )
    .then((res) => res.status)
}

/**
 * Delete avatar.
 *
 * @param {string} userId
 * @returns {Promise<number>}
 */
export const deleteAvatar = (userId: string): Promise<number> =>
  axiosInstance
    .post(
      `/api/delete-avatar/${encodeURIComponent(userId)}`,
      null,
      { withCredentials: true }
    )
    .then((res) => res.status)

/**
 * Check password.
 *
 * @param {string} id
 * @param {string} pass
 * @returns {Promise<number>}
 */
export const checkPassword = (id: string, pass: string): Promise<number> =>
  axiosInstance
    .get(
      `/api/check-password/${encodeURIComponent(id)}/${encodeURIComponent(pass)}`,
      { withCredentials: true }
    )
    .then((res) => res.status)

/**
 * Change password.
 *
 * @param {bookcarsTypes.ChangePasswordPayload} data
 * @returns {Promise<number>}
 */
export const changePassword = (data: bookcarsTypes.ChangePasswordPayload): Promise<number> =>
  axiosInstance
    .post(
      '/api/change-password',
      data,
      { withCredentials: true }
    )
    .then((res) => res.status)

/**
 * Get client IP.
 *
 * @async
 * @returns {Promise<string>}
 */
export const getIP = async (): Promise<string> => {
  const res = await axios.get('https://api.ipify.org/?format=json')
  return String(res.data.ip)
}

/**
 * Validate Google reCAPTCHA v3 token.
 *
 * @param {string} token
 * @param {string} ip
 * @returns {Promise<number>}
 */
export const verifyRecaptcha = (token: string, ip: string): Promise<number> =>
  axiosInstance
    .post(
      `/api/verify-recaptcha/${encodeURIComponent(token)}/${encodeURIComponent(ip)}`,
      null,
      { withCredentials: true }
    )
    .then((res) => res.status)

/**
* Send an email. reCAPTCHA is mandatory.
*
* @param {bookcarsTypes.SendEmailPayload} payload
* @returns {Promise<number>}
*/
export const sendEmail = (payload: bookcarsTypes.SendEmailPayload): Promise<number> =>
  axiosInstance
    .post(
      '/api/send-email',
      payload,
    )
    .then((res) => res.status)

/**
* Parse JWT token.
* @param {string} token
* @returns {any}
*/
export const parseJwt = (token: string) => {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''))

  return JSON.parse(jsonPayload)
}

/**
 * Check if password exists.
 *
 * @param {string} id
 * @returns {Promise<bookcarsTypes.User|null>}
 */
export const hasPassword = (id: string): Promise<number> => axiosInstance
  .get(
    `/api/has-password/${encodeURIComponent(id)}`,
    { withCredentials: true }
  )
  .then((res) => res.status)

/**
* Persist stayConnected.
*
* @param {string} id
* @returns {void}
*/
export const setStayConnected = (value: boolean) => {
  localStorage.setItem('bc-fe-stay-connected', JSON.stringify(value))
}

/**
 * Get stayConnected.
 *
 * @param {string} id
 * @returns {boolean}
 */
export const getStayConnected = () => {
  const value = JSON.parse(localStorage.getItem('bc-fe-stay-connected') ?? 'false')
  return value as boolean
}

/**
* Create temporary license.
*
* @param {Blob} file
* @returns {Promise<string>}
*/
export const createLicense = (file: Blob): Promise<string> => {
  const formData = new FormData()
  formData.append('file', file)

  return axiosInstance
    .post(
      '/api/create-license',
      formData,
      {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      },
    )
    .then((res) => res.data)
}

/**
 * Update license.
 *
 * @param {string} userId

 * @param {Blob} file
 * @returns {Promise<bookcarsTypes.Response<string>>}
 */
export const updateLicense = (userId: string, file: Blob): Promise<bookcarsTypes.Response<string>> => {
  const formData = new FormData()
  formData.append('file', file)

  return axiosInstance
    .post(
      `/api/update-license/${userId}`,
      formData,
      {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      },
    )
    .then((res) => ({ status: res.status, data: res.data }))
}

/**
 * Delete license.
 *
 * @param {string} userId
 * @param {string} language
 * @returns {Promise<number>}
 */
export const deleteLicense = (userId: string): Promise<number> =>
  axiosInstance
    .post(
      `/api/delete-license/${userId}`,
      null,
      { withCredentials: true }
    )
    .then((res) => res.status)

/**
* Delete a temporary license file.
*
* @param {string} file
* @returns {Promise<number>}
*/
export const deleteTempLicense = (file: string): Promise<number> =>
  axiosInstance
    .post(
      `/api/delete-temp-license/${encodeURIComponent(file)}`,
      null,
      { withCredentials: true }
    )
    .then((res) => res.status)
