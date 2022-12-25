
import createCrudModule, { client } from "@/base/vuex-crud";
const rootUrl = 'api/pertemuan'

export default createCrudModule({
  resource: 'pertemuan',
  paginatedList: true,
  idAttribute: 'pertemuan_id',
  parseSingle: res => res,
  customUrlFn(id, type) {


    if (type === 'FETCH_SINGLE') {
      return `${rootUrl}/${id}/pemeriksaan`;
    }
    if (type === 'UPDATE') {
      return `${rootUrl}/${id}/pemeriksaan`;
    }

    if (type === 'SAVE') {
      return `${rootUrl}/${id}/pemeriksaan`;
    }
    if (type === 'DESTROY') {
      return `${rootUrl}/${id}/pemeriksaan`;
    }
    return rootUrl
  },

});
