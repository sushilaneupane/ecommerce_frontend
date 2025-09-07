import { useMutation } from "@tanstack/react-query";
import axios from "axios";

// Axios instance
const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

import { createUser, loginUser } from "../api/usersApi";

export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUser,
  });
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};
