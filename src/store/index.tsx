import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FavWallpaperReducer,
  IFavWallpaperSliceType,
} from './slices/FavWallpaper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

export interface IStore {
  FavWallpaperReducer: IFavWallpaperSliceType;
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  FavWallpaperReducer: FavWallpaperReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER, PERSIST],
      },
    }),
});

export const persistor = persistStore(store);
