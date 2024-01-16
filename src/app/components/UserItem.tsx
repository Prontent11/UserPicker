// UserItem.tsx
import React from "react";
import Image from "next/image";

type UserItemProps = {
  user: {
    name: string;
    email?: string;
  };
  onRemove: (email: string | undefined) => void;
};

const UserItem: React.FC<UserItemProps> = ({ user, onRemove }) => (
  <div className="bg-[#f2f2f1] px-3 py-2 flex justify-between rounded-2xl min-w-0">
    <div className="flex gap-2 items-center">
      <Image
        src={`https://robohash.org/${user.email}?set=set1`}
        width={30}
        height={30}
        alt="profile"
        className="object-fill"
      />
      {user.name}
    </div>
    <button onClick={() => onRemove(user.email)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  </div>
);

export default UserItem;
