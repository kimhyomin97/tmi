import axios from "axios";

const RESTAURANTS = "/api/restaurants";

const url = {
  restaurants: {
    all: RESTAURANTS + "/all",
    near: RESTAURANTS + "/near",
  },
};

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const getRestaurants = async () => {
  try {
    const response = await api.get(url.restaurants.all);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getNearestRestaurants = async (lat, lon) => {
  try {
    const response = await api.get(url.restaurants.near, {
      params: { lat, lon },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
