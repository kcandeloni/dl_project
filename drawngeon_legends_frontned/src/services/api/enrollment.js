import api from "./api/api";

export async function save(body, token) {
  const response = await api.post("/enrollments", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getPersonalInformations(token, userId) {
  const response = await api.get(`/enrollments/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
