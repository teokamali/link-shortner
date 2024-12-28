import { AxiosRequestConfig } from "axios"
import { IBaseRequestOption } from "../request-interface"

export interface IDeleteRequestOption<D> extends Omit<AxiosRequestConfig<D>, "method">, IBaseRequestOption<D> {}
