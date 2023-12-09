import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditBuyerProfile = () => {
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [buyer, setBuyer] = useState([]);
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);


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

    const buyerFullName = event.target.buyerFullName.value;
    const buyerProfileImage = event.target.buyerProfileImage.files[0]; // New image selected by the user
    const address = event.target.address.value;
    const city = event.target.city.value;
    const country = event.target.country.value;

    try {
      let updatedProfileImage = buyer.buyerProfileImage; // Default to the current profile image

      // Check if a new image is selected
      if (buyerProfileImage) {
        const formData = new FormData();
        formData.append("image", buyerProfileImage);
        formData.append("key", "e3a766c99e397158b5668ccd3ed717ff"); // Replace with your imgbb API key

        const imgbbResponse = await fetch("https://api.imgbb.com/1/upload", {
          method: "POST",
          body: formData,
        });
        const imgbbData = await imgbbResponse.json();

        updatedProfileImage = imgbbData.data.url; // Set updated image URL
      }

      const BuyerProfile = {
        buyerFullName,
        buyerProfileImage: updatedProfileImage,
        address,
        city,
        country,
      };

      const url = `https://dry-inlet-34467-1e797feb3813.herokuapp.com/buyer-update-profile/${id}`;
      const response = await fetch(url, {
        method: "PUT",
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

  useEffect(() => {
    if (members.length > 0 && members[0].buyerProfileImage) {
      setImagePreview(members[0].buyerProfileImage);
    }
  }, [members]);

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/buyer/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setBuyer(result);
        // Set the default image preview from the database
        if (result.buyerProfileImage) {
          setImagePreview(result.buyerProfileImage);
        }
      });
  }, [id]);
  
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
                      <p className="lead">Update Buyer Profile</p>
                    </div>
                    {buyer.buyerEmail === user?.email ? (
                      <div className="card-body">
                        <form
                          className="form-auth-small"
                          onSubmit={handleUpdateBuyer}
                        >
                          <div className="form-group">
                            <label className="control-label sr-only">
                              Name
                            </label>
                            <input
                              type="text"
                              name="buyerFullName"
                              className="form-control"
                              placeholder="Enter your Name"
                              defaultValue={buyer.buyerFullName}
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
                              Enter Your Address
                            </label>
                            <input
                              type="text"
                              name="address"
                              className="form-control"
                              placeholder="Enter your address"
                              defaultValue={buyer.address}
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
                              defaultValue={buyer.city}
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
                              defaultValue={buyer.country}
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
                      </div>
                    ) : (
                      <h2>You are not owner of this profile</h2>
                    )}
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

export default EditBuyerProfile;
