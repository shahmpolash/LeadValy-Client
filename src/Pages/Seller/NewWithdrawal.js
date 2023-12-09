import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
import SellerSidebar from "../../components/Shared/SellerSidebar";
import SellerHeaderPart from "../../components/Shared/SellerHeaderPart";

const NewWithdrawal = () => {
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [currentUser, setCurrnetUser] = useState([]);
  const [withdraws, setWithdraws] = useState([]);

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/all-withdraws`)
      .then((res) => res.json())
      .then((result) => setWithdraws(result));
  }, []);

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/user/${id}`)
      .then((res) => res.json())
      .then((result) => setCurrnetUser(result));
  }, []);

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/user?userEmail=${user?.email}`)
      .then((res) => res.json())
      .then((result) => setMembers(result));
  }, [user]);

  const handleAddWithdraw = (event) => {
    event.preventDefault();
    const payPalEmail = event.target.payPalEmail.value;
    const withdrawalStatus = event.target.withdrawalStatus.value;
    const userFullName = event.target.userFullName.value;
    const userEmail = event.target.userEmail.value;
    const amount = event.target.amount.value;
    const userId = event.target.userId.value;

    const withdraw = {
      payPalEmail,
      withdrawalStatus,
      userFullName,
      userEmail,
      amount,
      userId,
    };

    const url = `https://dry-inlet-34467-1e797feb3813.herokuapp.com/new-withdraw`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(withdraw),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate(`/`);
      });
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

                  <form onSubmit={handleAddWithdraw} className="container">
                    <input
                      hidden
                      type="text"
                      value={currentUser.currentBalance}
                      name="amount"
                    />

                    <input type="text" hidden value={currentUser._id} name="userId" />
                    <input
                      hidden
                      type="text"
                      value={currentUser.userEmail}
                      name="userEmail"
                    />
                    <input
                      hidden
                      type="text"
                      value={currentUser.userFullName}
                      name="userFullName"
                    />
                    <input
                      hidden
                      type="text"
                      value="Pending"
                      name="withdrawalStatus"
                    />

                    <div>
                      <label className="form-label">
                        Type Your PayPal Email
                      </label>
                      <input
                        required
                        type="text"
                        name="payPalEmail"
                        className="form-control"
                        placeholder="Enter Your PayPal Email"
                      />
                    </div>
{
    withdraws.filter(withdraw => withdraw.userEmail === user?.email && withdraw.withdrawalStatus === 'Pending').length === 1 &&
    <button
        type="submit"
        disabled
        className="btn btn-primary col-12"
      >
        Sorry, You have already Pending Withdrawal Request
      </button>
}
{
    withdraws.filter(withdraw => withdraw.userEmail === user?.email && withdraw.withdrawalStatus === 'Pending').length === 0 &&
    <div className="col-12 mt-2">
    {currentUser.currentBalance > 20 ? (
      <button
        type="submit"
        className="btn btn-primary col-12"
      >
        Withdraw ${currentUser.currentBalance}
      </button>
    ) : (
      <button
        type="submit"
        disabled
        className="btn btn-primary col-12"
      >
        You Can Not Withdraw ${currentUser.currentBalance}. (Minimum 20$)
      </button>
    )}
  </div>
}
                  


                    
                  </form>
                </div>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default NewWithdrawal;
