
import CRUD from "./crud/CrudClass";

const baseUrl = "pertemuan";
const extUrl = "sehat"

const config = {
  actions: ["INDEX", "SHOW", "UPDATE", "DESTROY"],
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
    if (type === "INDEX") {
      return `administrasi/surat-sehat`;
    }
    return baseUrl;
  },
};
const { actions } = new CRUD<App.Models.Pertemuan.SuratSehat>(config);

export default actions;
