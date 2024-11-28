import { useSelector } from "react-redux";


function Profile() {
  // Get the user from the Redux store
  const { user } = useSelector((state) => state.user);
  console.log("User profile", user)
  if (!user) {
    return <p>Loading...</p>; // Handle the case when user is not yet loaded
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>
        <strong>UID:</strong> {user.uid}
      </p>
      <p>
        <strong>Name:</strong> {user.displayName || "No display name available"}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <img
        src={user.photoURL || "/default-avatar.png"}
        alt="User Avatar"
        width={100}
      />
    </div>
  );
}

export default Profile