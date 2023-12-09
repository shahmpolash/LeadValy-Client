import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../components/Shared/AdminSidebar";
import AdminHeader from "../../components/Shared/AdminHeader";
import auth from "../../firebase.init";

const EditAdmin = () => {
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [updateAdmin, setUpdateAdmin] = useState([]);

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/admin/${id}`)
      .then((res) => res.json())
      .then((result) => setUpdateAdmin(result));
  }, []);

  const handleUpdateAdmin = (event) => {
    event.preventDefault();
    const adminProfileImage = event.target.adminProfileImage.value;
    const adminName = event.target.adminName.value;
    const adminEmail = event.target.adminEmail.value;


    const updateAdmin = {
        adminProfileImage,
        adminName,
        adminEmail
     
    };

    const url = `https://dry-inlet-34467-1e797feb3813.herokuapp.com/admin-update/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateAdmin),
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
            <form onSubmit={handleUpdateAdmin} className="container">
              <div>
                <label className="form-label">Admin Name</label>
                <input
                  type="text"
                  defaultValue={updateAdmin.adminName}
                  name="adminName"
                  className="form-control"
                />
              </div>
              <div>
                <label className="form-label">Profile Image</label>
                <input
                  type="text"
                  name="adminProfileImage"
                  defaultValue={updateAdmin.adminProfileImage}
                  className="form-control"
                />
              </div>
              <div>
                <label className="form-label">Buyer Email</label>
                <input
                  disabled
                  readOnly
                  type="text"
                  name="adminEmail"
                  value={updateAdmin.adminEmail}
                  className="form-control"
                />
              </div>
             

              <div className="col-12 mt-2">
                <button type="submit" className="btn btn-primary col-12">
                  Update Admin{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAdmin;
