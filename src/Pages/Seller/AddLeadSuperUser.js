import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import SellerSidebar from "../../components/Shared/SellerSidebar";
import SellerHeaderPart from "../../components/Shared/SellerHeaderPart";
import "./AddLead.css";

const AddLeadSuperUser = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [members, setMember] = useState([]);
  const [lead, setLead] = useState([]);
  const [emailError, setEmailError] = useState("");
  const [isEmailExisting, setIsEmailExisting] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");

  const handleLogoUpload = async (event) => {
    const file = event.target.files[0]; // Get the uploaded file
    const formData = new FormData();
    formData.append("image", file);
    formData.append("key", "e3a766c99e397158b5668ccd3ed717ff"); // ImgBB API Key

    try {
      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result && result.data && result.data.display_url) {
        setLogoUrl(result.data.display_url); // Set the logo URL in state
      }
    } catch (error) {
      console.error("Error uploading logo:", error);
    }
  };

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/leads`)
      .then((res) => res.json())
      .then((result) => setLead(result));
  }, []);

  const isEmailExists = (email) => {
    return lead.some((leadItem) => leadItem.email === email);
  };

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/user?userEmail=${user?.email}`)
      .then((res) => res.json())
      .then((result) => setMember(result));
  }, [user]);

  const handleLead = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;

    if (isEmailExists(email)) {
      setEmailError("Email already exists in the database.");
      setIsEmailExisting(true);
    } else {
      setEmailError("");
      setIsEmailExisting(false);
      const leadProvider = event.target.leadProvider.value;
      const leadValue = event.target.leadValue.value;
      const leadSubmitStatus = event.target.leadSubmitStatus.value;
      const leadProviderID = event.target.leadProviderID.value;
      const website = event.target.website.value;
      const companyEmail = event.target.companyEmail.value;
      const companySize = event.target.companySize.value;
      const companyAbout = event.target.companyAbout.value;
      const companyFounded = event.target.companyFounded.value;
      const annualRevenue = event.target.annualRevenue.value;
      const companyFacebook = event.target.companyFacebook.value;
      const companyLinkedIn = event.target.companyLinkedIn.value;
      const industry = event.target.industry.value;
      const personName = event.target.personName.value;
      const title = event.target.title.value;
      const personFacebook = event.target.personFacebook.value;
      const personLinkedIn = event.target.personLinkedIn.value;
      const location = event.target.location.value;

      const addLead = {
        leadProvider,
        leadProviderID,
        leadValue,
        leadSubmitStatus,
        website,
        companyEmail,
        companySize,
        companyAbout,
        companyFounded,
        annualRevenue,
        companyFacebook,
        companyLinkedIn,
        logo: logoUrl,
        industry,
        personName,
        title,
        email,
        personFacebook,
        personLinkedIn,
        location,
      };

      try {
        const url = `https://dry-inlet-34467-1e797feb3813.herokuapp.com/add-lead`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(addLead),
        });
        const result = await response.json();
        alert("Lead is Added...Add Another Lead");
        navigate("#");
      } catch (error) {
        // Handle error, if any
        console.error("Error submitting lead:", error);
      }
    }
  };
  const handleBlur = (event) => {
    const email = event.target.value;
    if (isEmailExists(email)) {
      setEmailError("Email already exists in the database.");
      setIsEmailExisting(true);
    } else {
      setEmailError("");
      setIsEmailExisting(false);
    }
  };

  return (
    <div>
      {members.map(
        (member) =>
          member.userEmail === user?.email && (
            <div id="wrapper" className="theme-cyan">
              <SellerSidebar></SellerSidebar>
              <div id="main-content">
                <div className="container-fluid">
                  <SellerHeaderPart></SellerHeaderPart>

                  <form onSubmit={handleLead} className="container mb-5">
                    <input
                      type="text"
                      hidden
                      value={user?.email}
                      name="leadProvider"
                      className="form-control"
                    />
                    <input
                      type="text"
                      hidden
                      value={member._id}
                      name="leadProviderID"
                      className="form-control"
                    />

                    <input
                      type="text"
                      hidden
                      value="0.01"
                      name="leadValue"
                      className="form-control"
                    />
                    <input
                      type="text"
                      hidden
                      value="Approved"
                      name="leadSubmitStatus"
                      className="form-control"
                    />

                    <br />

                    <div className="company-info">
                      <div>
                        <label className="form-label">Company Logo</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload} // Handle logo file upload
                          className="form-control"
                        />
                        {logoUrl && <img src={logoUrl} alt="Logo Preview" />}{" "}
                        {/* Show uploaded logo preview */}
                      </div>
                      <br />
                      <br />

                      <div>
                        <label className="form-label">
                          Company Website
                          <span className="required-mark">*</span>
                        </label>
                        <input
                          type="url"
                          name="website"
                          required
                          className="form-control "
                          placeholder="Website"
                        />
                      </div>
                      <br />
                      <br />
                      <div>
                        <label className="form-label">Company Email</label>
                        <input
                          type="email"
                          name="companyEmail"
                          className="form-control"
                          placeholder="Company Email"
                        />
                      </div>
                      <br />
                      <br />
                      <div>
                        <label className="form-label">
                          Company About<span className="required-mark">*</span>
                        </label>
                        <textarea
                          type="text"
                          name="companyAbout"
                          required
                          className="form-control"
                          placeholder="About Company"
                        />
                      </div>
                      <br />
                      <br />
                      <div>
                        <label className="form-label">
                          Company Founded Year
                        </label>
                        <input
                          type="text"
                          name="companyFounded"
                          className="form-control"
                          placeholder="Company Founded"
                        />
                      </div>
                      <br />
                      <br />
                      <div>
                        <label className="form-label">Company Size</label>
                        <select name="companySize" className="form-control">
                          <option value="1-10">1-10 employees</option>
                          <option value="11-50">11-50 employees</option>
                          <option value="51-200">51-200 employees</option>
                          <option value="201-500">201-500 employees</option>
                          <option value="501-1000">501-1000 employees</option>
                          <option value="1001-5000">1001-5000 employees</option>
                          <option value="5001-10000">
                            5001-10,000 employees
                          </option>
                          <option value="10001+">10,001+ employees</option>
                        </select>
                      </div>
                      <br />
                      <br />

                      <div>
                        <label className="form-label">
                          Company Industry
                          <span className="required-mark">*</span>
                        </label>
                        <input
                          type="text"
                          name="industry"
                          required
                          className="form-control"
                          placeholder="Industry"
                        />
                      </div>
                      <br />
                      <br />

                      <div>
                        <label className="form-label">
                          Est. Annual Revenue
                        </label>
                        <input
                          type="text"
                          name="annualRevenue"
                          className="form-control"
                          placeholder="Est. Annual Revenue"
                        />
                      </div>
                      <br />
                      <br />

                      <div>
                        <label className="form-label">
                          Company Facebook URL
                        </label>
                        <input
                          type="url"
                          name="companyFacebook"
                          className="form-control"
                          placeholder="Company Facebook URL"
                        />
                      </div>
                      <br />
                      <br />

                      <div>
                        <label className="form-label">
                          Company LinkedIn URL
                        </label>
                        <input
                          type="url"
                          name="companyLinkedIn"
                          className="form-control"
                          placeholder="Company LinkedIn"
                        />
                      </div>
                      <br />
                      <br />
                      <div>
                        <label className="form-label">
                          Location<span className="required-mark">*</span>
                        </label>
                        <input
                          type="text"
                          name="location"
                          required
                          className="form-control"
                          placeholder="Location"
                        />
                      </div>
                    </div>

                    <div className="person-info">
                      <div>
                        <label className="form-label">
                          Person Name<span className="required-mark">*</span>
                        </label>
                        <input
                          type="text"
                          name="personName"
                          required
                          className="form-control"
                          placeholder="Person Name"
                        />
                      </div>
                      <br />
                      <br />

                      <div>
                        <label className="form-label">
                          Title/Role<span className="required-mark">*</span>
                        </label>
                        <input
                          type="text"
                          name="title"
                          required
                          className="form-control"
                          placeholder="Position"
                        />
                      </div>
                      <br />
                      <br />

                      <div>
                        <label className="form-label">
                          Person's Email<span className="required-mark">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          className="form-control"
                          placeholder="Person's Email"
                          onBlur={handleBlur} // Use the handleBlur function
                        />
                        {emailError && (
                          <p className="text-danger">{emailError}</p>
                        )}
                      </div>
                      <br />
                      <br />

                      <div>
                        <label className="form-label">
                          Person Facebook URL
                        </label>
                        <input
                          type="url"
                          name="personFacebook"
                          className="form-control"
                          placeholder="Person Facebook URL"
                        />
                      </div>
                      <br />
                      <br />

                      <div>
                        <label className="form-label">
                          Person LinkedIn URL
                        </label>
                        <input
                          type="url"
                          name="personLinkedIn"
                          className="form-control"
                          placeholder="Person LinkedIn"
                        />
                      </div>
                      <br />
                      <br />
                    </div>
                    <br />
                    <br />
                    <div className="col-12 mt-2">
                      <button
                        type="submit"
                        className="btn btn-primary col-12"
                        disabled={isEmailExisting} // Disable button if email exists
                      >
                        Submit
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

export default AddLeadSuperUser;
