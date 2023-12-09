import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Shared/Loading";

const BuyerUpdateProfile = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [buyers, setBuyers] = useState([]);
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/buyer?buyerEmail=${user?.email}`)
      .then((res) => res.json())
      .then((result) => setBuyers(result));
  }, [user]);

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/user?userEmail=${user?.email}`)
      .then((res) => res.json())
      .then((result) => setMembers(result));
  }, [user]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateBuyer = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const currentBalance = event.target.currentBalance.value;
    const buyerFullName = event.target.buyerFullName.value;
    const buyerProfileImage = event.target.buyerProfileImage.files[0];
    const address = event.target.address.value;
    const city = event.target.city.value;
    const country = event.target.country.value;

    const formData = new FormData();
    formData.append("image", buyerProfileImage);
    formData.append("key", "e3a766c99e397158b5668ccd3ed717ff"); // Replace with your imgbb API key

    try {
      const imgbbResponse = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      });
      const imgbbData = await imgbbResponse.json();

      const BuyerProfile = {
        currentBalance,
        buyerFullName,
        buyerProfileImage: imgbbData.data.url,
        buyerEmail: user?.email,
        address,
        city,
        country,
      };

      const url = `https://dry-inlet-34467-1e797feb3813.herokuapp.com/create-buyer`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(BuyerProfile),
      });

      if (response.ok) {
        navigate("/");
      } else {
        // Handle error if needed
      }
    } catch (error) {
      // Handle error if needed
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div id="wrapper">
        <div className="vertical-align-wrap">
          <div className="vertical-align-middle auth-main">
            <div className="container-fluid">
              <div className="row justify-content-center align-items-center vh-100">
                <div className="col-md-6">
                  {isLoading ? (
                    <Loading></Loading>
                  ) : (
                    <div className="card">
                      <div className="card-header">
                        <p className="lead">Update Buyer Profile</p>
                      </div>

                      <div className="card-body">
                        {members.filter(
                          (member) => member.userEmail === user?.email
                        ).length === 0 && (
                          <>
                            {buyers.filter(
                              (buyer) => buyer.buyerEmail === user?.email
                            ).length === 1 && (
                              <>
                                <Link to="/" type="button" class="btn btn-info">
                                  You have already Buyer Profile
                                </Link>
                              </>
                            )}
                            {buyers.filter(
                              (member) => member.buyerEmail === user?.email
                            ).length === 0 && (
                              <form
                                className="form-auth-small"
                                onSubmit={handleUpdateBuyer}
                              >
                                <input
                                  hidden
                                  type="number"
                                  name="currentBalance"
                                  className="form-control"
                                  value="0.02"
                                />

                                <div className="form-group">
                                  <label className="control-label sr-only">
                                    Name
                                  </label>
                                  <input
                                    type="text"
                                    name="buyerFullName"
                                    className="form-control"
                                    placeholder="Enter your Name"
                                  />
                                </div>
                                <div className="form-group">
                                  <label className="control-label sr-only">
                                    Profile Image
                                  </label>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    name="buyerProfileImage"
                                    className="form-control"
                                    onChange={handleImageChange}
                                  />
                                  {/* Image preview */}
                                  {imagePreview && (
                                    <img
                                      src={imagePreview}
                                      alt="Preview"
                                      style={{
                                        maxWidth: "200px",
                                        marginTop: "10px",
                                      }}
                                    />
                                  )}
                                </div>
                                <div className="form-group">
                                  <label className="control-label sr-only">
                                    Email
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    name="buyerEmail"
                                    value={user?.email}
                                  />
                                </div>
                                <div className="form-group">
                                  <label className="control-label sr-only">
                                    Enter Your Address
                                  </label>
                                  <input
                                    type="text"
                                    name="address"
                                    className="form-control"
                                    placeholder="Enter your address"
                                  />
                                </div>
                                <div className="form-group">
                                  <label className="control-label sr-only">
                                    Enter Your City
                                  </label>
                                  <input
                                    type="text"
                                    name="city"
                                    className="form-control"
                                    placeholder="Enter your City"
                                  />
                                </div>
                                <div className="form-group">
                                  <label className="control-label sr-only">
                                    Enter Your Country
                                  </label>
                                  <input
                                    type="text"
                                    name="country"
                                    className="form-control"
                                    placeholder="Enter your Country"
                                  />
                                </div>

                                <button
                                  type="submit"
                                  className="btn btn-info btn-lg btn-block"
                                  disabled={isLoading} // Disable the button when isLoading is true
                                >
                                  {isLoading ? "Loading..." : "Update"}
                                </button>
                              </form>
                            )}
                          </>
                        )}

                        {members.filter(
                          (member) => member.userEmail === user?.email
                        ).length === 1 && (
                          <Link to="/" type="button" class="btn btn-info">
                            You have already Seller Profile
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyerUpdateProfile;
