import {AppRootStateType} from './store';

export let selectStatus = (state: AppRootStateType) => state.app.status;
export let selectIsInitialized = (state: AppRootStateType) => state.app.initialized;