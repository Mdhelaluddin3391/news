import { fetchSavedArticles, loginUser } from "../core/api-adapter.js";

export const UserService = {
  login: loginUser,
  getSaved: fetchSavedArticles
};