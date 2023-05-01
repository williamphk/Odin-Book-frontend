import "./App.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./features/auth/authSlice";

import LandingPage from "./components/LandingPage";
import NewsFeed from "./components/NewsFeed";

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(login(token));
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [dispatch]);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">{isLoggedIn ? <NewsFeed /> : <LandingPage />}</div>
  );
}

export default App;
