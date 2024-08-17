import React, { useEffect, useState } from "react";
import DatePicker from "@amir04lm26/react-modern-calendar-date-picker";
import "@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css";
import moment from "jalali-moment";
import { useLazyGetIntensitiesQuery } from "../../resources/services/api/general.service";

const SymptonItem = ({ symptom }) => {
	console.log("mareza", symptom);
	const [formData, setFormData] = useState([{}]);

	const [fetch, { data }] = useLazyGetIntensitiesQuery({ id: symptom.id });
	const [insentitiesSeverity, setInsentitiesSeverity] = useState([]);

	useEffect(() => {
		fetch({ id: symptom.id });
	}, [symptom.id]);

	useEffect(() => {
		data?.map((el) => {
			insentitiesSeverity.push({
				id: el.Id,
				value: el.Title,
				label: el.PersianTitle,
				level: el.Level,
			});
		});
	}, [data]);
	const showingDate = (id) => {
		if (formData[id]?.OnsetDate) {
			const m = moment(formData[id]?.OnsetDate)
				?.format("jYYYY/jM/jD")
				.split("/");
			const year = +m[0];
			const month = +m[1]; // moment-jalaali month is 0-indexed, so add 1
			const day = +m[2];

			const dateObject = {
				year,
				month,
				day,
			};
			return dateObject;
		} else {
			return null;
		}
	};
	const handleChange = (id, field, value) => {
		const updatedData = [...formData];

		// Ensure that the object for this symptom exists in the array
		if (!updatedData[id]) {
			updatedData[id] = {};
		}

		updatedData[id][field] = value;
		setFormData(updatedData);
	};
	const defaultValue = null;

	return (
		<>
			<div className="mt-10 border border-primary rounded p-10">
				<div className="mb-10 font-bold text-center inline-block bg-gray-200 rounded w-full p-3">
					{symptom.label} - {symptom.enTitle}
				</div>
				<div key={symptom.id} className="grid grid-cols-1 md:grid-cols-1 gap-4">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
						<div className="w-full">
							<div className="relative mb-3 mt-5">
								<label className=" text-xs absolute top-[-10px] px-2 bg-white right-2 text-gray-500 transition-all peer-focus:text-primary peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400">
									تاریخ شروع
								</label>
								<div className="peer p-2 border border-primary rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary">
									<DatePicker
										locale="fa"
										value={
											formData[symptom.id]?.OnsetDate
												? showingDate(symptom.id)
												: defaultValue
										}
										onChange={(e) => {
											const date = new Date(
												moment.from(
													`${e.year}/${e.month}/${e.day}`,
													"fa"
													// "YYYY/MM/DD"
												)
											);
											handleChange(symptom.id, "OnsetDate", date);
										}}
										shouldHighlightWeekends
									/>
								</div>
							</div>
						</div>
						<div className="w-full grid grid-cols-2 gap-4">
							<div className="relative mb-3 mt-5">
								<select
									value={formData[symptom.id]?.DurationTypeId}
									onChange={(e) =>
										handleChange(symptom.id, "severity", e.target.value)
									}
									className="peer p-2 border border-primary rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary text-xs py-3"
								>
									<option value="" disabled className="text-xs">
										یک مورد را انتخاب کنید
									</option>
									<option value="ساعت" className="text-sm">
										ساعت
									</option>
									<option value="روز" className="text-xs">
										روز
									</option>
									<option value="مداوم" className="text-xs">
										مداوم
									</option>
								</select>
								<label className=" text-xs absolute bg-white right-2 top-[-10px] px-2 text-gray-500 transition-all peer-focus:text-primary peer-placeholder-shown:top-[-10px] peer-placeholder-shown:text-gray-400">
									واحد زمان رخداد
								</label>
							</div>
							<div className="relative mb-3 mt-5">
								<input
									type="text"
									placeholder=" "
									value={formData[symptom.id]?.DurationTypeId}
									onChange={(e) =>
										handleChange(symptom.id, "duration", e.target.value)
									}
									className="peer p-2 border border-primary rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
								/>
								<label className=" text-xs absolute bg-white right-2 top-[-10px] px-2 text-gray-500 transition-all peer-focus:text-primary peer-placeholder-shown:top-[-10px] peer-placeholder-shown:text-gray-400">
									طول مدت رخداد
								</label>
							</div>
						</div>
						<div className="w-full">
							<div className="relative mb-3 mt-5">
								<select
									value={formData[symptom.id]?.IntensityTitle}
									onChange={(e) =>
										handleChange(symptom.id, "severity", e.target.value)
									}
									className="peer p-2 border border-primary rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
								>
									<option value="" disabled>
										یک مورد را انتخاب کنید
									</option>
									{insentitiesSeverity?.map((el) => {
										console.log(el);
										return <option value={el.value}>{el.label}</option>;
									})}
									{/* <option value="Grad 1">خفیف</option>
									<option value="Grad 2">متوسط</option>
									<option value="Grad 3">شدید</option> */}
								</select>
								<label className="text-xs bg-white absolute right-2 top-[-10px] px-2 text-gray-500 transition-all peer-focus:text-primary peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400">
									شدت رخداد
								</label>
							</div>
						</div>
						<div className="w-full">
							<div className="relative mb-3 mt-5">
								<select
									value={formData[symptom.id]?.OnsetDate}
									onChange={(e) =>
										handleChange(symptom.id, "actionsTaken", e.target.value)
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
								<label className=" text-xs bg-white absolute right-2 top-[-10px] px-2 text-gray-500 transition-all peer-focus:text-primary peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400">
									اقدام انجام شده
								</label>
							</div>
						</div>
					</div>
					<div className="">
						<textarea
							placeholder="توضیحات"
							value={formData[symptom.id]?.OnsetDates}
							onChange={(e) =>
								handleChange(symptom.id, "notes", e.target.value)
							}
							className="w-full p-2 border border-primary rounded-md mb-3 col-span-5"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default SymptonItem;
