import React from "react";

const UserCard = ({ user }) => {
  return (
    <div className="flex p-4 user-card flex-1 shadow-md">
      <div className="w-1/4 pr-4">
        <img
          src={user.image}
          alt={user.name}
          className="rounded-full w-full ent-img"
        />
      </div>
      <div className="w-3/4">
        <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
        <p className="text-white">Species: {user.species}</p>
        <p className="text-white">Gender: {user.gender}</p>
        <p className="text-white">Height: {user.height} m</p>
        <p className="text-white">
          In Distance: {user.distance?.toFixed(2)} km
        </p>
      </div>
    </div>
  );
};

export default UserCard;
