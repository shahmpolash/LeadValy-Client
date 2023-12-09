import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const PendingLeads = () => {
  const [members, setMember] = useState([]);
  const [user] = useAuthState(auth);
  const [leads, setLeads] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [leadsPerPage] = useState(10); 

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/leads`)
      .then((res) => res.json())
      .then((result) => setLeads(result));
  }, []);

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/user?userEmail=${user?.email}`)
      .then((res) => res.json())
      .then((result) => setMember(result));
  }, [user]);

  // Logic to get current leads for the current page
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const pendingLead = leads
    .filter(
      (lead) =>
        lead.leadProvider === user?.email && lead.leadSubmitStatus === "Pending"
    )
    .slice(indexOfFirstLead, indexOfLastLead);

  // Determine the number of pages based on available data
  const totalPages = Math.ceil(
    leads.filter(
      (lead) =>
        lead.leadProvider === user?.email && lead.leadSubmitStatus === "Pending"
    ).length / leadsPerPage
  );

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(Math.min(Math.max(1, pageNumber), totalPages));
  };

  return (
    <div>
      {members.map(
        (member) =>
          member.userEmail === user?.email && (
            <div className="card">
              <div className="header">
                <h2>
                  {" "}
                  My Total Pending Leads{" "}
                  {
                    leads.filter(
                      (lead) =>
                        lead.leadProvider === user?.email &&
                        lead.leadSubmitStatus === "Pending"
                    ).length
                  }
                </h2>
              </div>
              <div className="body project_report">
                <div className="table-responsive">
                  <table className="table table-hover js-basic-example dataTable table-custom mb-0">
                    <thead>
                      <tr>
                        <th>Company</th>
                        <th>Industry</th>
                        <th>Person</th>
                        <th>Title</th>
                        <th>Email</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    {pendingLead.map(
                      (lead) =>
                        lead.leadProvider === user?.email &&
                        lead.leadSubmitStatus === "Pending" && (
                          <tbody>
                            <tr>
                              <td className="project-title">
                                <h6>{lead.website}</h6>
                              </td>
                              <td>{lead.industry}</td>
                              <td>{lead.personName}</td>
                              <td>{lead.title}</td>
                              <td>{lead.email}</td>
                              <td>
                                <span className="badge badge-success">
                                  {lead.leadSubmitStatus}
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        )
                    )}
                  </table>
                  {totalPages > 0 && (
                    <nav aria-label="Page navigation example">
                      <ul className="pagination justify-content-center">
                        {Array.from({ length: totalPages }).map((_, index) => (
                          <li className="page-item" key={index}>
                            <button
                              className={`page-link ${
                                index + 1 === currentPage ? "active" : ""
                              }`}
                              onClick={() => paginate(index + 1)}
                            >
                              {index + 1}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  )}
                </div>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default PendingLeads;
