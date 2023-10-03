import {AppRootStateType} from '../../app/store';
export const selectorsApp={
    selectStatus:(state: AppRootStateType) => state.app.status,
    selectIsInitialized : (state: AppRootStateType) => state.app.initialized,
    selectError : (state: AppRootStateType)  =>state.app.error
}
