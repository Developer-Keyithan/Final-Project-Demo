'use client'

import Footer from "../../../Components/Footer/Footer";
import Navbar from "../../../Components/Navbar/Navbar";

const userDashboard = () => {
  return (
    <div>
      <div className="sticky top-0 z-50">
        <Navbar />
        <hr />
      </div>
      <div>
        <h1>Admin Dashboard</h1>
      </div>
      <Footer />
    </div>
  )
}

export default userDashboard;