export function mergeErrorsWithPrefix(prefix: string, errors: any) {
  let matched = Object.keys(errors).filter((key) =>
    key.match(new RegExp(`${prefix}*`, "g"))
  );
  let output: string[] = [];
  matched.forEach((element) => {
    errors[element]?.forEach((msg: string) => {
      output.push(msg);
    });
  });
  return output;
}
export function camelCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}

export function decimalToPrecent(decimal: number) {
  let formatter = new Intl.NumberFormat("id-ID", {
    style: "percent",
    minimumFractionDigits: 2,
  });
  return formatter.format(decimal);
}
