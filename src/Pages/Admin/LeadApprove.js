import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../components/Shared/AdminSidebar";
import AdminHeader from "../../components/Shared/AdminHeader";
import auth from "../../firebase.init";

const LeadApprove = () => {
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [lead, setLead] = useState([]);

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/lead/${id}`)
      .then((res) => res.json())
      .then((result) => setLead(result));
  }, []);

  const handleLeadApproval = (event) => {
    event.preventDefault();
    const leadSubmitStatus = event.target.leadSubmitStatus.value;
    const leadStatus = {
        leadSubmitStatus,

    };

    const url = `https://dry-inlet-34467-1e797feb3813.herokuapp.com/lead-update/${lead._id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(leadStatus),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/pending-leads");
      });
  };

  return (
    <div>
      <div id="wrapper" className="theme-cyan">
        <AdminSidebar></AdminSidebar>
        <div id="main-content">
          <div className="container-fluid">
            <AdminHeader></AdminHeader>
            <h2>{lead.website}</h2>
            <form onSubmit={handleLeadApproval} className="container">
              <select name="leadSubmitStatus" className="col-12 mt-2">
                <option value="Approved">Approve</option>
                <option value="Pending">Pending</option>
                <option value="Removed">Removed</option>
              </select>
              <div className="col-12 mt-2">
                <button type="submit" className="btn btn-primary col-12">
                  Update Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadApprove;
