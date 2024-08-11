import React, { useState } from "react";
import DatePicker from "@amir04lm26/react-modern-calendar-date-picker";
import "@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css";

function AdverseEventForm() {
	const [rows, setRows] = useState([
		{
			adverseEvent: "",
			startDate: "",
			duration: "",
			severity: "",
			actionsTaken: "",
			notes: "",
		},
	]);

	const handleChange = (index, field, value) => {
		const newRows = [...rows];
		newRows[index][field] = value;
		setRows(newRows);
	};

	const addRow = () => {
		setRows([
			...rows,
			{
				adverseEvent: "",
				startDate: "",
				duration: "",
				severity: "",
				actionsTaken: "",
				notes: "",
			},
		]);
	};

	const handleSubmit = async () => {
		try {
			// Replace with your backend API endpoint
			const response = await fetch("https://your-backend-api.com/submit", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ rows }),
			});

			if (response.ok) {
				alert("Form submitted successfully!");
				// Optionally, reset the form here
			} else {
				alert("Failed to submit form");
			}
		} catch (error) {
			console.error("Error submitting form:", error);
			alert("An error occurred while submitting the form");
		}
	};

	return (
		<>
			<div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-sm rounded-md">
				<div className="text-center text-red-500 font-bold mb-6">
					در صورتی که رخداد نامطلوبی تجربه کردید لطفا شرح عارضه با ذکر دقیق
					تاریخ شروع علائم، طول مدت عارضه و اقدامات درمانی انجام شده جهت کاهش
					عارضه را در جدول ذیل وارد نمایید:
				</div>

				{rows.map((row, index) => (
					<div
						key={index}
						className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
					>
						<div className="relative">
							<select
								value={row.adverseEvent}
								onChange={(e) =>
									handleChange(index, "adverseEvent", e.target.value)
								}
								className="peer p-2 border border-primary rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
							>
								<option value="" disabled>
									یک مورد را انتخاب کنید
								</option>
								<option value="درد محل تزریق">درد محل تزریق</option>
								<option value="سفتی محل تزریق">سفتی محل تزریق</option>
								<option value="تورم محل تزریق">تورم محل تزریق</option>
								{/* Add other options as needed */}
							</select>
							<label className="absolute right-2 bg-white top-[-15px] text-gray-500 transition-all peer-focus:text-primary peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400">
								رخداد نامطلوب
							</label>
						</div>

						<div className="relative">
							<div className="peer p-2 border border-primary rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary">
								<DatePicker
									locale="fa"
									value={row.startDate}
									onChange={(e) =>
										handleChange(index, "startDate", e.target.value)
									}
									shouldHighlightWeekends
								/>
							</div>
							<label className="absolute right-2 bg-white top-[-15px] text-gray-500 transition-all peer-focus:text-primary peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400">
								تاریخ شروع
							</label>
						</div>

						<div className="relative">
							<input
								type="text"
								placeholder=" "
								value={row.duration}
								onChange={(e) =>
									handleChange(index, "duration", e.target.value)
								}
								className="peer p-2 border border-primary rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
							/>
							<label className="absolute right-2 bg-white  top-[-15px] text-gray-500 transition-all peer-focus:text-primary peer-placeholder-shown:top-[-15px] peer-placeholder-shown:text-gray-400">
								طول مدت رخداد
							</label>
						</div>

						<div className="relative">
							<select
								value={row.severity}
								onChange={(e) =>
									handleChange(index, "severity", e.target.value)
								}
								className="peer p-2 border border-primary rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
							>
								<option value="" disabled className="text-sm">
									یک مورد را انتخاب کنید
								</option>
								<option value="خفیف">خفیف</option>
								<option value="متوسط">متوسط</option>
								<option value="شدید">شدید</option>
							</select>
							<label className="absolute right-2 bg-white top-[-15px] text-gray-500 transition-all peer-focus:text-primary peer-placeholder-shown:top-[-15px] peer-placeholder-shown:text-gray-400">
								شدت رخداد
							</label>
						</div>

						<div className="relative">
							<select
								value={row.actionsTaken}
								onChange={(e) =>
									handleChange(index, "actionsTaken", e.target.value)
								}
								className="peer p-2 border border-primary rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
							>
								<option value="" disabled>
									یک مورد را انتخاب کنید
								</option>
								<option value="اقدام نشده">اقدام نشده</option>
								<option value="درمان دارویی">درمان دارویی</option>
								<option value="درمان غیر دارویی">درمان غیر دارویی</option>
							</select>
							<label className="absolute right-2 bg-white  top-[-15px] text-gray-500 transition-all peer-focus:text-primary peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400">
								اقدام انجام شده
							</label>
						</div>

						<div className="relative col-span-2">
							<textarea
								placeholder=" "
								value={row.notes}
								onChange={(e) => handleChange(index, "notes", e.target.value)}
								className="peer p-2 border border-primary rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
							/>
							<label className="absolute right-2 bg-white top-[-15px] text-gray-500 transition-all peer-focus:text-primary peer-placeholder-shown:top-[-15px] peer-placeholder-shown:text-gray-400">
								توضیحات
							</label>
						</div>
					</div>
				))}

				<div className="w-full flex justify-end">
					<button
						onClick={addRow}
						className="bg-primary text-white py-2 px-4 rounded-md mt-1 text-sm"
					>
						افزودن ردیف
					</button>
				</div>
			</div>
			<div className="w-full flex justify-end">
				<button
					onClick={handleSubmit}
					className="bg-green-500 text-white py-2 px-4 rounded-md mt-6 ml-4"
				>
					ارسال
				</button>
			</div>
		</>
	);
}

export default AdverseEventForm;
