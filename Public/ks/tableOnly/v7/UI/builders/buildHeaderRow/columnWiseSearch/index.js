const createDiv = (id) => {
    const div = document.createElement("div");
    div.id = id;

    document.body.appendChild(div);

    return div;
};


const startFunc = ({ inTitleText, dataStore, inConfig }) => {
    const visibleColumnsConfig = dataStore.getSearchableColumnsConfig();
    const config = { ...inConfig };
    config.containerId = "kSHeadContainer";
    // debugger

    // console.log("ssssssss------------ : ", config);

    const k1 = new window.ks.classes.vertical(config);
    k1.initCreate();

    const div = createDiv("myDiv");

    return div;
};

export default startFunc;
