import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  const [topBanners, setTopBanners] = useState([]);

  useEffect(() => {
    fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/top-banner`)
      .then((res) => res.json())
      .then((info) => setTopBanners(info));
  }, []);

  return (
    <>
      
      Banner Here
    </>
  );
};

export default Banner;
