import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useNavigate, useParams } from "react-router-dom";

const EditSellerProfile = () => {
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [member, setMember] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [imagePreview, setImagePreview] = useState(null);


  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/user/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setMember(result);
  
        // Set default image if member has a profileImage in the database
        if (result.profileImage) {
          setImagePreview(result.profileImage);
        }
      });
  }, [id]);

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
    let imageUrl = member.profileImage; // Retain the existing image URL
  
    // Check if a new image has been selected
    if (imageInput.files.length > 0) {
      imageUrl = await handleImageUpload(imageInput.files[0]);
    }
  
    const sellerProfile = {
      currentBalance,
      userFullName,
      profileImage: imageUrl, // Use the new URL or the existing URL
      userEmail,
      address,
      city,
      country,
    };
  
    const url = `https://dry-inlet-34467-1e797feb3813.herokuapp.com/update-user/${id}`;
    fetch(url, {
      method: "PUT",
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
                      {member.userEmail === user?.email ? (
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
                              defaultValue={member.userFullName}
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
                                  maxHeight: "100px",
                                }}
                              />
                            </div>
                          )}
                          <div className="form-group">
                            <label className="control-label sr-only">
                              Email
                            </label>
                            <input
                              disabled
                              readOnly
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
                              defaultValue={member.address}
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
                              defaultValue={member.city}
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
                              defaultValue={member.country}
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
                      ) : (
                        <h2>This is not your profile</h2>
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

export default EditSellerProfile;
