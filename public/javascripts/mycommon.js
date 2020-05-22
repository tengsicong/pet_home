'use strict';

/**
 * form data to json
 * @param form jQuery object form
 */
function formDataToJson(form) {
    const formArr = form.serializeArray();
    const json = {};
    for (const element of formArr) {
        json[element['name']] = element['value'];
    }
    return json;
}

/**
 * send json request
 * @param url
 * @param data  json
 */
function sendAjaxJsonQuery(url, data) {
    $.ajax({
        url: url,
        data: JSON.stringify(data),
        type: 'POST',
        contentType: 'application/json',
        success: function(result) {
            alert(JSON.stringify(result));
            return result;
        },
        error: function(xhr, status, err) {
            alert(JSON.stringify(err));
            return err;
        },
    });
}
