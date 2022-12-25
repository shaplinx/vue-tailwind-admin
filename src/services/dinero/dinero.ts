import Dinero from "dinero.js";

export function money(
  arg1: number | string | Dinero.Options | undefined = undefined,
  arg2: Dinero.Options | undefined = undefined
): Dinero.Dinero {
  Dinero.globalLocale = "id-ID";
  let options : Dinero.Options = { amount: 0, currency: 'IDR', precision: 0 };
  if (typeof arg1 === "object") {
    options = { ...options, ...arg1 };
  } else if (typeof arg1 === "number" || typeof arg1 === "string") {
    options.amount = +arg1;
  }
  if (arg2 && typeof arg2 === "object") {
    options = { ...options, ...arg2 };
  }

  return Dinero(options);
}

export function currency() {
   return money().toFormat().replace(/\d/g, '').trim().replaceAll(',','')
}