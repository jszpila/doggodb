/**
 * 
 * App-wide data store
 *
 **/

import React, { Dispatch, SetStateAction } from "react";
import { Theme } from "./enum/theme";
import { IUser } from "./interfaces/user";

export interface IAppContext {
  user: IUser | undefined;
  setUser: Dispatch<SetStateAction<IUser | undefined>>;
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}

const initialContext: IAppContext = {
  user: undefined,
  setUser: (): void => {},
  theme: Theme.Light,
  setTheme: (): void => {},
}

export const AppContext = React.createContext(initialContext);