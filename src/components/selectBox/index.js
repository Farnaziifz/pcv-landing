import React, { useState, useRef } from "react";

const CustomSelect = ({ options, value, onChange, placeholder }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const wrapperRef = useRef(null);

	const filteredOptions = options?.filter((option) =>
		option.fullname.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleSelect = (option) => {
		onChange(option);
		setIsOpen(false);
		setSearchTerm("");
	};

	const handleClickOutside = (event) => {
		if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
			setIsOpen(false);
		}
	};

	React.useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div ref={wrapperRef} className="relative w-full">
			<div
				className="border rounded-lg py-2 px-3 bg-white cursor-pointer"
				onClick={() => setIsOpen(!isOpen)}
			>
				{value ? value.fullname : placeholder}
			</div>
			{isOpen && (
				<div className="absolute z-[10000] w-full mt-1 bg-white border rounded-lg shadow-lg">
					<input
						type="text"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder="جستجو..."
						className="w-full p-2 border-b"
					/>
					<ul className="max-h-60 overflow-y-auto">
						{filteredOptions.map((option) => (
							<li
								key={option.contactid}
								className="p-2 hover:bg-gray-200 cursor-pointer"
								onClick={() => handleSelect(option)}
							>
								{option.fullname}
							</li>
						))}
						{filteredOptions.length === 0 && (
							<li className="p-2 text-gray-500">نتیجه ای یافت نشد</li>
						)}
					</ul>
				</div>
			)}
		</div>
	);
};

export default CustomSelect;
