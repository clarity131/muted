import request from './index'
interface dataRes {
  data: {
    users: {
      ctime: number
      uid?: number
      uname: string
      hismsg: []
      url?: string
    }[]
    count: number
  }
}
export const getData = (): Promise<dataRes> => request.get('/ban/history')