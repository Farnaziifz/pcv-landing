import SymptomSolitedForm from "../../components/SymptomSolicitedComponent/index";
import AdverseEventForm from "../../components/AdverseEventForm";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Forms() {
	const [isSolited, setIsSolited] = useState(true);
	const params = useParams();
	useEffect(() => {
		params.formType == 0 ? setIsSolited(true) : setIsSolited(false);
	}, [params.formType]);
	return (
		<main className="w-full lg:mt-10 p-6 bg-white shadow-md rounded-md">
			<div className="mt-10">
				{isSolited ? <SymptomSolitedForm /> : <AdverseEventForm />}
			</div>
		</main>
	);
}

export default Forms;
