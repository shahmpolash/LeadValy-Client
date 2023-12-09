import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../components/Shared/AdminSidebar";
import AdminHeader from "../../components/Shared/AdminHeader";

const AddBalanceToProvider = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [admins, setAdmins] = useState([]);
  const [user] = useAuthState(auth);
  const [member, setMember] = useState([]);

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

  const handleUpdateBalance = (event) => {
    event.preventDefault();
    const currentBalance = (parseFloat(member.currentBalance) + 0.10).toFixed(2);

    const updateBalance = {
      currentBalance,
    };

    const url = `https://dry-inlet-34467-1e797feb3813.herokuapp.com/update-balance/${member._id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateBalance),
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
            <div id="wrapper" className="theme-cyan" key={admin.adminEmail}>
              <AdminSidebar></AdminSidebar>
              <div id="main-content">
                <div className="container-fluid">
                  <AdminHeader></AdminHeader>
                  <div className="table-responsive text-center">
                    <div className="card bg-custom">
                      <div className="card-body">
                        <h2>Update Amount</h2>
                        <form onSubmit={handleUpdateBalance}>
                          <input
                            type="number"
                            name="currentBalance"
                            value={(parseFloat(member.currentBalance) + 0.10).toFixed(2)}
                            readOnly
                          />
                          <button className="btn btn-primary" type="submit">
                            Go Next and Update Provider Balance
                          </button>
                        </form>
                      </div>
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

export default AddBalanceToProvider;
