import React, { useEffect, useState, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import BuyerSidebar from "../../components/Shared/BuyerSidebar";
import BuyerHeaderPart from "../../components/Shared/BuyerHeaderPart";
import { useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";

const DepositSuccess20 = () => {
  const { id } = useParams();
  const [buyer, setBuyer] = useState(null);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const formRef = useRef(null);
  const submitButtonRef = useRef(null);

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/buyer/${id}`)
      .then((res) => res.json())
      .then((result) => setBuyer(result))
      .catch((error) => {
        console.error("Error fetching buyer:", error);
      });
  }, [id]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (submitButtonRef.current) {
        submitButtonRef.current.click();
      }
    }, 1500); // Automatically submit form after 2 seconds

    return () => clearTimeout(timeout);
  }, []);

  const handleUpdateBalance = (event) => {
    event.preventDefault();
    const currentBalance = event.target.currentBalance.value;

    const updateBalance = {
      currentBalance,
    };

    const url = `https://dry-inlet-34467-1e797feb3813.herokuapp.com/buyer-update-balance/${buyer._id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateBalance),
    })
      .then((res) => res.json())
      .then((result) => {
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((error) => {
        console.error("Error updating balance:", error);
      });
  };

  return (
    <div>
      <div id="wrapper" className="theme-cyan">
        <BuyerSidebar />
        <div id="main-content">
          <div className="container-fluid">
            <BuyerHeaderPart />
            <div>
              <div className="table-responsive text-center">
                <div className="card bg-custom">
                  <div className="card-body">
                    <h2>Deposit With PayPal</h2>
                    {buyer && (
                      <form ref={formRef} onSubmit={handleUpdateBalance}>
                        <input
                          type="number"
                          hidden
                          name="currentBalance"
                          value={
                            parseFloat(buyer.currentBalance) + parseFloat(20)
                          }
                          readOnly
                        />
                        <button
                          type="submit"
                          ref={submitButtonRef}
                          style={{ display: "none" }}
                        >
                          Hidden Submit
                        </button>
                        <div class="spinner-grow text-primary" role="status">
                          <span class="visually-hidden"></span>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositSuccess20;
