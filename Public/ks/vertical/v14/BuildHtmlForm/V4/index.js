// createForm.js

const createForm = (options) => {
    const optionsEnterAsTab = options?.inConfig?.options?.vertical?.enterAsTab;
    // console.log("ssssssss------------ : ", options);

    // console.log("ssssssss------------ : ", options, options?.inConfig?.options?.vertical?.enterAsTab);

    if (optionsEnterAsTab === false) {
        const form1 = document.createElement("ks-html-form-no-enter");
        form1.init(options);
        return form1;

    } else {
        const form = document.createElement("ks-html-form");
        form.init(options);
        return form;
    };
};

export default createForm;