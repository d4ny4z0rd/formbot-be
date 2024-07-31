const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
	try {
		const authHeader = req.header("Authorization");
		if (!authHeader) {
			return res.status(401).json({
				success: false,
				message: "Access denied. No token provided.",
			});
		}

		const token = authHeader.split(" ")[1];

		if (!token) {
			return res.status(401).json({
				success: false,
				message: "Access denied. No token provided.",
			});
		}

		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = decoded;
			next();
		} catch (error) {
			res.status(400).json({ message: "Invalid token." });
		}
	} catch (error) {
		console.error("Auth Middleware Error:", error);
		return res.status(401).json({
			success: false,
			message: "Something went wrong while verifying token",
		});
	}
};

module.exports = auth;
