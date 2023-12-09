import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import SellerSidebar from '../../components/Shared/SellerSidebar';
import { Link } from 'react-router-dom';
import SellerHeaderPart from '../../components/Shared/SellerHeaderPart';
import PendingLeads from './PendingLeads';
import ApprovedLeads from './ApprovedLeads';

const SellerDashboard = () => {
    const [members, setMember] = useState([]);
    const [user] = useAuthState(auth);
    const [leads, setLeads] = useState([]);
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/leads`)
          .then((res) => res.json())
          .then((result) => setLeads(result));
      }, []);
    
    useEffect(() => {
        fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/all-collected-leads`)
          .then((res) => res.json())
          .then((result) => setCollections(result));
      }, []);
    
    useEffect(() => {
        fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/user?userEmail=${user?.email}`)
          .then((res) => res.json())
          .then((result) => setMember(result));
      }, [user]);

    return (
       <div>
         {
            members.map(member => member.userEmail === user?.email &&
              <div id="wrapper" className="theme-cyan">
              <SellerSidebar></SellerSidebar>
              <div id="main-content">
                <div className="container-fluid">
                  <SellerHeaderPart></SellerHeaderPart>
      
                  
                      <PendingLeads></PendingLeads>
                      <ApprovedLeads></ApprovedLeads>
                    
                </div>
              </div>
             
            </div>
            )
          }
        
       </div>
    );
};

export default SellerDashboard;