const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("./routes/user.route");
const folderRouter = require("./routes/folder.route");
const formRouter = require("./routes/form.route");
const formDataRouter = require("./routes/formdata.route");

app.use(
	cors({
		origin: ["https://formbot-fe.vercel.app", "http://localhost:5173"], // Specify allowed origins
		methods: "GET,POST,PUT,DELETE,OPTIONS", // Adjust methods as needed
		allowedHeaders: "Content-Type,Authorization", // Adjust headers as needed
		credentials: true, // Allow credentials if needed
	})
);
app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/folder", folderRouter);
app.use("/api/v1/form", formRouter);
app.use("/api/v1/formData", formDataRouter);
app.use("*", (req, res) => {
	res.status(404).json({
		message: "Cannot find the route",
		status: "Error",
	});
});

module.exports = app;
