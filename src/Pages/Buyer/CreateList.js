import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import BuyerSidebar from "../../components/Shared/BuyerSidebar";
import BuyerHeaderPart from "../../components/Shared/BuyerHeaderPart";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";

const CreateList = () => {
  const [buyers, setBuyers] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/buyer?buyerEmail=${user?.email}`)
      .then((res) => res.json())
      .then((result) => setBuyers(result));
  }, [user]);

  const handleList = (event) => {
    event.preventDefault();
    const listName = event.target.listName.value;
    const buyerEmail = event.target.buyerEmail.value;

    const admin = {
      listName,
      buyerEmail,
    };

    const url = `https://dry-inlet-34467-1e797feb3813.herokuapp.com/create-list`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(admin),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/");
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
                  <form onSubmit={handleList} className="container">
                    <div>
                      <label className="form-label">List Name</label>
                      <input
                        type="text"
                        name="listName"
                        className="form-control"
                        placeholder="List Name"
                      />
                    </div>

                    <input
                      hidden
                      type="text"
                      value={user?.email}
                      name="buyerEmail"
                      className="form-control"
                    />

                    <div className="col-12 mt-2">
                      <button type="submit" className="btn btn-primary col-12">
                        Create List
                      </button>
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

export default CreateList;
