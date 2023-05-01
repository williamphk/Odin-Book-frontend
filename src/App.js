import "./App.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./features/auth/authSlice";
import jwt_decode from "jwt-decode";

import LandingPage from "./components/LandingPage";
import NewsFeed from "./components/NewsFeed";

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
    return <div>Loading...</div>;
  }

  return (
    <div className="App">{isLoggedIn ? <NewsFeed /> : <LandingPage />}</div>
  );
}

export default App;
