import api from "./api/api";

export async function signInAPI({ email, password }) {
  const response = await api.post("/auth/sign-in", { email, password });
  return response.data;
}

export async function signUpAPI({ email, password }) {
  const response = await api.post("/users/", { email, password });
  return response.data;
}
