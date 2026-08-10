import { JSONFilePreset } from 'lowdb/node'

const startFunc = async ({ vounum, inTablePath }) => {
    const db = await JSONFilePreset(inTablePath, []);

    await db.read();

    const filteredData = await db.data.filter(obj => obj.vouchernumber === vounum);
    // console.log(filteredData)
    return filteredData;
};

export default startFunc;
