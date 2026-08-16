export const buildTable = (data) => {
    const tableContainer = document.createElement("div");
    tableContainer.className = "overflow-auto flex-grow";

    if (!data || data.length === 0) {
        tableContainer.innerHTML = "<p class='text-gray-500'>No data available.</p>";
        return tableContainer;
    }

    const table = document.createElement("table");
    table.className = "w-full text-left border-collapse";

    // Extract headers
    const headers = Object.keys(data[0]);

    // Thead
    const thead = document.createElement("thead");
    thead.className = "bg-gray-100 sticky top-0 shadow-sm";
    const trHead = document.createElement("tr");
    headers.forEach(h => {
        const th = document.createElement("th");
        th.className = "p-3 border-b font-semibold text-sm text-gray-700 capitalize";
        th.innerText = h;
        trHead.appendChild(th);
    });
    thead.appendChild(trHead);
    table.appendChild(thead);

    // Tbody
    const tbody = document.createElement("tbody");
    data.forEach((row, index) => {
        const tr = document.createElement("tr");
        tr.className = index % 2 === 0 ? "bg-white hover:bg-gray-50" : "bg-gray-50 hover:bg-gray-100";
        headers.forEach(h => {
            const td = document.createElement("td");
            td.className = "p-3 border-b text-sm text-gray-800";
            td.innerText = row[h] ?? "";
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    
    tableContainer.appendChild(table);
    return tableContainer;
};
