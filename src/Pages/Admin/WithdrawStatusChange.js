import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../components/Shared/AdminSidebar";
import AdminHeader from "../../components/Shared/AdminHeader";

const WithdrawStatusChange = () => {
  const [admins, setAdmins] = useState([]);
  const {id} = useParams();
  const [user] = useAuthState(auth);
  const [withdraw, setWithdraw] = useState([]);
  const navigate = useNavigate();



  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/withdraw/${id}`)
      .then((res) => res.json())
      .then((result) => setWithdraw(result));
  }, []);

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/admin?adminEmail=${user?.email}`)
      .then((res) => res.json())
      .then((result) => setAdmins(result));
  }, [user]);


  const handleWithdrawalStatus = (event, providerId) => {
    event.preventDefault();
    const withdrawalStatus = event.target.withdrawalStatus.value;

    const updateWithdrawalStatus = {
        withdrawalStatus,
    };

    const url = `https://dry-inlet-34467-1e797feb3813.herokuapp.com/update-withdrawal/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateWithdrawalStatus),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate(`/admin/update-balance/${withdraw.userId}`);
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
                        <form onSubmit={handleWithdrawalStatus}>
                            <input type='text' name='withdrawalStatus' value='Approved'></input>
                            <button
                          type="submit"
                          className="btn btn-primary col-12"
                        >
                         Update Withdraw Status And Go Next
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

export default WithdrawStatusChange;
