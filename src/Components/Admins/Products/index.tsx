import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi';
import { LuFilter } from 'react-icons/lu';
import { MdClose, MdShortText } from 'react-icons/md';
import { RiArrowDropDownLine } from 'react-icons/ri';

function Products() {
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
    const [isFilterDropDownOpen, setIsFilterDropDownOpen] = useState<boolean>(false);
    const [selectedShort, setSelectedShort] = useState<string | null>(null);
    const [isShortDropDownOpen, setIsShortDropDownOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const usersPerPage = 5;

    interface Product {
        createdAt: any;
        _id: string;
        productImages: string[];
        productName: string;
        productDescription: string;
        price: {
            newPrice: number;
            oldPrice: number;
        };
        categories: string[];
        harvestingDate: Date;
        agricationMethod: string;
        freeDelivery: boolean;
    }

    // Handle filter dropdown
    const handleFilterDropDown = () => setIsFilterDropDownOpen((prev) => !prev);
    const handleFilterSelection = (userType: string) => {
        setSelectedFilter(userType);
        setIsFilterDropDownOpen(false);
    };
    const clearFilter = () => setSelectedFilter(null);

    // Handle sort dropdown
    const handleShortDropDown = () => setIsShortDropDownOpen((prev) => !prev);
    const handleShortSelection = (short: string) => {
        setSelectedShort(short);
        setIsShortDropDownOpen(false);
    };
    const clearShort = () => setSelectedShort(null);

    // Debounced search
    const debounce = (func: Function, delay: number) => {
        let timeoutId: NodeJS.Timeout;
        return (...args: any[]) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        };
    };

    const handleSearch = debounce((query: string) => {
        setSearchQuery(query);
    }, 300);

    if (isLoading) {
        return <p>Loading products...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }
    return (
        <div className='ring-1 ring-gray-500 p-4 w-full'>
            <div className="flex w-full justify-between">
                {/* Filter Dropdown */}
                <div className="relative flex gap-2">
                    <button
                        aria-label="Filter"
                        className="flex gap-2 items-center ring-1 ring-gray-500 px-4 rounded-xl hover:bg-primaryColor hover:text-white hover:ring-primaryColor transition ease-in-out duration-500"
                        onClick={handleFilterDropDown}
                    >
                        <LuFilter />
                        Filter
                        <RiArrowDropDownLine className="text-2xl" />
                    </button>
                    {isFilterDropDownOpen && (
                        <div className="flex flex-col items-start w-max absolute top-12 left-0 bg-white py-2 px-2 gap-1 rounded-md drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] z-50">
                            <button onClick={() => handleFilterSelection("consumer")} className="hover:bg-primaryColor hover:text-white px-2 py-[2px] w-full text-start rounded-md transition ease-in-out duration-500">Consumers</button>
                            <button onClick={() => handleFilterSelection("seller")} className="hover:bg-primaryColor hover:text-white px-2 py-[2px] w-full text-start rounded-md transition ease-in-out duration-500">Sellers</button>
                            <button onClick={() => handleFilterSelection("delivery partner")} className="hover:bg-primaryColor hover:text-white px-2 py-[2px] w-full text-start rounded-md transition ease-in-out duration-500">Delivery Partners</button>
                            <button onClick={() => handleFilterSelection("delivery person")} className="hover:bg-primaryColor hover:text-white px-2 py-[2px] w-full text-start rounded-md transition ease-in-out duration-500">Delivery Persons</button>
                            <button onClick={() => handleFilterSelection("admin")} className="hover:bg-primaryColor hover:text-white px-2 py-[2px] w-full text-start rounded-md transition ease-in-out duration-500">Admins</button>
                        </div>
                    )}
                    {selectedFilter && (
                        <div className="flex items-center gap-2 px-4 h-full rounded-xl bg-gray-200 ring-1 ring-gray-200 text-gray-700">
                            <p className="font-semibold">{selectedFilter}</p>
                            <MdClose
                                className="text-xl cursor-pointer hover:text-red-500"
                                onClick={clearFilter}
                            />
                        </div>
                    )}
                </div>

                {/* Search Bar */}
                <form className="flex items-center ring-1 ring-gray-500 px-4 rounded-xl overflow-hidden">
                    <input
                        type="search"
                        placeholder="Search by product name, price, or categories..."
                        className="outline-none py-2 w-96"
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <button aria-label="Search" className="flex items-center justify-center cursor-pointer h-full">
                        <BiSearch />
                    </button>
                </form>

                {/* Sort Dropdown */}
                <div className="relative flex gap-2">
                    {selectedShort && (
                        <div className="flex items-center gap-2 px-4 h-full rounded-xl bg-gray-200 ring-1 ring-gray-200 text-gray-700">
                            <p className="font-semibold">{selectedShort}</p>
                            <MdClose
                                className="text-xl cursor-pointer hover:text-red-500"
                                onClick={clearShort}
                            />
                        </div>
                    )}
                    <button
                        aria-label="Sort"
                        className="flex gap-2 items-center ring-1 ring-gray-500 px-4 rounded-xl hover:bg-primaryColor hover:text-white hover:ring-primaryColor transition ease-in-out duration-500"
                        onClick={handleShortDropDown}
                    >
                        <RiArrowDropDownLine className="text-2xl" />
                        Sort
                        <MdShortText className="text-xl" />
                    </button>
                    {isShortDropDownOpen && (
                        <div className="flex flex-col w-max absolute top-12 right-0 bg-white items-start py-2 px-2 gap-1 rounded-md drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] z-50">
                            <button onClick={() => handleShortSelection("new to old")} className="hover:bg-primaryColor hover:text-white px-2 py-[2px] w-full text-start rounded-md transition ease-in-out duration-500">New to old</button>
                            <button onClick={() => handleShortSelection("old to new")} className="hover:bg-primaryColor hover:text-white px-2 py-[2px] w-full text-start rounded-md transition ease-in-out duration-500">Old to new</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Products
