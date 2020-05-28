
$(document).ready(function () {
    $('#adopt button').click(function() {
        let modal = $('#modal-lg-applyForAdopt');
        modal.find("span.prompt_message").text("Please fill out the below form with current information..");
        modal.modal();
    });
});