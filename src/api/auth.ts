interface IAuthCredentials {
  name: string,
  email: string,
};

const AuthApi = {
  login: async function (creds: IAuthCredentials): Promise<boolean> {
    try {
      const response = await(fetch(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(creds),
          headers: new Headers({"Content-Type": "application/json"}),
        },
      ));

      if (!response.ok) {
        return false;
      }

      return true;
    } catch (error: unknown) {
      throw new Error("Error logging in");
    }
  },

  logout: async function (): Promise<boolean> {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (!response.ok) {
        return false;
      }

      return true;
    } catch (error: unknown) {
      throw new Error("Error logging out");
    }
  },
};

export default AuthApi;