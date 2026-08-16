export class ModalBuilder {
    constructor(contentNode, titleText = "Details") {
        this.contentNode = contentNode;
        this.titleText = titleText;
        this.overlay = null;
    }

    buildHeader() {
        const header = document.createElement("div");
        header.className = "flex justify-between items-center p-4 border-b bg-gray-50";
        
        const title = document.createElement("h2");
        title.className = "text-lg font-bold text-gray-800";
        title.innerText = this.titleText;
        
        const closeBtn = document.createElement("button");
        closeBtn.className = "text-gray-400 hover:text-red-500 transition-colors bg-gray-200 hover:bg-red-100 rounded-full w-8 h-8 flex items-center justify-center font-bold";
        closeBtn.innerHTML = "&times;";
        
        closeBtn.onclick = () => this.close();
        
        header.appendChild(title);
        header.appendChild(closeBtn);
        return header;
    }

    buildBody() {
        const body = document.createElement("div");
        body.className = "p-0 overflow-auto flex-grow relative";
        if (this.contentNode) {
            body.appendChild(this.contentNode);
        }
        return body;
    }

    build() {
        this.overlay = document.createElement("div");
        this.overlay.className = "fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity";

        const modalContent = document.createElement("div");
        modalContent.className = "bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[85vh] flex flex-col overflow-hidden animate-fade-in-up";

        modalContent.appendChild(this.buildHeader());
        modalContent.appendChild(this.buildBody());
        
        this.overlay.appendChild(modalContent);

        this.overlay.onclick = (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        };

        return this.overlay;
    }

    show() {
        if (!this.overlay) {
            this.build();
        }
        document.body.appendChild(this.overlay);
    }

    close() {
        if (this.overlay && document.body.contains(this.overlay)) {
            document.body.removeChild(this.overlay);
        }
    }
}
