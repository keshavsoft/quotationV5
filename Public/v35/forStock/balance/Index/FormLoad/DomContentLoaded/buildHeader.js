import headerConfig from "./headers.json" with { type: "json" };

const buildHeader = async () => {
    await window.ks.components.header(headerConfig);
};

export { buildHeader };