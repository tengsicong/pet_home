function sendAjaxQuery(url, data) {
    $.ajax({
        url: url ,
        data: data,
        dataType: 'json',
        type: 'POST',
        processData: false,
        contentType: false,
        success: function(dataR) {
            alert('you have successful upload this animal');
            window.location.href = '/admin/pet_list_waiting';
        },
        error: function(xhr, status, error) {

            alert('Error: ' + error.message);
        },
    });
}

function addNewAnimal() {
    event.preventDefault();
    event.stopImmediatePropagation();
    var myForm = document.getElementById('addNewAnimal');
    var formData = new FormData(myForm);
    console.log(formData);
    sendAjaxQuery('/admin/create', formData);
    return false;
}
