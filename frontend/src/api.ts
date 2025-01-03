import axios from "axios";

export interface User {
  id: number;
  name: string;
  email: string;
}

const API_BASE_URL = "http://localhost:3000/api";

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
