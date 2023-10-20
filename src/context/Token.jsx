import React, { createContext, useState, useEffect } from "react";
export const tokenContext = createContext();

export default function Token(props) {
  let [token, setToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) setToken(localStorage.getItem("token"));
    else setToken(null);
  }, []);

  return (
    <>
      <tokenContext.Provider value={{ token, setToken }}>
        {props.children}
      </tokenContext.Provider>
    </>
  );
}
