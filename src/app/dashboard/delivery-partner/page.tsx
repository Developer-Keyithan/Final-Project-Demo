'use client'

import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";

const userDashboard = () => {
  return (
    <div>
      <div className="sticky top-0 z-50">
        <Navbar />
        <hr />
      </div>
      <div>
        <h1>Delivery Partner Dashboard</h1>
      </div>
      <Footer />
    </div>
  )
}

export default userDashboard;