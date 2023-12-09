import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../components/Shared/AdminSidebar";
import AdminHeader from "../../components/Shared/AdminHeader";
import auth from "../../firebase.init";

const EditBuyer = () => {
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [updateBuyer, setUpdateBuyer] = useState([]);

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/buyer/${id}`)
      .then((res) => res.json())
      .then((result) => setUpdateBuyer(result));
  }, []);

  const handleBuyer = (event) => {
    event.preventDefault();
    const buyerFullName = event.target.buyerFullName.value;
    const buyerProfileImage = event.target.buyerProfileImage.value;
    const currentBalance = event.target.currentBalance.value;
    const address = event.target.address.value;
    const city = event.target.city.value;
    const country = event.target.country.value;

    const updateBuyer = {
      buyerFullName,
      buyerProfileImage,
      currentBalance,
      address,
      city,
      country,
    };

    const url = `https://dry-inlet-34467-1e797feb3813.herokuapp.com/buyer-update-profile-admin/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateBuyer),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin");
      });
  };

  return (
    <div>
      <div id="wrapper" className="theme-cyan">
        <AdminSidebar></AdminSidebar>
        <div id="main-content">
          <div className="container-fluid">
            <AdminHeader></AdminHeader>
            <form onSubmit={handleBuyer} className="container">
              <div>
                <label className="form-label">Buyer Name</label>
                <input
                  type="text"
                  defaultValue={updateBuyer.buyerFullName}
                  name="buyerFullName"
                  className="form-control"
                />
              </div>
              <div>
                <label className="form-label">Profile Image</label>
                <input
                  type="text"
                  name="buyerProfileImage"
                  defaultValue={updateBuyer.buyerProfileImage}
                  className="form-control"
                />
              </div>
             
              <div>
                <label className="form-label">Current Balance</label>
                <input
                  type="number"
                  defaultValue={updateBuyer.currentBalance}
                  name="currentBalance"
                  className="form-control"
                  step="0.01"
                />
              </div>
              <div>
                <label className="form-label">Address</label>
                <input
                  type="text"
                  name="address"
                  defaultValue={updateBuyer.address}
                  className="form-control"
                />
              </div>

              <div>
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  defaultValue={updateBuyer.city}
                  className="form-control"
                />
              </div>
              <div>
                <label className="form-label">Country</label>
                <input
                  type="text"
                  name="country"
                  defaultValue={updateBuyer.country}
                  className="form-control"
                />
              </div>

              <div className="col-12 mt-2">
                <button type="submit" className="btn btn-primary col-12">
                  Update Buyer{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBuyer;
