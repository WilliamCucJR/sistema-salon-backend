const LoginService = require('../services/LoginService.js');
const loginService = new LoginService();

exports.login = async (req, res) => {
    try {
        const user = await loginService.login(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};