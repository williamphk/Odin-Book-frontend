import "./App.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./slices/authSlice";
import jwt_decode from "jwt-decode";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import LeftSidebar from "./components/layout/LeftSidebar";
import RightSidebar from "./components/layout/RightSidebar";
import LandingPage from "./components/auth/LandingPage";
import Register from "./components/auth/Register";
import NewsFeed from "./components/posts/NewsFeed";
import Profile from "./components/profile/Profile";
import Friends from "./components/friends/Friends";
import Setting from "./components/settings/Setting";
import Loading from "./components/common/Loading";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && isTokenValid(token)) {
      //console.log("Token is valid");
    } else if (token && !isTokenValid(token)) {
      console.log("Token is expired");
      localStorage.removeItem("token");
    }

    // Dispatch the login action only if there's a valid token in the localStorage and the user is not already logged in
    if (token && !isLoggedIn) {
      dispatch(login({ token, user }));
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [dispatch, isLoggedIn]);

  const isTokenValid = (token) => {
    let decodedToken = jwt_decode(token);
    //console.log("Decoded Token", decodedToken);
    let currentDate = new Date();

    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      return false;
    } else {
      //console.log("Valid token");
      return true;
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <Router>
        {isLoggedIn && <Navbar />}
        <div className="min-h-screen bg-gray-100 py-3 px-0 lg:px-3 flex justify-between">
          <LeftSidebar className="flex-col bg-gray-100 w-[330px] hidden lg:flex" />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={isLoggedIn ? <NewsFeed /> : <LandingPage />}
            />
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/friends/*" element={<Friends />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/setting" element={<Setting />} />
            </Route>
          </Routes>
          <RightSidebar
            friends={[]}
            className="flex-col bg-gray-100 p-4 w-[330px] hidden lg:flex"
          />
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
