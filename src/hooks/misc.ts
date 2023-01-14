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

export function renameErrors(from: string, to: string, err: any) {
  let originalKeys = Object.keys(err);
  let mappedKeys = originalKeys.map((key) => {
    return findAndReplace(key, from, to);
  });

  let output = {};

  originalKeys.forEach((key, index) => {
    output = { ...output, [mappedKeys[index]]: err[key] };
  });

  return output;
}

function findAndReplace(str: string, find: string, replace: string): string {
  return str.replace(new RegExp(find, "g"), replace);
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

export function flatMap<T, U>(array: T[], callback: (item: T) => U[]): U[] {
  return array.reduce((acc, item) => acc.concat(callback(item)), [] as U[]);
}

export function keyBy<T, K extends keyof T>(array: T[], callback: (item: T) => K): { [key: string]: T } {
  return array.reduce((acc, item) => {
    const key = callback(item);
    acc[key as string] = item;
    return acc;
  }, {} as { [key: string]: T });
}

export function map<T, U>(array: T[], callback: (item: T) => U): Array<U> {
  return array.reduce(
    (acc, item) => acc.concat(callback(item)),
    [] as Array<U>
  );
}

export function isEmpty<T>(value: T | any[] | object): boolean {
  if (Array.isArray(value) || typeof value === "string") {
    return !value.length;
  } else if (typeof value === "object") {
    return !Object.keys(value as object).length;
  }
  return false;
}

export function values<T>(object: { [key: string]: T }): T[] {
  return Object.keys(object).map((key) => object[key]);
}

export function pick<T, K extends keyof T>(object: T, keys: K[]): Pick<T, K> {
  const result: any = {};
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      result[key] = object[key];
    }
  }
  return result as Pick<T, K>;
}

export function keys<T extends object>(object: T): (keyof T)[] {
  return Object.keys(object) as (keyof T)[];
}


export function merge(target: any, ...sources: any[]): any {
  for (const source of sources) {
    if (source == null) continue;
    for (const key of Object.keys(source)) {
      if (typeof target[key] === 'object' && typeof source[key] === 'object') {
        merge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }

  return target;
}
