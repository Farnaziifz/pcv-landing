import {
	useGetSolicitedSsymptomsQuery,
	useCreateAdverseEventMutation,
} from "../../resources/services/api/general.service";
import SymptomItem from "../SymptomItem/index";
import React, { useEffect, useState } from "react";
import CustomSelect from "../selectBox";
import moment from "jalali-moment";
import { toast } from "react-toastify"; // Assuming you are using react-toastify for toast notifications
import { useNavigate } from "react-router-dom"; // or 'react-router-dom' if you use that

function SymptomSolitedForm() {
	const { data } = useGetSolicitedSsymptomsQuery();
	const [symptoms, setSymptom] = useState([]);
	const [create] = useCreateAdverseEventMutation();
	const router = useNavigate();
	useEffect(() => {
		if (data) {
			const symptoms = data.map((el) => ({
				id: el.Id,
				label: el.PersianTitle,
				enTitle: el.Title,
			}));
			setSymptom(symptoms);
		}
	}, [data]);

	const [selectedSymptoms, setSelectedSymptoms] = useState([]);

	const submitForm = async () => {
		try {
			const changed = selectedSymptoms.map((el) => {
				const model = {
					lltId: el.id,
					lltTitle: el.enTitle,
					InterventionResultId: +el.InterventionResultId,
					OnsetDate: (() => {
						if (
							!el.OnsetDate?.year ||
							!el.OnsetDate?.month ||
							!el.OnsetDate?.day
						) {
							return moment().format("YYYY-MM-DDTHH:mm:ss");
						}

						return moment
							.from(
								`${el.OnsetDate.year}/${el.OnsetDate.month}/${el.OnsetDate.day}`,
								"fa",
								"YYYY/MM/DD"
							)
							.locale("en")
							.format("YYYY-MM-DDTHH:mm:ss");
					})(),
					DurationValue: +el.DurationValue,
					Description: (() => {
						let desc = "";
						if (el.feverDegree?.length) {
							desc += ` درجه تب:  ${el.feverDegree} - ${el.notes}`;
						}
						return desc;
					})(),
					DurationTypeId: +el.DurationTypeId,
					IntensityValue: el.severity ? +el.severity.split("-")[1] : "",
					IntensityTitle: el.severity ? el.severity.split("-")[0] : "",
				};
				return model;
			});

			await create(changed).unwrap();

			router("/finished");
		} catch (error) {
			toast.error("خطایی رخ داده است. دوباره امتحان کنید");
		}
	};
	return (
		<div className="mt-15">
			<CustomSelect
				options={symptoms}
				value={selectedSymptoms}
				onChange={setSelectedSymptoms}
				placeholder="علایم مورد نظر را انتخاب کنید..."
			/>
			{selectedSymptoms?.length > 0
				? selectedSymptoms?.map((symptom) => <SymptomItem symptom={symptom} />)
				: ""}
			<div className="flex justify-end mt-4 w-full">
				<button
					className="px-4 py-2 bg-primary rounded text-white"
					onClick={submitForm}
				>
					ارسال علایم
				</button>
			</div>
		</div>
	);
}

export default SymptomSolitedForm;
