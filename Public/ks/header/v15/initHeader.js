import { buildMenuItem } from "./BuildMenuItem/buildMenuItem.js";
import { buildNav } from "./BuildNav/buildNav.js";

const initHeader = (config = {}) => {

    const header = document.getElementById("header");

    if (!header) return;

    const nav = buildNav({ inTitle: config.title, inUiClasses: config.uiClasses });

    header.appendChild(nav);

    const menu = document.getElementById("menu");

    if (!menu) {
        console.warn("KSHeader: #menu not found");
        return;
    };

    (config.items || []).forEach(item => {

        const classes = {
            liClass: "md:text-center",

            aClass: `${item?.uiClasses?.aClass} flex justify-between items-center
        px-4 py-2 rounded-md
        hover:bg-gray-600
        active:bg-gray-500 active:scale-95
        transition-all duration-150
        md:flex-col md:justify-center md:items-center
        lg:bg-transparent lg:px-2 lg:py-1`,

            spanClass: `ml-3 text-right w-full text-base
        md:w-auto md:text-center md:ml-0 lg:text-lg`,

            svgClass: item?.uiClasses?.svgDivClass || "text-gray-300 w-6 h-6 lg:w-7 lg:h-7"
        };
        console.log("item : ", item);

        const li = buildMenuItem({
            inTextToShow: item.text,
            inHtmlId: item.id,
            inIconPaths: item.icon,
            inHref: item.href,
            onClick: item.onClick,
            inTableName: item.tableName,
            inClasses: classes,
            inSvgName: item.svgName,
            inConfigUiClasses: config.uiClasses,
            inDropdownItems: item.dropdownItems,
            inDropdownType: item.dropdownType
        });

        menu.appendChild(li);
    });
};

window.KSHeader = initHeader;

window.ks = window.ks || {};
window.ks.components = window.ks.components || {};
window.ks.components.header = initHeader;
window.ks.components.headerVersion = "v15";

// console.log("KSHeader v13 loaded to DOM");

export default initHeader;