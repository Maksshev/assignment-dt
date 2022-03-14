'use strict'

function getQueryString(url) {
    const queryQuestionmarkIndex = url.indexOf('?');

    if (queryQuestionmarkIndex < 0) {
        return '';
    }

    return url
        .substring(queryQuestionmarkIndex + 1)
        .replace(/\+/g, '%20')
}

function buildQueryStringFromObject(object) {
    let queryString = '';
    const paramNames = Object.keys(object).filter(Boolean);
    const indexOfLastParamName = paramNames.length - 1;

    paramNames.forEach(function (paramName, index) {
        if (index === 0) {
            queryString += '?'
        }

        const paramValue = encodeURIComponent(object[paramName]);
        let param = encodeURIComponent(paramName) + '=' + paramValue;

        if (index !== indexOfLastParamName) {
            param += '&';
        }

        queryString += param;
    })

    return queryString;
}

module.exports = {
    buildQueryStringFromObject: buildQueryStringFromObject,
    getQueryString: getQueryString
}
