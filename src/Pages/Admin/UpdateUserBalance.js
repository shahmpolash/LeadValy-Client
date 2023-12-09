import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../components/Shared/AdminSidebar";
import AdminHeader from "../../components/Shared/AdminHeader";

const UpdateUserBalance = () => {
  const [admins, setAdmins] = useState([]);
  const {id} = useParams();
  const [user] = useAuthState(auth);
  const [member, setMember] = useState([]);
  const navigate = useNavigate();



  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/user/${id}`)
      .then((res) => res.json())
      .then((result) => setMember(result));
  }, []);

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/admin?adminEmail=${user?.email}`)
      .then((res) => res.json())
      .then((result) => setAdmins(result));
  }, [user]);


  const handleUserBalance = (event) => {
    event.preventDefault();
    const currentBalance = event.target.currentBalance.value;

    const updateWithdrawalStatus = {
        currentBalance,
    };

    const url = `https://dry-inlet-34467-1e797feb3813.herokuapp.com/update-balance/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateWithdrawalStatus),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate(`/admin/`);
      });
  };


  return (
    <div>
      {admins.map(
        (admin) =>
          admin.adminEmail === user?.email && (
            <div id="wrapper" className="theme-cyan">
              <AdminSidebar></AdminSidebar>
              <div id="main-content">
                <div className="container-fluid">
                  <AdminHeader></AdminHeader>

                    <div className="body project_report">
                      <div className="table-responsive">
                        <form onSubmit={handleUserBalance}>
                            <input type='number' name='currentBalance' defaultValue="0.00"></input>
                            <button
                          type="submit"
                          className="btn btn-primary col-12"
                        >
                        Update User's Balance Now
                        </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            
          )
      )}
    </div>
  );
};

export default UpdateUserBalance;
