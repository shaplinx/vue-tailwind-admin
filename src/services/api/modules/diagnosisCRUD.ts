import defineCrud from "./crud/crudBase";

const baseUrl = "administrasi/diagnosis";
export default defineCrud({
  rootUrl: (id, type) => {
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
});
