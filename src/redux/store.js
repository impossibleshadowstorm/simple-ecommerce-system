import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart-reducers";
import { authApi } from "@/redux/services/auth-api";
import { setupListeners } from "@reduxjs/toolkit/query";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import {thunk} from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    cart: persistedReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(thunk).concat(authApi.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store)

export var RootState = store.getState;
export var AppDispatch = store.dispatch;