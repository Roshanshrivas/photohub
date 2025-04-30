import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import navSlice from "./slices/navSlice";
import postSlice from "./slices/postSlice";
import orderSlice from "./slices/orderSlice";
import favouriteSlice from "./slices/favouriteSlice";


export const store = configureStore({
    reducer: {
        // "key to identify slice" : "slice file",
        auth: authSlice,
        nav: navSlice,
        posts: postSlice,
        order: orderSlice,
        favourites: favouriteSlice
    },
});