import request from './index'
import type { IResponse } from '@/types'

export const getData = (): Promise<IResponse> => request.get('/ban/history')