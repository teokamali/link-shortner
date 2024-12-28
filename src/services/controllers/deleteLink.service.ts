import { endpoints } from "@/services/endpoints";
import postRequest from "../base/post/post-request";
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
