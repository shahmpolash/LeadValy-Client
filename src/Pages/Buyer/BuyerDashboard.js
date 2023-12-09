import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import BuyerSidebar from "../../components/Shared/BuyerSidebar";
import BuyerHeaderPart from "../../components/Shared/BuyerHeaderPart";
import { Link } from "react-router-dom";
import './BuyerDashboard.css';

const BuyerDashboard = () => {
  const [buyers, setBuyers] = useState([]);
  const [user] = useAuthState(auth);
  const [leads, setLeads] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [leadsPerPage] = useState(10);

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/all-collected-leads`)
      .then((res) => res.json())
      .then((result) => setLeads(result));
  }, []);

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/buyer?buyerEmail=${user?.email}`)
      .then((res) => res.json())
      .then((result) => setBuyers(result));
  }, [user]);

  // Logic to get current leads for the current page
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = leads
    .filter((lead) => lead.buyerEmail === user?.email)
    .slice(indexOfFirstLead, indexOfLastLead);

  // Determine the number of pages based on available data
  const totalPages = Math.ceil(
    leads.filter((lead) => lead.buyerEmail === user?.email).length /
      leadsPerPage
  );

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(Math.min(Math.max(1, pageNumber), totalPages));
  };

  return (
    <div>
      {buyers.map(
        (buyer) =>
          buyer.buyerEmail === user?.email && (
            <div id="wrapper" className="theme-cyan">
              <BuyerSidebar></BuyerSidebar>
              <div id="main-content">
                <div className="container-fluid">
                  <BuyerHeaderPart></BuyerHeaderPart>

                  <div className="row clearfix">
                    
                    <div className="col-lg-12 col-md-12">
                      <div className="card">
                        <div className="header">
                          <h2>My Collected Lead</h2>
                          <ul className="header-dropdown">
                            <li className="dropdown">
                              <a
                                href="javascript:void(0);"
                                className="dropdown-toggle"
                                data-toggle="dropdown"
                                role="button"
                                aria-haspopup="true"
                                aria-expanded="false"
                              />
                              <ul className="dropdown-menu dropdown-menu-right">
                                <li>
                                  <a href="javascript:void(0);">Action</a>
                                </li>
                                <li>
                                  <a href="javascript:void(0);">
                                    Another Action
                                  </a>
                                </li>
                                <li>
                                  <a href="javascript:void(0);">
                                    Something else
                                  </a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                        <div className="body project_report">
                          <div className="table-responsive">
                            <table className="table table-hover js-basic-example dataTable table-custom mb-0">
                              <thead>
                                <tr>
                                  <th>Logo</th>
                                  <th>Website</th>
                                  <th>Company Email</th>
                                  <th>Industry</th>
                                  <th>Size</th>
                                  <th>Location</th>
                                  <th>Person's Name</th>
                                  <th>Title</th>
                                  <th>Email</th>
                                  <th>-</th>
                                  <th>Social Profile</th>
                                </tr>
                              </thead>
                              {currentLeads.map(
                                (lead) =>
                                  lead.buyerEmail === user?.email && (
                                    <tbody key={lead._id}>
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
                                          <small className="badge badge-success"><i class="fa fa-linkedin"></i></small>
                                          <small className="badge badge-success"><i class="fa fa-facebook"></i></small>
                                        </td>
                                        <td>
                                          
                                          </td>
                                        <td>{lead.industry}</td>
                                        <td>{lead.companySize}</td>
                                        <td>{lead.location}</td>
                                        <td>{lead.personName}</td>
                                        <td>{lead.title}</td>
                                        <td>{lead.email} <br />
                                        <small className="badge badge-success">
                                        Valid Email{" "}
                                                  <i class="text-primary fa fa-certificate"></i>
                                                </small>
                                                </td>
                                        <td><a href={`mailto:${lead.email}`} target="_blank" rel="noopener noreferrer"><i class="fa fa-envelope"></i></a></td>
                                        <td><small className="badge badge-success"><i class="fa fa-linkedin"></i></small>
                                          <small className="badge badge-success"><i class="fa fa-facebook"></i></small></td>
                                      </tr>
                                    </tbody>
                                  )
                              )}
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
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default BuyerDashboard;
