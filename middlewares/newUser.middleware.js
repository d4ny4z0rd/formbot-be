const newUser = (req, res, next) => {
	const { username, email, password, confirmpassword } = req.body;

	console.log("Received request data:", req.body);

	if (!username || !email || !password || !confirmpassword) {
		return res.status(400).json({
			message: "Please provide all required fields",
		});
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		return res.status(400).json({
			message: "Please provide a valid email address",
		});
	}

	const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
	if (!usernameRegex.test(username)) {
		return res.status(400).json({
			message:
				"Username must be at least 3 characters long and contain only letters, numbers, and underscores",
		});
	}

	if (password.length < 5) {
		return res.status(400).json({
			message: "Password must be at least 5 characters long",
		});
	}

	if (password !== confirmpassword) {
		return res.status(400).json({
			message: "Passwords do not match",
		});
	}

	next();
};

module.exports = newUser;
