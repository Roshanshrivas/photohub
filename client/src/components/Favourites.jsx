import React, { useEffect } from 'react'
import DashboardHeader from './DashboardHeader'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { setFavourites } from '../../store/slices/favouriteSlice';
import ImageCard from './ImageCard';

const Favourites = () => {

    const dispatch = useDispatch();
    const favourites = useSelector((state) => state.favourites.favourites);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    
    const favoritesApi = async () => {
        if(!isAuthenticated) return;

        try {
            const res = await axios.get(import.meta.env.VITE_API_URL + "/api/post/favourites", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                  },
                  withCredentials: true,
            });
            const { data } = res.data;
            dispatch(setFavourites(data));
        } catch (error) {
            console.error("Error fetching favourites", error);
        }
    }

    useEffect(() => {
        favoritesApi();
      }, [isAuthenticated]);



    return (
        <div>
          <DashboardHeader />
          <h1 className="text-2xl font-semibold mb-5 ml-8">Favourites</h1>
    
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 p-8">
            {favourites.length > 0 ? (
              favourites?.map(({ _id, title, image, price, author }) => (
                <ImageCard
                  key={_id}
                  id={_id}
                  title={title}
                  author={author}
                  img={image}
                  price={price}
                  // if you want you can add icon to remove favourite here also
                />
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-3">No favourites added yet.</p>
            )}
          </div>
        </div>
      );
}

export default Favourites