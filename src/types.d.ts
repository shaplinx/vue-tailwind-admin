declare namespace Base {
  export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    profesi_id: number;
    created_at: string | null;
    updated_at: string | null;
    profesi?: App.Models.Administrasi.Profesi | null;
    readonly fullname?: any;
    readonly full_name?: any;
    readonly all_permissions?: any;
    readonly is_admin?: any;
}
  namespace Component {
    namespace Menu {
      export type MenuItem = {
        id:string|number,
        to?: import("vue-router").RouteRecord | string,
        label: string,
        icon:import("@fortawesome/free-brands-svg-icons").IconDefinition,
        child?: MenuItem[],
        active?:boolean,
        childActive?:boolean
      }
    }
  }
}