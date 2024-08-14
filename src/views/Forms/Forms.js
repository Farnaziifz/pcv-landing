import SymptomSolitedForm from "../../components/SymptomSolicitedComponent/index";
import AdverseEventForm from "../../components/AdverseEventForm";
import { useState } from "react";

function Forms() {
	const [isSolited, setIsSolited] = useState(true);

	return (
		<main className="w-full lg:mt-10 p-6 bg-white shadow-md rounded-md">
			<div className="mt-10">
				{isSolited ? <SymptomSolitedForm /> : <AdverseEventForm />}
			</div>
		</main>
	);
}

export default Forms;
