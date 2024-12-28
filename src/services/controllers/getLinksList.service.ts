import { LinkType } from "@/models/link.model";
import getRequest from "../base/get/get-request";
import { endpoints } from "../endpoints";

interface GetBulkBooksPayload {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}

interface GetBulkBooksResponse {
  limit: number;
  links: LinkType[];
  page: number;
  totalCount: number;
}

export const GetLinksList = async (payload: GetBulkBooksPayload) => {
  const response = await getRequest<GetBulkBooksResponse, GetBulkBooksPayload>({
    url: endpoints.links_list,
    params: payload,
    sendAuthorization: false,
  });

  return response.data;
};
