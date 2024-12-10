
import { Search } from "lucide-react";

function AdminHeader () {
  return (
   <header className="bg-white shadow-sm p-4 flex items-center justify-between">
  <h1 className="text-xl font-semibold">Hello, Oshoke!</h1>
  <div className="relative">
    <input
      type="text"
      placeholder="Please input search text"
      className="pl-10 pr-4 py-2 border rounded-lg w-64"
    />
    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
  </div>
</header>
    );
}

export default AdminHeader;
