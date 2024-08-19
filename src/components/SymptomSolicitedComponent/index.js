import {
	useGetSolicitedSsymptomsQuery,
	useCreateAdverseEventMutation,
} from "../../resources/services/api/general.service";
import SymptomItem from "../SymptomItem/index";
import React, { useEffect, useState } from "react";
import CustomSelect from "../selectBox";
import moment from "jalali-moment";

function SymptomSolitedForm() {
	const { data } = useGetSolicitedSsymptomsQuery();
	const [symptoms, setSymptom] = useState([]);
	const [create] = useCreateAdverseEventMutation();
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

	const submitForm = () => {
		const changed = selectedSymptoms.map((el) => {
			const model = {
				lltId: el.id,
				lltTitle: el.enTitle,
				InterventionResultId: +el.InterventionResultId,
				OnsetDate: moment
					.from(
						`${el.OnsetDate?.year}/${el.OnsetDate?.month}/${el.OnsetDate?.day}`,
						"fa",
						"YYYY/MM/DD"
					)
					.locale("en")
					.format("YYYY-MM-DDTHH:mm:ss"),

				DurationValue: +el.DurationValue,
				Description: el.notes,
				DurationTypeId: +el.DurationTypeId,
				IntensityValue: el.severity ? +el.severity.split("-")[1] : "",
				IntensityTitle: el.severity ? el.severity.split("-")[0] : "",
			};
			return model;
		});
		create(changed);
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
