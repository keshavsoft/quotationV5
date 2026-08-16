export class TableBuilder {
    constructor(data) {
        this.data = data || [];
        this.headers = this.data.length > 0 ? Object.keys(this.data[0]) : [];
    }

    buildHead() {
        const thead = document.createElement("thead");
        thead.className = "bg-gray-100 sticky top-0 shadow-sm z-10";
        const trHead = document.createElement("tr");
        
        this.headers.forEach(h => {
            const th = document.createElement("th");
            th.className = "p-3 border-b font-semibold text-sm text-gray-700 capitalize whitespace-nowrap";
            th.innerText = h;
            trHead.appendChild(th);
        });
        
        thead.appendChild(trHead);
        return thead;
    }

    buildBody() {
        const tbody = document.createElement("tbody");
        
        this.data.forEach((row, index) => {
            const tr = document.createElement("tr");
            tr.className = index % 2 === 0 ? "bg-white hover:bg-gray-50 transition-colors" : "bg-gray-50 hover:bg-gray-100 transition-colors";
            
            this.headers.forEach(h => {
                const td = document.createElement("td");
                td.className = "p-3 border-b text-sm text-gray-800";
                td.innerText = row[h] ?? "";
                tr.appendChild(td);
            });
            
            tbody.appendChild(tr);
        });
        
        return tbody;
    }

    buildFooter() {
        const tfoot = document.createElement("tfoot");
        tfoot.className = "bg-gray-100 border-t sticky bottom-0";
        const trFoot = document.createElement("tr");
        
        const td = document.createElement("td");
        td.colSpan = this.headers.length || 1;
        td.className = "p-3 text-sm text-gray-600 text-right font-medium";
        td.innerText = `Total Rows: ${this.data.length}`;
        
        trFoot.appendChild(td);
        tfoot.appendChild(trFoot);
        return tfoot;
    }

    build() {
        const tableContainer = document.createElement("div");
        tableContainer.className = "overflow-auto flex-grow relative";

        if (this.data.length === 0) {
            tableContainer.innerHTML = "<div class='flex items-center justify-center h-full p-8 text-gray-500'>No data available.</div>";
            return tableContainer;
        }

        const table = document.createElement("table");
        table.className = "w-full text-left border-collapse";

        table.appendChild(this.buildHead());
        table.appendChild(this.buildBody());
        table.appendChild(this.buildFooter());

        tableContainer.appendChild(table);
        return tableContainer;
    }
}
