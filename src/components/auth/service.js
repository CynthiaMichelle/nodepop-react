import client, {
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from "../../api/client";
import storage from "../../utils/storage";

export const login = (credentials, checkboxChecked) => {
  return client.post("/api/auth/login", credentials).then(({ accessToken }) => {
    setAuthorizationHeader(accessToken);
    if (checkboxChecked === true) {
      storage.set("auth", accessToken);
    }
  });
};

export const logout = () => {
  return Promise.resolve().then(() => {
    removeAuthorizationHeader();
    storage.remove("auth");
  });
};
