import base from "../../base";
import { AxiosResponse, AxiosError } from "axios";
import { CRUDConfig, urlGetterArgs, actionArgs, ErrorResponseData } from "./crud";

const DefineCrud = ({
  actions = ["INDEX", "SHOW", "STORE", "UPDATE", "DESTROY"],
  rootUrl,
}: CRUDConfig) => {
  const isUsingCustomUrlGetter = typeof rootUrl === "function";

  const crudActions = {};

  const urlGetter = ({
    customUrl,
    customUrlFnArgs,
    id,
    type,
  }: urlGetterArgs) => {
    if (typeof customUrl === "string") {
      return customUrl;
    } else if (isUsingCustomUrlGetter) {
      const argsArray = Array.isArray(customUrlFnArgs)
        ? customUrlFnArgs
        : [customUrlFnArgs];
      const args = [id || null, type || null].concat(argsArray);
      return rootUrl(...args);
    }

    return id ? `${rootUrl}/${id}` : rootUrl;
  };

  if (actions.includes("INDEX")) {
    Object.assign(crudActions, {
      index({
        config,
        customUrl,
        customUrlFnArgs = [],
      }: actionArgs = {}): Promise<AxiosResponse> {
        return new Promise((resolve, reject) => {
          base
            .get(
              urlGetter({ customUrl, customUrlFnArgs, type:"INDEX" }),
              config
            )
            .then((res: AxiosResponse) => {
              resolve(res);
            })
            .catch((err: AxiosError) => {
              reject(err.response);
            });
        });
      },
    });
  }

  if (actions.includes("SHOW")) {
    Object.assign(crudActions, {
      show({
        id,
        config,
        customUrl,
        customUrlFnArgs = [],
      }: actionArgs = {}): Promise<AxiosResponse> {
        return new Promise((resolve, reject) => {
          base
            .get(
              urlGetter({
                customUrl,
                customUrlFnArgs,
                type:"SHOW",
                id,
              }),
              config
            )
            .then((res: AxiosResponse) => {
              resolve(res);
            })
            .catch((err: AxiosError) => {
              reject(err.response);
            });
        });
      },
    });
  }

  if (actions.includes("STORE")) {
    Object.assign(crudActions, {
      store({
        data,
        config,
        customUrl,
        customUrlFnArgs = [],
      }: actionArgs = {}): Promise<AxiosResponse> {
        return new Promise((resolve, reject) => {
          base
            .post(
              urlGetter({ customUrl, customUrlFnArgs, type:"STORE" }),
              data,
              config
            )
            .then((res: AxiosResponse) => {
              resolve(res);
            })
            .catch((err: AxiosError) => {
              reject(err.response);
            });
        });
      },
    });
  }

  if (actions.includes("UPDATE")) {
    Object.assign(crudActions, {
      update({
        id,
        data,
        config,
        customUrl,
        customUrlFnArgs = [],
      }: actionArgs = {}): Promise<AxiosResponse> {
        return new Promise((resolve, reject) => {
          base
            .patch(
              urlGetter({ customUrl, customUrlFnArgs, type:"UPDATE", id }),
              data,
              config
            )
            .then((res: AxiosResponse) => {
              resolve(res);
            })
            .catch((err: AxiosError) => {
              reject(err.response);
            });
        });
      },
    });
  }

  if (actions.includes("UPDATE")) {
    Object.assign(crudActions, {
      destroy({
        id,
        config,
        customUrl,
        customUrlFnArgs = [],
      }: actionArgs = {}): Promise<AxiosResponse> {
        return new Promise((resolve, reject) => {
          base
            .delete(
              urlGetter({ customUrl, customUrlFnArgs, type:"DESTROY", id }),
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

  return crudActions;
};

export default DefineCrud;
