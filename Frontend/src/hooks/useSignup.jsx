import React from "react";

export const useSignup = () => {
  const signUp = async ({
    firstName,
    lastName,
    workSpaceName,
    number,
    email,
    password,
  }) => {
    const signupResponse = await fetch(
      "http://localhost:3000/api/employer/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          workSpaceName,
          number,
          email,
          password,
        }),
      }
    );

    if (!signupResponse.ok) {
      throw new Error("Signup failed!");
    }

    // Signup successful, now proceed to login
    const loginResponse = await fetch(
      "http://localhost:3000/api/employer/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!loginResponse.ok) {
      throw new Error("Login failed!");
    }

    const data = await loginResponse.json();

    localStorage.setItem("employer", JSON.stringify(data));

    return data;
  };
  return { signUp };
};
