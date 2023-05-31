import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import MaterialIcon from "../common/MaterialIcon";

import { getUser } from "../../api";

const Intro = ({ user, userId }) => {
  const [userIntro, setUserIntro] = useState("");
  const [work, setWork] = useState("");
  const [education, setEducation] = useState("");
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isWorkClick, setIsWorkClick] = useState(false);
  const [isEducationClick, setIsEducationClick] = useState(false);
  const [isCityClick, setIsCityClick] = useState(false);
  const [isEditClick, setIsEditClick] = useState(false);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const getUserIntro = async () => {
      try {
        setIsLoading(true);
        const fetchedUserIntro = await getUser(token, userId ?? user._id);
        setUserIntro(fetchedUserIntro.data.user.profile);
        setIsLoading(false);
      } catch (err) {}
    };

    getUserIntro();
  }, [userId, token, user._id]);

  console.log(isLoading);

  return (
    <div className="w-full bg-white rounded-lg shadow p-3 flex flex-col gap-y-1">
      <div className="font-bold text-lg">Intro</div>
      {isLoading ? (
        <div>Loading...</div>
      ) : userIntro.work ? (
        <div className="flex items-center gap-x-2">
          <MaterialIcon
            className="material-symbols-outlined text-2xl"
            iconName="work"
          />
          <div className="font-bold">{userIntro.work}</div>
        </div>
      ) : (
        (!userId || userId === user._id) && (
          <div className="text-sm rounded-lg bg-gray-200 hover:bg-gray-300 py-1">
            <button onClick={setIsWorkClick} className="w-full">
              Add work
            </button>
          </div>
        )
      )}

      {isLoading ? (
        <div>Loading...</div>
      ) : userIntro.education ? (
        <div className="flex items-center gap-x-2">
          <MaterialIcon
            className="material-symbols-outlined text-2xl"
            iconName="school"
          />
          <div className="font-bold">{userIntro.education}</div>
        </div>
      ) : (
        (!userId || userId === user._id) && (
          <div className="text-sm rounded-lg bg-gray-200 hover:bg-gray-300 py-1">
            <button onClick={setIsEducationClick} className="w-full">
              Add eduation
            </button>
          </div>
        )
      )}
      {isLoading ? (
        <div>Loading...</div>
      ) : userIntro.city ? (
        <div className="flex items-center gap-x-2">
          <MaterialIcon
            className="material-symbols-outlined text-2xl"
            iconName="location_city"
          />
          <div className="font-bold">{userIntro.city}</div>
        </div>
      ) : (
        (!userId || userId === user._id) && (
          <div className="text-sm rounded-lg bg-gray-200 hover:bg-gray-300 py-1">
            <button onClick={setIsCityClick} className="w-full">
              Add current city
            </button>
          </div>
        )
      )}
      {(!userId || userId === user._id) && (
        <div className="text-sm rounded-lg bg-gray-200 hover:bg-gray-300 py-1">
          <button onClick={setIsEditClick} className="w-full">
            Edit details
          </button>
        </div>
      )}
    </div>
  );
};

export default Intro;
