
import createCrudModule, { client } from "@/base/vuex-crud";
const rootUrl = 'api/pertemuan'
const moduleName = "lab"

export default createCrudModule({
  resource: moduleName,
  paginatedList: true,
  idAttribute: 'pertemuan_id',
  parseSingle: res => res,
  customUrlFn(id, type) {

    if (type === 'FETCH_LIST') {
      return `api/fasilitas/lab/permintaan`;
    }
    if (type === 'FETCH_SINGLE') {
      return `${rootUrl}/${id}/${moduleName}`;
    }
    if (type === 'UPDATE') {
      return `${rootUrl}/${id}/${moduleName}`;
    }

    if (type === 'DESTROY') {
      return `${rootUrl}/${id}/${moduleName}`;
    }
    return rootUrl
  },

});
