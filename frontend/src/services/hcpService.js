import api from "./api";

export const getHCPs = async () => {
  const response = await api.get("/hcp/");
  return response.data;
};
