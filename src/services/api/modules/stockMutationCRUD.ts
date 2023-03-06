
import CRUD from "./crud/CrudClass";

const baseUrl = "stock";

const config = {
  rootUrl: (id: any, type: any) => {
    return baseUrl;
  },
  actions: ['INDEX']
};
const { actions } = new CRUD<App.Models.StockMutation>(config);

export default actions;
