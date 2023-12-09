import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import BuyerSidebar from "../../components/Shared/BuyerSidebar";
import BuyerHeaderPart from "../../components/Shared/BuyerHeaderPart";
import { Link, useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";

const DepositHistory = () => {
  const [buyer, setBuyer] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/deposits`)
      .then((res) => res.json())
      .then((result) => setDeposits(result));
  }, []);


  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/buyer/${id}`)
      .then((res) => res.json())
      .then((result) => setBuyer(result));
  }, [id]);

  

  return (
    <div>
      {
        buyer.buyerEmail === user?.email ?
        <div id="wrapper" className="theme-cyan">
        <BuyerSidebar></BuyerSidebar>
        <div id="main-content">
          <div className="container-fluid">
            <BuyerHeaderPart></BuyerHeaderPart>
            <div className="table-responsive">
              <table className="table table-hover js-basic-example dataTable table-custom mb-0">
                <thead>
                  <tr>
                    <th>Buyer Name</th>
                    <th>Buyer Email</th>
                    <th>Amount</th>
                    <th>Deposit Status</th>
                  </tr>
                </thead>
                {
                  deposits.map(deposit => deposit.buyerEmail === user?.email &&
                      <tbody>
                    <tr>                
                      <td>{deposit.buyerFullName}</td>
                      <td>{deposit.buyerEmail}</td>
                      <td>{deposit.amount}</td>
                      <td>{deposit.depositStatus}</td>

                    </tr>
                  </tbody>
                      )
                }
                
              </table>
            </div>
          </div>
        </div>
      </div>
      :
      <></>
      }
    </div>
  );
};

export default DepositHistory;
