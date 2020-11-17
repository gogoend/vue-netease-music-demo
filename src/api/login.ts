import { /* GET, */ POST } from './index'

import { PhoneLoginParams, EmailLoginParams } from '../types/auth'

export const phoneLogin = (params: PhoneLoginParams) => POST('login/cellphone', params)

export const emailLogin = (params: EmailLoginParams) => POST('login', params) 