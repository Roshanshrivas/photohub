import React, { useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import SellerDashboard from "../pages/SellerDashboard";
import BuyerDashboard from "../pages/BuyerDashboard";
import gsap from "gsap";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ProtectedRoute";
import AboutUs from "./AboutUs";

const GsapTransition = () => {
  const nodeRef = useRef(null);
  const location = useLocation();

  //jab bhi location change hoga tab ye use effect run hoga, because ye useEffect hook ko ham depenedent banane wale hai location ke upper

  // When a page renders, useEffect runs first
  useEffect(() => {
    if (nodeRef.current) {
      gsap.fromTo(nodeRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });
    }
  }, [location]);
  //when we keep dependency array empty it means that: bhai ye page call hoga jab bhi tum refresh karoge

  //For GSAP:
  //1) target
  //2) logic

  return (
    <div ref={nodeRef}>
      <Toaster />
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<ProtectedRoute children={<Login />} requiresAuth={false} />}
        />
        <Route
          path="/signup"
          element={
            <ProtectedRoute children={<Signup />} requiresAuth={false} />
          }
        />
        <Route
          path="/seller/profile"
          element={<ProtectedRoute children={<SellerDashboard />} />}
        />
        <Route
          path="/buyer/profile"
          element={<ProtectedRoute children={<BuyerDashboard />} />}
        />
        <Route
          path="/about"
          element={<AboutUs/>}
        />
      </Routes>
    </div>
  );
};

export default GsapTransition;
