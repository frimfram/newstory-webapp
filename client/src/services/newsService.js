import http from "./httpService";
import api from "../config.json";

export function getStories() {
  return http.get(api.apiEndpoint + "/stories");
}
