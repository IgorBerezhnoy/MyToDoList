import { AppRootStateType } from "./store";
export const selectorsApp = {
  selectStatus: (state: AppRootStateType) => state.app.status,
  selectIsInitialized: (state: AppRootStateType) => state.app.initialized,
  isLightMode: (state: AppRootStateType) => state.app.isLightMode,
  selectError: (state: AppRootStateType) => state.app.error,
};
