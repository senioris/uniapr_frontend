export type AppState = {
  isDark: boolean,
  rowsPerPage: number,
  lastUpdate: string
}

export type AppAction = {
  type: AppActionType,
  payload: AppState
}

export enum AppActionType {
  ACTION_DARKMODE = "AppActionDarkMode",
  ACTION_LASTUPDATE = "AppActionLastUpdate",
  ACTION_ROWPERPAGE = "RowsPerPage",
}

export const appAction = (action: AppActionType, payload: AppState) => {
  return {
    type: action,
    payload: payload
  } as {
    type: AppActionType,
    payload: AppState
  }
}

const initialState: AppState  = {
  isDark: localStorage.getItem('darkmode') == "1" ? true : false,
  rowsPerPage: Number(localStorage.getItem('rowsPerPage')) >= 1 ? Number(localStorage.getItem('rowsPerPage')) : 5,
  lastUpdate: ""
}

export const appReducer = (state: AppState = initialState, action: AppAction): AppState => {
  switch (action.type) {
    case AppActionType.ACTION_DARKMODE:
      const isDark = action.payload.isDark
      localStorage.setItem('darkmode', isDark ? "1" : "0");
      return {
        ...state,
        isDark: isDark,
      }
    case AppActionType.ACTION_LASTUPDATE:
      return {
        ...state,
        lastUpdate: action.payload.lastUpdate
      }
    case AppActionType.ACTION_ROWPERPAGE:
      localStorage.setItem('rowsPerPage', String(action.payload.rowsPerPage));
      return {
        ...state,
        rowsPerPage: action.payload.rowsPerPage
      }
    default:
      return state
  }
}
