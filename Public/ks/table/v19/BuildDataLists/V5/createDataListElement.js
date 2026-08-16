const createDataListElement = ({ columnName, values }) => {
    const datalist = document.createElement("datalist");
    datalist.id = `${columnName}List`;
    // console.log("values : ", values);

    datalist.innerHTML = values
        .map(value => `<option value="${value.data}">${value.data} - ${value.count}</option>`)
        .join("");

    return datalist;
};

export default createDataListElement;
