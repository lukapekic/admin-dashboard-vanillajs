export const UserPreviewEditModal = ({ user }) => {
  let formState = {
    values: {
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
  };

  document.addEventListener("change", (event) => {
    console.log("here");
    if (event.target.matches("input")) {
      const fieldToUpdate = event.target.name;
      const value = event.target.value;

      console.log(fieldToUpdate, value);
    }
  });

  return `
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div class="flex justify-between items-center">
            <h2 class="text-black text-2xl font-semibold mb-8">Preview / Edit user</h2>
            <button>X</button>
        </div>
        <form id="edit-user-form" class="flex flex-col gap-5">
            <div class="flex gap-3">
                <input name="name" value="${formState.values.name}" class="border border-gray-300 p-2" />
                <input name="email" value="${formState.values.email}" class="border border-gray-300 p-2"/>
                <input name="phone" value="${formState.values.phone}" class="border border-gray-300 p-2"/>
            </div>

            <div class="flex gap-3">
                <input name="name" value="${formState.values.city}" class="border border-gray-300 p-2" />
                <input name="email" value="${formState.values.street}" class="border border-gray-300 p-2"/>
                <input name="phone" value="${formState.values.suit}" class="border border-gray-300 p-2"/>
            </div>
        </form>
    </div>
  `;
};

// onSubmit, onCancel;
