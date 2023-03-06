import { AxiosResponse } from "axios";
import { ref, Ref, defineEmits, onMounted, watch } from "vue";
import { setErrors, getNode, FormKitNode } from "@formkit/core";
import { useRoute, useRouter, RouteLocationRaw } from "vue-router";
import CrudClass from "@/services/api/modules/crud/CrudClass";
import { ResponseData } from "@/services/api/modules/crud/crud";
import { $vfm } from "vue-final-modal";
import DeleteModal from "@/components/modals/DeleteModal.vue";
import { CaseConversion } from "@/hooks/helpers/string";

interface BelongsToPertemuanConfig<T> {
  onGetModelSuccess?(data: T | null, routeId: string): void;
  processData?(data: T | null): T | null;
  processErrors?(error: any | null): any;
  onSubmitSuccess?(res: AxiosResponse<ResponseData<T>>): void;
  afterDelete?(form: FormKitNode | undefined, res: ResponseData<T>): void;
  model?: T;
  crud: CrudClass<T>["actions"];
  formId: string;
  moduleName: string;
}

type callback = (...args: any[]) => any;

export class BelongsToPertemuan<T extends { pertemuan_id: string | number }> {
  private config: BelongsToPertemuanConfig<T>;

  public getForm = (): FormKitNode | undefined => {
    return getNode(this.config.formId);
  };

  public route = useRoute();

  public router = useRouter();

  public model: Ref<T> = ref({}) as Ref<T>;
  public isLoading = ref<boolean>(false);
  public isSubmitting = ref<boolean>(false);

  public getModel = () => {
    this.isLoading.value = true;
    this.config.crud.show!({ id: this.route.params.id })
      .then((res) => {
        this.model.value = res.data;
        this.config.onGetModelSuccess?.(
          res.data,
          this.route.params.id as string
        );
      })
      .finally(() => {
        this.isLoading.value = false;
      });
  };

  public reset = () => {
    this.getModel();
  };

  public init = () => {
    if (this.route.params.id) this.reset();
    return watch(
      () => this.route.params.id,
      (newValue, oldValue) => {
        if (newValue) this.reset();
      }
    );
  };

  private submitFn() {
    this.isSubmitting.value = true;
    this.getForm()?.clearErrors();
    return this.config.crud
      .update?.({
        id: this.route.params.id,
        data: this.config.processData?.(this.model.value) ?? this.model.value,
      })
      .then((res) => {
        this.getForm()?.input(res.data.data);
        this.config.onSubmitSuccess?.(res);
        return Promise.resolve(res);
      })
      .catch((err) => {
        if (err.status === 422) {
          let errors = this.config.processErrors
            ? this.config.processErrors(err.data.errors)
            : err.data.errors;

          setErrors(this.config.formId, [err.data.message], errors);
        }
        return Promise.reject(err);
      })
      .finally(() => {
        this.isSubmitting.value = false;
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
    this.submitFn()!
      .then(() => {
        if (
          typeof afterSubmitSuccess == "string" ||
          typeof afterSubmitSuccess == "object"
        ) {
          this.router.push(afterSubmitSuccess);
        } else {
          afterSubmitSuccess?.();
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

  destroy = () => {
    $vfm.show(
      { component: DeleteModal },
      {
        id: this.route.params.id,
        moduleName: new CaseConversion(this.config.moduleName)
          .toPascalCase()
          .get(),
        deleteFn: this.config.crud.destroy,
        onSuccess: (res: ResponseData<T>) => {
          this.getForm()
            ?.input(Object.assign(res.data, { hasil_labs: [] }))
            .then(() => {
              this.config.afterDelete?.(this.getForm(), res);
            });
        },
      }
    );
  };



  constructor(config: BelongsToPertemuanConfig<T>) {
    this.config = config;
    this.model.value = config.model ?? ({} as T);
  }
}
