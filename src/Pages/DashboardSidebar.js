import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom/dist";

const DashboardSidebar = () => {
  const [user] = useAuthState(auth);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/user?userEmail=${user?.email}`)
      .then((res) => res.json())
      .then((result) => setMembers(result));
  }, [user]);

  const handleSignout = () => {
    signOut(auth);
  };
  return (
<>
{
  members.map(member => member.userEmail === user?.email &&
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
          <form id="navbar-search" className="navbar-form search-form">
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
                            Campaign <strong>Holiday Sale</strong> is nearly
                            reach budget limit.
                          </p>
                          <span className="timestamp">10:00 AM Today</span>
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
                            Your New Campaign <strong>Holiday Sale</strong> is
                            approved.
                          </p>
                          <span className="timestamp">11:30 AM Today</span>
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
                            Website visits from Twitter is 27% higher than
                            last week.
                          </p>
                          <span className="timestamp">04:00 PM Today</span>
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
              <strong>{member.userFullName}</strong>
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
                  <Link className="action-btn" onClick={handleSignout}>
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
            <li className="col-4">
              <small>Sales</small>
              <h6>561</h6>
            </li>
            <li className="col-4">
              <small>Order</small>
              <h6>920</h6>
            </li>
            <li className="col-4">
              <small>Revenue</small>
              <h6>$23B</h6>
            </li>
          </ul>
        </div>
        {/* Nav tabs */}
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link active" data-toggle="tab" href="#menu">
              Menu
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#Chat">
              <i className="icon-book-open" />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#setting">
              <i className="icon-settings" />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#question">
              <i className="icon-question" />
            </a>
          </li>
        </ul>
        {/* Tab panes */}
        <div className="tab-content padding-0">
          <div className="tab-pane active" id="menu">
            <nav id="left-sidebar-nav" className="sidebar-nav">
              <ul id="main-menu" className="metismenu li_animation_delay">
                <li className="active">
                  <a href="#Dashboard" className="has-arrow">
                    <i className="fa fa-dashboard" />
                    <span>Dashboard</span>
                  </a>
                  <ul>
                    <li>
                      <a href="index.html">Analytical</a>
                    </li>
                    <li>
                      <a href="h-menu.html">Analytical H-Menu</a>
                    </li>
                    <li>
                      <a href="index9.html">IoT Dashboard</a>
                    </li>
                    <li>
                      <a href="index2.html">Demographic</a>
                    </li>
                    <li className="active">
                      <a href="index6.html">Project Board</a>
                    </li>
                    <li>
                      <a href="index7.html">Crypto Dashboard</a>
                    </li>
                    <li>
                      <a href="index8.html">eCommerce</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#App" className="has-arrow">
                    <i className="fa fa-th-large" />
                    <span>Ready App</span>
                  </a>
                  <ul>
                    <li>
                      <a href="app-inbox.html">Inbox</a>
                    </li>
                    <li>
                      <a href="app-chat.html">Chat</a>
                    </li>
                    <li>
                      <a href="app-calendar.html">Calendar</a>
                    </li>
                    <li>
                      <a href="app-contact.html">Contact list</a>
                    </li>
                    <li>
                      <a href="app-contact-grid.html">
                        Contact Card{" "}
                        <span className="badge badge-warning float-right">
                          New
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="app-taskboard.html">Taskboard</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        <span>Blog</span>
                      </a>
                      <ul>
                        <li>
                          <a href="blog-dashboard.html">Dashboard</a>
                        </li>
                        <li>
                          <a href="blog-post.html">New Post</a>
                        </li>
                        <li>
                          <a href="blog-list.html">Blog List</a>
                        </li>
                        <li>
                          <a href="blog-details.html">Blog Detail</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        <span>File Manager</span>
                      </a>
                      <ul>
                        <li>
                          <a href="file-dashboard.html">Dashboard</a>
                        </li>
                        <li>
                          <a href="file-documents.html">Documents</a>
                        </li>
                        <li>
                          <a href="file-media.html">Media</a>
                        </li>
                        <li>
                          <a href="file-images.html">Images</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#Widgets" className="has-arrow">
                    <i className="fa fa-puzzle-piece" />
                    <span>Widgets</span>
                  </a>
                  <ul>
                    <li>
                      <a href="widgets-statistics.html">Statistics</a>
                    </li>
                    <li>
                      <a href="widgets-data.html">Data</a>
                    </li>
                    <li>
                      <a href="widgets-chart.html">Chart</a>
                    </li>
                    <li>
                      <a href="widgets-weather.html">Weather</a>
                    </li>
                    <li>
                      <a href="widgets-social.html">Social</a>
                    </li>
                    <li>
                      <a href="widgets-blog.html">Blog</a>
                    </li>
                    <li>
                      <a href="widgets-ecommerce.html">eCommerce</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#uiElements" className="has-arrow">
                    <i className="fa fa-diamond" />
                    <span>UI Elements</span>
                  </a>
                  <ul>
                    <li>
                      <a href="ui-typography.html">Typography</a>
                    </li>
                    <li>
                      <a href="ui-tabs.html">Tabs</a>
                    </li>
                    <li>
                      <a href="ui-buttons.html">Buttons</a>
                    </li>
                    <li>
                      <a href="ui-bootstrap.html">Bootstrap UI</a>
                    </li>
                    <li>
                      <a href="ui-icons.html">Icons</a>
                    </li>
                    <li>
                      <a href="ui-notifications.html">Notifications</a>
                    </li>
                    <li>
                      <a href="ui-colors.html">Colors</a>
                    </li>
                    <li>
                      <a href="ui-dialogs.html">Dialogs</a>
                    </li>
                    <li>
                      <a href="ui-list-group.html">List Group</a>
                    </li>
                    <li>
                      <a href="ui-media-object.html">Media Object</a>
                    </li>
                    <li>
                      <a href="ui-modals.html">Modals</a>
                    </li>
                    <li>
                      <a href="ui-nestable.html">Nestable</a>
                    </li>
                    <li>
                      <a href="ui-progressbars.html">Progress Bars</a>
                    </li>
                    <li>
                      <a href="ui-range-sliders.html">Range Sliders</a>
                    </li>
                    <li>
                      <a href="ui-treeview.html">Treeview</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#charts" className="has-arrow">
                    <i className="fa fa-area-chart" />
                    <span>Charts</span>
                  </a>
                  <ul>
                    <li>
                      <a href="chart-apex.html">Apex</a>{" "}
                    </li>
                    <li>
                      <a href="chart-c3.html">C3 Charts</a>
                    </li>
                    <li>
                      <a href="chart-morris.html">Morris</a>{" "}
                    </li>
                    <li>
                      <a href="chart-flot.html">Flot</a>{" "}
                    </li>
                    <li>
                      <a href="chart-chartjs.html">ChartJS</a>{" "}
                    </li>
                    <li>
                      <a href="chart-jquery-knob.html">Jquery Knob</a>{" "}
                    </li>
                    <li>
                      <a href="chart-sparkline.html">Sparkline Chart</a>
                    </li>
                    <li>
                      <a href="chart-peity.html">Peity</a>
                    </li>
                    <li>
                      <a href="chart-gauges.html">Gauges</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#forms" className="has-arrow">
                    <i className="fa fa-pencil" />
                    <span>Forms</span>
                  </a>
                  <ul>
                    <li>
                      <a href="forms-validation.html">Form Validation</a>
                    </li>
                    <li>
                      <a href="forms-advanced.html">Advanced Elements</a>
                    </li>
                    <li>
                      <a href="forms-basic.html">Basic Elements</a>
                    </li>
                    <li>
                      <a href="forms-wizard.html">Form Wizard</a>
                    </li>
                    <li>
                      <a href="forms-dragdropupload.html">
                        Drag &amp; Drop Upload
                      </a>
                    </li>
                    <li>
                      <a href="forms-cropping.html">Image Cropping</a>
                    </li>
                    <li>
                      <a href="forms-summernote.html">Summernote</a>
                    </li>
                    <li>
                      <a href="forms-editors.html">CKEditor</a>
                    </li>
                    <li>
                      <a href="forms-markdown.html">Markdown</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#Tables" className="has-arrow">
                    <i className="fa fa-table" />
                    <span>Tables</span>
                  </a>
                  <ul>
                    <li>
                      <a href="table-basic.html">
                        Tables Example
                        <span className="badge badge-info float-right">
                          New
                        </span>
                      </a>{" "}
                    </li>
                    <li>
                      <a href="table-normal.html">Normal Tables</a>{" "}
                    </li>
                    <li>
                      <a href="table-jquery-datatable.html">
                        Jquery Datatables
                      </a>{" "}
                    </li>
                    <li>
                      <a href="table-editable.html">Editable Tables</a>{" "}
                    </li>
                    <li>
                      <a href="table-color.html">Tables Color</a>{" "}
                    </li>
                    <li>
                      <a href="table-filter.html">
                        Table Filter{" "}
                        <span className="badge badge-info float-right">
                          New
                        </span>
                      </a>{" "}
                    </li>
                    <li>
                      <a href="table-dragger.html">
                        Table dragger{" "}
                        <span className="badge badge-info float-right">
                          New
                        </span>
                      </a>{" "}
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#Authentication" className="has-arrow">
                    <i className="fa fa-lock" />
                    <span>Authentication</span>
                  </a>
                  <ul>
                    <li>
                      <a href="page-login.html">Login</a>
                    </li>
                    <li>
                      <a href="page-register.html">Register</a>
                    </li>
                    <li>
                      <a href="page-lockscreen.html">Lockscreen</a>
                    </li>
                    <li>
                      <a href="page-forgot-password.html">Forgot Password</a>
                    </li>
                    <li>
                      <a href="page-404.html">Page 404</a>
                    </li>
                    <li>
                      <a href="page-403.html">Page 403</a>
                    </li>
                    <li>
                      <a href="page-500.html">Page 500</a>
                    </li>
                    <li>
                      <a href="page-503.html">Page 503</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#Pages" className="has-arrow">
                    <i className="fa fa-file" />
                    <span>Extra Pages</span>
                  </a>
                  <ul>
                    <li>
                      <a href="page-blank.html">Blank Page</a>{" "}
                    </li>
                    <li>
                      <a href="page-profile.html">
                        Profile{" "}
                        <span className="badge badge-default float-right">
                          v1
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="page-profile2.html">
                        Profile{" "}
                        <span className="badge badge-warning float-right">
                          v2
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="page-gallery.html">
                        Image Gallery{" "}
                        <span className="badge badge-default float-right">
                          v1
                        </span>
                      </a>{" "}
                    </li>
                    <li>
                      <a href="page-gallery2.html">
                        Image Gallery{" "}
                        <span className="badge badge-warning float-right">
                          v2
                        </span>
                      </a>{" "}
                    </li>
                    <li>
                      <a href="page-timeline.html">Timeline</a>
                    </li>
                    <li>
                      <a href="page-timeline-h.html">Horizontal Timeline</a>
                    </li>
                    <li>
                      <a href="page-pricing.html">Pricing</a>
                    </li>
                    <li>
                      <a href="page-invoices.html">Invoices</a>
                    </li>
                    <li>
                      <a href="page-invoices2.html">
                        Invoices{" "}
                        <span className="badge badge-warning float-right">
                          v2
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="page-search-results.html">Search Results</a>
                    </li>
                    <li>
                      <a href="page-helper-class.html">Helper Classes</a>
                    </li>
                    <li>
                      <a href="page-teams-board.html">Teams Board</a>
                    </li>
                    <li>
                      <a href="page-projects-list.html">Projects List</a>
                    </li>
                    <li>
                      <a href="page-maintenance.html">Maintenance</a>
                    </li>
                    <li>
                      <a href="page-testimonials.html">Testimonials</a>
                    </li>
                    <li>
                      <a href="page-faq.html">FAQ</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#Maps" className="has-arrow">
                    <i className="fa fa-map" />
                    <span>Maps</span>
                  </a>
                  <ul>
                    <li>
                      <a href="map-google.html">Google Map</a>
                    </li>
                    <li>
                      <a href="map-yandex.html">Yandex Map</a>
                    </li>
                    <li>
                      <a href="map-jvectormap.html">jVector Map</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
          <div className="tab-pane" id="Chat">
            <form>
              <div className="input-group m-b-20">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="icon-magnifier" />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                />
              </div>
            </form>
            <ul className="right_chat list-unstyled li_animation_delay">
              <li>
                <a href="javascript:void(0);" className="media">
                  <img
                    className="media-object"
                    src="assets/images/xs/avatar1.jpg"
                    alt=""
                  />
                  <div className="media-body">
                    <span className="name d-flex justify-content-between">
                      Chris Fox <i className="fa fa-heart-o font-12" />
                    </span>
                    <span className="message">chrisfox@gmail.com</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="javascript:void(0);" className="media">
                  <img
                    className="media-object"
                    src="assets/images/xs/avatar2.jpg"
                    alt=""
                  />
                  <div className="media-body">
                    <span className="name d-flex justify-content-between">
                      Joge Lucky <i className="fa fa-heart-o font-12" />
                    </span>
                    <span className="message">Jogelucky@gmail.com</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="javascript:void(0);" className="media">
                  <img
                    className="media-object"
                    src="assets/images/xs/avatar3.jpg"
                    alt=""
                  />
                  <div className="media-body">
                    <span className="name d-flex justify-content-between">
                      Isabella <i className="fa fa-heart-o font-12" />
                    </span>
                    <span className="message">Isabella@gmail.com</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="javascript:void(0);" className="media">
                  <img
                    className="media-object"
                    src="assets/images/xs/avatar4.jpg"
                    alt=""
                  />
                  <div className="media-body">
                    <span className="name d-flex justify-content-between">
                      Folisise Chosielie <i className="fa fa-heart font-12" />
                    </span>
                    <span className="message">
                      FolisiseChosielie@gmail.com
                    </span>
                  </div>
                </a>
              </li>
              <li>
                <a href="javascript:void(0);" className="media">
                  <img
                    className="media-object"
                    src="assets/images/xs/avatar5.jpg"
                    alt=""
                  />
                  <div className="media-body">
                    <span className="name d-flex justify-content-between">
                      Alexander <i className="fa fa-heart-o font-12" />
                    </span>
                    <span className="message">Alexander@gmail.com</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
          <div className="tab-pane" id="setting">
            <h6>Choose Skin</h6>
            <ul className="choose-skin list-unstyled">
              <li data-theme="purple">
                <div className="purple" />
              </li>
              <li data-theme="blue">
                <div className="blue" />
              </li>
              <li data-theme="cyan" className="active">
                <div className="cyan" />
              </li>
              <li data-theme="green">
                <div className="green" />
              </li>
              <li data-theme="orange">
                <div className="orange" />
              </li>
              <li data-theme="blush">
                <div className="blush" />
              </li>
              <li data-theme="red">
                <div className="red" />
              </li>
            </ul>
            <ul className="list-unstyled font_setting mt-3">
              <li>
                <label className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input"
                    name="font"
                    defaultValue="font-nunito"
                    defaultChecked=""
                  />
                  <span className="custom-control-label">
                    Nunito Google Font
                  </span>
                </label>
              </li>
              <li>
                <label className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input"
                    name="font"
                    defaultValue="font-ubuntu"
                  />
                  <span className="custom-control-label">Ubuntu Font</span>
                </label>
              </li>
              <li>
                <label className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input"
                    name="font"
                    defaultValue="font-raleway"
                  />
                  <span className="custom-control-label">
                    Raleway Google Font
                  </span>
                </label>
              </li>
              <li>
                <label className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input"
                    name="font"
                    defaultValue="font-IBMplex"
                  />
                  <span className="custom-control-label">
                    IBM Plex Google Font
                  </span>
                </label>
              </li>
            </ul>
            <ul className="list-unstyled mt-3">
              <li className="d-flex align-items-center mb-2">
                <label className="toggle-switch theme-switch">
                  <input type="checkbox" />
                  <span className="toggle-switch-slider" />
                </label>
                <span className="ml-3">Enable Dark Mode!</span>
              </li>
              <li className="d-flex align-items-center mb-2">
                <label className="toggle-switch theme-rtl">
                  <input type="checkbox" />
                  <span className="toggle-switch-slider" />
                </label>
                <span className="ml-3">Enable RTL Mode!</span>
              </li>
              <li className="d-flex align-items-center mb-2">
                <label className="toggle-switch theme-high-contrast">
                  <input type="checkbox" />
                  <span className="toggle-switch-slider" />
                </label>
                <span className="ml-3">Enable High Contrast Mode!</span>
              </li>
            </ul>
            <hr />
            <h6>General Settings</h6>
            <ul className="setting-list list-unstyled">
              <li>
                <label className="fancy-checkbox">
                  <input type="checkbox" name="checkbox" defaultChecked="" />
                  <span>Allowed Notifications</span>
                </label>
              </li>
              <li>
                <label className="fancy-checkbox">
                  <input type="checkbox" name="checkbox" />
                  <span>Offline</span>
                </label>
              </li>
              <li>
                <label className="fancy-checkbox">
                  <input type="checkbox" name="checkbox" />
                  <span>Location Permission</span>
                </label>
              </li>
            </ul>
            <a href="#" target="_blank" className="btn btn-block btn-primary">
              Buy this item
            </a>
            <a
              href="https://themeforest.net/user/wrraptheme/portfolio"
              target="_blank"
              className="btn btn-block btn-secondary"
            >
              View portfolio
            </a>
          </div>
          <div className="tab-pane" id="question">
            <form>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="icon-magnifier" />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                />
              </div>
            </form>
            <ul className="list-unstyled question">
              <li className="menu-heading">HOW-TO</li>
              <li>
                <a href="javascript:void(0);">How to Create Campaign</a>
              </li>
              <li>
                <a href="javascript:void(0);">Boost Your Sales</a>
              </li>
              <li>
                <a href="javascript:void(0);">Website Analytics</a>
              </li>
              <li className="menu-heading">ACCOUNT</li>
              <li>
                <a href="javascript:void(0);">Cearet New Account</a>
              </li>
              <li>
                <a href="javascript:void(0);">Change Password?</a>
              </li>
              <li>
                <a href="javascript:void(0);">Privacy &amp; Policy</a>
              </li>
              <li className="menu-heading">BILLING</li>
              <li>
                <a href="javascript:void(0);">Payment info</a>
              </li>
              <li>
                <a href="javascript:void(0);">Auto-Renewal</a>
              </li>
              <li className="menu-button mt-3">
                <a
                  href="../docs/index.html"
                  className="btn btn-primary btn-block"
                >
                  Documentation
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
</>
  );
};

export default DashboardSidebar;
