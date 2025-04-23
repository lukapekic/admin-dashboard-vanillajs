export const Input = ({ label, value, name, error, disabled, readOnly }) => {
  return `
    <div class="w-full flex flex-col gap-2">
        <label for="${name}">${label}</label>
        <input id="${name}" name="${name}" value="${value}" class="border border-gray-300 p-2" ${
    readOnly ? "readonly" : ""
  } ${disabled ? "disabled" : ""}/>
        <p class="text-red-500 ${!error ? "hidden" : ""}">${error}</p>
    </div>
  `;
};
