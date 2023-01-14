import CRUD from "./crud/CrudClass";
import { HasOverview } from "./crud/CrudHasOverview";

const baseUrl = "administrasi/rekening";

const hasOverview = new HasOverview<App.Models.Administrasi.BallanceMutation>({
  baseUrl,
}).actions;

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
  plugins: [hasOverview],
};
const { actions } = new CRUD<App.Models.Administrasi.BallanceMutation>(config);

export default actions;
