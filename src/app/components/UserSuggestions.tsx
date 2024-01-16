// UserSuggestions.tsx
import React from "react";
import Image from "next/image";

type UserSuggestionsProps = {
  users: {
    name: string;
    email?: string;
  }[];
  onAdd: (email: string | undefined) => void;
};

const UserSuggestions: React.FC<UserSuggestionsProps> = ({ users, onAdd }) => (
  <div className="flex flex-col w-min-0 text-left max-h-[200px] overflow-y-auto shadow-lg">
    {users.map((user) => (
      <div
        onClick={() => onAdd(user.email)}
        key={user.email}
        className="flex gap-5 mb-2 px-3 mt-2"
      >
        <Image
          src={`https://robohash.org/${user.email}?set=set1`}
          width={30}
          height={30}
          alt="profile"
          className="object-fill"
        />
        <div>{user.name}</div>
        <div className="text-gray-500">{user.email}</div>
      </div>
    ))}
  </div>
);

export default UserSuggestions;
