import { RequestAction } from "../enum/requestAction";
import { SortDirection } from "../enum/sortDirection";
import { SortField } from "../enum/sortField";

export interface IGetDogsParams {
  breeds?: string | string[] | undefined;
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: number;
  sortField?: SortField;
  sortDirection?: SortDirection;
  nextUrl?: string;
  prevUrl?: string;
  requestAction?: RequestAction;
};

const apiRootUrl = `${process.env.REACT_APP_API_URL}`;

const DogsApi = {
  getBreeds: async function(): Promise<string[]> {
    try {
      const response = await fetch(
        `${apiRootUrl}/dogs/breeds`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        console.error('Error fetching breeds');
        return [];
      }
      
      const payload = await response.json();
      return payload;
    } catch (error: unknown) {
      console.error(error);
      throw new Error("Error fetching breeds");
    }
  },

  getDogs: async function(params: IGetDogsParams) {
    const { requestAction } = params;

    let url = apiRootUrl;
  
    if (!requestAction || requestAction === RequestAction.Initial) {
      const searchParams = new URLSearchParams();
      let tmpSort = undefined;

      if (params?.sortField && params?.sortDirection) {
        tmpSort = `${params?.sortField}:${params?.sortDirection}`;

        delete params.sortField;
        delete params.sortDirection;
      }

      for (const [k, v] of Object.entries(params)) {
        searchParams.append(k, v);
      }

      if (tmpSort) {
        searchParams.append("sort", tmpSort);
      }

      url = `${apiRootUrl}/dogs/search?${searchParams}`;
    } else if (requestAction === RequestAction.Next) {
      url = `${apiRootUrl}${params.nextUrl}`;
    } else if (requestAction === RequestAction.Previous) {
      url = `${apiRootUrl}${params.prevUrl}`;
    }

    try {
      const response = await fetch(
        url,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        console.error("Error GETing dogs");
        return {};
      }

      const payload = await response.json();
      return payload;
    } catch (error: unknown) {
      console.error(error);
      throw new Error("Error GETing dogs");
    }
  },

  postDogs: async function(dogIds: string[]) {
    if (dogIds.length > 100) {
      throw new Error("POST /dogs: too many dogs");
    }
  
    try {
      const response = await fetch(`${apiRootUrl}/dogs`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(dogIds),
        headers: new Headers({ "Content-Type": "application/json" }),
      });

      if (!response.ok) {
        console.error("Error POSTing dogs");
        return [];
      }

      const payload = await response.json();
      return payload;
    } catch (error: unknown) {
      console.error(error);
      throw new Error("Error POSTing dogs");
    }
  },

  postDogsMatch: async function() {

  },
};

export default DogsApi;
