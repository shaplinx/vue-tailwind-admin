
import CRUD from "./crud/CrudClass";

const baseUrl = "administrasi/gaji";

const config = {
  rootUrl: (id: any, type: any) => {
    if (type === "SHOW") {
      return `${baseUrl}/${id}`;
    }
    if (type === "UPDATE") {
      return `${baseUrl}/${id}`;
    }
    if (type === "DESTROY") {
      return `${baseUrl}/${id}`;
    }
    return baseUrl;
  },
};
const { actions } = new CRUD<App.Models.Administrasi.Gaji>(config);

export default actions;
