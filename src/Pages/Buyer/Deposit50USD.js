import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import BuyerSidebar from "../../components/Shared/BuyerSidebar";
import BuyerHeaderPart from "../../components/Shared/BuyerHeaderPart";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";

const Deposit50USD = () => {
  const [buyers, setBuyers] = useState([]);
  const currentDomain = window.location.origin;
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/buyer?buyerEmail=${user?.email}`)
      .then((res) => res.json())
      .then((result) => setBuyers(result));
  }, [user]);

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
                  <div>
                    <div className="table-responsive text-center">
                      <div className="card bg-custom">
                        {" "}
                        {/* Card with custom background color */}
                        <div className="card-body">
                          <h2>Deposit With PayPal</h2>
                          <form
                            action="https://www.paypal.com/cgi-bin/webscr"
                            method="post"
                            target="_top"
                          >
                            <input
                              name="business"
                              hidden
                              value="webhoomaster@gmail.com"
                            />

                            <input
                              type="hidden"
                              name="item_name"
                              value="10$Package"
                            />
                            <input type="hidden" name="item_number" value="1" />
                            <input type="hidden" name="amount" value="50" />
                            <input type="hidden" name="no_shipping" value="1" />
                            <input
                              type="hidden"
                              name="currency_code"
                              value="USD"
                            />
                            <input
                              type="hidden"
                              name="notify_url"
                              value="http://sitename/paypal-payment-gateway-integration-in-php/notify.php"
                            />
                            <input
                              type="hidden"
                              name="cancel_return"
                              // value={`${currentDomain}/cancelled-payment/`}
                              value={`${currentDomain}/deposit-success-50usd/${buyer._id}`}
                           
                            />
                            <input
                              type="hidden"
                              name="return"
                              value={`${currentDomain}/deposit-success-50usd/${buyer._id}`}
                            />
                            <input type="hidden" name="cmd" value="_xclick" />
                            <input
                              type="submit"
                              name="pay_now"
                              id="pay_now"
                              className="paypay--btn btn btn-primary"
                              value="Pay Now With Paypal"
                            />
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default Deposit50USD;
