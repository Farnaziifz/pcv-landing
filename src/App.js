import { useState } from "react";
import logo from "./assets/image/orchid-logo-light.svg";
import SymptomSolitedForm from "./components/SymptomSolicitedComponent";
import AdverseEventForm from "./components/AdverseEventForm";
function App() {
	const [nationalId, setNationalId] = useState("");
	const [mobileNumber, setMobileNumber] = useState("");
	const [formVisible, setFormVisible] = useState(false);
	const [isSolited, setIsSolited] = useState(false);
	const handleSubmit = () => {
		// API call to backend
		// If successful, show the form
		setFormVisible(true);
	};
	return (
		<div className="min-h-screen bg-primary flex flex-col items-center px-3 lg:px-10 pb-10">
			<header className="mt-10">
				<img src={logo} alt="Orchid Pharmed" className="h-20" />
			</header>
			<main className="w-full lg: mt-10 p-6 bg-white shadow-md rounded-md">
				{!formVisible ? (
					<div className="flex flex-col space-y-4">
						<input
							type="text"
							placeholder="کد ملی"
							value={nationalId}
							onChange={(e) => setNationalId(e.target.value)}
							className="p-2 border border-blue-500 rounded-md"
						/>
						<input
							type="text"
							placeholder="شماره موبایل"
							value={mobileNumber}
							onChange={(e) => setMobileNumber(e.target.value)}
							className="p-2 border border-blue-500 rounded-md"
						/>
						<button
							onClick={handleSubmit}
							className="bg-blue-500 text-white py-2 rounded-md"
						>
							ثبت
						</button>
					</div>
				) : (
					<div className="mt-10">
						{isSolited ? <SymptomSolitedForm /> : <AdverseEventForm />}
					</div>
				)}
			</main>
		</div>
	);
}

export default App;
