import React, { useState } from "react";
import { Nav } from "react-bootstrap";

const Sidebar = ({ active, setActive, showSidebar, setShowSidebar }) => {
  const [hovered, setHovered] = useState("");
  
  const menuItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: "dashboardicon",
      href: "dashboard",
    },
    {
      key: "products",
      label: "Products",
      icon: "productsicon",
      href: "productmanagement",
    },
    {
      key: "bookings",
      label: "Bookings",
      icon: "bookingsicon",
      href: "bookings",
    },
    {
      key: "patients",
      label: "Patients",
      icon: "patientsicon",
      href: "acceptedpatients",
    },
    {
      key: "subscription",
      label: "Subscriptions",
      icon: "subscriptionicon",
      href: "subscription",
    },
  ];

  return (
    <div className={`sidebar ${showSidebar ? "show" : ""}`}>
      <div className="mobile-sidebar-logo">
        <img
          src="/icons/DermaScanLogo.png"
          alt="DermaScan Logo"
          style={{ width: "100px", height: "auto", margin: "20px auto" }}
        />
      </div>
      <Nav className="flex-column pt-4">
        {menuItems.map((item) => (
          <a
            key={item.key}
            href="#"
            className={`sidebar-item ${active === item.key ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              setActive(item.key);
              setShowSidebar(false);
              window.location.href = item.href;
            }}
            onMouseEnter={() => setHovered(item.key)}
            onMouseLeave={() => setHovered("")}
          >
            <img
              src={`/icons/${item.icon}-${
                hovered === item.key ? "white" : "blue"
              }.png`}
              alt={item.label}
              className="sidebar-icon"
              style={{ width: "15px", height: "15px", marginRight: "10px" }}
            />
            <span className="ms-2">{item.label}</span>
          </a>
        ))}
      </Nav>
    </div>
  );
};
export default Sidebar;