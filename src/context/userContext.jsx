"use client";
import { auth } from "@/lib/firebase/config";
import SigInModal from "@/components/modals/signInModal";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [user, setUser] = useState(null);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [isLogged, setIsLogged] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [allUsersLoading, setAllUsersLoading] = useState(true);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const fetchUser = async (uid) => {
    try {
      const res = await fetch(`/api/users/userGet/${uid}`);

      if (!res.ok) {
        throw new Error("failed to fetch user data");
      }
      const data = await res.json();

      setUser(data.result);
      setIsLogged(true);
    } catch (err) {
      console.error("error fetching user data", err);
      setUser(null);
      setIsLogged(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      setIsLoading(true);
      if (firebaseUser) {
        setFirebaseUser(firebaseUser);
        await fetchUser(firebaseUser.uid);
      } else {
        setUser(null);
        setIsLogged(false);
      }

      await delay(2000);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        showSignInModal,
        setShowSignInModal,
        user,
        setUser,
        firebaseUser,
        isLogged,
        isLoading,
        fetchUser,
      }}
    >
      {children}
      {showSignInModal && <SigInModal />}
    </UserContext.Provider>
  );
};
