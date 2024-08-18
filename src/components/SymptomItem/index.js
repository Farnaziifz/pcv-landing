import React, { useEffect, useState } from "react";
import DatePicker from "@amir04lm26/react-modern-calendar-date-picker";
import "@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css";
import moment from "jalali-moment";
import {
	useLazyGetIntensitiesQuery,
	useGetInterventionResultQuery,
} from "../../resources/services/api/general.service";

const SymptonItem = ({ symptom }) => {
	const [fetch, { data }] = useLazyGetIntensitiesQuery({ id: symptom.id });
	const { data: interventionResultId } = useGetInterventionResultQuery();
	const [insentitiesSeverity, setInsentitiesSeverity] = useState([]);
	const [date, setDate] = useState();

	useEffect(() => {
		fetch({ id: symptom.id });
	}, [symptom.id]);

	useEffect(() => {
		setInsentitiesSeverity([]);
		const insentities = data?.map((el) => {
			return {
				id: el.Id,
				value: el.Title,
				label: el.PersianTitle,
				level: el.Level,
			};
		});
		setInsentitiesSeverity(insentities);
	}, [data]);

	const updateSelectedDate = () => {
		if (symptom.OnsetDate) {
			const m = moment(symptom.OnsetDate)?.format("jYYYY/jM/jD").split("/");
			const year = +m[0];
			const month = +m[1];
			const day = +m[2];

			const dateObject = {
				year,
				month,
				day,
			};
			setDate(dateObject);
		} else {
			return null;
		}
	};
	const handleChange = (id, field, value) => {
		symptom[field] = value;
	};

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
								<label className="text-xs absolute top-[-10px] px-2 bg-white right-2 text-gray-500 transition-all peer-focus:text-primary peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400">
									تاریخ شروع
								</label>
								<div className="peer p-2 border border-primary rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary">
									<DatePicker
										locale="fa"
										value={date}
										onChange={(e) => {
											const date = new Date(
												moment.from(
													`${e.year}/${e.month}/${e.day}`,
													"fa"
													// "YYYY/MM/DD"
												)
											).toString();

											handleChange(symptom.id, "OnsetDate", date);
											updateSelectedDate();
										}}
										shouldHighlightWeekends
									/>
								</div>
							</div>
						</div>
						<div className="w-full grid grid-cols-2 gap-4">
							<div className="relative mb-3 mt-5">
								<select
									value={symptom.DurationTypeId}
									onChange={(e) =>
										handleChange(symptom.id, "severity", e.target.value)
									}
									className="peer p-2 border border-primary rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary text-xs py-3"
								>
									<option value="" disabled className="text-xs">
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
								<label className=" text-xs absolute bg-white right-2 top-[-10px] px-2 text-gray-500 transition-all peer-focus:text-primary peer-placeholder-shown:top-[-10px] peer-placeholder-shown:text-gray-400">
									واحد زمان رخداد
								</label>
							</div>
							<div className="relative mb-3 mt-5">
								<input
									type="number"
									value={symptom.DurationTypeId}
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
									value={symptom.IntensityTitle}
									onChange={(e) =>
										handleChange(symptom.id, "severity", e.target.value)
									}
									className="text-xs peer p-2 border border-primary rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
								>
									<option value="">یک مورد را انتخاب کنید</option>
									{insentitiesSeverity?.map((el) => {
										return <option value={el.value}>{el.label}</option>;
									})}
								</select>
								<label className="text-xs bg-white absolute right-2 top-[-10px] px-2 text-gray-500 transition-all peer-focus:text-primary peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400">
									شدت رخداد
								</label>
							</div>
						</div>
						<div className="w-full">
							<div className="relative mb-3 mt-5">
								<select
									value={symptom.InterventionResultId}
									onChange={(e) =>
										handleChange(
											symptom.id,
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
								<label className=" text-xs bg-white absolute right-2 top-[-10px] px-2 text-gray-500 transition-all peer-focus:text-primary peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400">
									اقدام انجام شده
								</label>
							</div>
						</div>
					</div>
					<div className="">
						<textarea
							placeholder="توضیحات"
							value={symptom.OnsetDates}
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
