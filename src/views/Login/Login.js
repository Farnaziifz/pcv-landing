import { useState } from "react";
import { useRegisterUserMutation } from "../../resources/services/api/general.service";

function Login() {
	const [nationalId, setNationalId] = useState("");
	const [mobileNumber, setMobileNumber] = useState("");
	const [registerUser] = useRegisterUserMutation();

	const handleSubmit = () => {
		registerUser({ phoneNumber: mobileNumber, natiohnalCode: nationalId });
		// setFormVisible(true);
	};
	return (
		<main className="w-[360px] mt-10 p-6 bg-white shadow-md rounded-md">
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
		</main>
	);
}

export default Login;
