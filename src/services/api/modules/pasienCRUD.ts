import CRUD from "./crud/CrudClass";
import { HasOverview } from "./crud/CrudHasOverview";

const baseUrl = "pasien";

const hasOverview = new HasOverview<App.Models.Pasien>({
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
const { actions } = new CRUD<App.Models.Pasien>(config);

export default actions;
