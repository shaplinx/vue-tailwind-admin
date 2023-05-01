import { useToast } from "vue-toastification";
import { useAuthStore } from "@/store/auth";
import router from "@/router";
import axios, { AxiosError, AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL || "http://emr.karen.pc/backend/api",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((request) => {
  const auth = useAuthStore();
  request.headers!.Authorization = `Bearer ${auth.token}`;
  return request;
});

interface ResponseData {
  message?: String;
}
interface ResponseErrorData extends ResponseData {}
interface ResponseSuccessData extends ResponseData {
  data?: Object;
}

interface ErrorBehaviors {
  code: Number;
  callback: Function;
}

const toast = useToast();
const ErrorBehaviors: ErrorBehaviors[] = [
  {
    code: 401,
    callback: () => {
      localStorage.removeItem("auth");
      router.push("/user/login");
    },
  },
  {
    code: 404,
    callback: () => {
      router.push({name: "NotFound"});
    },
  },
];

instance.interceptors.response.use(
  function (response: AxiosResponse<ResponseSuccessData>) {
    if (response.data.message) {
      toast.success(response.data.message);
    }

    return response;
  },
  async function (error: AxiosError<ResponseErrorData>) {
    if (error.response?.data.message) {
      toast.error(error.response.data.message);
    } else if (error.response?.statusText) {
      toast.error(error.response?.statusText);
    }

    await ErrorBehaviors.filter(
      (e) => e.code == error.response?.status
    )[0]?.callback();
    return Promise.reject(error);
  }
);

export default instance;
