import { AxiosResponse } from "axios";
import { AxiosError } from "axios";
import { defineStore } from "pinia";
import user from "@/services/api/modules/user";

interface auth {
  token?: String;
  user?: App.Models.User;
}

export const useAuthStore = defineStore({
  id: "auth",
  state: (): { auth: auth; loggingIn: boolean; loggingOut: boolean } => ({
    auth: JSON.parse(localStorage.getItem("auth") || "{}") ,
    loggingIn: false,
    loggingOut: false,
  }),
  getters: {
    token: (state) => state.auth.token,
    user: (state) => state.auth.user,
    isLoggingOut: (state) => state.loggingOut,
  },
  actions: {
    login(data: {
      email?: string;
      password?: string;
      remember?: boolean;
    }): Promise<AxiosResponse> {
      this.loggingIn = true;
      return new Promise((reslove, reject) => {
        user
          .login(data)
          .then((res: AxiosResponse) => {
            this.auth = res.data;
            localStorage.setItem("auth", JSON.stringify(res.data));
            this.loggingIn = false;
            reslove(res);
          })
          .catch((err: AxiosError) => {
            this.loggingIn = false;
            reject(err.response);
          });
      });
    },
    logout(): Promise<AxiosResponse> {
      this.loggingOut = true;
      return new Promise((reslove, reject) => {
        user
          .logout()
          .then((res) => {
            this.auth = {};
            localStorage.removeItem("auth");
            this.loggingOut = false;
            reslove(res);
          })
          .catch((err: AxiosError) => {
            this.loggingIn = false;
            reject(err.response);
          });
      });
    },
  },
});
