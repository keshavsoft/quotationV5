const getUniqueTruthyValues = data => {
    const result = Object.entries(
        data.reduce((acc, value) => {
            acc[value] = (acc[value] || 0) + 1;
            return acc;
        }, {})
    ).map(([data, count]) => ({
        data,
        count
    })).sort((a, b) => a.data > b.data ? 1 : -1);

    // console.log(result);

    const result1 = Object.values(
        data.reduce((acc, item) => {
            const key = item.date;

            acc[key] ??= {
                value: key,
                count: 0
            };

            acc[key].count++;

            return acc;
        }, {})
    );

    return result;
};

export default getUniqueTruthyValues;
