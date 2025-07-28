import React, { useEffect, useState } from "react";

const JobList = ({ jobs }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const jobContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: isMobile ? "center" : "flex-start",
    padding: "0 20px",
  };

  return <div style={jobContainerStyle}>{jobs}</div>;
};

export default JobList;
