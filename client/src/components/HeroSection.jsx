import { IoIosSearch } from "react-icons/io";
import { setAllPosts } from "../../store/slices/postSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";


const HeroSection = () => {

  const dispatch = useDispatch();

  const handleSearch = async (e) => {
    try {
      const search = e.target.value;
      const res = await axios.get(import.meta.env.VITE_API_URL + `/post/search?search=${search}`);
      const {data} = await res.data;
      dispatch(setAllPosts(data));
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || "Something went wrong";
      toast.error(message);      
    }
  }
  

  return (
    <div
      className="w-full min-h-[60vh] flex justify-center items-center bg-cover bg-center px-4"
      style={{
        backgroundImage: "url('https://cdn.pixabay.com/photo/2016/11/29/09/36/leaves-1868742_1280.jpg')",
      }}
    >
      <div className="w-full max-w-4xl">
        <h1 className="text-white text-4xl font-semibold text-center">Stunning Digital Image Marketplace</h1>
        <p className="text-center text-white mt-1 mb-2">Over 4.9 million+ high quality stock images, videos and music shared by our talented community.</p>
      <div className="bg-white backdrop-blur-md p-3 rounded-full flex items-center shadow-lg">
        <IoIosSearch className="text-green-600 text-2xl mx-4" />
        <input
          type="search"
          id="search"
          name="search"
          placeholder="Search your asset..."
          onChange={handleSearch}
          className="flex-1 bg-transparent outline-none text-base sm:text-lg md:text-lg placeholder-gray-600"
        />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
