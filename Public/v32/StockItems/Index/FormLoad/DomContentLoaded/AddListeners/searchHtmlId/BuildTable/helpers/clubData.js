import ConfigJson from '../configs/billShow.json' with {type: 'json'};

const startFunc = async () => {
    const config = await fetch(ConfigJson?.endPoints?.read);
    const data = await config.json();

    return await data;
};

export default startFunc;
