import { AxiosRequestConfig } from "axios"
import { IBaseRequestOption } from "../request-interface"

export interface IPatchRequestOption<D> extends Omit<AxiosRequestConfig<D>, "method">, IBaseRequestOption<D> {}
