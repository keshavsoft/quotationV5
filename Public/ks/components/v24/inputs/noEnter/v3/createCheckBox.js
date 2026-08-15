const createWrapper = ({ inTextToShow, inClassName }) => {
    const input = document.createElement("input");

    input.type = "checkbox";
    input.textContent = inTextToShow ? inTextToShow : "KeshavSoft";
    input.className = inClassName ? inClassName : "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"

    //     <input
    //     type="checkbox"
    //     class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
    // >

    return input;
};

export default createWrapper;
