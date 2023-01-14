import { Actions, HasOverviewActions } from "@/services/api/modules/crud/crud";
import http from "@/services/api/base";
import { AxiosResponse, AxiosError } from "axios";
import { actionArgs, ErrorResponseData } from "./crud";

interface HasOverviewConfig {
  getOverviewUrl?: string;
  baseUrl: string;
}



export class HasOverview<T> {
  private config: HasOverviewConfig = {
    baseUrl:"/"
  };

  public actions:  HasOverviewActions<T> = {};

  constructor(config: HasOverviewConfig) {
    this.config = config;

    const conf = this.config;

    Object.assign(this.actions, {
      getOverview({
        id,
        config,
        customUrl,
        customUrlFnArgs = [],
      }: actionArgs = {}): Promise<AxiosResponse> {
        return new Promise((resolve, reject) => {
          http
            .get(conf.getOverviewUrl ?? conf.baseUrl + "/overview", config)
            .then((res: AxiosResponse) => {
              resolve(res);
            })
            .catch((err: AxiosError) => {
              reject(err.response);
            });
        });
      },
    });
    return this;
  }
}
