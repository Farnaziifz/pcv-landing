import { useGetSolicitedSsymptomsQuery } from "../../resources/services/api/general.service";
import moment from "jalali-moment";
import SymptomItem from "../SymptomItem/index";
import React, { useEffect, useState } from "react";
import CustomSelect from "../selectBox";

function SymptomSolitedForm() {
	const [formData, setFormData] = useState([{}]);

	const mapSeverityToValue = (severity) => {
		switch (severity) {
			case "خفیف":
				return 1; // Example: Grade 1
			case "متوسط":
				return 2; // Example: Grade 2
			case "شدید":
				return 3; // Example: Grade 3
			default:
				return 0; // Default or unknown
		}
	};

	const mapDurationToId = (durationType) => {
		switch (durationType) {
			case "ساعت":
				return 1;
			case "روز":
				return 2;
			case "مداوم":
				return 3;
			default:
				return 0;
		}
	};

	const mapInterventionToId = (intervention) => {
		switch (intervention) {
			case "اقدام نشده":
				return 1;
			case "درمان دارویی":
				return 2;
			case "درمان غیر دارویی":
				return 3;
			default:
				return 0;
		}
	};
	const { data, isLoading } = useGetSolicitedSsymptomsQuery();
	const [symptoms, setSymptom] = useState([]);

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

	const formatOnsetDate = (date) => {
		return moment(date).format("YYYY-MM-DDTHH:mm:ss");
	};
	const submitForm = () => {
		const finalData = selectedSymptoms.map((symptom) => {
			const data = formData[symptom.id] || {};
			const nowDate = new Date();
			return {
				lltId: symptom.id,
				lltTitle: symptom.enTitle,
				IntensityTitle: data.severity || "",
				IntensityValue: mapSeverityToValue(data.severity),
				DurationTypeId: mapDurationToId(data.durationType),
				DurationValue: data.duration || "",
				OnsetDate: formatOnsetDate(data.OnsetDate) || nowDate.getDate(),
				Description: data.notes || "",
				InterventionResultId: mapInterventionToId(data.actionsTaken),
			};
		});

		console.log(finalData);
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
