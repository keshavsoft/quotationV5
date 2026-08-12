const createWrapper = ({ inTextToShow, inClassName }) => {
    const button = document.createElement("button");

    button.textContent = inTextToShow ? inTextToShow : "KeshavSoft";
    button.className = inClassName ? inClassName : "px-4 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"

    return button;
};

export default createWrapper;
