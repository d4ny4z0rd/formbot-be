const validateUserUpdate = (req, res, next) => {
	console.log("Validation input:", req.body);
	const { username, email, newpassword, oldpassword } = req.body;

	if (email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return res.status(400).json({
				message: "Please provide a valid email address",
			});
		}
	}

	if (newpassword) {
		if (newpassword.length < 5) {
			return res.status(400).json({
				message: "New password must be at least 5 characters long",
			});
		}

		if (newpassword === oldpassword) {
			return res.status(400).json({
				message: "New password must be different from old password",
			});
		}
	}

	if (username) {
		const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
		if (!usernameRegex.test(username)) {
			return res.status(400).json({
				message:
					"Username must be at least 3 characters long and contain only letters, numbers, and underscores",
			});
		}
	}

	next();
};

module.exports = validateUserUpdate;
