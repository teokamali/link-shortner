import { endpoints } from "@/services/endpoints";

import deleteRequest from "../base/delete/delete-request";

interface DeleteLinkPayload {
  _id: string;
}
interface DeleteLinkResponse {}

export const DeleteLinkService = async (payload: DeleteLinkPayload) => {
  const response = await deleteRequest<DeleteLinkResponse, DeleteLinkPayload>({
    url: endpoints.delete_link,
    params: payload,
  });
  return response.data;
};
