import { debounce } from "./helpers.js";

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

  const observer = new MutationObserver((mutations) => {
    mutations.forEach(() => {
      const form = document.getElementById(formId);

      if (form) {
        form.addEventListener("submit", (event) => {
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
        });

        observer.disconnect();
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  return formState;
};
