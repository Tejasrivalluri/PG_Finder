import axios from "axios";

const BASE_URL = "http://localhost:8080/api/pgs";

export const getAllPgs = () => axios.get(BASE_URL);

export const getPgsByCity = (city) =>
  axios.get(`${BASE_URL}/city/${city}`);