import React, { useState } from "react";
import DatePicker from "@amir04lm26/react-modern-calendar-date-picker";
import "@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css";

const symptoms = [
	"درد محل تزریق",
	"سفتی محل تزریق",
	"تورم محل تزریق",
	"قرمزی محل تزریق",
	"خارش محل تزریق",
	"کبودی محل تزریق",
	"تورم زیر بغل/کلیه",
	"کاهش اشتها",
	"تب",
	"استفراغ",
	"اسهال",
	"لرز",
	"ضایعات پوستی",
	"کمردرد",
	"بی قراری",
	"تغییر الگوی خواب",
	"سایر",
];

function SymptomSolitedForm() {
	const [formData, setFormData] = useState(
		symptoms.map(() => ({
			startDate: "",
			duration: "",
			severity: "",
			actionsTaken: "",
			notes: "",
		}))
	);

	const handleChange = (index, field, value) => {
		const updatedData = [...formData];
		updatedData[index][field] = value;
		console.log(updatedData);
		setFormData(updatedData);
	};

	return (
		<div className="mt-15">
			{/* Form Rows */}
			{symptoms.map((symptom, index) => (
				<>
					<div className="mb-15">{symptom}</div>
					<div
						key={index}
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-center mb-4 w-full mt-10"
					>
						<div className="relative mb-3">
							{/* <input
								type="date"
								value={formData[index].startDate}
								onChange={(e) =>
									handleChange(index, "startDate", e.target.value)
								}
								className="peer p-2 border border-primary rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
							/> */}
							<label className="absolute top-[-15px] bg-white right-2 text-gray-500 transition-all peer-focus:text-primary peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400">
								تاریخ شروع
							</label>
							<div className="peer p-2 border border-primary rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary">
								<DatePicker
									locale="fa"
									value={formData[index].startDate}
									onChange={(e) =>
										handleChange(index, "startDate", e.target.value)
									}
									shouldHighlightWeekends
									style={
										{
											// width: "100%",
										}
									}
								/>
							</div>
						</div>

						<div className="relative mb-3">
							<input
								type="text"
								placeholder=" "
								value={formData[index].duration}
								onChange={(e) =>
									handleChange(index, "duration", e.target.value)
								}
								className="peer p-2 border border-primary rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
							/>
							<label className="absolute bg-white right-2 top-[-15px] text-gray-500 transition-all peer-focus:text-primary peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400">
								طول مدت رخداد
							</label>
						</div>
						<div className="relative mb-3">
							<select
								value={formData[index].severity}
								onChange={(e) =>
									handleChange(index, "severity", e.target.value)
								}
								className="peer p-2 border border-primary rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
							>
								<option value="" disabled>
									Choose an item.
								</option>
								<option value="خفیف">خفیف</option>
								<option value="متوسط">متوسط</option>
								<option value="شدید">شدید</option>
							</select>
							<label className="bg-white absolute right-2 top-[-15px] text-gray-500 transition-all peer-focus:text-primary peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400">
								شدت رخداد
							</label>
						</div>
						<div className="relative mb-3">
							<select
								value={formData[index].actionsTaken}
								onChange={(e) =>
									handleChange(index, "actionsTaken", e.target.value)
								}
								className="peer p-2 border border-primary rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
							>
								<option value="" disabled>
									Choose an item.
								</option>
								<option value="اقدام نشده">اقدام نشده</option>
								<option value="درمان دارویی">درمان دارویی</option>
								<option value="درمان غیر دارویی">درمان غیر دارویی</option>
							</select>
							<label className="bg-white absolute right-2 top-[-15px] text-gray-500 transition-all peer-focus:text-primary peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400">
								اقدام انجام شده
							</label>
						</div>
						<textarea
							placeholder="توضیحات"
							value={formData[index].notes}
							onChange={(e) => handleChange(index, "notes", e.target.value)}
							className="p-2 border border-primary rounded-md mb-3"
						/>
					</div>
					<div className="w-full bg-primary h-[1px] my-3"></div>
				</>
			))}
		</div>
	);
}

export default SymptomSolitedForm;
