import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import SellerSidebar from "../../components/Shared/SellerSidebar";
import SellerHeaderPart from "../../components/Shared/SellerHeaderPart";

const WithdrawalHistory = () => {
  const [user] = useAuthState(auth);
  const [members, setMembers] = useState([]);
  const [withdrawalHistory, SetHithdrawalHistory] = useState([]);

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/all-withdraws`)
      .then((res) => res.json())
      .then((result) => SetHithdrawalHistory(result));
  }, []);



  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/user?userEmail=${user?.email}`)
      .then((res) => res.json())
      .then((result) => setMembers(result));
  }, [user]);


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

                  <div className="table-responsive">
                    <table className="table table-hover js-basic-example dataTable table-custom mb-0">
                      <thead>
                        <tr>
                          <th>PayPal Email</th>
                          <th>Total Amount</th>
                          <th>Status</th>
                        
                        </tr>
                      </thead>
                      {withdrawalHistory.map(
                        (withdrawal) => withdrawal.userEmail === user?.email && 
                        <tbody key={withdrawal._id}>
                        <tr>
                          
                          <td className="project-title">
                            <h6>{withdrawal.payPalEmail}</h6>
                            
                          </td>
                          <td>${withdrawal.amount} USD</td>
                          <td>
                          <span className="badge badge-warning">
                          {withdrawal.withdrawalStatus}
                                    </span></td>
                          
                        </tr>
                      </tbody>
                      )}
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

export default WithdrawalHistory;
