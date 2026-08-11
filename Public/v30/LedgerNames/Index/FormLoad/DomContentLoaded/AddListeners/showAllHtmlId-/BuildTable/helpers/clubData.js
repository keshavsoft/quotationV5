import configJson from "/Index/configs/billShow.json" with { type: "json" };

// import ConfigJson from '../../../../../../configs/billShow.json' with {type: 'json'};

// import ConfigJson from '../configs/billShow.json' with {type: 'json'};
const startFunc = async () => {
    console.log("configJson:", configJson);
    console.log("read endpoint:", configJson?.endPoints?.read);

    const config = await fetch(configJson?.endPoints?.read);

    const data = await config.json();

    return data;
};

const startFunc1 = async () => {
    const config = await fetch(ConfigJson?.endPoints?.read);
    const data = await config.json();

    return await data;
};

export default startFunc;
