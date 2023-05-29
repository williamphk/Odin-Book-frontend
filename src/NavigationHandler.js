import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  switchToFriends,
  switchToSetting,
  switchToProfile,
  switchToNewfeed,
} from "./slices/pageSlice";

function NavigationHandler() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;

    if (currentPath.includes("/friends") && !currentPath.includes("/profile")) {
      dispatch(switchToFriends());
    } else if (currentPath.includes("/setting")) {
      dispatch(switchToSetting());
    } else if (currentPath.includes("/profile")) {
      dispatch(switchToProfile());
    } else {
      dispatch(switchToNewfeed());
    }
  }, [dispatch, location]);

  return null;
}

export default NavigationHandler;
