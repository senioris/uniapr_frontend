import * as React from "react";
import { IHistory } from "../commons/history.types";

export interface UniswapState {
  data: IHistory[],
  setData: React.Dispatch<React.SetStateAction<IHistory>>
}

export const UniswapContext = React.createContext({} as UniswapState)
