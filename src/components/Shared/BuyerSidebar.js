import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom/dist";
import auth from "../../firebase.init";
import "./BuyerSidebar.css";

const BuyerSidebar = () => {
  const [user] = useAuthState(auth);
  const [buyers, setBuyers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [lists, setLists] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/all-collected-leads`)
      .then((res) => res.json())
      .then((result) => setLeads(result));
  }, []);
  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/lists`)
      .then((res) => res.json())
      .then((result) => setLists(result));
  }, []);

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/buyer?buyerEmail=${user?.email}`)
      .then((res) => res.json())
      .then((result) => setBuyers(result));
  }, [user]);

  const handleSignout = () => {
    signOut(auth);
  };

  
  return (
    <>
      {buyers.map(
        (buyer) =>
          buyer.buyerEmail === user?.email && (
            <>
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
                                        Campaign <strong>Holiday Sale</strong>{" "}
                                        is nearly reach budget limit.
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
                                        <strong>Holiday Sale</strong> is
                                        approved.
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
                                        Website visits from Twitter is 27%
                                        higher than last week.
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
                                        Error on website analytics
                                        configurations
                                      </p>
                                      <span className="timestamp">
                                        Yesterday
                                      </span>
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
                        src={buyer.buyerProfileImage}
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
                          <strong>{buyer.buyerFullName}</strong>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-right account">
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
                          <small>Total Collected</small>

                          <h6>
                            {
                              leads.filter(
                                (lead) => lead.buyerEmail === user?.email
                              ).length
                            }{" "}
                            Leads
                          </h6>
                        </li>
                        <li className="col-6">
                          <small>Balance</small>
                          <h6>${buyer.currentBalance} USD</h6>
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
                              <Link to="/">
                                <i className="fa fa-dashboard" />
                                <span>Buyer Dashboard</span>
                              </Link>
                            </li>
                            <li className="active">
                              <Link to="/deposit-funds">
                                <i className="fa fa-money" />
                                <span>Deposit Funds</span>
                              </Link>
                            </li>
                            <li className="active">
                              <Link to={`/deposit-history/${buyer._id}`}>
                                <i className="fa fa-money" />
                                <span>Deposit History</span>
                              </Link>
                            </li>
                            <li className="active">
                              <Link to="/create-list">
                                <i className="fa fa-plus" />
                                <span>Create List</span>
                              </Link>
                            </li>

                            <li className={isOpen ? "active" : ""}>
                              <a
                                href="#Dashboard"
                                className="has-arrow"
                                onClick={() => setIsOpen(!isOpen)}
                              >
                                <i class="fa fa-people-roof"></i>
                                <span>My Collections</span>
                              </a>
                              <ul
                                style={{ display: isOpen ? "block" : "none" }}
                              >
                                <li>
                                  <Link
                                    className=" font-bold"
                                    to="/my-all-leads"
                                  >
                                    All Leads
                                  </Link>
                                </li>

                                {lists.map(
                                  (list) =>
                                    list.buyerEmail === buyer.buyerEmail && (
                                      <li key={list.id}>
                                        <Link to={`/my-collection/${list._id}`}>
                                          {list.listName}
                                        </Link>
                                      </li>
                                    )
                                )}
                                <li>
                                  <Link className="font-bold" to="/all-lists">
                                    All Lists
                                  </Link>
                                </li>
                              </ul>
                            </li>
                            <li className={isOpenProfile ? "active" : ""}>
                              <a
                                href="#Profile"
                                className="has-arrow"
                                onClick={() => setIsOpenProfile(!isOpenProfile)}
                              >
                                <i class="fa fa-people-roof"></i>
                                <span>Profile</span>
                              </a>
                              <ul
                                style={{
                                  display: isOpenProfile ? "block" : "none",
                                }}
                              >
                                <li>
                                  <Link to={`/buyer-profile-edit/${buyer._id}`}>
                                    Update Profile
                                  </Link>
                                </li>
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
                            </li>
                            
                            <li>
                              <div className="support-email active">
                                <a href="mailto:support@example.com">
                                  <i className="fa fa-envelope" />
                                  <span>support@example.com</span>
                                </a>
                              </div>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
      )}
    </>
  );
};

export default BuyerSidebar;
