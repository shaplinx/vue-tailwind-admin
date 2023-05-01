import { ref, Ref, watch, computed } from "vue";
import { ServerOptions, Header, } from "vue3-easy-data-table";
import { FormKitSchemaNode } from "@formkit/core";
import { Actions, Pagination } from "@/services/api/modules/crud/crud";
import { useRouter } from "vue-router";
import { $vfm } from "vue-final-modal";
import DeleteModal from "@/components/modals/DeleteModal.vue";
import { CaseConversion } from "../helpers/string";
import { ButtonProp } from "@/components/buttons/buttons";

interface RequestParams {
  [key: string]: any;
}

interface action {
  label: string;
  icon: string;
  callback?: callback;
}

interface IndexCrudConfig<T> {
  crud: Actions<T>;
  moduleName: string;
  headers?: Header[];
  primaryKey?: string;
  filterSchema?: FormKitSchemaNode[];
  serverOptions?: RequestParams;
  filterParams?:RequestParams;
  generateRequestParams?: (arg: RequestParams) => () => object;
  actions?: action[];
  buttons?: (index: IndexCRUD<T>) => ButtonProp[];
  plugins?: { [name: string]: any };
}

type callback = (...args: any[]) => any;

type Clearable = "headers" | "filterSchema" | "actions" | "buttons";

class IndexCRUD<T> {
  #config: IndexCrudConfig<T>;
  #default = {
    headers: [{ text: "ID", value: "id", sortable: true }],
    filterSchema: [],
    primaryKey: "id",
    serverOptions: {
      page: 1,
      rowsPerPage: 10,
      sortBy: "id",
      sortType: "desc",
    },
    filters: {
      search: "",
    },
    plugins: [],
    actions: [
      {
        icon: "pencil",
        label: "Edit",
        callback: (id: any) => {
          let routeName = new CaseConversion(this.#config.moduleName)
            .toPascalCase()
            .get();
          this.router.push({ name: `${routeName}Edit`, params: { id: id } });
        },
      },
      {
        icon: "trash",
        label: "Delete",
        callback: (id: any, row: any) => {
          $vfm.show(
            { component: DeleteModal },
            {
              id: row && this.#config.primaryKey ? row[this.#config.primaryKey] : id,
              moduleName: new CaseConversion(this.#config.moduleName)
                .toCamelCase()
                .get(),
              deleteFn: this.#config.crud.destroy,
              onSuccess: () => this.loadFromServer(),
            }
          );
        },
      },
    ],
    buttons: [],
  };
  router = useRouter();

  headers = ref<Header[]>(this.#default.headers);

  filterSchema = ref<FormKitSchemaNode[]>(this.#default.filterSchema);
  items = ref([]) as Ref<Pagination<T>[]>;
  loading = ref<boolean>(false);
  serverItemsLength = ref<number>(0);

  serverOptions = ref<ServerOptions>(
    this.#default.serverOptions as ServerOptions
  );

  filterParams = ref<RequestParams>(
    this.#default.filters as RequestParams
  );

  actions = ref<action[]>(this.#default.actions);

  buttons = ref<ButtonProp[]>(this.#default.buttons);

  generateRequestParams = (): object => {
    return Object.assign({},{
      page: this.serverOptions.value.page,
      per_page: this.serverOptions.value.rowsPerPage,
      sort: this.serverOptions.value.sortBy
        ? `${this.serverOptions.value.sortBy}|${this.serverOptions.value.sortType}`
        : undefined,
    }, this.filterParams.value);
  };

  requestParamsExtension = (args: any): object => {
    return {};
  };

  loadFromServer = async (
    params: object = {
      ...this.generateRequestParams(),
      ...this.requestParamsExtension(this),
    }
  ) => {
    this.loading.value = true;
    this.#config.crud.index!({
      config: { params },
    })
      .then(({ data }) => {
        this.items.value = data.data;
        this.serverItemsLength.value = data.total!;
        this.loading.value = false;
      })
      .catch(() => {
        this.loading.value = false;
      });
  };

  public plugins: { [name: string]: any } = {};
  register(name: string, plugin: any) {
    this.plugins[name] = plugin;
  }

  unregister(name: string) {
    delete this.plugins[name];
  }



  constructor(config: IndexCrudConfig<T>) {
    this.#config = config;
    this.reset();

    this.loadFromServer();

    const params = computed(()=> {
      return Object.assign({},this.filterParams.value,this,this.serverOptions.value)
    })

    const value1 = ref(0);
    const value2 = ref(0);

    watch([
      this.serverOptions,
      this.filterParams
    ],()=> {
      this.loadFromServer()
    }, {deep:true})
  
    return this;
  }

  addHeader(headers: Header[]) {
    this.headers.value.push(...headers);
    return this;
  }

  addFilterSchema(schema: FormKitSchemaNode[]) {
    this.filterSchema.value.push(...schema);
    return this;
  }


  addFilterParams(options: object) {
    this.filterParams.value = Object.assign({},this.filterParams.value, options);
    return this;
  }

  addButtons(buttons: ButtonProp[]) {
    this.buttons.value.push(...buttons);
    return this;
  }

  addActions(actions: action[]) {
    this.actions.value.push(...actions);
    return this;
  }

  extRequestParams(callback: (arg: IndexCRUD<T>) => object) {
    this.requestParamsExtension = callback;
    return this;
  }

  clear(clearable: Clearable[], index: number | undefined = undefined) {
    if (clearable.length === 0)
      clearable = ["headers", "filterSchema", "actions", "buttons"];
    clearable.forEach((val) => {
      if (index !== undefined) {
        this[val].value.splice(index, 1);
      } else {
        this[val].value = [];
      }
    });
    return this;
  }
  reset() {
    this.generateRequestParams = this.#config.generateRequestParams
      ? this.#config.generateRequestParams(this)
      : this.generateRequestParams;

    this.headers.value = this.#config.headers ?? this.#default.headers;
    this.actions.value = this.#config.actions ?? this.#default.actions;
    this.buttons.value = this.#config.buttons?.(this) ?? this.#default.buttons;
    this.filterSchema.value =
      this.#config.filterSchema ?? this.#default.filterSchema;

    if (this.#config.plugins) {
      Object.keys(this.#config.plugins).forEach((name) => {
        this.register(name, this.#config.plugins?.[name]);
      });
    }
  }

}

export default IndexCRUD;
