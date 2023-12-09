import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { Link, useNavigate, useParams } from "react-router-dom";
import BuyerSidebar from "../../components/Shared/BuyerSidebar";
import BuyerHeaderPart from "../../components/Shared/BuyerHeaderPart";
import "./FildLeads.css";

const SearchLeads = () => {
  const [leads, setLeads] = useState([]);
  const [lists, setLists] = useState([]);
  const [user] = useAuthState(auth);
  const [buyers, setBuyers] = useState([]);
  const [buyer, setBuyer] = useState([]);
  const [collections, setCollections] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchIndustry, setSearchIndustry] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchSize, setSearchSize] = useState("");

  const handleSearch = (e) => {
    setSearchIndustry(e.target.value);
  };

  const handleTitleSearch = (e) => {
    setSearchTitle(e.target.value);
  };

  const handleLocationSearch = (e) => {
    setSearchLocation(e.target.value);
  };
  const handleSizeSearch = (e) => {
    setSearchSize(e.target.value);
  };

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/buyer/${id}`)
      .then((res) => res.json())
      .then((result) => setBuyer(result));
  }, [id]);

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/lists`)
      .then((res) => res.json())
      .then((result) => setLists(result));
  }, []);
  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/leads`)
      .then((res) => res.json())
      .then((result) => setLeads(result));
  }, []);

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/buyer?buyerEmail=${user?.email}`)
      .then((res) => res.json())
      .then((result) => setBuyers(result));
  }, [user]);

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/all-collected-leads`)
      .then((res) => res.json())
      .then((result) => setCollections(result));
  }, []);

  const handleCreateList = (event) => {
    event.preventDefault();
    const buyerEmail = event.target.buyerEmail.value;
    const listName = event.target.listName.value;

    const buyerCredit = {
      buyerEmail,
      listName,
    };

    const url = `https://dry-inlet-34467-1e797feb3813.herokuapp.com/create-list`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(buyerCredit),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate(`/find-leads/${id}`);
      });
  };

  const handleBuyerCredit = (event, leadId) => {
    event.preventDefault();
    const currentBalance = event.target.currentBalance.value;

    const buyerCredit = {
      currentBalance,
    };

    const url = `https://dry-inlet-34467-1e797feb3813.herokuapp.com/buyer-update-balance/${buyer._id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(buyerCredit),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate(`/take-lead/${leadId}`);
      });
  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.leadSubmitStatus === "Approved" &&
      lead.industry.toLowerCase().includes(searchIndustry.toLowerCase()) &&
      lead.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
      lead.location.toLowerCase().includes(searchLocation.toLowerCase()) &&
      lead.companySize.toLowerCase().includes(searchSize.toLowerCase())
  );

  // Pagination state variables
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 30;

  // Logic to handle pagination
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);

  // Function to handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {buyers.map(
        (buyer) =>
          buyer.buyerEmail === user?.email && (
            <div key={buyer._id} id="wrapper" className="theme-cyan">
              <BuyerSidebar></BuyerSidebar>
              <div id="main-content">
                <div className="container-fluid">
                  <BuyerHeaderPart></BuyerHeaderPart>

                  <div className="row clearfix">
                    <div className="col-lg-12 col-md-12">
                      {
                        lists.filter(list => list.buyerEmail === user?.email).length === 1 &&
                        <div className="card">
                        <div className="header">
                          <h2>Project List</h2>
                          <ul className="header-dropdown">
                            <li className="dropdown">{/* ... */}</li>
                          </ul>
                        </div>

                        <div className="body project_report">
                          <div className="search d-flex justify-content-center">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search by industry..."
                              value={searchIndustry}
                              onChange={handleSearch}
                            />
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search by title..."
                              value={searchTitle}
                              onChange={handleTitleSearch}
                            />
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search by Country..."
                              value={searchLocation}
                              onChange={handleLocationSearch}
                            />

                            <select
                              name="companySize"
                              className="form-control"
                              value={searchSize}
                              onChange={handleSizeSearch}
                            >
                              <option value="" selected>
                                Select company size
                              </option>
                              <option value="1-10">1-10 employees</option>
                              <option value="11-50">11-50 employees</option>
                              <option value="51-200">51-200 employees</option>
                              <option value="201-500">201-500 employees</option>
                              <option value="501-1000">
                                501-1000 employees
                              </option>
                              <option value="1001-5000">
                                1001-5000 employees
                              </option>
                              <option value="5001-10000">
                                5001-10,000 employees
                              </option>
                              <option value="10001+">10,001+ employees</option>
                            </select>
                          </div>
                          <div className="table-responsive">
                            <table className="table table-hover js-basic-example dataTable table-custom mb-0">
                              <thead>
                                <tr>
                                  <th>Logo</th>
                                  <th>Website</th>
                                  <th>Size</th>
                                  <th>Name</th>
                                  <th>Title</th>
                                  <th>Email</th>
                                  <th>Location</th>
                                  <th>Action</th>
                                  <th>Details</th>
                                </tr>
                              </thead>
                              {currentLeads.map(
                                (lead) =>
                                  lead.leadSubmitStatus === "Approved" && (
                                    <tbody key={lead._id}>
                                      <>
                                        {collections.filter(
                                          (collect) =>
                                            collect.leadId === lead._id &&
                                            collect.buyerEmail === user?.email
                                        ).length === 1 && <></>}
                                      </>
                                      <>
                                        {collections.filter(
                                          (collect) =>
                                            collect.leadId === lead._id &&
                                            collect.buyerEmail === user?.email
                                        ).length === 0 && (
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
                                              <small className="badge badge-success">
                                                Industry : {lead.industry}
                                              </small>
                                            </td>
                                            <td>{lead.companySize}</td>
                                            <td>
                                              {lead.personName} <br />
                                              <small>
                                                <Link to={lead.linkedin}>
                                                  <i class="fa fa-linkedin text-primary"></i>
                                                </Link>{" "}
                                                <Link to={lead.fb}>
                                                  <i class="text-primary fa fa-linkedin"></i>
                                                </Link>
                                              </small>
                                            </td>
                                            <td>
                                              <small className="badge badge-success">
                                                {lead.title}
                                              </small>
                                            </td>
                                            <td>
                                              <small className="badge badge-success">
                                                Valied Email{" "}
                                                <i class="text-primary fa fa-certificate"></i>
                                              </small>
                                            </td>
                                            <td>{lead.location}</td>

                                            <td>
                                            {buyers.map((pro) => pro.buyerEmail === user?.email &&
                                                                parseFloat(pro.currentBalance) < parseFloat(lead.leadValue) && (
                                                                <Link to="/deposit-funds" className="btn btn-sm btn-primary">Deposit to get data</Link>))}
                                                            {buyers.map((pro) => pro.buyerEmail === user?.email &&
                                                                parseFloat(pro.currentBalance) >= parseFloat(lead.leadValue) && (
                                                                  <form onSubmit={(event) => handleBuyerCredit(event, lead._id)}>
                                                                    <input type="number"
                                                                      hidden value={(buyer.currentBalance -lead.leadValue).toFixed(2)}
                                                                      name="currentBalance"></input>
                                                                    <button type="submit" className="btn btn-primary col-12" >
                                                                      ${lead.leadValue} to Get Data 
                                                                      </button>
                                                                  </form>
                                                                )
                                                            )}       
                                            </td>
                                            <td>
                                              <small>
                                                <button
                                                  type="button"
                                                  className="btn btn-primary"
                                                  data-toggle="modal"
                                                  data-target={`#exampleModalCenter_${lead._id}`} // Unique modal ID
                                                >
                                                  <i class="fa fa-plus"></i>
                                                </button>
                                              </small>

                                              {/* Modal for each lead */}
                                              <div
                                                className="modal fade"
                                                id={`exampleModalCenter_${lead._id}`} // Unique modal ID
                                                tabIndex="-1"
                                                role="dialog"
                                                aria-labelledby={`exampleModalCenterTitle_${lead._id}`} // Unique modal title ID
                                                aria-hidden="true"
                                              >
                                                <div
                                                  className="modal-dialog modal-dialog-centered"
                                                  role="document"
                                                >
                                                  <div className="modal-content">
                                                    <div className="modal-header">
                                                      <h5
                                                        className="modal-title"
                                                        id={`exampleModalCenterTitle_${lead._id}`} // Unique modal title ID
                                                      >
                                                        <div>
                                                          <img
                                                            src={lead.logo}
                                                            alt="logo"
                                                            style={{
                                                              width: "100px",
                                                              height: "100px",
                                                            }}
                                                          />
                                                          <h4>
                                                            Website: {lead.website}
                                                          </h4>
                                                          
                                                        </div>
                                                      </h5>
                                                      <button
                                                        type="button"
                                                        className="close"
                                                        data-dismiss="modal"
                                                        aria-label="Close"
                                                      >
                                                        <span aria-hidden="true">
                                                          &times;
                                                        </span>
                                                      </button>
                                                    </div>
                                                    <div className="modal-body">
                                                      {lead.email}
                                                    </div>
                                                    <div className="modal-footer">
                                                      <button
                                                        type="button"
                                                        className="btn btn-secondary"
                                                        data-dismiss="modal"
                                                      >
                                                        Close
                                                      </button>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </td>
                                          </tr>
                                        )}
                                      </>
                                    </tbody>
                                  )
                              )}
                            </table>
                            <ul className="pagination">
                              <li
                                className={`page-item ${
                                  currentPage === 1 ? "disabled" : ""
                                }`}
                              >
                                <button
                                  className="page-link"
                                  onClick={() => paginate(currentPage - 1)}
                                >
                                  Previous
                                </button>
                              </li>
                              {[...Array(totalPages)].map((_, index) => {
                                const pageNumber = index + 1;
                                if (
                                  pageNumber <= currentPage + 1 &&
                                  pageNumber >= currentPage - 1 &&
                                  totalPages > 3
                                ) {
                                  return (
                                    <li
                                      key={index}
                                      className={`page-item ${
                                        currentPage === pageNumber
                                          ? "active"
                                          : ""
                                      }`}
                                    >
                                      <button
                                        className="page-link"
                                        onClick={() => paginate(pageNumber)}
                                      >
                                        {pageNumber}
                                      </button>
                                    </li>
                                  );
                                } else if (
                                  pageNumber === 1 &&
                                  currentPage <= 2
                                ) {
                                  return (
                                    <li
                                      key={index}
                                      className={`page-item ${
                                        currentPage === pageNumber
                                          ? "active"
                                          : ""
                                      }`}
                                    >
                                      <button
                                        className="page-link"
                                        onClick={() => paginate(pageNumber)}
                                      >
                                        {pageNumber}
                                      </button>
                                    </li>
                                  );
                                } else if (
                                  pageNumber === totalPages &&
                                  currentPage >= totalPages - 1
                                ) {
                                  return (
                                    <li
                                      key={index}
                                      className={`page-item ${
                                        currentPage === pageNumber
                                          ? "active"
                                          : ""
                                      }`}
                                    >
                                      <button
                                        className="page-link"
                                        onClick={() => paginate(pageNumber)}
                                      >
                                        {pageNumber}
                                      </button>
                                    </li>
                                  );
                                }
                                return null;
                              })}
                              <li
                                className={`page-item ${
                                  currentPage === totalPages ? "disabled" : ""
                                }`}
                              >
                                <button
                                  className="page-link"
                                  onClick={() => paginate(currentPage + 1)}
                                >
                                  Next
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      }
                      {
                        lists.filter(list => list.buyerEmail === user?.email).length === 0 &&
                        <form
                        onSubmit={
                          handleCreateList
                        }
                      >
                        <input
                          type="text"
                          name="listName"
                          className="form-control col-6"
                          defaultValue="New Collection"
                        ></input>
                        <input
                          type="text"
                          hidden
                          value={
                            user?.email
                          }
                          name="buyerEmail"
                        ></input>
                        <br />
                        <br />
                        <button
                          type="submit"
                          className="btn btn-primary col-6"
                        >First, create a list before searching for leads
                        </button>
                      </form>
                      }
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

export default SearchLeads;
