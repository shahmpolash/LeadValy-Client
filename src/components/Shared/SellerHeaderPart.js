import React from 'react';
import { Link } from 'react-router-dom';

const SellerHeaderPart = () => {
    return (
        <div className="block-header">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <h2>Seller Dashboard</h2>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">
                  <i className="fa fa-dashboard" />
                </a>
              </li>
              <li className="breadcrumb-item">Dashboard</li>
              <li className="breadcrumb-item active">Project Board</li>
            </ul>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="d-flex flex-row-reverse">
              <div className="page_action">
                <Link type="button" className="btn btn-primary" to='/add-lead'>
                  <i className="fa fa-plus" />Add Lead & Earn Money
                </Link>
                
              </div>
              <div className="p-2 d-flex"></div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default SellerHeaderPart;