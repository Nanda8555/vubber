import { LoginCredentials, RegisterCredentials, User } from "@/types/auth";

const API_URL = import.meta.env.VITE_API_URL;

export const authService = {
  async login(
    credentials: LoginCredentials
  ): Promise<{ user: User; token: string }> {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Login failed");
      }

      return responseData;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  async register(
    credentials: RegisterCredentials
  ): Promise<{ user: User; token: string }> {
    console.log("Registering user:", credentials);
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error || "Registration failed");
    }

    return responseData;
  },

  async logout(): Promise<void> {
    localStorage.clear();
    sessionStorage.clear();
  },
};
