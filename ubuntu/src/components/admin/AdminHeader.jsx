import { logoutUser } from "@/reducers/authSlice";
import { LogOut, Search, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminHeader () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector(state => state.user);

  const handleLogout = () => {
      dispatch(logoutUser());
      navigate("/");
    };

  return (
    <header className="bg-white shadow-sm p-4 flex items-center justify-between">
      <h1 className="text-xl font-semibold">Hello, {user.name}</h1>
      <div className="relative">
        <input
          type="text"
          placeholder="Please input search text"
          className="pl-10 pr-4 py-2 border rounded-lg w-64"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
      <div className="flex items-center space-x-4">
        {/* <img
          src={user.photoURL || <User/>}
          alt="user image"
          width={40}
          height={40}
          className="rounded-full bg-gray-800"
        /> */}
        <div className="rounded-full bg-gray-900">
          <button className="text-gray-400 hover:text-white p-2">
            <User className="w-6 h-6" />
          </button>
        </div>

        <button onClick={handleLogout} className="text-red-600 font-bold text-2xl px-6 py-2 rounded-lg">
          <LogOut className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;
