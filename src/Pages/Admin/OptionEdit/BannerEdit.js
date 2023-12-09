import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "../../../components/Shared/AdminSidebar";
import AdminHeader from "../../../components/Shared/AdminHeader";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";

const BannerEdit = () => {
  const [admins, setAdmins] = useState([]);
  const [user] = useAuthState(auth);
  const [withdraws, setWithdraws] = useState([]);

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/all-withdraws`)
      .then((res) => res.json())
      .then((result) => setWithdraws(result));
  }, []);

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/admin?adminEmail=${user?.email}`)
      .then((res) => res.json())
      .then((result) => setAdmins(result));
  }, [user]);

  const navigate = useNavigate();
  const { id } = useParams();
  const [banner, setBanner] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [storedImage, setStoredImage] = useState("");
  const imgbbApiKey = "e3a766c99e397158b5668ccd3ed717ff";

  const handleEditBanner = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const bannerDescription = event.target.bannerDescription.value;
    const buttonText = event.target.buttonText.value;
    const buttonLink = event.target.buttonLink.value;
    const videoTitle = event.target.videoTitle.value;
    const youtubeLink = event.target.youtubeLink.value;

    let img = imageFile ? imagePreview : storedImage;

    if (imageFile) {
      try {
        const formData = new FormData();
        formData.append("image", imageFile);
        formData.append("key", imgbbApiKey);

        const imgbbResponse = await axios.post(
          "https://api.imgbb.com/1/upload",
          formData
        );

        img = imgbbResponse.data.data.url;
      } catch (error) {
        console.error("Image upload to imgbb failed:", error);
        return;
      }
    }

    const updateAbout = {
      img,
      title,
      bannerDescription,
      buttonText,
      buttonLink,
      videoTitle,
      youtubeLink,
    };

    const url = `https://dry-inlet-34467-1e797feb3813.herokuapp.com/banner-update/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateAbout),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin");
      });
  };

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setImageFile(selectedFile);

    const previewURL = URL.createObjectURL(selectedFile);
    setImagePreview(previewURL);
  };

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/banner/${id}`)
      .then((res) => res.json())
      .then((info) => {
        const storedImg = info.img; // Access 'img' directly from the response
        setBanner(info); // Set the entire 'info' object in 'about' state
        setStoredImage(storedImg);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  return (
    <div>
      {admins.map(
        (admin) =>
          admin.adminEmail === user?.email && (
            <div id="wrapper" className="theme-cyan">
              <AdminSidebar></AdminSidebar>
              <div id="main-content">
                <div className="container-fluid">
                  <AdminHeader></AdminHeader>
                  <form className="form seo-form" onSubmit={handleEditBanner}>
                    <div class="container">
                      <div class="justify-content-center align-items-baseline">
                        <div class="col-sm">
                          <label className="mt-1">Banner Image</label>
                          <div class="form-group mb-3">
                            <input
                              type="file"
                              class="form-control"
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                          </div>
                          {imagePreview && (
                            <img
                              src={imagePreview}
                              alt="Images Preview"
                              style={{ maxWidth: "100px" }}
                            />
                          )}
                          {!imageFile && !imagePreview && storedImage && (
                            <img
                              src={storedImage}
                              alt="Storeds"
                              style={{ maxWidth: "100px" }}
                            />
                          )}
                        </div>
                        <div class="col-sm">
                          <label className="mt-1">Banner Title</label>
                          <div class="form-group mb-3">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Banner Title"
                              name="title"
                              defaultValue={banner.title}
                            />
                          </div>
                        </div>
                        <div class="col-sm">
                          <label className="mt-1">Banner Description</label>
                          <div class="form-group mb-3">
                            <textarea
                              type="text"
                              style={{ width: "100%", minHeight: "100px" }}
                              class="form-control"
                              placeholder="Your Sub Text"
                              name="bannerDescription"
                              defaultValue={banner.bannerDescription}
                            />
                          </div>
                        </div>
                        <div class="col-sm">
                          <label className="mt-1">Banner Button Text</label>
                          <div class="form-group mb-3">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Banner Title"
                              name="buttonText"
                              defaultValue={banner.buttonText}
                            />
                          </div>
                        </div>
                        <div class="col-sm">
                          <label className="mt-1">Banner Button Link</label>
                          <div class="form-group mb-3">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Banner Title"
                              name="buttonLink"
                              defaultValue={banner.buttonLink}
                            />
                          </div>
                        </div>
                        <div class="col-sm">
                          <label className="mt-1">Video Button Text</label>
                          <div class="form-group mb-3">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Banner Title"
                              name="videoTitle"
                              defaultValue={banner.videoTitle}
                            />
                          </div>
                        </div>
                        <div class="col-sm">
                          <label className="mt-1">Youtube Video Link</label>
                          <div class="form-group mb-3">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Banner Title"
                              name="youtubeLink"
                              defaultValue={banner.youtubeLink}
                            />
                          </div>
                        </div>

                        <div class="col-sm-4">
                          <button
                            type="submit"
                            class="btn btn-md btn-primary tra-black-hover"
                          >
                            <span>Update Banner</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default BannerEdit;
