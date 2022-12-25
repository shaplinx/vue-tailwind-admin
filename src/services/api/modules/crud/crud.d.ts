 import{ AxiosRequestConfig, AxiosResponse}  from "axios"

export declare interface CRUDConfig {
  rootUrl: rootUrl;
  actions?: type[];

}

export declare type customUrl = string;
export declare type rootUrl = string | function (...any) : string ;
export declare type customUrlFnArgs = object | object[];
export declare type actionId = string | number;
export declare type actionType =
  | "INDEX"
  | "SHOW"
  | "STORE"
  | "UPDATE"
  | "DESTROY";

export declare interface urlGetterArgs {
  customUrl?: customUrl;
  customUrlFnArgs?: customUrlFnArgs;
  id?: actionId;
  type:actionType;
}

export declare interface actionArgs {
  config?: AxiosRequestConfig;
  customUrl?: customUrl;
  data?: any;
  id?: actionId;
  customUrlFnArgs?: customUrlFnArgs;
}

export declare interface ResponseData<T>{
  message:string,
  data: T,
  errors?: any
}


export declare interface ResponseDataIndex<T>{
  data: T[],
  current_page: number,
  from: number,
  last_page: number,
  per_age: number,
  to:number,
  total:number
}


export declare interface CRUD<T>  {
  index? : function (actionArgs) : Promise<AxiosResponse<ResponseDataIndex<T>>>,
  show? : function (actionArgs) : Promise<AxiosResponse<ResponseData<T>>>,
  store? : function (actionArgs) : Promise<AxiosResponse<ResponseData<T>>>,
  destroy?: function (actionArgs) : Promise<AxiosResponse<ResponseData<T>>>,
  update?: function (actionArgs) : Promise<AxiosResponse<ResponseData<T>>>
}

declare interface ErrorResponseData {
  message: string,
  errors: any
}
