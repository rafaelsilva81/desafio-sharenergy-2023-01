const UserCard = ({ user }: { user: Results }) => {
  return (
    <div
      key={user.login.uuid}
      className="flex items-center gap-4 rounded-lg bg-gray-800 p-4"
    >
      <img
        src={user.picture.medium}
        alt={user.name.first}
        className="rounded-full"
        width={64}
      />
      <div className="flex flex-col gap-1 break-all">
        <h1 className="font-bold">
          {user.name.first} {user.name.last}
        </h1>
        <span className="text-sm font-bold text-primary">
          {user.login.username}
        </span>
        <span className="text-sm text-gray-400">{user.dob.age} Anos </span>

        <h3 className="text-sm text-gray-400">{user.email}</h3>
      </div>
    </div>
  );
};

export default UserCard;
