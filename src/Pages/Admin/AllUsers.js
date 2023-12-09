import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { Link } from "react-router-dom";
import AdminSidebar from "../../components/Shared/AdminSidebar";
import AdminHeader from "../../components/Shared/AdminHeader";

const AllUsers = () => {
  const [admins, setAdmins] = useState([]);
  const [user] = useAuthState(auth);
  const [users, setUsers] = useState([]);

  const [searchName, setSearchName] = useState("");

  const handleSearch = (e) => {
    setSearchName(e.target.value);
  };

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/users`)
      .then((res) => res.json())
      .then((result) => setUsers(result));
  }, []);

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/admin?adminEmail=${user?.email}`)
      .then((res) => res.json())
      .then((result) => setAdmins(result));
  }, [user]);

  const filteredUsers = users.filter((user) =>
    user.userFullName.toLowerCase().includes(searchName.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

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
                        placeholder="Search by Name..."
                        value={searchName}
                        onChange={handleSearch}
                      />
                    </div>
                    <div className="body project_report">
                      <div className="table-responsive">
                        <table className="table table-hover js-basic-example dataTable table-custom mb-0">
                          <thead>
                            <tr>
                              <th>Image</th>
                              <th>User Name</th>
                              <th>User Email</th>
                              <th>Address</th>
                              <th>City</th>
                              <th>Country</th>
                              <th>Balance</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentUsers.map((user) => (
                              <tr>
                                <td>
                                  <img
                                    src={user.profileImage}
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Team Lead"
                                    alt="Avatar"
                                    className="width35 rounded"
                                  />
                                </td>
                                <td className="project-title">
                                  <h6>{user.userFullName}</h6>
                                </td>
                                <td>{user.userEmail}</td>
                                <td>{user.address}</td>
                                <td>{user.city}</td>
                                <td>{user.country}</td>
                                <td>{user.currentBalance}</td>
                                <td>
                                  {" "}
                                  <Link
                                    to={`/admin/user/${user._id}`}
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

export default AllUsers;
