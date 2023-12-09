import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { Link } from "react-router-dom";
import './UpdateYourProfile.css';

const UpdateYourProfile = () => {
  const [user] = useAuthState(auth);
  const [buyers, setBuyers] = useState([]);
  const [members, setMembers] = useState([]);

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
  
  return (
    <div>
        {
            buyers.filter(buyer => buyer.buyerEmail === user?.email).length === 0 &&
            <div>
                {
                    members.filter(member => member.userEmail === user?.email).length === 0 &&
                    <div id="wrapper">
        <div className="vertical-align-wrap">
          <div className="vertical-align-middle auth-main">
            <div className="text-center">
              <div className="card w-50">
                <div className="body">
                  
                    <div className="mb-4">
                      <Link
                        to="/buyer-update-profile"
                        type="button" class="btn btn-info col-12"
                      >
                        <h3>Setup Account As a Buyer</h3>
                      </Link>
                    </div>
                    <div className="divider"></div>
                    <div className="mt-4">
                      <Link
                        to="/seller-update-profile"
                        type="button" class="btn btn-info col-12 text"
                      >
                       <h3> Setup Profile As a Lead Provider</h3>
                      </Link>
                    </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
                }
            </div>
        }
      
    </div>
  );
};

export default UpdateYourProfile;
