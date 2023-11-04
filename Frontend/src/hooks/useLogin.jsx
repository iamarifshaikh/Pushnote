import { backendURL } from "../utils/backendInfo";

export const useLogin = () => {
  const login = async ({ email, password }) => {
    const response = await fetch(`${backendURL}/api/employer/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login Failed!");
    }

    const data = await response.json();

    localStorage.setItem("token", JSON.stringify(data.token));
    localStorage.setItem("employer", JSON.stringify(data));

    return data;
  };
  return { login };
};
