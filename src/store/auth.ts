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
            let theme = this.auth.user.user_preference?.theme;
            let menu_mode = this.auth.user.user_preference?.menu_mode === "compact" ? "true" : "false"
            localStorage.setItem("auth", JSON.stringify(res.data));
            localStorage.setItem('menuCompact',menu_mode)
            if (theme) {
            document.documentElement.setAttribute("data-theme", theme);
            localStorage.setItem('theme',theme.toString())
            }


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
