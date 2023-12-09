import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom/dist";
import auth from "../../firebase.init";

const AdminSidebar = () => {
  const [user] = useAuthState(auth);
  const [admins, setAdmins] = useState([]);
  const [leads, setLeads] = useState([]);
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/banners`)
      .then((res) => res.json())
      .then((result) => setBanner(result));
  }, []);

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

  const handleSignout = () => {
    signOut(auth);
  };
  return (
    <>
      {admins.map(
        (admin) =>
          admin.adminEmail === user?.email && (
            <div>
              <nav className="navbar navbar-fixed-top">
                <div className="container-fluid">
                  <div className="navbar-brand">
                    <button type="button" className="btn-toggle-offcanvas">
                      <i className="fa fa-bars" />
                    </button>
                    <button type="button" className="btn-toggle-fullwidth">
                      <i className="fa fa-bars" />
                    </button>
                    <Link to="/">ICONIC</Link>
                  </div>
                  <div className="navbar-right">
                    <form
                      id="navbar-search"
                      className="navbar-form search-form"
                    >
                      <input
                        defaultValue=""
                        className="form-control"
                        placeholder="Search here..."
                        type="text"
                      />
                      <button type="button" className="btn btn-default">
                        <i className="icon-magnifier" />
                      </button>
                    </form>
                    <div id="navbar-menu">
                      <ul className="nav navbar-nav">
                        <li className="dropdown">
                          <a
                            href="javascript:void(0);"
                            className="dropdown-toggle icon-menu"
                            data-toggle="dropdown"
                          >
                            <i className="fa fa-bell" />
                            <span className="notification-dot" />
                          </a>
                          <ul className="dropdown-menu notifications">
                            <li className="header">
                              <strong>You have 4 new Notifications</strong>
                            </li>
                            <li>
                              <a href="javascript:void(0);">
                                <div className="media">
                                  <div className="media-left">
                                    <i className="icon-info text-warning" />
                                  </div>
                                  <div className="media-body">
                                    <p className="text">
                                      Campaign <strong>Holiday Sale</strong> is
                                      nearly reach budget limit.
                                    </p>
                                    <span className="timestamp">
                                      10:00 AM Today
                                    </span>
                                  </div>
                                </div>
                              </a>
                            </li>
                            <li>
                              <a href="javascript:void(0);">
                                <div className="media">
                                  <div className="media-left">
                                    <i className="icon-like text-success" />
                                  </div>
                                  <div className="media-body">
                                    <p className="text">
                                      Your New Campaign{" "}
                                      <strong>Holiday Sale</strong> is approved.
                                    </p>
                                    <span className="timestamp">
                                      11:30 AM Today
                                    </span>
                                  </div>
                                </div>
                              </a>
                            </li>
                            <li>
                              <a href="javascript:void(0);">
                                <div className="media">
                                  <div className="media-left">
                                    <i className="icon-pie-chart text-info" />
                                  </div>
                                  <div className="media-body">
                                    <p className="text">
                                      Website visits from Twitter is 27% higher
                                      than last week.
                                    </p>
                                    <span className="timestamp">
                                      04:00 PM Today
                                    </span>
                                  </div>
                                </div>
                              </a>
                            </li>
                            <li>
                              <a href="javascript:void(0);">
                                <div className="media">
                                  <div className="media-left">
                                    <i className="icon-info text-danger" />
                                  </div>
                                  <div className="media-body">
                                    <p className="text">
                                      Error on website analytics configurations
                                    </p>
                                    <span className="timestamp">Yesterday</span>
                                  </div>
                                </div>
                              </a>
                            </li>
                            <li className="footer">
                              <a href="javascript:void(0);" className="more">
                                See all notifications
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="page-login.html" className="icon-menu">
                            <i className="fa fa-power-off" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </nav>

              <div id="left-sidebar" className="sidebar">
                <button type="button" className="btn-toggle-offcanvas">
                  <i className="fa fa-arrow-left" />
                </button>
                <div className="sidebar-scroll">
                  <div className="user-account">
                    <img
                      src="assets/images/user.png"
                      className="rounded-circle user-photo"
                      alt="User Profile Picture"
                    />
                    <div className="dropdown">
                      <span>Welcome,</span>
                      <a
                        href="javascript:void(0);"
                        className="dropdown-toggle user-name"
                        data-toggle="dropdown"
                      >
                        <strong>{admin.adminName}</strong>
                      </a>
                      <ul className="dropdown-menu dropdown-menu-right account">
                        <li>
                          <a href="page-profile2.html">
                            <i className="icon-user" />
                            My Profile
                          </a>
                        </li>
                        <li>
                          <a href="app-inbox.html">
                            <i className="icon-envelope-open" />
                            Messages
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0);">
                            <i className="icon-settings" />
                            Settings
                          </a>
                        </li>
                        <li className="divider" />
                        <li>
                          {user ? (
                            <Link
                              className="action-btn"
                              onClick={handleSignout}
                            >
                              <span>Signout</span>
                            </Link>
                          ) : (
                            <></>
                          )}
                        </li>
                      </ul>
                    </div>
                    <hr />
                    <ul className="row list-unstyled">
                      <li className="col-6">
                        <small>Total Submitted</small>
                        <h6>
                          {
                            leads.filter(
                              (lead) => lead.leadProvider === user?.email
                            ).length
                          }{" "}
                          Leads
                        </h6>
                      </li>
                      <li className="col-6">
                        <small>Balance</small>
                        <h6>${admin.currentBalance} USD</h6>
                      </li>
                    </ul>
                  </div>
                  <div className="tab-content padding-0">
                    <div className="tab-pane active" id="menu">
                      <nav id="left-sidebar-nav" className="sidebar-nav">
                        <ul
                          id="main-menu"
                          className="metismenu li_animation_delay"
                        >
                          <li className="active">
                            <Link to="/admin" className="has-arrow">
                              <i className="fa fa-dashboard" />
                              <span>Dashboard</span>
                            </Link>
                          </li>
                          <li>
                            <a href="#App" className="has-arrow">
                              <i className="fa fa-th-large" />
                              <span>Leads</span>
                            </a>
                            <ul>
                              <li>
                                <Link to="/admin/all-leads">All Leads</Link>
                              </li>
                              <li>
                                <Link to="/admin/pending-leads">
                                  Pending Leads
                                </Link>
                              </li>
                              <li>
                                <Link to="/admin/pending-amount-to-provider">
                                  Pending Amount
                                </Link>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a href="#Widgets" className="has-arrow">
                              <i className="fa fa-puzzle-piece" />
                              <span>Users</span>
                            </a>
                            <ul>
                              <li>
                                <Link to="/admin/all-users">All Users</Link>
                              </li>
                              <li>
                                <Link to="/admin/all-buyers">All Buyers</Link>
                              </li>
                              <li>
                                <Link to="/admin/all-admins">All Admins</Link>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a href="#uiElements" className="has-arrow">
                              <i className="fa fa-diamond" />
                              <span>Withdrawal</span>
                            </a>
                            <ul>
                              <li>
                                <Link to="/admin/all-withdraws">
                                  All Withdraws
                                </Link>
                              </li>
                              <li>
                                <Link to="/admin/new-withdrawal">
                                  New Withdrawal
                                </Link>
                              </li>
                              <li>
                                <Link to="/admin/pending-withdraws">
                                  Pending Withdrawal
                                </Link>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a href="#uiElements" className="has-arrow">
                              <i className="fa fa-edit" />
                              <span>Edit Option</span>
                            </a>
                            <ul>
                              <li>
                                <Link to="/admin/general-setting">
                                  General Setting
                                </Link>
                              </li>
                              <li>
                                {banner.map((e) => (
                                  <Link to={`/admin/banner-edit/${e._id}`}>
                                    Banner Setting
                                  </Link>
                                ))}
                              </li>
                              <li>
                                <Link to="/admin/pending-withdraws">
                                  Feature Setting
                                </Link>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
      )}
    </>
  );
};

export default AdminSidebar;
