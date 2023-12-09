import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import BuyerSidebar from "../../components/Shared/BuyerSidebar";
import BuyerHeaderPart from "../../components/Shared/BuyerHeaderPart";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";

const DepositFunds = () => {
  const [buyers, setBuyers] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/buyer?buyerEmail=${user?.email}`)
      .then((res) => res.json())
      .then((result) => setBuyers(result));
  }, [user]);

  const handleDeposit50USD = (event) => {
    event.preventDefault();
    const amount = event.target.amount.value;
    const buyerEmail = event.target.buyerEmail.value;
    const buyerId = event.target.buyerId.value;
    const buyerFullName = event.target.buyerFullName.value;
    const depositStatus = event.target.depositStatus.value;

    const admin = {
      amount,
      buyerEmail,
      buyerId,
      buyerFullName,
      depositStatus,
     
    };

    const url = `https://dry-inlet-34467-1e797feb3813.herokuapp.com/new-deposit`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(admin),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/deposit50usd");
      });
  };
  const handleDeposit20USD = (event) => {
    event.preventDefault();
    const amount = event.target.amount.value;
    const buyerEmail = event.target.buyerEmail.value;
    const buyerId = event.target.buyerId.value;
    const buyerFullName = event.target.buyerFullName.value;
    const depositStatus = event.target.depositStatus.value;

    const admin = {
      amount,
      buyerEmail,
      buyerId,
      buyerFullName,
      depositStatus,
     
    };

    const url = `https://dry-inlet-34467-1e797feb3813.herokuapp.com/new-deposit`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(admin),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/deposit20usd");
      });
  };
  const handleDeposit10USD = (event) => {
    event.preventDefault();
    const amount = event.target.amount.value;
    const buyerEmail = event.target.buyerEmail.value;
    const buyerId = event.target.buyerId.value;
    const buyerFullName = event.target.buyerFullName.value;
    const depositStatus = event.target.depositStatus.value;

    const admin = {
      amount,
      buyerEmail,
      buyerId,
      buyerFullName,
      depositStatus,
     
    };

    const url = `https://dry-inlet-34467-1e797feb3813.herokuapp.com/new-deposit`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(admin),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/deposit10usd");
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
                          <th>Amount</th>
                          <th>Deposit</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td>$10.00 USD</td>
                          <td>
                          <form onSubmit={handleDeposit10USD}>
                            <input hidden type='number' value='10' name='amount'></input>
                            <input hidden type='email' value={user?.email} name='buyerEmail'></input>
                            <input hidden type='text' value={buyer._id} name='buyerId'></input>
                            <input hidden type='text' value={buyer.buyerFullName} name='buyerFullName'></input>
                            <input hidden type='text' value="Pending" name='depositStatus'></input>
                            <input className="btn btn-primary" type='submit' value="Deposit Now"></input>
                           </form>
                          </td>
                        </tr>
                        <tr>
                          <td>$20.00 USD</td>
                          <td>
                          <form onSubmit={handleDeposit20USD}>
                            <input hidden type='number' value='20' name='amount'></input>
                            <input hidden type='email' value={user?.email} name='buyerEmail'></input>
                            <input hidden type='text' value={buyer._id} name='buyerId'></input>
                            <input hidden type='text' value={buyer.buyerFullName} name='buyerFullName'></input>
                            <input hidden type='text' value="Pending" name='depositStatus'></input>
                            <input className="btn btn-primary" type='submit' value="Deposit Now"></input>
                           </form>
                          </td>
                        </tr>
                        <tr>
                          <td>$50.00 USD</td>
                          <td>
                           <form onSubmit={handleDeposit50USD}>
                            <input hidden type='number' value='50' name='amount'></input>
                            <input hidden type='email' value={user?.email} name='buyerEmail'></input>
                            <input hidden type='text' value={buyer._id} name='buyerId'></input>
                            <input hidden type='text' value={buyer.buyerFullName} name='buyerFullName'></input>
                            <input hidden type='text' value="Pending" name='depositStatus'></input>
                            <input className="btn btn-primary" type='submit' value="Deposit Now"></input>
                           </form>
                          </td>
                        </tr>
                      </tbody>
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

export default DepositFunds;
