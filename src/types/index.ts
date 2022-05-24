export type User = {
  ctime: number
  uid: number
  uname: string
  hismsg: string[]
}

export type IResponse = {
  data: {
    users: User[],
    count: number
  }
}