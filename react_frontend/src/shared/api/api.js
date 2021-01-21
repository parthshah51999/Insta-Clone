import axios from "axios";
import { service } from "../../axios/interceptor";

export const login = (credentials) => {
  return service.post("signin", credentials);
};

export const signUp = (credentials) => {
  return service.post("signup", credentials);
};

export const like = (postId) => {
  return service.post("like", { postId });
};

export const unlike = (postId) => {
  return service.post("unlike", { postId });
};

export const createPost = (data) => {
  return service.post("createpost", data);
};

export const getAllPosts = () => {
  return service.get("allposts");
};

export const getMyPosts = () => {
  return service.get("myposts");
};

// Different Content Type requests
export const uploadPostFile = (url, data) => {
  return axios.post(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
