import { AxiosRequestConfig, AxiosResponse } from "axios"

export type TVersion = "v1"
export interface IBaseRequestOption<D> extends AxiosRequestConfig<D> {
  version?: TVersion
  sendAuthorization?: boolean
  sendFireBaseToken?: boolean
}

export interface IResponse<T> extends AxiosResponse<T> {}

export type BasePayload<T> = T & {
  params?: Record<string, string | number>
}

export type BaseResponse<T> = T & {
  // data: T
  // meta?: {
  //   pagination: {
  //     page: number
  //     pageSize: number
  //     pageCount: number
  //     total: number
  //   }
  // }
}

export interface IErrorResponse {
  response: {
    data: {
      code: number
      message: string
    }
  }
}
export type Nullable<T> = T | null
