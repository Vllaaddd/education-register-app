import { configureStore } from "@reduxjs/toolkit";
import { employeeReducer } from "./employees/slice";
import { educationReducer } from "./educations/slice";
import { filterReducer } from "./filter/slice";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { authReducer } from "./auth/slice";

const persistConfig = {
  key: 'auth',
  version: 1,
  storage,
}

const middleware = (getDefaultMiddleware) => getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
});

const persistedAuthReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
    educations: educationReducer,
    filter: filterReducer,
    auth: persistedAuthReducer,
  },
  middleware,
  devTools: process.env.NODE_ENV === 'development',
})

export const persistor = persistStore(store)