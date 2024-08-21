import { useState } from "react";
import { useRegisterUserMutation } from "../../resources/services/api/general.service";
import { useNavigate } from "react-router-dom";

function Login() {
	const navigate = useNavigate();

	const [nationalId, setNationalId] = useState("");
	const [mobileNumber, setMobileNumber] = useState("");
	const [registerUser] = useRegisterUserMutation();

	const handleSubmit = async () => {
		if (checkMobile()) {
			try {
				const response = await registerUser({
					phoneNumber: mobileNumber,
					nationalCode: nationalId,
				}).unwrap();
				window.localStorage.setItem("phoneNumber", mobileNumber);
				window.localStorage.setItem("nationalId", nationalId);

				const { FormType } = response;

				navigate(`/forms/${FormType}`, { state: { nationalId, mobileNumber } });
			} catch (error) {
				console.error("Failed to register user:", error);
			}
		} else {
			alert("شماره موبایل باید 11 رقم باشد و با 09 شروع شود");
		}
	};
	const checkMobile = () => {
		if (!/^09\d{9}$/.test(mobileNumber)) {
			return false;
		}
		return true;
	};
	return (
		<main className="w-[360px] mt-10 p-6 bg-white shadow-md rounded-md">
			<div className="flex flex-col space-y-4">
				<input
					type="number"
					placeholder="کد ملی"
					value={nationalId}
					onChange={(e) => setNationalId(e.target.value)}
					className="p-2 border border-blue-500 rounded-md"
				/>
				<input
					type="number"
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
