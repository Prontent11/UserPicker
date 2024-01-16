"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type UserList = {
  name: string;
  email?: string;
};

const Users: UserList[] = [
  { name: "yash", email: "yash@gmail.com" },
  { name: "yash1", email: "yash1@gmail.com" },
  { name: "yash2", email: "yash2@gmail.com" },
  { name: "yash3", email: "yash3@gmail.com" },
  { name: "yash4", email: "yash4@gmail.com" },
  { name: "yash5", email: "yash5@gmail.com" },
  { name: "yash6", email: "yash6@gmail.com" },
  { name: "yash7", email: "yash7@gmail.com" },
  { name: "yash8", email: "yash8@gmail.com" },
];

const UserPicker = () => {
  const [userList, setUserList] = useState<UserList[]>(Users);
  const [displayList, setDisplayList] = useState<UserList[] | null>(null);
  const [inputText, setInputText] = useState<string>("");
  const [userName, setUserName] = useState<UserList[]>();
  const [showSuggestions, setShowSuggestions] = useState<Boolean>(false);
  const removeUser = (email: string | undefined) => {
    const newDisplayList = displayList?.filter((user) => {
      if (user.email !== email) {
        return user;
      }
    });
    setDisplayList(newDisplayList!);
  };
  const addUser = (email: string | undefined) => {
    const displayUser = userList.find((user) => {
      return user.email == email;
    });
    const inputName: string = displayUser!.name;
    localStorage.setItem("inputName", inputName);
    console.log("display:user", displayUser);
    if (displayUser)
      setDisplayList((prevDisplayList) =>
        prevDisplayList ? [...prevDisplayList, displayUser] : [displayUser]
      );
  };
  useEffect(() => {
    console.log("displayList", displayList);
  }, [displayList]);
  useEffect(() => {
    console.log("enterend inputext change");
    const newUserNames: UserList[] = userList.filter((user) => {
      return user.name.startsWith(inputText!);
    });
    console.log("newusernames", newUserNames);
    setUserName(newUserNames);
  }, [inputText]);

  const handleBackSpace = (event: any) => {
    console.log("backspace hit", event.key);
    const key = event.key;
    if (
      key === "Backspace" &&
      !inputText &&
      localStorage.getItem("inputName")
    ) {
      setInputText(localStorage.getItem("inputName")! + " ");
    } else if (key === "Backspace" && localStorage.getItem("inputName")) {
      setInputText("");
    }
  };

  return (
    <div className="flex h-screen w-full justify-center flex-col items-center text-black bg-white ">
      <span className="text-purple-400  text-4xl mb-5">Pick User</span>
      <div className="grid grid-flow-row md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 h-min-[300px] gap-5  w-min-[400px] border-purple-500 border-solid border-b-2 pb-2">
        {displayList?.map((user, index) => {
          return (
            <div
              key={index}
              className="bg-[#f2f2f1] px-3 py-2 flex justify-between rounded-2xl min-w-0"
            >
              <div className="flex gap-2 items-center">
                <Image
                  src={`https://robohash.org/${user.email}?set=set1`}
                  width={30}
                  height={30}
                  alt="profile"
                  className=" object-fill"
                />
                {user.name}{" "}
              </div>

              <button onClick={() => removeUser(user.email)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          );
        })}
        <div>
          <div className="flex ">
            <input
              type="text"
              onKeyDown={handleBackSpace}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="p-2  outline-none "
              onFocus={() => setShowSuggestions(true)}
              placeholder="Add User Name"
            />
          </div>
          <div className="absolute mt-3 w-min-0 text-left   max-h-[200px] overflow-y-auto shadow-lg">
            {showSuggestions &&
              userName?.map((user, index) => {
                if (!displayList?.includes(user)) {
                  return (
                    <div
                      onClick={() => addUser(user.email)}
                      key={user.email}
                      className="flex gap-5 mb-2 px-3 mt-2"
                    >
                      <Image
                        src={`https://robohash.org/${user.email}?set=set1`}
                        width={30}
                        height={30}
                        alt="profile"
                        className=" object-fill"
                      />
                      <div>{user.name}</div>
                      <div className="text-gray-500">{user.email}</div>
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPicker;

//  <div className="grid grid-cols-3 border-purple-500 border-solid border">
//    {displayList?.map((user, index) => {
//      return (
//        <div key={index}>
//          {user.name} <button onClick={() => removeUser(user.email)}>X</button>
//        </div>
//      );
//    })}
//    <div className="flex flex-col w-[100px] h-[300px] overflow-y-auto">
//      <input
//        type="text"
//        value={inputText}
//        onChange={(e) => setInputText(e.target.value)}
//        className="border-black border-1 text-black "
//      />

//      {/* <div className="flex  flex-col  w-[100px] h-[100px] border-white text-white border-1">
//             {inputText &&
//               userName?.map((user, index) => {
//                 if (!displayList?.includes(user)) {
//                   return (
//                     <div onClick={() => addUser(user.email)} key={user.email}>
//                       {user.name}
//                     </div>
//                   );
//                 }
//               })}
//           </div> */}
//    </div>
//  </div>;
