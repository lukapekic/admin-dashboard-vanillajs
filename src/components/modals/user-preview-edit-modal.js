import { Input } from "../input.js";
import { handleFormState } from "../../utils/form.js";
import { onViewMounted } from "../../utils/render.js";
import { usersStore } from "../../store/users.js";

export const UserPreviewEditModal = ({ user, onSubmit, onClose }) => {
  const formState = handleFormState({
    defaultValues: {
      name: user.name ?? "",
      email: user.email ?? "",
      companyName: user.company.name ?? "",
      city: user.address.city ?? "",
      street: user.address.street ?? "",
      suit: user.address.suit ?? "",
      phone: user.phone ?? "",
      website: user.website ?? "",
      catchPhrase: user.company.catchPhrase ?? "",
      bs: user.company.bs ?? "",
    },
    validationRules: {
      email: {
        message: "Invalid Email format",
        regex:
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      },
    },
    formId: "edit-user-form",
    onSubmit: (data) => {
      usersStore.updateUser(user.id, data);

      onSubmit?.();
      onClose();
    },
    onValidationFail: (formState) => {
      renderForm?.(formState);
    },
  });

  const renderForm = (formState) => {
    const formWrapper = document.getElementById("user-edit-form-wrapper");

    formWrapper.innerHTML = `
        <form id="edit-user-form" class="flex flex-col p-6">
            <div class="flex gap-3 mb-5">
                ${Input({
                  name: "name",
                  value: formState.values.name,
                  label: "Name",
                })}
                ${Input({
                  name: "email",
                  value: formState.values.email,
                  label: "Email",
                  error: formState.errors.email,
                })}
                ${Input({
                  name: "phone",
                  value: formState.values.phone,
                  label: "Phone",
                })}
            </div>

            <div class="flex gap-3 mb-5">
                ${Input({
                  name: "city",
                  value: formState.values.city,
                  label: "City",
                })}
                ${Input({
                  name: "street",
                  value: formState.values.street,
                  label: "Street",
                })}
                ${Input({
                  name: "suit",
                  value: formState.values.suit,
                  label: "Suit",
                })}
            </div>

            <div class="flex gap-3 mb-5">
                ${Input({
                  name: "companyName",
                  value: formState.values.companyName,
                  label: "Company Name",
                })}
                ${Input({
                  name: "website",
                  value: formState.values.website,
                  label: "Website",
                })}
            </div>

            <div class="flex gap-3 mb-5">
                ${Input({
                  name: "catchPhrase",
                  value: formState.values.catchPhrase,
                  label: "Suit",
                  readOnly: true,
                })}
                ${Input({
                  name: "bs",
                  value: formState.values.bs,
                  label: "BS",
                  readOnly: true,
                })}
            </div>
        </form>

        <div class="flex w-full bg-gray-200 p-6 gap-4 justify-end items-center">
            <button id="close-modal-button" class="border border-black rounded-md p-3 cursor-pointer">Cancel</button>
            <button id="submit-modal-button" type="submit" form="edit-user-form" class="p-3 bg-black text-white font-semibold rounded-md cursor-pointer">Submit</button>
        </div>
  `;
  };

  onViewMounted("user-edit-form-wrapper", () => renderForm(formState));

  return `
    <div class="bg-white">
        <div class="flex justify-between items-center p-6">
            <h2 class="text-black text-2xl font-semibold mb-8">Preview / Edit user</h2>
            <button>X</button>
        </div>
        <div id="user-edit-form-wrapper"></div>
    </div>
  `;
};
