import { sendRequest } from "../base"
import { IResponse } from "../request-interface"
import { IPatchRequestOption } from "./patch-request-interface"

export default async function patchRequest<T, D>(options: IPatchRequestOption<D>): Promise<IResponse<T>> {
  return sendRequest<T>({ method: "PATCH", ...options })
}
