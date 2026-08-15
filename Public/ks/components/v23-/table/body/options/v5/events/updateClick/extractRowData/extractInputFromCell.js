/**
 * Reads a single cell and, if it contains a named input, returns { name, value }.
 * Returns null when there is nothing useful to extract (no input / no name).
 *
 * @param {HTMLTableCellElement} td - A data cell from the row.
 * @returns {{ name: string, value: string } | null}
 */
const startFunc = (td) => {
    const input = td.querySelector("input");

    if (input && input.name) {
        let value;

        switch (input.type) {
            case "number":
                value = input.value === "" ? null : Number(input.value);
                break;

            case "checkbox":
                value = input.checked;
                break;

            case "date":
                value = input.value;
                break;

            case "datetime-local":
                value = input.value;
                break;

            case "range":
                value = Number(input.value);
                break;

            default:
                value = input.value;
        }

        return {
            name: input.name,
            value
        };
    }

    return null;
};

export default startFunc;
