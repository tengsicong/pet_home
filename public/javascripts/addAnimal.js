'use strict'
let $addAnimal = $("#addAnimal");

$addAnimal.submit(function () {
    var json = formDataToJson($addAnimal);
    sendAjaxJsonQuery('/animal/add', json);
    event.preventDefault();
})
