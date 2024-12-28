import { AxiosRequestConfig } from "axios"
import { IBaseRequestOption } from "../request-interface"

export interface IPostRequestOption<D> extends Omit<AxiosRequestConfig<D>, "method">, IBaseRequestOption<D> {}
