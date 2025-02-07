'use client'

import { useState, useEffect, JSX } from "react";
import UserDashboard from "../../Components/User Dashboard Controller/UserDashboardController";
import UserData from "../../Data/User";
import AddressData from "../../Data/AddressData";
import Delivered from "../../Components/Delivered/Delivered";
import Cancelled from "../../Components/Cancelled/Cancelled";
import Loader from "../../Components/Loader/Loader";
import axios from "axios";
import router, { useRouter } from "next/navigation";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

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

const DashboardPage = () => {
  const [activePanel, setActivePanel] = useState<string>("Delivered");
  const [loading, setLoading] = useState<boolean>(true);
  const [UserData, setUserData] = useState()

  const router = useRouter();

  useEffect(() => {
    const findUser = async () => {
      const response = await axios.get('/api/cookie');


      if (response.status === 200 && response.data.user.userType !== 'consumer') {
        router.push('/')
      }

      if (response.status === 200 && response.data.user.userType === 'consumer') {
        const id = response.data.user.id;
        const superAdmin = await axios.post('/api/user/get-user', {
          userId: id
        });

        setUserData(superAdmin.data.user);
      }
    }

    findUser()
  }, [])

  const panelComponents: { [key: string]: JSX.Element } = {
    Delivered: <Delivered />,
    Cancelled: <Cancelled />,
    // You can add more panels here as your app grows
  };

  const panels = ["Delivered", "Tracking", "Reviews", "Messages", "Cancelled", "Saved Data"];

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
        {UserData && <UserDashboard User={UserData} activePanel={activePanel} onPanelClick={handlePanelClick} panels={panels} />}
        {panelComponents[activePanel]}
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;
