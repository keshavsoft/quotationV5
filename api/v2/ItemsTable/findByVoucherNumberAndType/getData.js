import { JSONFilePreset } from 'lowdb/node'

const startFunc = async ({ vchtype, vounum, inTablePath }) => {
    const db = await JSONFilePreset(inTablePath, []);

    await db.read();

    const filteredData = await db.data.filter(obj => obj.vouchernumber === vounum && obj.vchtype === vchtype);
    // console.log(filteredData)
    return filteredData;
};

export default startFunc;
