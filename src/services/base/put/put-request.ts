import { sendRequest } from "../base"
import { IResponse } from "../request-interface"
import { IPutRequestOption } from "./put-request-interface"

export default async function putRequest<T, D>(options: IPutRequestOption<D>): Promise<IResponse<T>> {
  return sendRequest<T>({ method: "PUT", ...options })
}
