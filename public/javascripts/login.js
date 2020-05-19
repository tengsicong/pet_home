$(function() {
    $('#clientRadio').click(function() {
        $('#loginForm').attr('action', '/user_login');
    });

    $('#adminRadio').click(function() {
        $('#loginForm').attr('action', '/admin_login');
    });
});
