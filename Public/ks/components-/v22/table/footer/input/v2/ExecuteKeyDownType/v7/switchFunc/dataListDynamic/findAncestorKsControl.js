const findAncestorKsControl = (element) => {
    while (element && element !== document) {
        if (element.tagName?.toLowerCase().startsWith("ks-")) {
            return element;
        }

        element = element.parentElement;
    }

    return null;
};

export default findAncestorKsControl;
