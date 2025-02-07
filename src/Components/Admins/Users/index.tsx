import axios from "axios";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { CgUnblock } from "react-icons/cg";
import { LuFilter } from "react-icons/lu";
import { MdBlock, MdClose, MdEdit, MdSave, MdShortText } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";

function Users() {
    const [editId, setEditId] = useState<string | null>(null);
    const [visibleId, setVisibleId] = useState<string | null>(null);
    const [hoveredButton, setHoveredButton] = useState<string | null>(null);
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
    const [isFilterDropDownOpen, setIsFilterDropDownOpen] = useState<boolean>(false);
    const [selectedShort, setSelectedShort] = useState<string | null>(null);
    const [isShortDropDownOpen, setIsShortDropDownOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const usersPerPage = 5;

    interface User {
        _id: string;
        userType: string;
        firstName: string;
        lastName: string;
        email: string;
        mobileNumber: string[];
        createdAt: Date;
        blocked: boolean;
    }

    const [users, setUsers] = useState<User[]>([]);
    const [editedUserType, setEditedUserType] = useState<Partial<User>>({});

    // Fetch users on component mount
    useEffect(() => {
        const abortController = new AbortController();
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/user', {
                    signal: abortController.signal,
                });
                const usersData = response.data.map((user: any) => ({
                    ...user,
                    createdAt: new Date(user.createdAt),
                }));
                setUsers(usersData);
                setError(null);
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error("Error fetching users:", error);
                    setError("Failed to fetch users. Please try again later.");
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
        return () => abortController.abort();
    }, []);

    // Toggle block status of a user
    const toggleBlockStatus = async (id: string) => {
        try {
            const user = users.find((u) => u._id === id);
            await axios.put('/api/user', { _id: id, blocked: !user?.blocked });
            setUsers(users.map((user) =>
                user._id === id ? { ...user, blocked: !user.blocked } : user
            ));
        } catch (error) {
            console.error("Error updating block status:", error);
        }
    };

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

    // Sort and filter users
    const sortedUsers = () => {
        let usersToDisplay = [...users];

        // Filter by selected user type
        if (selectedFilter) {
            usersToDisplay = usersToDisplay.filter((user) => user.userType === selectedFilter);
        }

        // Filter by search query (name, email, or mobile number)
        if (searchQuery) {
            usersToDisplay = usersToDisplay.filter((user) => {
                const fullName = `${user.firstName || ""} ${user.lastName || ""}`.toLowerCase();
                const email = user.email ? user.email.toLowerCase() : "";
                const mobileNumbers = user.mobileNumber.join(", ").toLowerCase();

                return (
                    fullName.includes(searchQuery.toLowerCase()) ||
                    email.includes(searchQuery.toLowerCase()) ||
                    mobileNumbers.includes(searchQuery.toLowerCase())
                );
            });
        }

        // Sort users
        if (selectedShort === "new to old") {
            usersToDisplay.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        } else if (selectedShort === "old to new") {
            usersToDisplay.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        }

        return usersToDisplay;
    };

    const sortedUserList = sortedUsers();
    const totalPages = Math.ceil(sortedUserList.length / usersPerPage);
    const currentUsers = sortedUserList.slice(
        (currentPage - 1) * usersPerPage,
        currentPage * usersPerPage
    );

    // Handle pagination
    const handlePageClick = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    // Handle saving edited user
    const handleSave = async (id: string) => {
        try {
            await axios.put('/api/user', { _id: id, ...editedUserType });
            setUsers(users.map((user) =>
                user._id === id ? { ...user, ...editedUserType } : user
            ));
            setEditId(null);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    // Handle entering edit mode
    const handleEdit = (user: User) => {
        setEditId(user._id);
        setEditedUserType({ userType: user.userType });
    };

    if (isLoading) {
        return <p>Loading users...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="mt-10">
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
                        placeholder="Search by name, email, or mobile number..."
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

            {/* User List */}
            <div className="flex flex-wrap gap-4 ring-1 ring-gray-300 p-4 my-10 rounded-md">
                {currentUsers.length > 0 ? (
                    currentUsers.map((user, index) => (
                        <div
                            key={user._id}
                            onMouseEnter={() => setVisibleId(user._id)}
                            onMouseLeave={() => setVisibleId(null)}
                            className="ring-1 ring-gray-300 rounded-sm p-4 relative w-full"
                        >
                            <p className="text-primaryColor"><strong className="font-semibold">Id: </strong>{user._id}</p>
                            <p><strong className="font-semibold">Name: </strong> {`${user.firstName} ${user.lastName}`}</p>
                            <p><strong className="font-semibold">E-mail: </strong>{user.email || "<E-mail not added>"}</p>
                            <p><strong className="font-semibold">Mobile Numbers: </strong>{user.mobileNumber.join(", ")}</p>
                            <p><strong className="font-semibold">Role: </strong>
                                {editId === user._id ? (
                                    <input
                                        value={editedUserType.userType || ""}
                                        onChange={(e) => setEditedUserType({ ...editedUserType, userType: e.target.value })}
                                        className="border rounded px-2"
                                    />
                                ) : (
                                    user.userType
                                )}
                            </p>
                            <p><strong className="font-semibold">Created At: </strong>{user.createdAt.toLocaleDateString()}</p>

                            {/* Action Buttons */}
                            <div className={`absolute top-0 right-0 p-2 ${visibleId === user._id ? "opacity-100" : "opacity-0"} transition ease-in-out duration-500`}>
                                {visibleId === user._id && (
                                    <div className="flex gap-1 items-end">
                                        <div className="relative">
                                            <button
                                                onClick={() => editId === user._id ? handleSave(user._id) : handleEdit(user)}
                                                onMouseEnter={() => setHoveredButton(user._id + "-edit")}
                                                onMouseLeave={() => setHoveredButton(null)}
                                                className="flex items-center hover:bg-primaryColor hover:text-white p-1 rounded-md transition ease-in-out duration-500"
                                            >
                                                {editId === user._id ? <MdSave className="w-5 h-5" /> : <MdEdit className="w-5 h-5" />}
                                            </button>
                                            {hoveredButton === user._id + "-edit" && (
                                                <span className="absolute right-0 top-full mt-1 w-max bg-gray-800 text-white text-xs p-1 rounded">
                                                    {editId === user._id ? "Save Changes" : "Edit User"}
                                                </span>
                                            )}
                                        </div>

                                        <div className="relative">
                                            <button
                                                onClick={() => toggleBlockStatus(user._id)}
                                                onMouseEnter={() => setHoveredButton(user._id + "-block")}
                                                onMouseLeave={() => setHoveredButton(null)}
                                                className="flex items-center hover:bg-red-500 hover:text-white p-1 rounded-md transition ease-in-out duration-500"
                                            >
                                                {user.blocked ? <CgUnblock className="w-5 h-5" /> : <MdBlock className="w-5 h-5" />}
                                            </button>
                                            {hoveredButton === user._id + "-block" && (
                                                <span className="absolute right-0 top-full mt-1 w-max bg-gray-800 text-white text-xs p-1 rounded">
                                                    {user.blocked ? "Unblock User" : "Block User"}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <p className="absolute font-bold right-4 bottom-2">{index + 1}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center w-full">No users found.</p>
                )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-4">
                <button
                    className={`px-3 py-1 rounded-md ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-200"}`}
                    disabled={currentPage === 1}
                    onClick={() => handlePageClick(currentPage - 1)}
                >
                    Previous
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        className={`px-3 py-1 rounded-md ${currentPage === index + 1 ? "bg-primaryColor text-white" : "hover:bg-gray-200"}`}
                        onClick={() => handlePageClick(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    className={`px-3 py-1 rounded-md ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-200"}`}
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageClick(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Users;