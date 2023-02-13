import { Ref, ref, reactive } from "vue";
import { RouteLocationRaw, useRoute, useRouter } from "vue-router";
import printJS from "print-js";
import { AxiosResponse } from "axios";
import { Actions } from "@/services/api/modules/crud/crud";
import { $vfm } from "vue-final-modal";
import DeleteModal from "@/components/modals/DeleteModal.vue";
import { CaseConversion } from "../helpers/string";

interface ReadCrudConfig<T> {
  crud: Actions<T>;
  printId?: string;
  moduleName: string;
  editRoute?: string | RouteLocationRaw;
  onLoadSuccess?: (Res: AxiosResponse<T>, Read: ReadCrud<T>) => void;
}

class ReadCrud<T> {
  #config: ReadCrudConfig<T>;
  router = useRouter();
  route = useRoute();

  constructor(config: ReadCrudConfig<T>) {
    this.#config = config;

    return this;
  }
  isLoadingModel = ref(true);

  model = ref({}) as Ref<T>;

  config = reactive({
    anonSignature: true,
    location: null,
  });

  loadModel = () => {
    this.#config.crud.show!({ id: +this.route.params.id })
      .then((res: AxiosResponse<T>) => {
        this.model.value = res.data;
        this.#config.onLoadSuccess?.(res, this);
      })
      .finally(() => {
        this.isLoadingModel.value = false;
      });
  };

  edit = (editRoute: string | RouteLocationRaw | undefined = undefined) => {
    if (editRoute) {
      this.router.push(editRoute);
    }
    if (this.#config.editRoute) {
      this.router.push(this.#config.editRoute);
    }
  };

  back = (backRoute: string | RouteLocationRaw | undefined = undefined) => {
    backRoute ? this.router.push(backRoute) : this.router.back();
  };

  print = () => {
    printJS({
      printable: this.#config.printId || "print-area",
      type: "html",
      targetStyle: [
        "text-align",
        "margin-bottom",
        "flex",
        "justify",
        "flex-direction",
        "display",
        "font-weight",
        "border-bottom-width",
        "border-color",
        "position",
        "border-collapse",
        "border-bottom",
        "clear",
        "display",
        
      ],
      style: "display:none;",
      targetStyles: ["border", "box", "break", "text-decoration"],
    });
  };

  destroy = () => {
    $vfm.show(
      { component: DeleteModal },
      {
        id: this.route.params.id,
        moduleName: new CaseConversion(this.#config.moduleName)
          .toPascalCase()
          .get(),
        deleteFn: this.#config.crud.destroy,
        onSuccess: () =>
          this.router.push({
            name: this.#config.moduleName + "Index",
          }),
      }
    );
  };
}

export default ReadCrud;
