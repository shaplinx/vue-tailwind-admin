import id from "@/locales/id.json";
import { createI18n } from "vue-i18n";

const messages = { id: id };

export default createI18n({
  legacy: false,
  locale: import.meta.env.BZ_LOCALE || "id",
  fallbackLocale: "id",
  messages,
});
