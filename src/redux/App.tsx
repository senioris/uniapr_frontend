export type AppState = {
  isDark: boolean,
  lastUpdate: string
}

export type AppAction = {
  type: AppActionType,
  payload: AppState
}

export enum AppActionType {
  ACTION_DARKMODE = "AppActionDarkMode",
  ACTION_LASTUPDATE = "AppActionLastUpdate"
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
    default:
      return state
  }
}
