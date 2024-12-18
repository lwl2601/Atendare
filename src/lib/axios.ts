import axios from "axios";

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    'Access-Token': process.env.NEXT_PUBLIC_API_TOKEN,
  },
});

export default API;