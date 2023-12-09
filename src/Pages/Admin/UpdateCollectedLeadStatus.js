import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../components/Shared/AdminSidebar";
import AdminHeader from "../../components/Shared/AdminHeader";

const UpdateCollectedLeadStatus = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [admins, setAdmins] = useState([]);
  const [user] = useAuthState(auth);
  const [lead, setLead] = useState([]);

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/collected-lead/${id}`)
      .then((res) => res.json())
      .then((result) => setLead(result));
  }, []);

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/admin?adminEmail=${user?.email}`)
      .then((res) => res.json())
      .then((result) => setAdmins(result));
  }, [user]);

  const handleAmountCreatedStatus = (event, providerId) => {
    event.preventDefault();
    const amountCredited = event.target.amountCredited.value;

    const updateStatus = {
      amountCredited,
    };

    const url = `https://dry-inlet-34467-1e797feb3813.herokuapp.com/collected-lead-update/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateStatus),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate(`/admin/update-user-balance/${providerId}`);
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
                  <div className="table-responsive text-center">
                    <div className="card bg-custom">
                      {" "}
                      {/* Card with custom background color */}
                      <div className="card-body">
                        <h2>Update Amount</h2>
                        <form
                          onSubmit={(event) =>
                            handleAmountCreatedStatus(event, lead.leadProviderID)
                          }
                        >
                          <input type='text' value='Yes' name='amountCredited'></input>
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

export default UpdateCollectedLeadStatus;
