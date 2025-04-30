import React, { useEffect } from "react";
import ImageCard from "./ImageCard";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";
import { IoHeartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setAllPosts } from "../../store/slices/postSlice";
import toast from "react-hot-toast";
import { addFavourite, removeFavourite, setFavourites } from "../../store/slices/favouriteSlice";

const PhotoGallery = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const posts = useSelector((state) => state.posts.allPosts);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const favourites = useSelector((state) => state.favourites.favourites);
  

  const fetchFavourites = async () => {
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


  const handleAddToFavourite = async (postId) => {
    if(!isAuthenticated) {
      toast.error("Please login to add to favourites");
      navigate("/login");
      return;
    }
    try {
      await axios.post(import.meta.env.VITE_API_URL + `/api/post/addToFavourites/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          withCredentials: true,
        });
        dispatch(addFavourite({ _id: postId })); // Assuming you have postId
        toast.success("Added to Favourites");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }


  const handleRemoveFromFavourite = async (postId) => {
    if(!isAuthenticated) {
      toast.error("Please login to remove from favourites");
      navigate("/login");
      return;
    }
    try {
      await axios.delete(import.meta.env.VITE_API_URL + `/api/post/removeFromFavourites/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        withCredentials: true,
      });
      dispatch(removeFavourite(postId));
      toast.success("Removed from favourites");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };


  const getAllImages = async () => {
    if (posts.length > 0) return;
    const res = await axios.get(import.meta.env.VITE_API_URL + "/api/post/getAll");
    const { data } = await res.data;
    dispatch(setAllPosts(data));
  };

  const purchaseImage = async (price, id, postUrl, author, title) => {
    if (!isAuthenticated) {
      toast.error("Please Login to purchase Asset");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/api/payment/generate",
        {
          price,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          withCredentials: true,
        }
      );

      const { data } = await res.data;
      //Will be using a function here to handle the payment verification
      await handlePaymentVerify(data, id, postUrl, author, title, price);

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handlePaymentVerify = async (
    data,
    id,
    postUrl,
    author,
    title,
    price
  ) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "Pic-prism",
      order_id: data.id,
      theme: {
        color: "#5f63b8",
      },
      handler: async (response) => {
        try {
          const res = await axios.post(
            import.meta.env.VITE_API_URL + "/api/payment/verify",
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              postId: id,
              postUrl,
              author,
              title,
              price,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
              withCredentials: true,
            }
          );
          const data = await res.data;
          toast.success(data.message);
        } catch (error) {
          toast.error(error.response.data.message);
        }
      },
    };
    const razorpayWindow = new window.Razorpay(options);
    razorpayWindow.open();
  };

  useEffect(() => {
    getAllImages();
    fetchFavourites();
  }, []);

  return (
    <div className="bg-white flex flex-col justify-center items-center pb-20">
      <h3 className="text-4xl font-semibold my-12">Photo Gallery</h3>
      {/* All my photos will be listed inside this dev */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 bg-20">
        {posts?.map(({ _id, title, image, price, author }) => {
          return (
            <ImageCard
              key={_id}
              id={_id}
              title={title}
              author={author}
              img={image}
              price={price}
              icon1={
                <FaShoppingCart
                  title="Cart"
                  onClick={() =>
                    purchaseImage(price, _id, image, author, title)
                  }
                  className="text-2xl text-black cursor-pointer hover:scale-110 transition-all ease-linear duration-300"
                />
              }
              icon2={
                favourites.some((fav) => fav._id === _id) ? (
                  <IoIosHeart 
                    title="Remove from Favourites"
                    onClick={() => handleRemoveFromFavourite(_id)}
                    className="text-2xl text-red-500 cursor-pointer hover:scale-110 transition-all ease-linear duration-300"
                  />
                ) : (
                  <IoHeartOutline
                    title="Add to Favourites"
                    onClick={() => handleAddToFavourite(_id)}
                    className="text-2xl text-gray-400 cursor-pointer hover:scale-110 transition-all ease-linear duration-300"
                  />
                )
              }              
            />
          );
        })}
      </div>
    </div>
  );
};

export default PhotoGallery;
