import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "@/reducers/userSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Users as UsersIcon } from "lucide-react";
import { usePagination } from "../../hooks/usePaginate";
import  Pagination  from "../../components/ui/pagination";

const USERS_PER_PAGE = 5;

export default function CustomersContent() {
  const dispatch = useDispatch();
  const { users, status } = useSelector((state) => state.users);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = (users || []).filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());

    switch (filter) {
      case "customers":
        return matchesSearch && user.isCustomer;
      case "authenticated":
        return matchesSearch && !user.isCustomer;
      default:
        return matchesSearch;
    }
  });

  const pagination = usePagination({
    data: filteredUsers,
    itemsPerPage: USERS_PER_PAGE,
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <UsersIcon className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Users Management</h2>
        </div>
        <Badge variant="secondary">{filteredUsers.length} Users</Badge>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              pagination.reset();
            }}
            className="pl-10"
          />
        </div>
        <Select
          value={filter}
          onValueChange={(value) => {
            setFilter(value);
            pagination.reset();
          }}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter users" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Users</SelectItem>
            <SelectItem value="customers">Customers</SelectItem>
            <SelectItem value="authenticated">Authenticated Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {status === "loading" ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  Loading users...
                </TableCell>
              </TableRow>
            ) : pagination.displayedItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              pagination.displayedItems.map((user) => (
                <TableRow key={user.uid}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-gray-100 overflow-hidden">
                        {user.photoURL ? (
                          <img
                            src={user.photoURL}
                            alt={user.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-primary text-primary-foreground">
                            {user.name?.[0]?.toUpperCase()}
                          </div>
                        )}
                      </div>
                      <span>{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.isCustomer ? "default" : "secondary"}>
                      {user.isCustomer ? "Customer" : "User"}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {user.role?.map((role) => (
                        <Badge key={role} variant="outline">
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination
        hasMoreItems={pagination.hasMoreItems}
        onLoadMore={pagination.loadMore}
        loading={status === "loading"}
      />
    </div>
  );
}
