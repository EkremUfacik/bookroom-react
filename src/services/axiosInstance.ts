import axios from "axios";

const baseURL = "https://cemilk.pythonanywhere.com/api";

export const axiosBase = axios.create({
  baseURL,
});
