import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';

const AdminHeader = () => {
    const [admins, setAdmins] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
      fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/admin?adminEmail=${user?.email}`)
        .then((res) => res.json())
        .then((result) => setAdmins(result));
    }, [user]);

    
    return (
        <div className="block-header">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h2>Admin Dashboard</h2>
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
                            {
                                admins.map(admin => admin.adminEmail === user?.email &&
                                <Link type="button" className="btn btn-primary" to={`/admin/add-admin`}>
                              <i className="fa fa-search" />Add Admin User
                            </Link>
                            )

                            }
                            
                          </div>
                          <div className="p-2 d-flex"></div>
                        </div>
                      </div>
                    </div>
                  </div>
    );
};

export default AdminHeader;