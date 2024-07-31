const mongoose = require("mongoose");

const validateURL = function (url) {
	const urlRegex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/;
	return urlRegex.test(url);
};

const validateEmail = function (email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

const validatePhone = function (phone) {
	const phoneRegex = /^\+?[1-9]\d{1,14}$/;
	return phoneRegex.test(phone);
};

const validateDate = function (date) {
	const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-\d{4}$/;
	return dateRegex.test(date);
};

const validateRating = function (rating) {
	const ratingRegex = /^[1-5]$/;
	return ratingRegex.test(rating);
};

const fieldSchema = new mongoose.Schema(
	{
		type: { type: String, required: true },
		heading: { type: String, required: true },
		value: {
			type: String,
			validate: {
				validator: function (value) {
					switch (this.type) {
						case "email":
							return validateEmail(value);
						case "phone":
							return validatePhone(value);
						case "date":
							return validateDate(value);
						case "image":
						case "video":
						case "gif":
							return validateURL(value);
						case "rating":
							return validateRating(value);
						case "number":
							return !isNaN(value);
						default:
							return true;
					}
				},
				message: (props) =>
					`Invalid value for type ${props.path}: ${props.value}`,
			},
		},
	},
	{ _id: false }
);

const formSchema = new mongoose.Schema(
	{
		formname: { type: String, required: true },
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		folderId: { type: mongoose.Schema.Types.ObjectId, ref: "Folder" },
		theme: { type: String, required: true },
		views: { type: Number, default: 0 },
		starts: { type: Number, default: 0 },
		completionrate: { type: Number, default: 0 },
		fields: [fieldSchema],
		uniqueUrl: { type: String, required: true, unique: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Form", formSchema);
