$(function() {
    $('#clientRadio').click(function() {
        $('#loginForm').attr('action', '/user_signin');
    });

    $('#adminRadio').click(function() {
        $('#loginForm').attr('action', 'admin_signin');
    });
});
