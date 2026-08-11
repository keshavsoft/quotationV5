const buildDataListElement = ({ id, values }) => {
    const datalist = document.createElement("datalist");

    datalist.id = id;

    values.forEach(value => {
        const option = document.createElement("option");
        option.value = value;

        datalist.appendChild(option);
    });

    return datalist;
};

export default buildDataListElement;
