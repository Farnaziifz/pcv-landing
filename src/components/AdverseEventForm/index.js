import React, { useState } from "react";
import DatePicker from "@amir04lm26/react-modern-calendar-date-picker";
import "@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css";
import {
	useGetInterventionResultQuery,
	useCreateAdverseEventMutation,
} from "../../resources/services/api/general.service";
import moment from "jalali-moment";

function AdverseEventForm() {
	const { data: interventionResultId } = useGetInterventionResultQuery();
	const [create] = useCreateAdverseEventMutation();

	const [rows, setRows] = useState([
		{
			adverseEvent: "",
			startDate: null,
			duration: "",
			severity: "",
			actionsTaken: "",
			notes: "",
			intensities: "",
			id: Math.floor(Math.random() * 10000),
		},
	]);

	const handleChange = (id, field, value) => {
		const newRows = rows.map((row) => {
			if (row.id === id) {
				return {
					...row,
					[field]: value,
				};
			}
			return row;
		});
		setRows(newRows);
	};

	const addRow = () => {
		setRows([
			...rows,
			{
				adverseEvent: "",
				startDate: null,
				duration: "",
				severity: "",
				actionsTaken: "",
				notes: "",
				intensities: "",
				id: Math.floor(Math.random() * 10000),
			},
		]);
	};

	const removeRow = (id) => {
		const filteredRows = rows.filter((row) => row.id !== id);
		setRows(filteredRows);
	};

	const handleSubmit = async () => {
		console.log(Date.now());
		const changed = rows.map((el) => {
			const model = {
				InterventionResultId: el.InterventionResultId
					? +el.InterventionResultId
					: "",
				OnsetDate: el.startDate?.year
					? moment
							.from(
								`${el.startDate?.year}/${el.startDate?.month}/${el.startDate?.day}`,
								"fa",
								"YYYY/MM/DD"
							)
							.locale("en")
							.format("YYYY-MM-DDTHH:mm:ss")
					: moment
							.from(Date.now(), "", '"YYYY/MM/DD"')
							.locale("en")
							.format("YYYY-MM-DDTHH:mm:ss"),
				DurationValue: el.DurationValue ? +el.DurationValue : "",
				DurationTypeId: el.DurationTypeId ? +el.DurationTypeId : "",
				Description: `درخداد نامطلوب: ${el.intensities} - توضیحات: ${el.notes}`,
				IntensityValue: el.severity ? +el.severity : "",
			};
			return model;
		});
		create(changed);
	};

	return (
		<>
			<div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-sm rounded-md ">
				<div className="text-center text-red-500 font-bold mb-6">
					در صورتی که رخداد نامطلوبی تجربه کردید لطفا شرح عارضه با ذکر دقیق
					تاریخ شروع علائم، طول مدت عارضه و اقدامات درمانی انجام شده جهت کاهش
					عارضه را در جدول ذیل وارد نمایید:
				</div>

				{rows.map((row) => (
					<div className="grid grid-cols-1 md:grid-cols-1 gap-4" key={row.id}>
						{rows.length > 1 ? (
							<div className="w-full flex justify-end">
								<button
									onClick={() => removeRow(row.id)}
									className="bg-red-500 text-white py-1 px-1 rounded-md mt-1 text-xs flex justify-center items-center"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
									>
										<path
											fill="currentColor"
											d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
										/>
									</svg>{" "}
								</button>
							</div>
						) : (
							""
						)}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="w-full mb-3">
								<div className="relative">
									<input
										type="text"
										placeholder=" "
										value={row.intensities}
										onChange={(e) =>
											handleChange(row.id, "intensities", e.target.value)
										}
										className="peer p-2 border border-primary rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
									/>
									<label className="text-xs absolute right-2 bg-white top-[-10px] text-gray-500 transition-all peer-focus:text-primary peer-placeholder-shown:top-[-10px] px-2 peer-placeholder-shown:text-gray-400">
										رخداد نامطلوب
									</label>
								</div>
							</div>
							<div className="w-full mb-3">
								<div className="relative w-full">
									<div className="peer p-2 border border-primary rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary">
										<DatePicker
											locale="fa"
											value={row.startDate}
											onChange={(value) =>
												handleChange(row.id, "startDate", value)
											}
											shouldHighlightWeekends
										/>
									</div>
									<label className="text-xs absolute right-2 bg-white top-[-10px] px-2 text-gray-500 transition-all peer-focus:text-primary peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400">
										تاریخ شروع
									</label>
								</div>
							</div>
							<div className="w-full mb-3 grid grid-cols-2 gap-4">
								<div className="relative mb-3 ">
									<select
										value={row.DurationTypeId}
										onChange={(e) =>
											handleChange(row.id, "DurationTypeId", e.target.value)
										}
										className="peer p-2 border border-primary rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary text-xs py-3"
									>
										<option value="" className="text-xs">
											یک مورد را انتخاب کنید
										</option>
										<option value="1" className="text-sm">
											ساعت
										</option>
										<option value="2" className="text-xs">
											روز
										</option>
										<option value="3" className="text-xs">
											مداوم
										</option>
									</select>
									<label className=" text-xs px-2 absolute bg-white right-2 top-[-10px] px-2 text-gray-500 transition-all peer-focus:text-primary peer-placeholder-shown:top-[-10px] peer-placeholder-shown:text-gray-400">
										واحد زمان رخداد
									</label>
								</div>
								<div className="relative mb-3">
									<input
										type="number"
										value={row.DurationValue}
										onChange={(e) =>
											handleChange(row.id, "DurationValue", e.target.value)
										}
										style={{
											appearance: "textfield",
											mozAppearance: "textfield",
											webkitAppearance: "none",
										}}
										className="peer p-2 border border-primary rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
									/>
									<label className=" text-xs absolute bg-white right-2 top-[-10px] px-2 text-gray-500 transition-all peer-focus:text-primary peer-placeholder-shown:top-[-10px] peer-placeholder-shown:text-gray-400">
										طول مدت رخداد
									</label>
								</div>
							</div>
							<div className="w-full mb-3">
								<div className="relative">
									<select
										value={row.severity}
										onChange={(e) =>
											handleChange(row.id, "severity", e.target.value)
										}
										className="text-xs peer p-3 border border-primary rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
									>
										<option value="" disabled className="text-sm">
											یک مورد را انتخاب کنید
										</option>
										<option value="1">خفیف</option>
										<option value="2">متوسط</option>
										<option value="3">شدید</option>
									</select>
									<label className="px-2 text-xs absolute right-2 bg-white top-[-10px] text-gray-500 transition-all peer-focus:text-primary peer-placeholder-shown:top-[-15px] peer-placeholder-shown:text-gray-400">
										شدت رخداد
									</label>
								</div>
							</div>
							<div className="w-full mb-3">
								<div className="relative">
									<select
										value={row.InterventionResultId}
										onChange={(e) =>
											handleChange(
												row.id,
												"InterventionResultId",
												e.target.value
											)
										}
										className=" text-xs peer p-2 border border-primary rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
									>
										<option value="">یک مورد را انتخاب کنید</option>
										{interventionResultId?.map((el) => {
											return <option value={el.Id}>{el.PersianTitle}</option>;
										})}
									</select>
									<label className="text-xs px-2 absolute right-2 bg-white  top-[-10px] text-gray-500 transition-all peer-focus:text-primary peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400">
										اقدام انجام شده
									</label>
								</div>
							</div>
						</div>
						<div className="w-full mb-3">
							<div className="relative ">
								<textarea
									placeholder=" "
									value={row.notes}
									onChange={(e) =>
										handleChange(row.id, "notes", e.target.value)
									}
									className="peer p-2 border border-primary rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
								/>
								<label className="absolute right-2 bg-white top-[-15px] text-gray-500 transition-all peer-focus:text-primary peer-placeholder-shown:top-[-15px] peer-placeholder-shown:text-gray-400">
									توضیحات
								</label>
							</div>
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
