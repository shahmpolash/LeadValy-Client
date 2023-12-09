import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import BuyerSidebar from "../../components/Shared/BuyerSidebar";
import BuyerHeaderPart from "../../components/Shared/BuyerHeaderPart";
import { Link, useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";

const LeadCollection = () => {
  const { id } = useParams();
  const [buyers, setBuyers] = useState([]);
  const [buyer, setBuyer] = useState(null);
  const [lead, setLead] = useState([]);
  const [lists, setLists] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/lists`)
      .then((res) => res.json())
      .then((result) => setLists(result));
  }, []);

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/lead/${id}`)
      .then((res) => res.json())
      .then((result) => setLead(result));
  }, []);

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/buyer?buyerEmail=${user?.email}`)
      .then((res) => res.json())
      .then((result) => setBuyers(result));
  }, [user]);

  useEffect(() => {
    const foundBuyer = buyers.find((buyer) => buyer.buyerEmail === user?.email);
    setBuyer(foundBuyer);
  }, [buyers, user]);

  const handLeadCollection = (event) => {
    event.preventDefault();
    const leadValue = event.target.leadValue.value;
    const amountCredited = event.target.amountCredited.value;
    const leadProviderID = event.target.leadProviderID.value;
    const leadProvider = event.target.leadProvider.value;
    const leadId = event.target.leadId.value;
    const buyerEmail = event.target.buyerEmail.value;
    const listId = event.target.listId.value;
    const logo = event.target.logo.value;
    const website = event.target.website.value;
    const companyAbout = event.target.companyAbout.value;
    const companyEmail = event.target.companyEmail.value;
    const companyFounded = event.target.companyFounded.value;
    const companySize = event.target.companySize.value;
    const industry = event.target.industry.value;
    const personName = event.target.personName.value;
    const title = event.target.title.value;
    const email = event.target.email.value;
    const location = event.target.location.value;
    const annualRevenue = event.target.annualRevenue.value;
    const companyFacebook = event.target.companyFacebook.value;
    const companyLinkedIn = event.target.companyLinkedIn.value;
    const personFacebook = event.target.personFacebook.value;
    const personLinkedIn = event.target.personLinkedIn.value;

    const collectLead = {
      leadValue,
      amountCredited,
      leadProviderID,
      leadProvider,
      leadId,
      buyerEmail,
      listId,
      logo,
      website,
      companyAbout,
      companyEmail,
      companyFounded,
      companySize,
      industry,
      personName,
      title,
      email,
      location,
      annualRevenue,
      companyFacebook,
      companyLinkedIn,
      personFacebook,
      personLinkedIn,
    };

    const url = `https://dry-inlet-34467-1e797feb3813.herokuapp.com/new-lead-collection`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(collectLead),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate(`/find-leads/${buyer._id}`);
      });
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
                        </tr>
                      </thead>
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
                            <small>{lead.industry}</small>
                          </td>
                          <td>{lead.companySize}</td>
                          <td>{lead.personName}</td>
                          <td>{lead.title}</td>
                          <td>{lead.email}</td>
                          <td>{lead.location}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <form onSubmit={handLeadCollection} className="container">
                    <input
                      type="text"
                      hidden
                      name="companyEmail"
                      value={lead.companyEmail}
                      className="form-control"
                    />
                    <input
                      type="text"
                      hidden
                      name="companyFounded"
                      value={lead.companyFounded}
                      className="form-control"
                    />
                    <input
                      type="text"
                      hidden
                      name="annualRevenue"
                      value={lead.annualRevenue}
                      className="form-control"
                    />
                    <input
                      type="text"
                      hidden
                      name="companyFacebook"
                      value={lead.companyFacebook}
                      className="form-control"
                    />
                    <input
                      type="text"
                      hidden
                      name="companyLinkedIn"
                      value={lead.companyLinkedIn}
                      className="form-control"
                    />
                    <input
                      type="text"
                      hidden
                      name="personFacebook"
                      value={lead.personFacebook}
                      className="form-control"
                    />
                    <input
                      type="text"
                      hidden
                      name="personLinkedIn"
                      value={lead.personLinkedIn}
                      className="form-control"
                    />

                    {/* old */}
                    <input
                      type="text"
                      hidden
                      name="leadValue"
                      value={lead.leadValue}
                      className="form-control"
                    />

                    <input
                      type="text"
                      hidden
                      name="amountCredited"
                      value="No"
                      className="form-control"
                    />
                    <input
                      type="text"
                      hidden
                      name="leadProvider"
                      value={lead.leadProvider}
                      className="form-control"
                    />
                    <input
                      type="text"
                      hidden
                      name="leadProviderID"
                      value={lead.leadProviderID}
                      className="form-control"
                    />
                    <input
                      type="text"
                      hidden
                      name="leadId"
                      value={lead._id}
                      className="form-control"
                    />
                    <input
                      type="text"
                      hidden
                      name="buyerEmail"
                      value={user?.email}
                      className="form-control"
                    />

                    <br />
                    <div>
                      <select name="listId" className="form-control">
                        {lists.map(
                          (list) =>
                            list.buyerEmail === user?.email && (
                              <option value={list._id}>{list.listName}</option>
                            )
                        )}
                      </select>
                    </div>
                    <div>
                      <input
                        hidden
                        type="text"
                        name="logo"
                        value={lead.logo}
                        className="form-control"
                      />
                    </div>

                    <div>
                      <input
                        hidden
                        type="text"
                        name="website"
                        value={lead.website}
                        className="form-control"
                      />
                    </div>
                    <div>
                      <textarea
                        hidden
                        type="text"
                        name="companyAbout"
                        value={lead.companyAbout}
                        className="form-control"
                      />
                    </div>
                    <div>
                      <input
                        hidden
                        type="text"
                        name="companySize"
                        value={lead.companySize}
                        className="form-control"
                      />
                    </div>

                    <div>
                      <input
                        hidden
                        type="text"
                        name="industry"
                        value={lead.industry}
                        className="form-control"
                      />
                    </div>

                    <div>
                      <input
                        hidden
                        type="text"
                        name="personName"
                        value={lead.personName}
                        className="form-control"
                      />
                    </div>

                    <div>
                      <input
                        hidden
                        type="text"
                        name="title"
                        className="form-control"
                        value={lead.title}
                      />
                    </div>

                    <div>
                      <input
                        hidden
                        type="text"
                        name="email"
                        value={lead.email}
                        className="form-control"
                      />
                    </div>

                    <div>
                      <input
                        hidden
                        type="text"
                        name="location"
                        className="form-control"
                        value={lead.location}
                      />
                    </div>

                    <div className="col-12 mt-2">
                      <button type="submit" className="btn btn-primary col-12">
                        Add To List
                      </button>
                    </div>
                    {/* /.col */}
                  </form>
                </div>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default LeadCollection;
