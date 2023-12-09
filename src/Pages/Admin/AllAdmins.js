import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { Link } from "react-router-dom";
import AdminSidebar from "../../components/Shared/AdminSidebar";
import AdminHeader from "../../components/Shared/AdminHeader";
import Loading from "../../components/Shared/Loading";

const AllAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [user] = useAuthState(auth);
  const [allAdmin, setAllAdmin] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [currentPage, setCurrentPage] = useState(1);
  const [adminsPerPage] = useState(10);

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/admins`)
      .then((res) => res.json())
      .then((result) => {
        setAllAdmin(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching all admins:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (user) {
      fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/admin?adminEmail=${user.email}`)
        .then((res) => res.json())
        .then((result) => {
          setAdmins(result);
        })
        .catch((error) => {
          console.error("Error fetching admin:", error);
        });
    }
  }, [user]);

  if (loading) {
    return <Loading></Loading>;
  }

  const indexOfLastAdmin = currentPage * adminsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage;
  const currentAdmins = allAdmin.slice(indexOfFirstAdmin, indexOfLastAdmin);
  const totalPages = Math.ceil(allAdmin.length / adminsPerPage);

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
                              <th>Admin Name</th>
                              <th>Admin Email</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentAdmins.map((admin) => (
                              <tr>
                                <td>
                                  <img
                                    src={admin.adminProfileImage}
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Team Lead"
                                    alt="Avatar"
                                    className="width35 rounded"
                                  />
                                </td>
                                <td className="project-title">
                                  <h6>{admin.adminName}</h6>
                                </td>
                                <td>{admin.adminEmail}</td>

                                <td>
                                  {" "}
                                  <Link
                                    to={`/admin/admin-update/${admin._id}`}
                                    type="button"
                                    class="btn btn-info"
                                  >
                                    Update Admin
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {totalPages > 1 && (
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

export default AllAdmins;
