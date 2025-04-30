// store/slices/favouriteSlice.js
import { createSlice } from "@reduxjs/toolkit";

const favouriteSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites: [], // store all favourite posts here
  },
  reducers: {
    setFavourites: (state, action) => {
      state.favourites = action.payload;
    },
    addFavourite: (state, action) => {
      state.favourites.push(action.payload);
    },
    removeFavourite: (state, action) => {
      state.favourites = state.favourites.filter(
        (fav) => fav._id !== action.payload
      );
    },
  },
});

export const { setFavourites, addFavourite, removeFavourite } = favouriteSlice.actions;
export default favouriteSlice.reducer;
