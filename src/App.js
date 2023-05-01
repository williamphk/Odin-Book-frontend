import "./App.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./features/auth/authSlice";
import jwt_decode from "jwt-decode";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import NewsFeed from "./components/NewsFeed";
import Loading from "./components/Loading";

function App() {
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
  }, [dispatch]);

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

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <Router>
        {isLoggedIn && <Navbar />}
        <Routes>
          <Route
            path="/odin-book-frontend/"
            element={isLoggedIn ? <NewsFeed /> : <LandingPage />}
          />
          <Route path="/odin_Blog-API-frontend/friends" element={<Friends />} />
          <Route path="/odin_Blog-API-frontend/profile" element={<Profile />} />
          <Route path="/odin_Blog-API-frontend/setting" element={<Setting />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
