import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import MaterialIcon from "../common/MaterialIcon";
import InputField from "../common/InputField";

import {
  getUser,
  updateProfileWork,
  updateProfileEducation,
  updateProfileCity,
} from "../../api";
import { incrementUpdateInfoCount } from "../../slices/profileSlice";
const Intro = ({ user, userId }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

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
  const updateInfoCount = useSelector((state) => state.profile.updateInfoCount);

  useEffect(() => {
    const getUserIntro = async () => {
      try {
        setIsLoading(true);
        const fetchedUserIntro = await getUser(token, userId ?? user._id);
        setUserIntro(fetchedUserIntro.data.user.profile);
        setWork(fetchedUserIntro.data.user.profile.work);
        setIsLoading(false);
      } catch (err) {}
    };

    getUserIntro();
  }, [userId, token, user._id, updateInfoCount]);

  function handleEditClick() {
    setIsWorkClick(!isWorkClick);
    setIsEducationClick(!isEducationClick);
    setIsCityClick(!isCityClick);
  }

  const handleKeyPressWork = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(onWorkSubmit)();
    }
  };

  const handleKeyPressEducation = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(onEducationSubmit)();
    }
  };

  const handleKeyPressCity = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(onCitySubmit)();
    }
  };

  const onWorkSubmit = async (data) => {
    await updateProfileWork(token, user._id, data);
    setIsWorkClick(false);
    setIsEducationClick(false);
    setIsCityClick(false);
    dispatch(incrementUpdateInfoCount());
  };

  const onEducationSubmit = async (data) => {
    await updateProfileEducation(token, user._id, data);
    setIsWorkClick(false);
    setIsEducationClick(false);
    setIsCityClick(false);
    dispatch(incrementUpdateInfoCount());
  };

  const onCitySubmit = async (data) => {
    await updateProfileCity(token, user._id, data);
    setIsWorkClick(false);
    setIsEducationClick(false);
    setIsCityClick(false);
    dispatch(incrementUpdateInfoCount());
  };

  return (
    <div className="w-full bg-white rounded-lg shadow p-3 flex flex-col gap-y-1">
      <div className="font-bold text-lg">Intro</div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isWorkClick ? (
        <form className="flex gap-x-2" onSubmit={handleSubmit(onWorkSubmit)}>
          <MaterialIcon
            className="material-symbols-outlined text-2xl"
            iconName="work"
          />
          <InputField
            register={register}
            errors={errors}
            id="work"
            type="text"
            value={work}
            setPostContent={setWork}
            inputClassName="bg-gray-100 w-full p-2 rounded-lg focus:outline-none text-sm h-8"
            labeltext="profile work"
            handleKeyPress={handleKeyPressWork}
          />
        </form>
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
            <button onClick={() => setIsWorkClick(true)} className="w-full">
              Add work
            </button>
          </div>
        )
      )}

      {isLoading ? (
        <div>Loading...</div>
      ) : isEducationClick ? (
        <form
          className="flex gap-x-2"
          onSubmit={handleSubmit(onEducationSubmit)}
        >
          <MaterialIcon
            className="material-symbols-outlined text-2xl"
            iconName="school"
          />
          <InputField
            register={register}
            errors={errors}
            id="education"
            type="text"
            value={education}
            setPostContent={setEducation}
            inputClassName="bg-gray-100 w-full p-2 rounded-lg focus:outline-none text-sm h-8"
            labeltext="profile education"
            handleKeyPress={handleKeyPressEducation}
          />
        </form>
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
            <button
              onClick={() => setIsEducationClick(true)}
              className="w-full"
            >
              Add eduation
            </button>
          </div>
        )
      )}
      {isLoading ? (
        <div>Loading...</div>
      ) : isCityClick ? (
        <form className="flex gap-x-2" onSubmit={handleSubmit(onCitySubmit)}>
          <MaterialIcon
            className="material-symbols-outlined text-2xl"
            iconName="location_city"
          />
          <InputField
            register={register}
            errors={errors}
            id="city"
            type="text"
            value={city}
            setPostContent={setCity}
            inputClassName="bg-gray-100 w-full p-2 rounded-lg focus:outline-none text-sm h-8"
            labeltext="profile city"
            handleKeyPress={handleKeyPressCity}
          />
        </form>
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
            <button onClick={() => setIsCityClick(true)} className="w-full">
              Add current city
            </button>
          </div>
        )
      )}
      {(!userId || userId === user._id) && (
        <div className="text-sm rounded-lg bg-gray-200 hover:bg-gray-300 py-1">
          <button onClick={handleEditClick} className="w-full">
            Edit details
          </button>
        </div>
      )}
    </div>
  );
};

export default Intro;
