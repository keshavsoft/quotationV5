import { createSaveButton } from "./createSaveButton.js";
import { createEditButton } from "./createEditButton.js";
import { createCancelButton } from "./createCancelButton.js";
import { createUpdateButton } from "./createUpdateButton.js";

const startFunc = ({ inButtonRow, options, inServices, inConfig, element }) => {
    const isEdit = options?.inVerticalOptions?.isEdit || false;
    const isCreate = options?.inVerticalOptions?.isCreate || false;
    const isModeDefined = options?.inVerticalOptions ? (("isEdit" in options.inVerticalOptions) || ("isCreate" in options.inVerticalOptions)) : false;
    const showSaveButton = options.showSaveButton || false;

    const saveBtn = createSaveButton({ options, inServices, inConfig });
    saveBtn.classList.add("saveButtonClass");

    const editBtn = createEditButton({ options, element });
    editBtn.classList.add("editButtonClass");

    const updateBtn = createUpdateButton({ options, inServices, inConfig });
    updateBtn.classList.add("updateButtonClass");

    const cancelBtn = createCancelButton({ options, element });
    cancelBtn.classList.add("cancelButtonClass");

    if (isModeDefined) {
        if (isCreate) {
            saveBtn.style.display = "";
            editBtn.style.display = "none";
            updateBtn.style.display = "none";
            cancelBtn.style.display = "none";
        } else if (isEdit) {
            saveBtn.style.display = "none";
            editBtn.style.display = "";
            updateBtn.style.display = "none";
            cancelBtn.style.display = "none";
        } else {
            saveBtn.style.display = "none";
            editBtn.style.display = "";
            updateBtn.style.display = "none";
            cancelBtn.style.display = "none";
        }
    } else {
        saveBtn.style.display = showSaveButton ? "" : "none";
        editBtn.style.display = "none";
        updateBtn.style.display = "none";
        cancelBtn.style.display = "none";
    }

    inButtonRow.append(saveBtn, editBtn, updateBtn, cancelBtn);
};

export default startFunc;