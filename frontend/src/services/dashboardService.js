import api from "./api";

export const getHCPs = async () => {
  const response = await api.get("/hcp/");
  return response.data;
};

export const getInteractions = async () => {
  const response = await api.get("/interaction/");
  return response.data;
};
