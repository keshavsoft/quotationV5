export const forArray = ({ value }) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded text-xs shadow-sm";
    button.innerText = `View (${value.length})`;

    button.addEventListener("click", (e) => {
        // You can handle your click event here!
        console.log("Clicked array with length:", value);
    });

    return button;
};
