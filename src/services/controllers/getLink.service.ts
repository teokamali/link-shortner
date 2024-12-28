import { LinkType } from "@/models/link.model";
import getRequest from "../base/get/get-request";
import { endpoints } from "../endpoints";

interface GetLinkPayload {
  shortId: string;
}

export const GetLink = async (payload: GetLinkPayload) => {
  const response = await getRequest<LinkType, GetLinkPayload>({
    url: endpoints.get_link,
    params: payload,
    sendAuthorization: false,
  });

  return response.data;
};
