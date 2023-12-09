import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { Link } from "react-router-dom";
import AdminSidebar from "../../components/Shared/AdminSidebar";
import AdminHeader from "../../components/Shared/AdminHeader";

const AllBuyers = () => {
  const [admins, setAdmins] = useState([]);
  const [user] = useAuthState(auth);
  const [buyers, setBuyers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [buyersPerPage] = useState(10);

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/buyers`)
      .then((res) => res.json())
      .then((result) => setBuyers(result));
  }, []);

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/admin?adminEmail=${user?.email}`)
      .then((res) => res.json())
      .then((result) => setAdmins(result));
  }, [user]);

  const indexOfLastBuyer = currentPage * buyersPerPage;
  const indexOfFirstBuyer = indexOfLastBuyer - buyersPerPage;
  const currentBuyers = buyers.slice(indexOfFirstBuyer, indexOfLastBuyer);
  const totalPages = Math.ceil(buyers.length / buyersPerPage);

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
                    <div className="body project_report">
                      <div className="table-responsive">
                        <table className="table table-hover js-basic-example dataTable table-custom mb-0">
                          <thead>
                            <tr>
                              <th>Image</th>
                              <th>Buyer Name</th>
                              <th>Buyer Email</th>
                              <th>Address</th>
                              <th>City</th>
                              <th>Country</th>
                              <th>Balance</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentBuyers.map((buyer) => (
                              <tr>
                                <td>
                                  <img
                                    src={buyer.buyerProfileImage}
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Team Lead"
                                    alt="Avatar"
                                    className="width35 rounded"
                                  />
                                </td>
                                <td className="project-title">
                                  <h6>{buyer.buyerFullName}</h6>
                                </td>
                                <td>{buyer.buyerEmail}</td>
                                <td>{buyer.address}</td>
                                <td>{buyer.city}</td>
                                <td>{buyer.country}</td>
                                <td>{buyer.currentBalance}</td>
                                <td>
                                  {" "}
                                  <Link
                                    to={`/admin/buyer-edit/${buyer._id}`}
                                    type="button"
                                    class="btn btn-info"
                                  >
                                    Update Profile
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

export default AllBuyers;
