"use client";

import { Search, CameraIcon } from "lucide-react";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { useState } from "react";

interface SearchBarProps {
	className?: string;
	placeholder?: string;
	type?: string;
	onSearch?: (searchTerm: string) => void; // Callback to pass the search term
}

export function SearchBar({
	className,
	placeholder = "Trouver un produit",
	type,
	onSearch, // Optional callback to return the keyword
	...props
}: SearchBarProps) {
	const [inputValue, setInputValue] = useState("");
	const handleSearch = () => {
		if (onSearch) {
			onSearch(inputValue); // Pass the input value to the parent when search is triggered
		}
	};
	return (
		<div className='relative w-full md:w-3/4 mx-0 md:mx-auto my-4'>
			<Input
				placeholder={placeholder}
				value={inputValue}
				onChange={(e) => {
					setInputValue(e.target.value);
					handleSearch();
				}} // Update local state
				className='pl-8 focus:border-[#D41C7B] active:border-[#D41C7B]'
			/>
			<Button
				variant='ghost'
				className={`absolute right-${
					type === "produit" ? "6" : "0"
				} top-0 rounded-full md:right-${
					type === "produit" ? "14" : "0"
				} top-0 rounded-full`}
				onClick={handleSearch} // Trigger search on button click
			>
				<Search />
			</Button>
			{/* {type === "produit" && (
				<Button
					variant='ghost'
					className='absolute right-0 md:right-0 top-0 rounded-full '
				>
					<CameraIcon />
				</Button>
			)} */}
		</div>
	);
}
