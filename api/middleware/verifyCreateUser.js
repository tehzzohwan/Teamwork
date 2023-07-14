const db = require('../configs/db.configs');

checkDuplicateEmail = async (req, res, next) => {
	const { email } = req.body;

	const userEmail = await db.query('SELECT * FROM users WHERE email = $1', [email]);
	if (userEmail.rows.length === 0) {
		next();
	} else {
		return res.status(400).send({
			'status': 'Error',
			'error': 'Failed! email already in use'
		});
	}

};

module.exports = checkDuplicateEmail;