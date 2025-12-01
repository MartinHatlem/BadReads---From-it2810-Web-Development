import React, { createContext, useEffect, useState } from "react";
import type { User } from "../utils/userInterface";
import { useMutation, useLazyQuery } from "@apollo/client/react";
import type { AddUserInput, AddUserResponse } from "../utils/AddUserInterface";
import { ADD_USER, GET_ALL_USERS } from "../graphql/queries";

type AuthContextType = {
  currentUser: User | null;
  isLoggedIn: boolean;
  handleLogin: (email: string) => Promise<boolean>;
  handleLogout: () => void;
  loginError: string | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isLoggedIn: false,
  handleLogin: async () => false,
  handleLogout: () => {},
  loginError: null,
  loading: false,
});

// Export context for the useAuth hook
export { AuthContext };

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [addUser] = useMutation<AddUserResponse, { input: AddUserInput }>(
    ADD_USER,
  );
  const [fetchUsers] = useLazyQuery<{ allUsers: User[] }>(GET_ALL_USERS);

  // Checking session for currentUsers
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("currentUser");
      }
    }
  }, []);

  const handleLogin = async (email: string) => {
    setLoginError(null);
    setLoading(true);

    let allUsers: User[] = [];

    try {
      const { data } = await fetchUsers();
      if (!data?.allUsers) {
        throw new Error("No users found");
      }
      allUsers = data.allUsers;
    } catch (error) {
      setLoginError(`Error fetching users: ${(error as Error).message}`);
      setLoading(false);
      return false;
    }

    const foundUser = allUsers.find(
      (user: User) => user.email.toLowerCase() === email.toLowerCase(),
    );

    if (foundUser) {
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      setCurrentUser(foundUser);
      setLoading(false);
      return true;
    }

    try {
      const name = email.split("@")[0];

      const { data } = await addUser({
        variables: {
          input: {
            name,
            email,
          },
        },
      });

      if (!data?.addUser) {
        throw new Error("Mutation returned no data");
      }

      const newUser: User = {
        id: Number(data.addUser.id),
        name: data.addUser.name,
        email: data.addUser.email,
      };

      localStorage.setItem("currentUser", JSON.stringify(newUser));
      setCurrentUser(newUser);

      setLoading(false);
      return true;
    } catch (error) {
      setLoginError(`Could not create user: ${(error as Error).message}`);
      setLoading(false);
      return false;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoggedIn: !!currentUser,
        handleLogin,
        handleLogout,
        loginError,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
