import axios from "axios";

export const api = axios.create({
    baseURL: "https://eportal.apotiguar.com.br/",
    timeout: 10000,
});