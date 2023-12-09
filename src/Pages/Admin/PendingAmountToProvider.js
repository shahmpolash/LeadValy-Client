import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { Link } from "react-router-dom";
import AdminSidebar from "../../components/Shared/AdminSidebar";
import AdminHeader from "../../components/Shared/AdminHeader";

const PendingAmountToProvider = () => {
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
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/all-collected-leads`)
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
      lead.amountCredited === "No" &&
      lead.industry.toLowerCase().includes(searchIndustry.toLowerCase()) &&
      lead.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
      lead.location.toLowerCase().includes(searchLocation.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [leadsPerPage] = useState(10);
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);
  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
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
                        <div className="col-12">
                          <h3>Total {filteredLeads.length} Pending</h3>
                        </div>
                        <table className="table table-hover js-basic-example dataTable table-custom mb-0">
                          <thead>
                            <tr>
                              <th>Logo</th>
                              <th>Company</th>
                              <th>Buyer Email</th>
                              <th>Provider Email</th>

                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentLeads.map((lead) => (
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
                                  <span className="badge badge-warning"></span>
                                </td>
                                <td>{lead.buyerEmail}</td>
                                <td>{lead.leadProvider}</td>

                                <td>
                                  <Link
                                    to={`/admin/update-collected-lead-status/${lead._id}`}
                                    className="badge badge-warning"
                                  >
                                    Add Amount ${lead.leadValue}
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {totalPages > 0 && (
                          <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-center">
                              {Array.from({ length: totalPages }).map(
                                (_, index) => (
                                  <li className="page-item" key={index}>
                                    <button
                                      className={`page-link ${
                                        index + 1 === currentPage
                                          ? "active"
                                          : ""
                                      }`}
                                      onClick={() => paginate(index + 1)}
                                    >
                                      {index + 1}
                                    </button>
                                  </li>
                                )
                              )}
                            </ul>
                          </nav>
                        )}
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

export default PendingAmountToProvider;
