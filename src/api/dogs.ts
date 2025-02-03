import { SortDirection } from "../enum/sortDirection";
import { SortField } from "../enum/sortField";

export interface IGetDogsParams {
  breeds?: Array<string>;
  zipCodes?: Array<string>;
  ageMin?: number;
  ageMax?: number;
  size?: number,
  from?: number,
  sortField?: SortField,
  sortDirection?: SortDirection,
};

const apiUrl = `${process.env.REACT_APP_API_URL}/dogs`;

const DogsApi = {
  getBreeds: async function(): Promise<string[]> {
    try {
      const response = await fetch(
        `${apiUrl}/breeds`,
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
    try {
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
        searchParams.append('sort', tmpSort);
      }

      const response = await fetch(
        `${apiUrl}/search?${searchParams}`,
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
      const response = await fetch(`${apiUrl}`, {
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
