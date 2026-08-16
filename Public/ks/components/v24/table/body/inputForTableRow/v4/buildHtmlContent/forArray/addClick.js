export const addClick = ({ button, value }) => {
    button.addEventListener("click", (e) => {
        console.log("Clicked array with length:", value);
    });
};
