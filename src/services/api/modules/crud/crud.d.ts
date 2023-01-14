import {CRUD} from "./CrudClass"
 import{ AxiosRequestConfig, AxiosResponse}  from "axios"

export declare interface CRUDConfig {
  rootUrl: rootUrl;
  actions?: actionType[];
  primaryKey?: string;
  plugins?: Actions<T>[]

}



export declare type customUrl = string;
export declare type rootUrl = string | function (...any) : string ;
export declare type customUrlFnArgs = object | object[];
export declare type actionId = string | number |string[];


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

export declare interface Actions<T>  {
  index? : function (actionArgs) : Promise<AxiosResponse<ResponseDataIndex<Pagination<T>>>>,
  show? : function (actionArgs) : Promise<AxiosResponse<T>>,
  store? : function (actionArgs) : Promise<AxiosResponse<ResponseData<T>>>,
  destroy?: function (actionArgs) : Promise<AxiosResponse<ResponseData<any>>>,
  update?: function (actionArgs) : Promise<AxiosResponse<ResponseData<T>>>,
  [key :any]: (actionArgs : actionArgs) => Promise<AxiosResponse<any>>
}

interface HasOverviewActions<T> extends Actions<T>{
  getOverview? : (actionArgs: actionArgs) => Promise<AxiosResponse<any>>
}

declare interface ErrorResponseData {
  message?: string,
  errors?: any
}

declare export type DefineCrud<T> = (conf: CRUDConfig<T>) => CRUD<T>

declare export interface Pagination<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}
