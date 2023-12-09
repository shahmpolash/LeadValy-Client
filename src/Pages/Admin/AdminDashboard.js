import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { Link } from "react-router-dom";
import AdminSidebar from "../../components/Shared/AdminSidebar";
import AdminHeader from "../../components/Shared/AdminHeader";

const AdminDashboard = () => {
  const [admins, setAdmins] = useState([]);
  const [user] = useAuthState(auth);
  const [leads, setLeads] = useState([]);

  const [searchIndustry, setSearchIndustry] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const handleSearch = (e) => {
    setSearchIndustry(e.target.value);
  };

  const handleTitleSearch = (e) => {
    setSearchTitle(e.target.value);
  };

  const handleLocationSearch = (e) => {
    setSearchLocation(e.target.value);
  };

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/leads`)
      .then((res) => res.json())
      .then((result) => setLeads(result));
  }, []);

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/admin?adminEmail=${user?.email}`)
      .then((res) => res.json())
      .then((result) => setAdmins(result));
  }, [user]);

  const filteredLeads = leads.filter(
    (lead) =>
      lead.leadSubmitStatus === "Approved" &&
      lead.industry.toLowerCase().includes(searchIndustry.toLowerCase()) &&
      lead.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
      lead.location.toLowerCase().includes(searchLocation.toLowerCase())
  );

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
                    <div className="search">
                      <input
                        type="text"
                        placeholder="Search by industry..."
                        value={searchIndustry}
                        onChange={handleSearch}
                      />
                      <input
                        type="text"
                        placeholder="Search by title..."
                        value={searchTitle}
                        onChange={handleTitleSearch}
                      />
                      <input
                        type="text"
                        placeholder="Search by Country..."
                        value={searchLocation}
                        onChange={handleLocationSearch}
                      />
                    </div>
                    <div className="body project_report">
                      <div className="table-responsive">
                        <table className="table table-hover js-basic-example dataTable table-custom mb-0">
                          <thead>
                            <tr>
                              <th>Logo</th>
                              <th>Company</th>
                              <th>Industry</th>
                              <th>Location</th>
                              <th>Size</th>
                              <th>Name</th>
                              <th>Title</th>
                              <th>Email</th>
                              <th>Lead Provider</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredLeads.map((lead) => (
                              <tr>
                                <td>
                                  <img
                                    src={lead.logo}
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Team Lead"
                                    alt="Avatar"
                                    className="width35 rounded"
                                  />
                                </td>
                                <td className="project-title">
                                  <h6>{lead.website}</h6>
                                  <small>Created 14 July, 2020</small>
                                </td>
                                <td>{lead.industry}</td>
                                <td>{lead.location}</td>
                                <td>{lead.companySize}</td>
                                <td>{lead.personName}</td>
                                <td>{lead.title}</td>
                                <td>{lead.email}</td>
                                <td>{lead.leadProvider}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
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

export default AdminDashboard;
