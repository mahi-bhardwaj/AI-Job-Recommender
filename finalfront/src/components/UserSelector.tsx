import React, { useState, useEffect } from "react";
import { User } from "../api/apiService";
import apiService from "../api/apiService";
import { Search } from "lucide-react";

interface UserSelectorProps {
  onSelectUser: (user: User) => void;
  selectedUserId: number | null;
}

const UserSelector: React.FC<UserSelectorProps> = ({
  onSelectUser,
  selectedUserId,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const fetchedUsers = await apiService.getUsers();
        // Ensure we have an array of users

        setUsers(Array.isArray(fetchedUsers.users) ? fetchedUsers.users : []);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.primary_focus?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-xl font-semibold mb-4">Select User Profile</h2>

      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search by name or focus area..."
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="max-h-60 overflow-y-auto">
          {filteredUsers.length > 0 ? (
            <ul className="space-y-2">
              {filteredUsers.map((user) => (
                <li
                  key={user.id}
                  className={`p-3 rounded-md cursor-pointer transition-all ${
                    selectedUserId === user.id
                      ? "bg-blue-50 border-l-4 border-blue-500"
                      : "hover:bg-gray-50 border-l-4 border-transparent"
                  }`}
                  onClick={() => onSelectUser(user)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{user.name}</h3>
                      <p className="text-sm text-gray-600">
                        {user.primary_focus} • {user.experience_years} years
                      </p>
                    </div>
                    <div className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">
                      {user.skills.length} skills
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-8 text-center text-gray-500">
              No users found matching your search
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserSelector;

