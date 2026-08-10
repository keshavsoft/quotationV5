import ConfigJson from '../configs/billShow.json' with {type: 'json'};

export const getData = async () => {
    const config = await fetch(ConfigJson?.endPoints?.groupBy);
    const data = await config.json();

    return await data;
};

export const getHeadData = async () => {
    const config = await fetch(ConfigJson?.endPoints?.read);
    const data = await config.json();

    return await data;
};
