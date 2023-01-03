import { Ref, ref } from "vue";
import {
  RouteLocationRaw,
  useRoute,
  useRouter,
} from "vue-router";
import { setErrors, getNode } from "@formkit/core";
import { CRUD } from "@/services/api/modules/crud/crud";


interface CreateCrudConfig<T> {
  crud: CRUD<T>;
  formId: string;
  formData?: any;
  processData?: callback;
  processErrors? :callback;
}

type callback = (...args: any[]) => any;

class createCrud<T> {
  #config: CreateCrudConfig<T>;
  router = useRouter();
  route = useRoute();

  constructor(config: CreateCrudConfig<T>) {
    this.#config = config;
    this.formData.value = config.formData ?? this.formData.value;

    return this;
  }
  isSaving = ref(false);

  formData = ref({}) as Ref<T>;


  processData = (values: any): any => {
    return values;
  };

  submitFn() {
    getNode(this.#config.formId)?.clearErrors();
    this.isSaving.value = true;

    return this.#config.crud.store!({
      id: +this.route.params.id,
      data: this.#config.processData? this.#config.processData(this.formData.value) : this.processData(this.formData.value),
    })
      .then((res) => {
        this.formData.value = res.data.data;
        return Promise.resolve(res);
      })
      .catch((err) => {
        if (err.status === 422) {
          let errors = this.#config.processErrors ? this.#config.processErrors(err.data.errors) : err.data.errors
          setErrors(this.#config.formId, [err.data.message], errors);
        }
        return Promise.reject(err);
      })
      .finally(() => {
        this.isSaving.value = false;
      });
  }


  submit = async (
    afterSubmitSuccess:
      | callback
      | undefined
      | string
      | RouteLocationRaw = undefined,
    afterSubmitError:
      | callback
      | undefined
      | string
      | RouteLocationRaw = undefined
  ) => {
    this.submitFn()
      .then((res) => {
        if (
          typeof afterSubmitSuccess == "string" ||
          typeof afterSubmitSuccess == "object"
        ) {
          this.router.push(afterSubmitSuccess);
        } else {
          afterSubmitSuccess?.(res);
        }
      })
      .catch((err) => {
        if (
          typeof afterSubmitError == "string" ||
          typeof afterSubmitError == "object"
        ) {
          this.router.push(afterSubmitError);
        } else {
          afterSubmitError?.();
        }
      });
  };
}

export default createCrud;
