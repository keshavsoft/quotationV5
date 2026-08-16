export const createModal = (contentNode, titleText = "Details") => {
    // Create overlay
    const overlay = document.createElement("div");
    overlay.className = "fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity";

    // Create modal box
    const modalContent = document.createElement("div");
    modalContent.className = "bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[85vh] flex flex-col overflow-hidden animate-fade-in-up";

    // Header
    const header = document.createElement("div");
    header.className = "flex justify-between items-center p-4 border-b bg-gray-50";
    
    const title = document.createElement("h2");
    title.className = "text-lg font-bold text-gray-800";
    title.innerText = titleText;
    
    const closeBtn = document.createElement("button");
    closeBtn.className = "text-gray-400 hover:text-red-500 transition-colors bg-gray-200 hover:bg-red-100 rounded-full w-8 h-8 flex items-center justify-center font-bold";
    closeBtn.innerHTML = "&times;";
    
    const closeModal = () => {
        if (document.body.contains(overlay)) {
            document.body.removeChild(overlay);
        }
    };
    
    closeBtn.onclick = closeModal;
    
    header.appendChild(title);
    header.appendChild(closeBtn);

    // Body
    const body = document.createElement("div");
    body.className = "p-0 overflow-auto flex-grow";
    body.appendChild(contentNode);

    // Assemble
    modalContent.appendChild(header);
    modalContent.appendChild(body);
    overlay.appendChild(modalContent);

    // Close when clicking outside the modal content
    overlay.onclick = (e) => {
        if (e.target === overlay) {
            closeModal();
        }
    };

    document.body.appendChild(overlay);
};
