import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { Link } from "react-router-dom";
import AdminSidebar from "../../components/Shared/AdminSidebar";
import AdminHeader from "../../components/Shared/AdminHeader";

const PendingWithdraws = () => {
  const [admins, setAdmins] = useState([]);
  const [user] = useAuthState(auth);
  const [withdraws, setWithdraws] = useState([]);

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/all-withdraws`)
      .then((res) => res.json())
      .then((result) => setWithdraws(result));
  }, []);

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/admin?adminEmail=${user?.email}`)
      .then((res) => res.json())
      .then((result) => setAdmins(result));
  }, [user]);

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
                      <table className="table table-hover js-basic-example dataTable table-custom mb-0">
                        <thead>
                          <tr>
                            <th>Provider Name</th>
                            <th>Provider Email</th>
                            <th>PayPal Email</th>
                            <th>Amount</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {withdraws.map(
                            (withdraw) =>
                              withdraw.withdrawalStatus === "Pending" && (
                                <tr>
                                  <td>{withdraw.userFullName}</td>
                                  <td>{withdraw.userEmail}</td>
                                  <td>{withdraw.paypalEmail}</td>
                                  <td>${withdraw.amount}</td>
                                  <td>
                                    <Link
                                      to={`/admin/update-withdrawal-status/${withdraw._id}`}
                                      type="button"
                                      class="btn btn-info"
                                    >
                                      Approve Withdrawal
                                    </Link>
                                  </td>
                                </tr>
                              )
                          )}
                        </tbody>
                      </table>
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

export default PendingWithdraws;
