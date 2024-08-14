import React, { useEffect, useState } from "react";
import DatePicker from "@amir04lm26/react-modern-calendar-date-picker";
import "@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css";
import CustomSelect from "../selectBox";

function SymptomSolitedForm() {
	const symptoms = [
		{ id: 1, label: "درد محل تزریق" },
		{ id: 2, label: "سفتی محل تزریق" },
		{ id: 3, label: "تورم محل تزریق" },
		{ id: 4, label: "قرمزی محل تزریق" },
		{ id: 5, label: "خارش محل تزریق" },
		{ id: 6, label: "کبودی محل تزریق" },
		{ id: 7, label: "کاهش اشتها" },
		{ id: 8, label: "تب" },
		{ id: 9, label: "استفراغ" },
		{ id: 10, label: "اسهال" },
		{ id: 11, label: "لرز" },
		{ id: 12, label: "ضایعات پوستی" },
		{ id: 13, label: "کهیر" },
		{ id: 14, label: "بی قراری" },
		{ id: 15, label: "تغییر در الگوی خواب" },
		{ id: 16, label: "سایر" },
	];

	const [selectedSymptoms, setSelectedSymptoms] = useState([]);

	const [formData, setFormData] = useState([]);

	// symptoms.map(() => ({
	// 	startDate: "",
	// 	duration: "",
	// 	severity: "",
	// 	actionsTaken: "",
	// 	notes: "",
	// }));

	const handleChange = (index, field, value) => {
		console.log(index);
		console.log(field);
		console.log(value);
		// const updatedData = [...formData];
		// updatedData[index][field] = value;
		// console.log(updatedData);
		// setFormData(updatedData);
	};
	useEffect(() => {
		console.log(selectedSymptoms);
	}, [selectedSymptoms]);
	return (
		<div className="mt-15">
			<CustomSelect
				options={symptoms}
				value={selectedSymptoms}
				onChange={setSelectedSymptoms}
				placeholder="Select symptoms..."
			/>
			{selectedSymptoms.length > 0
				? selectedSymptoms.map((symptom, index) => (
						<>
							<div className="mt-10 border border-primary rounded p-10">
								<div className="mb-10 font-bold text-center inline-block bg-gray-200 rounded w-full p-3">
									{symptom.label}
								</div>
								<div
									key={index}
									className="grid grid-cols-1 md:grid-cols-4 gap-4"
								>
									<div className="w-full">
										<div className="relative mb-3 mt-5">
											<label className="absolute top-[-15px] bg-white right-2 text-gray-500 transition-all peer-focus:text-primary peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400">
												تاریخ شروع
											</label>
											<div className="peer p-2 border border-primary rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary">
												<DatePicker
													locale="fa"
													value={formData[index]?.startDate}
													onChange={(e) =>
														handleChange(index, "startDate", e.target.value)
													}
													shouldHighlightWeekends
												/>
											</div>
										</div>
									</div>
									<div className="w-full">
										<div className="relative mb-3 mt-5">
											<input
												type="text"
												placeholder=" "
												value={""}
												onChange={(e) =>
													handleChange(index, "duration", e.target.value)
												}
												className="peer p-2 border border-primary rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
											/>
											<label className="absolute bg-white right-2 top-[-15px] text-gray-500 transition-all peer-focus:text-primary peer-placeholder-shown:top-[-15px] peer-placeholder-shown:text-gray-400">
												طول مدت رخداد
											</label>
										</div>
									</div>
									<div className="w-full">
										<div className="relative mb-3 mt-5">
											<select
												value={""}
												onChange={(e) =>
													handleChange(index, "severity", e.target.value)
												}
												className="peer p-2 border border-primary rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
											>
												<option value="" disabled>
													یک مورد را انتخاب کنید
												</option>
												<option value="خفیف">خفیف</option>
												<option value="متوسط">متوسط</option>
												<option value="شدید">شدید</option>
											</select>
											<label className="bg-white absolute right-2 top-[-15px] text-gray-500 transition-all peer-focus:text-primary peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400">
												شدت رخداد
											</label>
										</div>
									</div>
									<div className="w-full">
										<div className="relative mb-3 mt-5">
											<select
												value={""}
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
												<option value="درمان غیر دارویی">
													درمان غیر دارویی
												</option>
											</select>
											<label className="bg-white absolute right-2 top-[-15px] text-gray-500 transition-all peer-focus:text-primary peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400">
												اقدام انجام شده
											</label>
										</div>
									</div>
									<div>
										<textarea
											placeholder="توضیحات"
											value={""}
											onChange={(e) =>
												handleChange(index, "notes", e.target.value)
											}
											className="w-full p-2 border border-primary rounded-md mb-3 col-span-5"
										/>
									</div>
								</div>
							</div>
						</>
				  ))
				: ""}
			<div className="flex justify-end mt-4 w-full">
				<button
					className="px-4 py-2 bg-primary rounded text-white"
					disabled={selectedSymptoms.length}
				>
					ارسال علایم
				</button>
			</div>
		</div>
	);
}

export default SymptomSolitedForm;
