"use client";

import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const isBrowser = typeof window !== "undefined";

  const register = async (username, email, password, phone) => {
    console.log("Fetch Succesfully", process.env.NEXT_PUBLIC_BACKEND_API);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password, phone }),
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Register error:", error);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        setToken(data.token);
        console.log("Login success:", data);

        // ✅ Safe localStorage usage
        if (isBrowser) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        return true;
      } else {
        alert(data.message || "Login failed");
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    if (isBrowser) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  };

  const createNavbar = async (formData) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/navbar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData }),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Create Navbar error:", error);
    }
  };

  const getNavbar = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/navbar`);
      const data = await res.json();

      return Array.isArray(data) ? data[0] || null : data;
    } catch (error) {
      console.error("Get Navbar error:", error);
      return null;
    }
  };

  // AppContext.jsx
  const addUpdateNavbar = async (formData, id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/navbar/${id}`,
        {
          method: "PUT", // or PATCH depending on your backend
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      return await res.json();
    } catch (error) {
      console.error("Update Navbar error:", error);
      throw error;
    }
  };

  const deleteNavbar = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/navbar/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Delete Navbar error:", error);
    }
  };

  const createHero = async (formData) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/hero`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData }),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Create Hero error:", error);
    }
  };

  const getHero = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/hero`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      return data[0];
    } catch (error) {
      console.error("Get Hero Error", error);
    }
  };

  const addUpdateHero = async (formData, id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/hero/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData }),
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Update Hero error:", error);
      throw error;
    }
  };

  const deleteHero = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/hero/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Delete Hero ERROR:", error);
    }
  };

  const getAbout = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/about`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      return data[0];
    } catch (error) {
      console.log("Get About Error:", error);
    }
  };

  const createAbout = async (formData) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/about`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData }),
      });
      const data = await res.json();
      console.log(data, "Craeted Data");
      return data;
    } catch (error) {
      console.error("Create About Error:", error);
    }
  };

  const addUpdateAbout = async (formData, id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/about/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData }),
        }
      );
      const data = await res.json();
      console.log(data, "Updated Data");

      return data;
    } catch (error) {
      console.error("Update About eRRROR:", error);
    }
  };

  const deleteAbout = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/about/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Delete About Error:", error);
    }
  };

  const getPopular = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/popular`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();
      console.log(data, "Getting Data");
      return data[0];
    } catch (error) {
      console.error("Getting Errror Popular Data", error);
    }
  };

  const createPopular = async (formData) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/popular`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData }),
        }
      );
      const data = await res.json();
      console.log(data, "Created Data");
      return data;
    } catch (error) {
      console.error("Creating Popular Error:", error);
    }
  };

  const addUpdatePopular = async (formData, id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/popular/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData }),
        }
      );
      const data = await res.json();
      console.log(data, "Updated Data");
      return data;
    } catch (error) {
      console.error("Updated Error ", error);
    }
  };

  const deletePopular = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/popular/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();
      console.log(data, "Deleted Data");
      return data;
    } catch (error) {
      console.error("Deleted Error ", error);
    }
  };

  const getCards = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/card`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      return data[0];
    } catch (error) {
      console.error("Get Hero Error", error);
    }
  };

  const createCards = async (formData) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/card`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData }),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Create Hero Error: ", error);
    }
  };

  const addUpdateCards = async (formData, id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/card/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData }),
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Update Cards error:", error);
      throw error;
    }
  };

  const deleteCards = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/card/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Delete Cards Error: ", error);
    }
  };

  const getFooter = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/footer`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      return data[0];
    } catch (error) {
      console.error("Geting Footer Data Error:", error);
    }
  };

  const createFooter = async (formData) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/footer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData }),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Created Footer Data Error:", error);
    }
  };

  const addUpdateFooter = async (formData, id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/footer/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Update Footer Errror:", error);
    }
  };

  const deleteFooter = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/footer/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Delete Footer Error:", error);
    }
  };

  useEffect(() => {
    if (isBrowser) {
      const savedToken = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");
      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }
    }
  }, [isBrowser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,

        createNavbar,
        getNavbar,
        addUpdateNavbar,
        deleteNavbar,

        createHero,
        getHero,
        addUpdateHero,
        deleteHero,

        getAbout,
        createAbout,
        addUpdateAbout,
        deleteAbout,

        getPopular,
        createPopular,
        addUpdatePopular,
        deletePopular,

        getCards,
        createCards,
        addUpdateCards,
        deleteCards,

        getFooter,
        createFooter,
        addUpdateFooter,
        deleteFooter,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// export const useAuth = () => useContext(AuthContext);
