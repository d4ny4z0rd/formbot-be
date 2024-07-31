const Form = require("../models/form.model");

const updateViewCount = async (req, res, next) => {
	if (req.viewCountUpdated) {
		console.log("View count already updated for this request.");
		return next();
	}

	const { uniqueUrl } = req.params;

	try {
		const form = await Form.findOne({ uniqueUrl });

		if (form) {
			form.views += 1;
			await form.save();
			console.log(`Form views updated to: ${form.views}`);
			req.viewCountUpdated = true;
		}

		next();
	} catch (error) {
		console.error("Error updating view count", error);
		next(error);
	}
};

module.exports = updateViewCount;
