import { sendRequest } from "../base"
import { IResponse } from "../request-interface"
import { IDeleteRequestOption } from "./delete-request-interface"

export default async function deleteRequest<T, D>(options: IDeleteRequestOption<D>): Promise<IResponse<T>> {
  return sendRequest<T>({ method: "DELETE", ...options })
}
