import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { Link, useNavigate } from "react-router-dom";

const SellerUpdateProfile = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [buyers, setBuyers] = useState([]);
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
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

  const handleImageUpload = async (imageFile) => {
    const imgbbApiKey = "e3a766c99e397158b5668ccd3ed717ff";
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      setIsLoading(false);
      return data.data.url;
    } catch (error) {
      setIsLoading(false);
      console.error("Image upload failed:", error);
      return null;
    }
  };

  const handleUpdateSeller = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const currentBalance = event.target.currentBalance.value;
    const userFullName = event.target.userFullName.value;
    const userEmail = event.target.userEmail.value;
    const address = event.target.address.value;
    const city = event.target.city.value;
    const country = event.target.country.value;

    const imageInput = event.target.profileImage;
    const imageUrl =
      imageInput.files.length > 0
        ? await handleImageUpload(imageInput.files[0])
        : null;

    const sellerProfile = {
      currentBalance,
      userFullName,
      profileImage: imageUrl,
      userEmail,
      address,
      city,
      country,
    };

    const url = `https://dry-inlet-34467-1e797feb3813.herokuapp.com/create-user`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(sellerProfile),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating seller profile:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setImagePreview(URL.createObjectURL(selectedImage)); // Set image preview
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
                  <div className="card">
                    <div className="card-header">
                      <p className="lead">Update Seller Profile</p>
                    </div>
                    <div className="card-body">
                      {buyers.filter(
                        (buyer) => buyer.buyerEmail === user?.email
                      ).length === 0 && (
                        <>
                          {members.filter(
                            (member) => member.userEmail === user?.email
                          ).length === 1 && (
                            <Link to="/" className="btn btn-info">
                              You have already Seller Profile
                            </Link>
                          )}
                          {members.filter(
                            (member) => member.userEmail === user?.email
                          ).length === 0 && (
                            <form
                              className="form-auth-small"
                              onSubmit={handleUpdateSeller}
                            >
                              <input
                                hidden
                                type="number"
                                name="currentBalance"
                                className="form-control"
                                value="0.10"
                              />

                              <div className="form-group">
                                <label className="control-label sr-only">
                                  Name
                                </label>
                                <input
                                  type="text"
                                  name="userFullName"
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
                                  name="profileImage"
                                  className="form-control"
                                  placeholder="Select Profile Image"
                                  onChange={handleImageChange} // Handle image selection
                                />
                              </div>

                              {/* Display image preview */}
                              {imagePreview && (
                                <div className="form-group">
                                  <img
                                    src={imagePreview}
                                    alt="Profile Preview"
                                    style={{
                                      maxWidth: "100%",
                                      maxHeight: "200px",
                                    }}
                                  />
                                </div>
                              )}
                              <div className="form-group">
                                <label className="control-label sr-only">
                                  Email
                                </label>
                                <input
                                  type="email"
                                  className="form-control"
                                  placeholder="Enter your email"
                                  name="userEmail"
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
                      {buyers.filter(
                        (buyer) => buyer.buyerEmail === user?.email
                      ).length === 1 && (
                        <Link to="/" type="button" class="btn btn-info">
                          You have already Buyer Profile
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerUpdateProfile;
