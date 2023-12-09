import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import BuyerSidebar from "../../components/Shared/BuyerSidebar";
import BuyerHeaderPart from "../../components/Shared/BuyerHeaderPart";
import { Link, useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";

const MyCollections = () => {
  const { id } = useParams();
  const [buyers, setBuyers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [list, setList] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/all-collected-leads`)
      .then((res) => res.json())
      .then((result) => setLeads(result));
  }, []);

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/list/${id}`)
      .then((res) => res.json())
      .then((result) => setList(result));
  }, [id]);

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/buyer?buyerEmail=${user?.email}`)
      .then((res) => res.json())
      .then((result) => setBuyers(result));
  }, [user]);


  const headers = [
    { label: "Website", key: "website" },
    { label: "Email", key: "email" },
    { label: "Industry", key: "industry" },
    { label: "Company Size", key: "companySize" },
    { label: "Location", key: "location" },
    { label: "Person's Name", key: "personName" },
    { label: "Title", key: "title" },
  ];

  const leadData = leads
    .filter((lead) => lead.listId === list._id)
    .map((lead) => ({
      website: lead.website,
      email: lead.email,
      industry: lead.industry,
      companySize: lead.companySize,
      location: lead.location,
      personName: lead.personName,
      title: lead.title,
    }));

  // Generate a filename based on current date and time
  const currentDate = new Date().toLocaleDateString().replace(/\//g, "-");
  const currentTime = new Date().toLocaleTimeString().replace(/:/g, "-");
  const dynamicFilename = `leads_${currentDate}_${currentTime}.csv`;

  const csvFields = [
    "website",
    "email",
    "industry",
    "companySize",
    "location",
    "personName",
    "title",
  ];

  const downloadXLSX = () => {
    const dataWithHeaders = [
      csvFields.map((field) => headers.find((h) => h.key === field).label),
      ...leadData.map((lead) => csvFields.map((field) => lead[field])),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(dataWithHeaders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");
    XLSX.writeFile(workbook, `leads_${currentDate}_${currentTime}.xlsx`);
  };
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

  const filteredLeads = leads.filter((lead) => {
    return (
      lead.buyerEmail === user?.email &&
      lead.industry.toLowerCase().includes(searchIndustry.toLowerCase()) &&
      lead.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
      lead.location.toLowerCase().includes(searchLocation.toLowerCase()) &&
      lead.companySize.toLowerCase().includes(searchSize.toLowerCase())
    );
  });

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
                  <div className="d-flex flex-row-reverse">
                    <div class="dropdown">
                      <button
                        class="btn btn-primary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="fa fa-download mr-2" /> Download Leads
                      </button>
                      <div
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <CSVLink
                          class="dropdown-item"
                          type="button"
                          data={leadData}
                          headers={headers}
                          filename={dynamicFilename}
                        >
                          Download as CSV
                        </CSVLink>
                        <button class="dropdown-item" onClick={downloadXLSX}>
                          Download as XLSX
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="search d-flex justify-content-center mt-3">
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
                      <option value="501-1000">501-1000 employees</option>
                      <option value="1001-5000">1001-5000 employees</option>
                      <option value="5001-10000">5001-10,000 employees</option>
                      <option value="10001+">10,001+ employees</option>
                    </select>
                  </div>

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
                      {filteredLeads.map(
                        (lead) =>
                          list._id === lead.listId &&  lead.buyerEmail === user?.email && (
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
                                  <small
                                    className="badge badge-success"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title={lead.companyLinkedIn}
                                  >
                                    <a
                                      href={`${lead.companyLinkedIn}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <i class="fa fa-linkedin"></i>
                                    </a>
                                  </small>
                                  <small
                                    className="badge badge-success"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title={lead.companyFacebook}
                                  >
                                    <a
                                      href={`${lead.companyFacebook}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <i class="fa fa-facebook"></i>
                                    </a>
                                  </small>
                                </td>
                                <td>{lead.companyEmail}</td>
                                <td>{lead.industry}</td>
                                <td>{lead.companySize}</td>
                                <td>
                                  {lead.location.length > 25 ? (
                                    <span
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title={lead.location}
                                    >
                                      {lead.location.substring(0, 25) + "..."}
                                    </span>
                                  ) : (
                                    lead.location
                                  )}
                                </td>
                                <td>{lead.personName}</td>
                                <td>{lead.title}</td>
                                <td>
                                  {lead.email} <br />
                                  <small className="badge badge-success">
                                    Valid Email{" "}
                                    <i class="text-primary fa fa-certificate"></i>
                                  </small>
                                </td>
                                <td>
                                  <a
                                    href={`mailto:${lead.email}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                   <img
                                      src="https://i.ibb.co/nbd9C3Y/3682321.png"
                                      alt=""
                                      style={{
                                        height: "20px",
                                        width: "auto",
                                        borderWidth: "2px",
                                      }}
                                    />
                                  </a>
                                </td>
                                <td>
                                  <small className="badge badge-success">
                                    <i class="fa fa-linkedin"></i>
                                  </small>
                                  <small className="badge badge-success">
                                    <i class="fa fa-facebook"></i>
                                  </small>
                                </td>
                              </tr>
                            </tbody>
                          )
                      )}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default MyCollections;
