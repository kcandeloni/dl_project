import api from "./api/api";

export async function signInOauthAPI({ email, accessToken }) {
  const response = await api.post("/auth/oauth", { email, accessToken });
  return response.data;
}
