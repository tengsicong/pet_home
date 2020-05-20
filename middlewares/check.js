module.exports = {
    checkAdminLogin: function checkAdminLogin(req, res, next) {
        checkRoleLogin('admin', req, res, next);
    },
};

function checkRoleLogin(role, req, res, next) {
    if (req.session.role !== role) {
        return res.redirect('/login');
    }
    next();
}
