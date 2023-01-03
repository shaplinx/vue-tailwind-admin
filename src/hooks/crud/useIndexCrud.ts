import { ref, Ref } from "vue";
import { ServerOptions, Header } from "vue3-easy-data-table";
import { FormKitSchemaNode } from "@formkit/core";
import { CRUD } from "@/services/api/modules/crud/crud";
import { useRouter } from "vue-router";
import { $vfm } from "vue-final-modal";
import DeleteModal from "@/components/modals/DeleteModal.vue";
import { CaseConversion } from "../helpers/string";
import { ButtonProp } from "@/components/buttons/buttons";

interface RequestParams extends ServerOptions {
  [key: string]: any;
}

interface action {
  label: string;
  icon: string;
  callback?: callback;
}

interface IndexCrudConfig<T> {
  crud: CRUD<T>;
  moduleName: string;
  headers?: Header[];
  filterSchema?: FormKitSchemaNode[];
  serverOptions?: RequestParams;
  generateRequestParams?: (arg: RequestParams) => () => object;
  actions?: action[];
  buttons?: (index: IndexCRUD<T>) => ButtonProp[];
}

type callback = (...args: any[]) => any;

type Clearable = "headers" | "filterSchema" | "actions" | "buttons";

class IndexCRUD<T> {
  #config: IndexCrudConfig<T>;
  #default = {
    headers: [{ text: "ID", value: "id", sortable: true }],
    filterSchema: [],
    serverOptions: {
      page: 1,
      rowsPerPage: 10,
      sortBy: "id",
      sortType: "desc",
      search: "",
    },
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
        callback: (id: any) => {
          $vfm.show(
            { component: DeleteModal },
            {
              id,
              moduleName: new CaseConversion(this.#config.moduleName).toCamelCase().get(),
              deleteFn: this.#config.crud.destroy,
              onSuccess: this.loadFromServer,
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
  items = ref([]) as Ref<T[]>;
  loading = ref<boolean>(false);
  serverItemsLength = ref<number>(0);

  serverOptions = ref<RequestParams>(this.#default.serverOptions);

  actions = ref<action[]>(this.#default.actions);

  buttons = ref<ButtonProp[]>(this.#default.buttons);

  generateRequestParams = (): object => {
    return {
      page: this.serverOptions.value.page,
      per_page: this.serverOptions.value.rowsPerPage,
      search: this.serverOptions.value.search,
      sort: this.serverOptions.value.sortBy
        ? `${this.serverOptions.value.sortBy}|${this.serverOptions.value.sortType}`
        : undefined,
      date_start: this.serverOptions.value.date_start,
      date_end: this.serverOptions.value.date_end,
    };
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

  constructor(config: IndexCrudConfig<T>) {
    this.#config = config;
    this.reset();
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

  addServerOptions(options: object) {
    this.serverOptions.value = { ...this.serverOptions.value, ...options };
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

  extRequestParams(callback: (arg: CRUD<T>) => object) {
    this.requestParamsExtension = callback;
    return this;
  }

  clear(...args: Clearable[]) {
    if (args.length === 0)
      args = ["headers", "filterSchema", "actions", "buttons"];
    args.forEach((val) => {
      this[val].value = [];
    });
    return this;
  }
  reset() {
    this.generateRequestParams = this.#config.generateRequestParams
      ? this.#config.generateRequestParams(this.serverOptions.value)
      : this.generateRequestParams;

    this.headers.value = this.#config.headers ?? this.#default.headers;
    this.actions.value = this.#config.actions ?? this.#default.actions;
    this.buttons.value = this.#config.buttons?.(this) ?? this.#default.buttons;
    this.filterSchema.value =
      this.#config.filterSchema ?? this.#default.filterSchema;
  }
}

export default IndexCRUD;
