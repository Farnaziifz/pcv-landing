import {
	useGetSolicitedSsymptomsQuery,
	useCreateAdverseEventMutation,
} from "../../resources/services/api/general.service";
import SymptomItem from "../SymptomItem/index";
import React, { useEffect, useState } from "react";
import CustomSelect from "../selectBox";

function SymptomSolitedForm() {
	const { data } = useGetSolicitedSsymptomsQuery();
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

	const submitForm = () => {
		console.log(selectedSymptoms);
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
