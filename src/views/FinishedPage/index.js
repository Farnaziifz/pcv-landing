import { useNavigate } from "react-router-dom";
function FinishedPgae() {
	const navigate = useNavigate();
	const goToMain = () => {
		navigate("/login");
		window.localStorage.removeItem("nationalId");
		window.localStorage.removeItem("phoneNumber");
	};
	return (
		<main className="w-[360px] mt-10 p-6 bg-white shadow-md rounded-md text-center">
			<p className="text-xl mb-4 font-bold"> با تشکر.</p>
			<p className="mb-3">اطلاعات شما با موفقیت ثبت شد.</p>
			کارشناسان ما همراه شما هستند.
			<button
				className="bg-primary text-white px-3 py-1 mt-5 rounded"
				onClick={goToMain}
			>
				بازگشت به صفحه اصلی
			</button>
		</main>
	);
}

export default FinishedPgae;
