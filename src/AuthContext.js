import React, { createContext, useState, useEffect } from "react";
import api from "./api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authInfo, setAuthInfo] = useState({ nickname: "", type: "" });

  useEffect(() => {
    const getMe = async () => {
      try {
        const res = await api.get("/accounts/me");
        // console.log("me response:", res);
        if (res.data.coachProfile) {
          setAuthInfo({ nickname: res.data.nickname, type: "coach" });
          console.log(res.data.nickname, "coach");
        } else {
          setAuthInfo({ nickname: res.data.nickname, type: "user" });
          console.log(res.data.nickname, "user");
        }
      } catch (err) {
        console.log("me error:", err);
      }
    };
    getMe();
  }, []);

  return (
    <AuthContext.Provider value={{ authInfo, setAuthInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
