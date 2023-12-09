import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../components/Shared/AdminSidebar";
import AdminHeader from "../../components/Shared/AdminHeader";
import auth from "../../firebase.init";

const UpdateUser = () => {
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [updateUser, setUpdateUser] = useState([]);

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/user/${id}`)
      .then((res) => res.json())
      .then((result) => setUpdateUser(result));
  }, []);

  const handleUser = (event) => {
    event.preventDefault();
    const userFullName = event.target.userFullName.value;
    const profileImage = event.target.profileImage.value;
    const userEmail = event.target.userEmail.value;
    const currentBalance = event.target.currentBalance.value;
    const address = event.target.address.value;
    const city = event.target.city.value;
    const country = event.target.country.value;

    const updateUser = {
      userFullName,
      profileImage,
      userEmail,
      currentBalance,
      address,
      city,
      country,
    };

    const url = `https://dry-inlet-34467-1e797feb3813.herokuapp.com/update-user/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateUser),
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
            <form onSubmit={handleUser} className="container">
              <div>
                <label className="form-label">User Name</label>
                <input
                  type="text"
                  value={updateUser.userFullName}
                  name="userFullName"
                  className="form-control"
                />
              </div>
              <div>
                <label className="form-label">Profile Image</label>
                <input
                  type="text"
                  name="profileImage"
                  value={updateUser.profileImage}
                  className="form-control"
                />
              </div>
              <div>
                <label className="form-label">User Email</label>
                <input
                  disabled
                  readOnly
                  type="text"
                  name="userEmail"
                  value={updateUser.userEmail}
                  className="form-control"
                />
              </div>
              <div>
                <label className="form-label">Currnet Balance</label>
                <input
                  type="number"
                  defaultValue={updateUser.currentBalance}
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
                  defaultValue={updateUser.address}
                  className="form-control"
                />
              </div>

              <div>
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  defaultValue={updateUser.city}
                  className="form-control"
                />
              </div>
              <div>
                <label className="form-label">Country</label>
                <input
                  type="text"
                  name="country"
                  defaultValue={updateUser.country}
                  className="form-control"
                />
              </div>

              <div className="col-12 mt-2">
                <button type="submit" className="btn btn-primary col-12">
                  Update User{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
