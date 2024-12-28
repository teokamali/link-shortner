import { endpoints } from "@/services/endpoints";
import postRequest from "../base/post/post-request";

interface AddLinkPayload {
  url: string;
}
interface AddLinkResponse {
  shortUrl: string;
}

export const AddLinkService = async (payload: AddLinkPayload) => {
  const response = await postRequest<AddLinkResponse, AddLinkPayload>({
    url: endpoints.add_link,
    params: payload,
  });
  return response.data;
};
