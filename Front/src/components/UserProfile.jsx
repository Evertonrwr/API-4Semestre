import React, { useEffect, useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { Button } from '.';
import { userProfileData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';

const UserProfile = () => {
  const { currentColor } = useStateContext();
  const [user, setUser] = useState(null)
  function logOut() {
    fetch("/Login/LogOut", {
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }).then((resposta) => resposta.json()).then((data) => {
      if (data) {
        window.location.href = "/"
      }
    })
  }
  function profileUser() {
    fetch("/user/profile", {
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }).then((resposta) => resposta.json()).then((user) => {
      setUser(user)
    })
  }
  
  useEffect(() => {
    profileUser()
  },[])

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">

        {/* Perfil do usuário */}
        {user && (
          <div>
            <p className="font-semibold text-xl dark:text-gray-200"> {user.name} </p>
            {/* <p className="text-gray-500 text-sm dark:text-gray-400">  Developer   </p> */}
            <p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> {user.email} </p>
          </div>

        )}
      </div>

      <div>
        {userProfileData.map((item, index) => (
          <div onClick={() => window.location.href = "/user/update/" + user.id} key={index} className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
            <button
              onClick={()=> window.location.href = "/user/updateProfile"}
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
            >
              {item.icon}
            </button>

            <div>
              <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400"> {item.desc} </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <button
          type="button"
          onClick={() => logOut()}
          style={{ backgroundColor: `${currentColor}`, color: "white", borderRadius: "10px" }}
          className={`p-3 w-full hover:drop-shadow-xl `}
        >
          LogOut
        </button>
      </div>
    </div>

  );
};

export default UserProfile;