import axios from "axios";

export const api = axios.create({
    baseURL: "https://api.apotiguar.com.br:64462",
    timeout: 20000,
});