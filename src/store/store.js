import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import { saveState, loadState } from "../utils/saveToLocalStorage";
import { eventApi } from "./api/event";
import { participationApi } from "./api/participation";

const preloadedState = {
  user: loadState(),
};

export const store = configureStore({
  reducer: {
    user: userReducer,
    [eventApi.reducerPath]: eventApi.reducer,
    [participationApi.reducerPath]: participationApi.reducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([eventApi.middleware, participationApi.middleware]),
});

store.subscribe(() => {
  const state = store.getState();
  saveState(state.user);
});
