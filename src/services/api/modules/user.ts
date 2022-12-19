import base from "../base";
import { AxiosResponse } from "axios";
import { useToast } from "vue-toastification";

const uri = "auth";

export default {
  login(data: Object) : Promise<AxiosResponse> {
    return new Promise((resolve, reject) => {
        base
          .post(uri+ "/login", data)
          .then((res: AxiosResponse) => {
            resolve(res);
          })
          .catch((res: AxiosResponse) => {
            reject(res);
          });
      });
  },
  logout() : Promise<AxiosResponse> {
    return new Promise((resolve, reject) => {
        base
          .post(uri+ "/logout")
          .then((res: AxiosResponse) => {
            resolve(res);
          })
          .catch((res: AxiosResponse) => {
            reject(res);
          });
      });
  },
  index(params: Object) {
    return new Promise((resolve, reject) => {
      base
        .get(uri, { params: params })
        .then((res: AxiosResponse) => {
          resolve(res);
        })
        .catch((res: AxiosResponse) => {
          reject(res);
        });
    });
  },
  show(params: Object) {
    return new Promise((resolve, reject) => {
      base
        .get(uri, { params: params })
        .then((res: AxiosResponse) => {
          resolve(res);
        })
        .catch((res: AxiosResponse) => {
          reject(res);
        });
    });
  },
  store(data: Object) {
    return new Promise((resolve, reject) => {
      base
        .post(uri + "/store", data)
        .then((res: AxiosResponse) => {
          resolve(res);
        })
        .catch((res: AxiosResponse) => {
          reject(res);
        });
    });
  },
  update(data: Object) {
    return new Promise((resolve, reject) => {
      base
        .patch(uri + "/update", data)
        .then((res: AxiosResponse) => {
          resolve(res);
        })
        .catch((res: AxiosResponse) => {
          reject(res);
        });
    });
  },
  destroy(params: Object) {
    return new Promise((resolve, reject) => {
      base
        .delete(uri + "/destroy", { params: params })
        .then((res: AxiosResponse) => {
          resolve(res);
        })
        .catch((res: AxiosResponse) => {
          reject(res);
        });
    });
  },
};
