import { Ref, ref } from "vue";
import { RouteLocationRaw, useRoute, useRouter } from "vue-router";
import { setErrors, getNode } from "@formkit/core";
import { AxiosResponse } from "axios";
import { Actions } from "@/services/api/modules/crud/crud";
import { $vfm } from "vue-final-modal";
import DeleteModal from "@/components/modals/DeleteModal.vue";
import { CaseConversion } from "../helpers/string";

interface EditCrudConfig<T> {
  crud: Actions<T>;
  formId: string;
  moduleName: string;
  formData?: any;
  processData?: callback;
  processErrors?: callback;
}

type callback = (...args: any[]) => any;

class editCrud<T> {
  #config: EditCrudConfig<T>;
  router = useRouter();
  route = useRoute();

  constructor(config: EditCrudConfig<T>) {
    this.#config = config;
    this.formData.value = config.formData ?? this.formData.value;

    return this;
  }
  isSaving = ref(false);
  isLoadingFormData = ref(false);

  formData = ref({}) as Ref<T>;

  loadFormData = (id:any | undefined = undefined) => {
    this.isLoadingFormData.value = true
    this.#config.crud.show!({ id: id ?? +this.route.params.id })
      .then((res: AxiosResponse<any>) => {
        this.formData.value = res.data;
      })
      .finally(() => {
        this.isLoadingFormData.value = false;
      });
  };

  processData = (values: any): any => {
    return values;
  };

  submitFn(id : any| undefined =undefined) {
    getNode(this.#config.formId)?.clearErrors();
    this.isSaving.value = true;

    return this.#config.crud.update!({
      id: id ?? +this.route.params.id,
      data: this.#config.processData
        ? this.#config.processData(this.formData.value)
        : this.processData(this.formData.value),
    })
      .then((res) => {
        this.formData.value = res.data.data;
        return Promise.resolve(res);
      })
      .catch((err) => {
        if (err.status === 422) {
          let errors = this.#config.processErrors
            ? this.#config.processErrors(err.data.errors)
            : err.data.errors;
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
      | RouteLocationRaw = undefined,
      id:any |undefined = undefined
  ) => {
    this.submitFn(id)
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
          afterSubmitError?.(err);
        }
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

export default editCrud;
