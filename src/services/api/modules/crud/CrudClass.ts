import {
  Actions,
  CRUDConfig,
  Pagination,
} from "@/services/api/modules/crud/crud";
import base from "../../base";
import { AxiosResponse, AxiosError } from "axios";
import { urlGetterArgs, actionArgs, ErrorResponseData } from "./crud";

class CRUD<T> {
  private config: CRUDConfig = {
    actions: ["INDEX", "SHOW", "STORE", "UPDATE", "DESTROY"],
    rootUrl: "",
    primaryKey: "id",
    plugins: [],
  };

  public actions: Actions<T> = {};

  private urlGetter = ({
    customUrl,
    customUrlFnArgs,
    id,
    type,
  }: urlGetterArgs) => {
    if (typeof customUrl === "string") {
      return customUrl;
    } else if (typeof this.config.rootUrl === "function") {
      const argsArray = Array.isArray(customUrlFnArgs)
        ? customUrlFnArgs
        : [customUrlFnArgs];
      const args = [id || null, type || null].concat(argsArray);
      return this.config.rootUrl?.(...args);
    }

    return id ? `${this.config.rootUrl}/${id}` : this.config.rootUrl;
  };

  constructor(config: CRUDConfig) {
    this.config = { ...this.config, ...config };

    const urlGetter = this.urlGetter;

    if (this.config.actions?.includes("INDEX")) {
      Object.assign(this.actions, {
        index({
          config,
          customUrl,
          customUrlFnArgs = [],
        }: actionArgs = {}): Promise<
          AxiosResponse<Pagination<T[]>> | AxiosError<ErrorResponseData>
        > {
          return new Promise((resolve, reject) => {
            base
              .get(
                urlGetter({ customUrl, customUrlFnArgs, type: "INDEX" }),
                config
              )
              .then((res: AxiosResponse<Pagination<T[]>>) => {
                resolve(res);
              })
              .catch((err: AxiosError<ErrorResponseData>) => {
                reject(err.response);
              });
          });
        },
      });
    }

    if (this.config.actions?.includes("SHOW")) {
      Object.assign(this.actions, {
        show({
          id,
          config,
          customUrl,
          customUrlFnArgs = [],
        }: actionArgs = {}): Promise<
          AxiosResponse<T> | AxiosError<ErrorResponseData>
        > {
          return new Promise((resolve, reject) => {
            base
              .get(
                urlGetter({
                  customUrl,
                  customUrlFnArgs,
                  type: "SHOW",
                  id,
                }),
                config
              )
              .then((res: AxiosResponse<T>) => {
                resolve(res);
              })
              .catch((err: AxiosError<ErrorResponseData>) => {
                reject(err.response);
              });
          });
        },
      });
    }

    if (this.config.actions?.includes("STORE")) {
      Object.assign(this.actions, {
        store({
          data,
          config,
          customUrl,
          customUrlFnArgs = [],
        }: actionArgs = {}): Promise<
          AxiosResponse<T> | AxiosError<ErrorResponseData>
        > {
          return new Promise((resolve, reject) => {
            base
              .post(
                urlGetter({ customUrl, customUrlFnArgs, type: "STORE" }),
                data,
                config
              )
              .then((res: AxiosResponse<T>) => {
                resolve(res);
              })
              .catch((err: AxiosError<ErrorResponseData>) => {
                reject(err.response);
              });
          });
        },
      });
    }

    if (this.config.actions?.includes("UPDATE")) {
      Object.assign(this.actions, {
        update({
          id,
          data,
          config,
          customUrl,
          customUrlFnArgs = [],
        }: actionArgs = {}): Promise<
          AxiosResponse<T> | AxiosError<ErrorResponseData>
        > {
          return new Promise((resolve, reject) => {
            base
              .patch(
                urlGetter({ customUrl, customUrlFnArgs, type: "UPDATE", id }),
                data,
                config
              )
              .then((res: AxiosResponse<T>) => {
                resolve(res);
              })
              .catch((err: AxiosError<ErrorResponseData>) => {
                reject(err.response);
              });
          });
        },
      });
    }

    if (this.config.actions?.includes("DESTROY")) {
      Object.assign(this.actions, {
        destroy({
          id,
          config,
          customUrl,
          customUrlFnArgs = [],
        }: actionArgs = {}): Promise<
          AxiosResponse | AxiosError<ErrorResponseData>
        > {
          return new Promise((resolve, reject) => {
            base
              .delete(
                urlGetter({ customUrl, customUrlFnArgs, type: "DESTROY", id }),
                config
              )
              .then((res: AxiosResponse) => {
                resolve(res);
              })
              .catch((err: AxiosError<ErrorResponseData>) => {
                reject(err.response);
              });
          });
        },
      });
    }

    if (this.config.plugins?.length) {
      this.config.plugins.forEach((plugin) => {
        Object.assign(this.actions, plugin);
      });
    }
  }
}

export default CRUD;
