export interface IDogSearchParams {
  breeds?: Array<string>;
  zipCodes?: Array<string>;
  ageMin?: number;
  ageMax: number;
};

interface IDogSearchArgs {
  params?: IDogSearchParams;
  errorCallback?: () => void;
}

const apiUrl = `${process.env.REACT_APP_API_URL}/dogs`;

const DogsApi = {
  getBreeds: async function(errorCallback?: () => void): Promise<string[]> {
    try {
      const response = await fetch(
        `${apiUrl}/breeds`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        if (errorCallback) errorCallback();
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

  getDogsSearch: async function(args?: IDogSearchArgs) {
    try {
      console.log("bork bork");
      if (args?.params) {
        console.log(args.params)
      }
      const response = await fetch(
        `${apiUrl}/search`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        if (args?.errorCallback) args.errorCallback();
        console.error("Error fetching breeds");
        return [];
      }

      const payload = await response.json();
      console.log(payload);
      return payload;
    } catch (error: unknown) {
      console.error(error);
      throw new Error("Error fetching breeds");
    }
  },

  postDogs: async function() {

  },

  postDogsMatch: async function() {

  },
};

export default DogsApi;
