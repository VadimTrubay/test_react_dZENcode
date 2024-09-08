import {configureStore} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {authReducer} from "./auth/slice";
import {commentsReducer} from "./comments/slice.ts";


const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["access_token"],
};

type AuthPersistedState = ReturnType<typeof authReducer>;

export const store = configureStore({
  reducer: {
    auth: persistReducer<AuthPersistedState>(authPersistConfig, authReducer),
    comments: commentsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === "development",
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;