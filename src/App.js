import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom"; // Import Outlet for child routes
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "./firebase/firebase";
import Navbar from "./components/Navbar";

// Define the main layout of the app, including Navbar and Outlet
function App() {
  const [user, setUser] = useState(null);
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    // Check if user is logged in
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // User is logged in
      } else {
        setUser(null); // User is logged out
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, [auth]);
  return (
    <>
      <Navbar /> {/* Navbar displayed on all pages */}
      <Outlet context={{ user }} /> {/* This renders child routes */}
    </>
  );
}

export default App;
