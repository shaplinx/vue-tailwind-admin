// Create some re-useable definitions because
// many input types are identical in how
// we want to style them.
const textClassification = {
  inner: `
      border
      border-base-300
      rounded-lg mb-1 
      input
      flex
      bg-base-200 
      flex-row items-center
      focus-within:ring-primary focus-within:ring-2 formkit-invalid:input-error formkit-invalid:focus-within:ring-error  formkit-errors:input-error formkit-errors:focus-within:ring-error
    `,
  suffixIcon: "h-5 w-5 block ml-3",
  input: "h-full autofill:bg-base-200 autofill:hover:bg-base-200 autofill:focus:bg-base-200 bg-base-200 focus:ring-0 focus:border-0 focus:outline-none font-normal placeholder:font-light w-full ",
};
const boxClassification = {
  fieldset:
    " border border-base-300 rounded-lg px-2 pb-1 formkit-invalid:border-error formkit-errors:border-error ",
  legend: "font-bold text-sm",
  wrapper: "flex items-center mb-1 cursor-pointer",
  help: "mb-2",
  input:
    "form-check-input appearance-none h-5 w-5 mr-2 border border-base-300 rounded-sm bg-white checked:bg-primary focus:outline-none focus:ring-1 transition duration-200",
  label: "label-text mb-1 mx-2",
};
const buttonClassification = {
  wrapper: "mb-1",
  input:
    "bg-primary hover:bg-primary-focus text-white text-sm font-normal py-3 px-5 rounded",
};

// export our definitions using our above
// templates and declare one-offs and
// overrides as needed.
export default {
  // the global key will apply to all inputs
  global: {
    label: "label label-text",
    outer: "mb-5 formkit-disabled:opacity-50",
    help: "text-xs text-base-content font-semibold",
    messages: "list-none p-0 mt-1 mb-0",
    message: "text-error mb-1 text-xs",
  },
  button: buttonClassification,
  color: {
    label: "block mb-1 font-bold text-sm",
    input:
      "w-16 h-8 appearance-none cursor-pointer border border-base-300 rounded-md mb-2 p-1",
  },
  date: textClassification,
  "datetime-local": textClassification,
  checkbox: {
    ...boxClassification,
    input:
      "checkbox formkit-invalid:checkbox-error formkit-errors:checkbox-error ",
  },
  email: textClassification,
  file: {
    label: "block mb-1 font-bold text-sm",
    inner: " cursor-pointer",
    input:
      "text-base-content text-sm mb-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-primary file:text-white hover:file:bg-primary-focus",
    noFiles: "block text-base-content text-sm mb-1",
    fileItem: "block flex text-base-content text-sm mb-1",
    fileRemove: "ml-auto text-primary text-sm",
  },
  month: textClassification,
  number: textClassification,
  password: textClassification,
  radio: {
    ...boxClassification,
    input: "radio formkit-invalid:radio-error formkit-errors:radio-error",
  },
  range: {
    inner: "",
    input: "range formkit-invalid:range-error formkit-errors:range-error",
  },
  search: textClassification,
  select: textClassification,
  submit: buttonClassification,
  tel: textClassification,
  text: textClassification,
  textarea: {
    input:
      "textarea border-base-300 bg-base-200 font-normal placeholder:font-light h-full w-full focus:ring-primary focus:ring-2 formkit-invalid:textarea-error formkit-invalid:focus:ring-error  formkit-errors:textarea-error formkit-errors:focus:ring-error",
  },
  time: textClassification,
  url: textClassification,
  week: textClassification,
  vs: textClassification,
  datepicker: { ...textClassification, input: "" },
};
