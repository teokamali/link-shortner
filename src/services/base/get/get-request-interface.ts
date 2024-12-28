import { AxiosRequestConfig } from "axios"
import { IBaseRequestOption } from "../request-interface"

export interface IGetRequestOption<D> extends Omit<AxiosRequestConfig, "method" | "data">, IBaseRequestOption<D> {}
