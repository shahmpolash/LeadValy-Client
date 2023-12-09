import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import BuyerSidebar from "../../components/Shared/BuyerSidebar";
import BuyerHeaderPart from "../../components/Shared/BuyerHeaderPart";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";

const AllLists = () => {
  const [buyers, setBuyers] = useState([]);
  const [lists, setLists] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/lists`)
      .then((res) => res.json())
      .then((result) => setLists(result));
  }, []);

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/buyer?buyerEmail=${user?.email}`)
      .then((res) => res.json())
      .then((result) => setBuyers(result));
  }, [user]);

  const handleDeleteList = (id) => {
    const url = `https://dry-inlet-34467-1e797feb3813.herokuapp.com/list/${id}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Failed to delete");
      })
      .then((result) => {
        console.log("List deleted successfully");
        setLists((prevLists) => prevLists.filter((list) => list._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting list:", error);
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
                          <th>List Name</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      {lists.map(
                        (list) =>
                          list.buyerEmail === user?.email && (
                            <tbody>
                              <tr>
                                <td>
                                  <Link to={`/my-collection/${list._id}`}>
                                    {list.listName}
                                  </Link>
                                </td>
                                <td>
                                  <button
                                    onClick={() => handleDeleteList(list._id)}
                                    className="btn btn-primary col-12"
                                  >
                                    Delete Now
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          )
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

export default AllLists;
