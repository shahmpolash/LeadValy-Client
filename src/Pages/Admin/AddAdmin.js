import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/Shared/AdminSidebar";
import AdminHeader from "../../components/Shared/AdminHeader";
import auth from "../../firebase.init";


const AddAdmin = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);


  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/admins`)
      .then((res) => res.json())
      .then((result) => setAdmins(result));
  }, []);

  const handleAdmin = (event) => {
    event.preventDefault();
    const adminProfileImage = event.target.adminProfileImage.value;
    const adminName = event.target.adminName.value;
    const adminEmail = event.target.adminEmail.value;

    const admin = {
        adminProfileImage,
        adminName,
        adminEmail,
     
    };

    const url = `https://dry-inlet-34467-1e797feb3813.herokuapp.com/create-admin`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(admin),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/");
      });
  };

  

  return (
    <div>
      <div id="wrapper" className="theme-cyan">
              <AdminSidebar></AdminSidebar>
              <div id="main-content">
                <div className="container-fluid">
                  <AdminHeader></AdminHeader>
                  <form onSubmit={handleAdmin} className="container">
                    <div>
                      <label className="form-label">Admin Profile Image</label>
                      <input
                        type="text"
                        name="adminProfileImage"
                        className="form-control"
                        placeholder="Profile Image"
                      />
                    </div>

                    <div>
                      <label className="form-label">Admin Name</label>
                      <input
                        type="text"
                        name="adminName"
                        className="form-control"
                        placeholder="Admin Name"
                      />
                    </div>
                    <div>
                      <label className="form-label">Admin Email</label>
                      <input
                        type="text"
                        name="adminEmail"
                        className="form-control"
                        placeholder="Admin Email"
                      />
                    </div>
                

                    <div className="col-12 mt-2">
                      <button
                        type="submit"
                        className="btn btn-primary col-12"
                       
                      >
                        Add New Admin
                      </button>
                    </div>
                
                  </form>
                </div>
                <div className="body project_report">
                          <div className="table-responsive">
                           
                            <table className="table table-hover js-basic-example dataTable table-custom mb-0">
                              <thead>
                                <tr>
                                  <th></th>
                                  <th>Name</th>
                                  <th>Admin Email</th>
                                  <th>Action</th>
   
                                </tr>
                              </thead>
                             {
                                admins.map(admin =>
                                <tbody>
                                <tr>
                                <td>
                                    <img
                                      src={admin.adminProfileImage}
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Team Lead"
                                      alt="Avatar"
                                      className="width35 rounded"
                                    />
                                  </td>
                                  <td className="project-title">
                                    {admin.adminName}
                                  </td>
                                  <td>{admin.adminEmail}</td>
                                  <td>Edit</td>
                                </tr>
                                
                              </tbody>
                              )
                             }
                            </table>
                          </div>
                        </div>

              </div>
            </div>
    </div>
  );
};

export default AddAdmin;
