"use server";
import axios from "axios";
import { redirect } from "next/navigation";
import { RegisterUserType, UserType } from "../_types/user";
import { deleteSession, setSession } from "../_lib/session";

const API_URL = "http://localhost:3001";

type RegisterState = {
  error?: string;
};

type LoginState = {
  error?: string;
};

export const registerAction = async (
  prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "All fields are required" };
  }

  try {
    const existingUser = await axios.get(`${API_URL}/users?email=${email}`);

    if (existingUser.data.length > 0) {
      return { error: "Email already registered" };
    }

    const newUser: { name: string; email: string; password: string } = {
      name,
      email,
      password,
    };

    const response = await axios.post(`${API_URL}/users`, newUser);

    const user: RegisterUserType = response.data;

    await setSession({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return { error: "Registration failed. Try again." };
  }

  redirect("/contact");
};

export const loginAction = async (
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }
  try {
    const response = await axios.get(
      `${API_URL}/users?email=${email}&password=${password}`
    );
    const user: UserType = response.data[0];
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    //set user in the cookies
    await setSession({ name: user.name, email: user.email, id: user.id });
  } catch (err) {
    return { error: "Failed to login. Please try again." };
  }
  redirect("/contact");
};

export const logoutAction = async () => {
  await deleteSession();
  redirect("/login");
};
