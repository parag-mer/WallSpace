import { createSlice } from '@reduxjs/toolkit';
import { PexelsPhoto } from '../../utils/types';

export interface IFavWallpaperSliceType {
  wallpaperList: PexelsPhoto[];
}

const FavWallpaperScliceInitialState: IFavWallpaperSliceType = {
  wallpaperList: [],
};

const FavWallpaperSlice = createSlice({
  name: 'FavWallpaperSlice',
  initialState: FavWallpaperScliceInitialState,
  reducers: {
    addToFav(state, action: { payload: PexelsPhoto }) {
      const exists = state.wallpaperList.some(
        photo => photo.id === action.payload.id,
      );

      if (!exists) {
        state.wallpaperList.push(action.payload);
      }
    },
    RemoveFromFav(state, action: { payload: number }) {
      state.wallpaperList = state.wallpaperList.filter(
        photo => photo.id !== action.payload,
      );
    },
  },
});

export const { RemoveFromFav, addToFav } = FavWallpaperSlice.actions;
export const FavWallpaperReducer = FavWallpaperSlice.reducer;
