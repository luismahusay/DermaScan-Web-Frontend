import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children, currentPage = "dashboard" }) => {
  const [active, setActive] = useState(currentPage);
  const [showSidebar, setShowSidebar] = useState(false); // Add this state
  return (
    <>
      {/* Move all your CSS styles here */}
      <style jsx>{`
        @media (min-width: 768px) {
          .main-content {
            margin-left: 50px !important;
            width: calc(100vw - 250px) !important;
          }
        }
        .admin-sidebar {
          width: 250px !important;
        }
        .sidebar {
          min-height: 100vh;
          background-color: #f8f9fa;
          border-right: 1px solid #2196f3;
          padding: 0;
        }
        .sidebar-item {
          padding: 12px 20px;
          color: #205efa;
          text-decoration: none;
          display: flex;
          align-items: center;
          border-radius: 8px;
          margin: 4px 12px;
          transition: all 0.3s ease;
          background-color: transparent;
        }
        .sidebar-item .sidebar-icon {
          width: 18px;
          height: 18px;
          transition: all 0.3s ease;
        }
        .sidebar-item:hover {
          background-color: #205efa;
          color: white;
        }
        .navbar.border-bottom {
          border-bottom: 1px solid #2196f3 !important;
        }

        .brand-section {
          display: flex;
          align-items: center;
        }

        .brand-icon {
          width: 32px;
          height: 32px;
          background-color: #007bff;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          margin-right: 12px;
        }

        .brand-text {
          font-size: 1.2rem;
          font-weight: 700;
          color: #007bff;
          margin-bottom: 0;
        }

        .brand-tagline {
          font-size: 1rem;
          color: #205efa;
          margin: 0;
        }

        .search-container {
          position: relative;
        }

        .search-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #6c757d;
        }

        .custom-search-input {
          border: 1px solid #205efa;
          padding-right: 40px;
          border-radius: 6px;
          transition: box-shadow 0.2s ease, border-color 0.2s ease;
        }

        .custom-search-input:focus {
          outline: none;
          box-shadow: 0 0 0 0.2rem rgba(32, 94, 250, 0.25);
          border-color: #205efa;
        }

        .header-actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .header-icon {
          width: 40px;
          height: 40px;
          background-color: #f8f9fa;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6c757d;
          text-decoration: none;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          position: relative;
        }

        .header-icon:hover {
          background-color: #e9ecef;
          color: #495057;
        }

        .notification-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 8px;
          height: 8px;
          background-color: #dc3545;
          border-radius: 50%;
        }
        .notification-dropdown {
          position: absolute;
          top: 50px;
          right: 0;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          padding: 20px;
          width: 450px;
          z-index: 1000;
          font-family: "Segoe UI", sans-serif;
        }

        .notification-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .notification-title {
          font-size: 18px;
          font-weight: bold;
          margin: 0;
        }

        .mark-read-link {
          color: #3b82f6;
          font-size: 14px;
          text-decoration: none;
        }

        .mark-read-link:hover {
          text-decoration: underline;
        }

        .notification-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 16px;
          padding: 12px;
          border-radius: 10px;
          background-color: #e8f0fe; /* light blue background */
        }

        .notification-icon {
          width: 40px;
          height: 40px;
          background-color: #e0ecff;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 12px;
          flex-shrink: 0;
        }

        .notification-content {
          flex: 1;
        }

        .notification-text {
          font-weight: bold;
          margin: 0 0 4px 0;
          font-size: 14px;
        }

        .notification-time {
          font-size: 14px;
          color: #6b7280;
          margin: 0 0 6px 0;
        }

        .notification-meta {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .notification-ago {
          font-size: 12px;
          color: #9ca3af;
        }

        .notification-tag {
          background-color: #f3f4f6;
          color: #6b7280;
          font-size: 12px;
          padding: 2px 8px;
          border-radius: 12px;
          font-weight: 500;
        }

        /* Add all your other CSS styles here... */
        .main-content {
          background-color: #f8f9fa;
          min-height: calc(100vh - 80px);
          padding: 20px;
        }
        /* ... rest of your styles ... */
        /* Mobile sidebar - hidden by default, shows as overlay */
        @media (max-width: 768px) {
          .sidebar {
            position: fixed;
            top: 0;
            left: -250px; /* Hidden by default */
            z-index: 1050;
            transition: left 0.3s ease;
            height: 100vh;
            overflow-y: auto;
          }

          .sidebar.show {
            left: 0; /* Show when toggled */
          }
          /* Overlay backdrop when sidebar is open */
          .sidebar-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1040;
            display: none;
          }
          .sidebar-backdrop.show {
            display: block;
          }

          /* Adjust main content for mobile */
          .main-content {
            margin-left: 0 !important;
            width: 100% !important;
          }

          /* Add hamburger menu button styles */
          .mobile-menu-btn {
            display: block !important;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #205efa;
            cursor: pointer;
          }
        }

        /* Tablet view - collapsed sidebar */
        @media (min-width: 769px) and (max-width: 992px) {
          .sidebar {
            width: 80px !important;
          }

          .sidebar-item span {
            display: none; /* Hide text labels */
          }

          .sidebar-item {
            justify-content: center;
            padding: 12px 10px;
          }

          .main-content {
            margin-left: 80px !important;
            width: calc(100vw - 80px) !important;
          }
        }

        /* Desktop - show full sidebar */
        @media (min-width: 992px) {
          .sidebar {
            position: relative;
          }
        }

        /* Hide mobile menu button on desktop */
        .mobile-menu-btn {
          display: none;
        }
        @media (max-width: 768px) {
          .search-container {
            display: none;
          }

          .mobile-search-icon {
            display: flex !important;
            width: 40px;
            height: 40px;
            background-color: #f8f9fa;
            border-radius: 50%;
            align-items: center;
            justify-content: center;
            border: none;
            cursor: pointer;
          }

          /* Hide brand text elements */
          .brand-text-elements {
            display: none !important;
          }

          /* Keep only logo visible */
          .brand-section {
            align-items: center;
          }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn {
            display: none !important;
          }

          .mobile-search-icon {
            display: none !important;
          }

          .brand-text-elements {
            display: block !important;
          }

          .search-container {
            display: block !important;
          }
          .sidebar {
            position: relative;
          }
        }
        .mobile-sidebar-logo {
          display: none;
          text-align: center;
        }

        @media (max-width: 768px) {
          .mobile-sidebar-logo {
            display: block;
          }
          .brand-section img {
            display: none;
          }
        }
      `}</style>

      <div className="d-flex flex-column vh-100">
        <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <div className="d-flex flex-grow-1">
          <div
            className={`sidebar-backdrop ${showSidebar ? "show" : ""}`}
            onClick={() => setShowSidebar(false)}
          ></div>
          <Sidebar
            active={active}
            setActive={setActive}
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
          />
          <div
            className="flex-grow-1 main-content"
            style={{ marginTop: "-70px", marginLeft: "-50px" }}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export { Header, Sidebar, Layout };
