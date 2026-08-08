import showAllHtmlId from "./showAllHtmlId/start.js";
import crudHtmlId from "./crudHtmlId/start.js";
import verticalHtmlId from './verticalHtmlId/start.js';
import searchHtmlId from './searchHtmlId/start.js';

const hookAllListeners = () => {

    verticalHtmlId();
    showAllHtmlId();
    crudHtmlId();
    searchHtmlId();

};

export default hookAllListeners;