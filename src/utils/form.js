import { debounce } from "./helpers.js";
import { onViewMounted } from "./render.js";

export const handleFormState = ({
  formId,
  defaultValues,
  validationRules,
  onSubmit,
  onValidationFail,
}) => {
  let formState = {
    values: { ...defaultValues },
    validationRules,
    errors: {},
  };

  document.addEventListener(
    "input",
    debounce((event) => {
      if (event.target.matches("input")) {
        const fieldToUpdate = event.target.name;
        const value = event.target.value;

        formState.values[fieldToUpdate] = value;
      }
    }, 500)
  );

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (
      formState.validationRules &&
      Object.keys(formState.validationRules) !== 0
    ) {
      for (const [key, validation] of Object.entries(
        formState.validationRules
      )) {
        const currentValue = formState.values[key];
        const result = validation.regex.test(currentValue);

        if (!result) {
          formState.errors[key] = validation.message;
        }
      }
    }

    if (formState.errors) {
      return onValidationFail(formState);
    }

    onSubmit(formState.values);
  };

  onViewMounted(formId, (view) =>
    view.addEventListener("submit", handleFormSubmit)
  );

  return formState;
};
