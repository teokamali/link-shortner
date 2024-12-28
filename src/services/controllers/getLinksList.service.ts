import { LinkType } from "@/models/link.model";
import getRequest from "../base/get/get-request";
import { endpoints } from "../endpoints";

interface GetLinksListPayload {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}

interface GetLinksListResponse {
  limit: number;
  links: LinkType[];
  page: number;
  totalCount: number;
}

export const GetLinksList = async (payload: GetLinksListPayload) => {
  const response = await getRequest<GetLinksListResponse, GetLinksListPayload>({
    url: endpoints.links_list,
    params: payload,
    sendAuthorization: false,
  });

  return response.data;
};
