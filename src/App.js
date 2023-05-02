import "./App.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./features/auth/authSlice";
import jwt_decode from "jwt-decode";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Register from "./components/Register";
import NewsFeed from "./components/NewsFeed";
import Profile from "./components/Profile";
import Friends from "./components/Friends";
import Setting from "./components/Setting";
import Loading from "./components/Loading";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isTokenValid(token)) {
      console.log("Token is valid");
    } else if (token && !isTokenValid(token)) {
      console.log("Token is expired");
      localStorage.removeItem("token");
    }

    if (token) {
      dispatch(login(token));
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [dispatch, isLoggedIn]);

  const isTokenValid = (token) => {
    let decodedToken = jwt_decode(token);
    console.log("Decoded Token", decodedToken);
    let currentDate = new Date();

    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      return false;
    } else {
      console.log("Valid token");
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
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={isLoggedIn ? <NewsFeed /> : <LandingPage />}
          />
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/friends" element={<Friends />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/setting" element={<Setting />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
