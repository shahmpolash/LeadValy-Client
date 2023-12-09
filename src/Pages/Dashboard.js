import React from "react";

import BuyerDashboard from "./Buyer/BuyerDashboard";
import SellerDashboard from "./Seller/SellerDashboard";
import UpdateYourProfile from "./UpdateYourProfile";

const Dashboard = () => {



  return (
    <div>
      <SellerDashboard></SellerDashboard>
      <BuyerDashboard></BuyerDashboard>
      <UpdateYourProfile></UpdateYourProfile>
    </div>
  );
};

export default Dashboard;
