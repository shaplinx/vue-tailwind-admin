
import CRUD from "./crud/CrudClass";

const baseUrl = "pertemuan";
const extUrl = "pemeriksaan"

const config = {
  rootUrl: (id: any, type: any) => {
    if (type === "SHOW") {
      return `${baseUrl}/${id}/${extUrl}`;
    }
    if (type === "UPDATE") {
      return `${baseUrl}/${id}/${extUrl}`;
    }
    if (type === "DESTROY") {
      return `${baseUrl}/${id}/${extUrl}`;
    }
    return baseUrl;
  },
};
const { actions } = new CRUD<App.Models.Pertemuan.Pemeriksaan>(config);

export default actions;
