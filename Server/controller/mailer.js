import nodemailer from "nodemailer";
import ENV from "../config.js";

let config = {
	service: "gmail",
	auth: {
		user: ENV.EMAIL,
		pass: ENV.PASSWORD,
	},
};
let transporter = nodemailer.createTransport(config);

//? POST: http://localhost:8080/api/registerMail
//* send mail from real gmail account
export const registerMail = async (req, res) => {
	const { username, userEmail, text, subject, extra } = req.body;
	let message = {
		from: ENV.EMAIL,
		to: userEmail,
		subject: subject || "OTP By Coders Point",
		html: `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<style>
					/* Global styles */
					body {
						font-family: Arial, sans-serif;
						background-color: #f1f1f1;
						margin: 0;
						padding: 0;
					}
					/* Container styles */
					.container {
						max-width: 600px;
						margin: 0 auto;
						padding: 20px;
					}
					/* Table styles */
					table {
						width: 100%;
						border-collapse: collapse;
						background-color: #ffffff;
						border-radius: 10px;
						box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
					}
					td {
						padding: 20px;
						text-align: center;
					}
					/* Header styles */
					.header {
						background-color: #f8f8f8;
						border-radius: 10px 10px 0 0;
						padding: 20px;
						text-align: center;
					}
					.header h1 {
						color: #333333;
						font-size: 28px;
						margin: 0;
						padding: 0;
					}
					/* Content styles */
					.content {
						padding: 20px;
						text-align: center;
					}
					.content p {
						color: #555555;
						font-size: 18px;
						margin: 0 0 20px;
					}
					.otp-code {
						color: #ffffff;
						font-size: 36px !important;
				}
					/* Footer styles */
					.footer {
						background-color: #f8f8f8;
						border-radius: 0 0 10px 10px;
						padding: 20px;
						text-align: center;
					}
					.footer p {
						color: #888888;
						font-size: 14px;
						margin: 0;
					}
				</style>
			</head>
			<body>
				<div class="container">
					<table>
						<tr>
							<td class="header" colspan="2">
								<h1>OTP Email</h1>
							</td>
						</tr>
						<tr>
							<td class="content" colspan="2">
								<p>${username || ""} ${extra}</p>
								<p>Your One-Time Password (OTP) is:</p>
								<p class="otp-code" style="letter-spacing: 10px;">${text}</p>
								<p>Please use this OTP to complete your verification process.</p>
								
							</td>
						</tr>
						<tr>
							<td class="footer" colspan="2">
								<p>If you didn't request this OTP, please ignore this email.</p>
								<p>Best regards,<br><strong>DC4 IT SOLUTIONS</strong></p>
							</td>
						</tr>
					</table>
				</div>
			</body>
			</html>`,
	};
	transporter
		.sendMail(message)
		.then(() => {
			return res.status(201).json({
				msg: "you should receive an email",
			});
		})
		.catch((error) => {
			return res.status(500).json({ error });
		});
};
