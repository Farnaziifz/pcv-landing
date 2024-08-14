import React, { useState, useRef } from "react";

const CustomSelect = ({ options, value = [], onChange, placeholder }) => {
	const [isOpen, setIsOpen] = useState(false);
	const wrapperRef = useRef(null);

	const handleSelect = (option) => {
		if (value.some((selected) => selected.id === option.id)) {
			// If option is already selected, remove it
			onChange(value.filter((selected) => selected.id !== option.id));
		} else {
			// Otherwise, add it to the selected options
			onChange([...value, option]);
		}
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
				{value.length > 0 ? (
					<div className="flex flex-wrap gap-2">
						{value.map((selected) => (
							<div
								key={selected.id}
								className="bg-blue-500 text-white px-2 py-1 rounded-lg flex items-center gap-1"
							>
								{selected.label}
								<button
									onClick={(e) => {
										e.stopPropagation();
										onChange(value.filter((v) => v.id !== selected.id));
									}}
									className="text-white hover:text-red-500"
								>
									&times;
								</button>
							</div>
						))}
					</div>
				) : (
					placeholder
				)}
			</div>
			{isOpen && (
				<div className="absolute z-[10000] w-full mt-1 bg-white border rounded-lg shadow-lg">
					<ul className="max-h-60 overflow-y-auto">
						{options.map((option) => (
							<li
								key={option.id}
								className={`p-2 hover:bg-gray-200 cursor-pointer ${
									value.some((selected) => selected.id === option.id)
										? "bg-blue-100"
										: ""
								}`}
								onClick={() => handleSelect(option)}
							>
								{option.label}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default CustomSelect;
