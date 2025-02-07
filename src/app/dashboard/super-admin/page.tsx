'use client'

import { useEffect, useState, JSX } from "react";
import UserDashboard from "../../../Components/User Dashboard Controller/UserDashboardController";
import axios from "axios";
import { useRouter } from "next/navigation";
import Deliveries from "../../../Components/Admins/Deliveries";
import Users from "../../../Components/Admins/Users";
import Products from "../../../Components/Admins/Products";
import Orders from "../../../Components/Admins/Orders";
import Payments from "../../../Components/Admins/Payments";
import Offers from "../../../Components/Admins/Offers";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";

type UserDataType = {
  id: string;
  name: string;
  email: string;
  userType: string;
  mobileNumber: number[];
  firstName: string;
  lastName: string;
  updatedAt: string;
};

const adminDashboard = () => {
  const [UserData, setUserData] = useState<UserDataType | null>(null);
  const [activePanel, setActivePanel] = useState<string>("Users");


  const router = useRouter();

  useEffect(() => {
    const findUser = async () => {
      const response = await axios.get('/api/cookie');
      if (response.status === 200 && response.data.user.userType !== 'super-admin') {
        router.push('/')
      }

      if (response.status === 200 && response.data.user.userType === 'super-admin') {
        const id = response.data.user.id;
        const superAdmin = await axios.post('/api/user/get-user', {
          userId: id
        });

        setUserData(superAdmin.data.user);
      }
    }

    findUser()
  }, [])

  const panels = ["Users", "Products", "Orders", "Payments", "Deliveries", "Offers"];

  const panelComponents: { [key: string]: JSX.Element } = {
    Users: <Users />,
    Products: <Products />,
    Orders: <Orders />,
    Payments: <Payments />,
    Deliveries: <Deliveries />,
    Offers: <Offers />
  };

  const handlePanelClick = (panel: string) => {
    setActivePanel(panel);
  }

  return (
    <div>
      <div className="sticky top-0 z-50">
        <Navbar />
        <hr />
      </div>
      <div className="mx-60">
        <div className="flex justify-between mt-10 gap-[1px]">
          {panels.map((panel) => (
            <button
              key={panel}
              onClick={() => handlePanelClick(panel)}
              className={`px-4 w-full py-2 border rounded-sm ${activePanel === panel ? 'text-white bg-primaryColor' : 'text-primaryColor'} transition ease-in-out duration-500`}
            >
              {panel}
            </button>
          ))}
        </div>
        {panelComponents[activePanel]}
      </div>
      <Footer />
    </div>
  )
}

export default adminDashboard;
