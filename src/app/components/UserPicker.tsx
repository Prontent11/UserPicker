"use client";
import React, { useEffect, useState } from "react";
import UserItem from "./UserItem";
import UserSuggestions from "./UserSuggestions";

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
]; // Your user data

const UserPicker: React.FC = () => {
  const [userList, setUserList] = useState<UserList[]>(Users);
  const [displayList, setDisplayList] = useState<UserList[] | null>(null);
  const [inputText, setInputText] = useState<string>("");
  const [userName, setUserName] = useState<UserList[]>();
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const removeUser = (email: string | undefined) => {
    const newDisplayList = displayList?.filter((user) => user.email !== email);
    setDisplayList(newDisplayList!);
  };

  const addUser = (email: string | undefined) => {
    const displayUser = userList.find((user) => user.email === email);
    const inputName: string = displayUser!.name;
    localStorage.setItem("inputName", inputName);
    if (displayUser)
      setDisplayList((prevDisplayList) =>
        prevDisplayList ? [...prevDisplayList, displayUser] : [displayUser]
      );
  };

  useEffect(() => {
    console.log("displayList", displayList);
  }, [displayList]);

  useEffect(() => {
    console.log("entered input text change");
    const newUserNames: UserList[] = userList.filter((user) =>
      user.name.startsWith(inputText!)
    );
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
      <span className="text-purple-400 text-4xl mb-5">Pick User</span>
      <div className="grid grid-flow-row md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 h-min-[300px] gap-5 w-min-[400px] border-purple-500 border-solid border-b-2 pb-2">
        {displayList?.map((user, index) => (
          <UserItem key={index} user={user} onRemove={removeUser} />
        ))}
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
          <div className="">
            {showSuggestions && (
              <UserSuggestions users={userName || []} onAdd={addUser} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPicker;
