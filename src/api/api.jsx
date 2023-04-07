import axios from "axios";

const RESTAURANTS = "/restaurants";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const getRestaurants = async () => {
  try {
    const response = await api.get(RESTAURANTS);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
