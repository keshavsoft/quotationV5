import executeKeyDownType from "./ExecuteKeyDownType/v7/start.js";

const startFunc = (input) => {
    const localOptions = input.localOptions;
    // console.log("----------:", localOptions);


    input.addEventListener("keydown", (event) => {
        const currentTarget = event.currentTarget;

        const inputElement = currentTarget.querySelector("input");
        // console.log("nnnnnnnn : ", this.localOptions);

        if (event.key === "Enter") {
            executeKeyDownType({
                currentInput: inputElement,
                inDefaultRow: {},
                closestTagIsTr: true,
                inOptions: localOptions
            });
        };

        if (event.key !== "Enter") return;

        // event.preventDefault();
    });
};

export default startFunc;