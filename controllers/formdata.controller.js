const mongoose = require("mongoose");
const Response = require("../models/formdata.model");
const Form = require("../models/form.model");

const saveResponse = async (req, res) => {
	try {
		const { uniqueUrl } = req.params;
		const responses = req.body;

		const form = await Form.findOne({ uniqueUrl });
		if (!form) {
			return res.status(404).json({ message: "Form not found" });
		}

		const newResponse = new Response({
			formId: form._id,
			responses,
			submittedAt: new Date(),
		});

		await newResponse.save();

		form.starts += 1;

		form.completionrate = form.starts
			? ((form.starts / (form.views / 2)) * 100).toFixed(1)
			: "0.0";

		const updatedForm = await Form.findByIdAndUpdate(form._id, form, {
			new: true,
		});

		res.status(200).json({
			message: "Response saved successfully",
			completionrate: updatedForm.completionrate,
		});
	} catch (error) {
		console.error("Error saving response:", error);
		res.status(500).json({ message: error.message });
	}
};

const getFormResponses = async (req, res) => {
	try {
		const { formId } = req.params;
		const responses = await Response.find({ formId });

		if (!responses || responses.length === 0) {
			return res.status(404).json({ message: "Responses not found" });
		}

		res.status(200).json(responses);
	} catch (error) {
		console.error("Error fetching responses:", error);
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	saveResponse,
	getFormResponses,
};
