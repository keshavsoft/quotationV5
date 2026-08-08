import showAllJson from './configs/showAll.json' with {type: 'json'};

const getData = async () => {
    const config = await fetch(showAllJson.endPoints.read);
    const data = await config.json();

    // const sortedData = data.sort((a, b) => a.stockitemname - b.stockitemname);
    const sortedData = data.sort((a, b) => a.stockitemname.localeCompare(b.stockitemname));


    return await sortedData;
};

export default getData;