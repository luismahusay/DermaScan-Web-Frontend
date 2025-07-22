import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Form,
  InputGroup,
  Nav,
  Navbar,
  Button,
  Dropdown,
  Modal
} from "react-bootstrap";

const DermaProductManagement = () => {
  const [active, setActive] = useState("products"); // changed to products
  const [hovered, setHovered] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
 const [showViewModal, setShowViewModal] = useState(false);
 const [viewingProduct, setViewingProduct] = useState(null);
 const [showDeleteModal, setShowDeleteModal] = useState(false);
 const [productToDelete, setProductToDelete] = useState(null);
  // Sample products data matching your image
  const productsData = [
    {
      id: "#20462",
      product: "ClearGlow Facial Gel",
      category: "Serum / Treatment",
      skinType: "Oily",
      description: "A lightweight gel that...",
      ingredients: "Water, Salicylic Acid...",
    },
    {
      id: "#18533",
      product: "HydraMask Pro",
      category: "Mask",
      skinType: "Dry",
      description: "Dr. Emily Santos",
      ingredients: "Water, Salicylic Acid...",
    },
    {
      id: "#40169",
      product: "DermaClean Wash",
      category: "Cleanser",
      skinType: "Combination",
      description: "Dr. Sofia Lim",
      ingredients: "Water, Salicylic Acid...",
    },
    {
      id: "#34304",
      product: "SPF 50+ Shield",
      category: "Sunscreen",
      skinType: "All",
      description: "Dr. Ana Reyes",
      ingredients: "Water, Salicylic Acid...",
    },
    {
      id: "#17168",
      product: "AcneAway Gel",
      category: "Treatment",
      skinType: "Oily",
      description: "Pending Review",
      ingredients: "Water, Salicylic Acid...",
    },
    {
      id: "#73003",
      product: "PureTone",
      category: "Toner",
      skinType: "Normal",
      description: "Dr. Michael Cruz",
      ingredients: "Water, Salicylic Acid...",
    },
    {
      id: "#58626",
      product: "SoftSkin Lotion",
      category: "Moisturizer",
      skinType: "Dry",
      description: "Dr. Emily Santos",
      ingredients: "Water, Salicylic Acid...",
    },
    {
      id: "#40122",
      product: "PoreFix Strips",
      category: "Treatment",
      skinType: "Oily",
      description: "Dr. Sofia Lim",
      ingredients: "Water, Salicylic Acid...",
    },
    {
      id: "#89044",
      product: "Vitaboost Cream",
      category: "Cream",
      skinType: "Combination",
      description: "Pending Review",
      ingredients: "Water, Salicylic Acid...",
    },
    {
      id: "#85252",
      product: "MatteTone Pads",
      category: "Toner",
      skinType: "Oily",
      description: "Dr. Emily Santos",
      ingredients: "Water, Salicylic Acid...",
    },
    {
      id: "#85252",
      product: "MatteTone Pads",
      category: "Toner",
      skinType: "Oily",
      description: "Dr. Emily Santos",
      ingredients: "Water, Salicylic Acid...",
    },
    {
      id: "#85252",
      product: "MatteTone Pads",
      category: "Toner",
      skinType: "Oily",
      description: "Dr. Emily Santos",
      ingredients: "Water, Salicylic Acid...",
    },
  ];

  // Notification data
  const notifications = [
    {
      name: "Sarah Johnson",
      time: "July 15, 2025 at 2:00 PM",
      ago: "5 minutes ago",
    },
    {
      name: "Michael Chen",
      time: "July 18, 2025 at 9:00 AM",
      ago: "12 minutes ago",
    },
    {
      name: "Emma Rodriguez",
      time: "August 5, 2025 at 11:30 AM",
      ago: "28 minutes ago",
    },
    {
      name: "David Park",
      time: "July 22, 2025 at 3:15 PM",
      ago: "30 minutes ago",
    },
  ];

  // Filter products based on search term
  const filteredProducts = productsData.filter(
    (product) =>
      product.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.skinType.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowEditModal(true);
  };
  const handleView = (product) => {
    setViewingProduct(product);
    setShowViewModal(true);
  };
  const handleDelete = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };
  const confirmDelete = () => {
    // Remove the product from your products array/state
    // Example: setProducts(products.filter(p => p.id !== productToDelete.id))
    setShowDeleteModal(false);
    setProductToDelete(null);
  };
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };
  return (
    <>
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
        .sidebar-item.active {
          background-color: #205efa;
          color: white;
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
        .main-content {
          background-color: #f8f9fa;
          min-height: calc(100vh - 80px);
          padding: 20px;
        }
        .brand-section {
          display: flex;
          align-items: center;
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
        .header-actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        .navbar.border-bottom {
          border-bottom: 1px solid #2196f3 !important;
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
          background-color: #e8f0fe;
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
        .notification-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 8px;
          height: 8px;
          background-color: #dc3545;
          border-radius: 50%;
        }
        .products-table-container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }
        .table-controls {
          padding: 20px 24px;
          border-bottom: 1px solid #e9ecef;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        .entries-selector {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #6c757d;
        }
        .entries-select {
          border: 1px solid #dee2e6;
          border-radius: 4px;
          padding: 4px 8px;
          font-size: 14px;
        }
        .add-product-btn {
          background-color: #007bff;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          color: white;
          font-size: 14px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .add-product-btn:hover {
          background-color: #0056b3;
        }
        .table-wrapper {
          overflow-x: auto;
        }
        .products-table {
          margin-bottom: 0;
        }
        .products-table th {
          background-color: #f8f9fa;
          border-bottom: 2px solid #dee2e6;
          color: #495057;
          font-weight: 600;
          font-size: 14px;
          padding: 16px 12px;
          white-space: nowrap;
        }
        .products-table td {
          padding: 16px 12px;
          border-bottom: 1px solid #e9ecef;
          font-size: 14px;
          vertical-align: middle;
        }
        .products-table tbody tr:hover {
          background-color: #f8f9fa;
        }
        .action-buttons {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .action-btn {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .view-btn {
          background-color: #e3f2fd;
          color: #1976d2;
        }
        .view-btn:hover {
          background-color: #bbdefb;
        }
        .edit-btn {
          background-color: #fff3e0;
          color: #f57c00;
        }
        .edit-btn:hover {
          background-color: #ffe0b2;
        }
        .delete-btn {
          background-color: #ffebee;
          color: #d32f2f;
        }
        .delete-btn:hover {
          background-color: #ffcdd2;
        }
        .pagination-container {
          padding: 20px 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          border-top: 1px solid #e9ecef;
        }
        .pagination-btn {
          padding: 8px 12px;
          border: 1px solid #dee2e6;
          background: white;
          color: #6c757d;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s ease;
        }
        .pagination-btn:hover:not(:disabled) {
          background-color: #f8f9fa;
        }
        .pagination-btn.active {
          background-color: #007bff;
          color: white;
          border-color: #007bff;
        }
        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .table-search {
          position: relative;
          min-width: 250px;
        }
        .table-search input {
          padding-left: 36px;
          border: 1px solid #dee2e6;
          border-radius: 6px;
          padding-right: 12px;
          padding-top: 8px;
          padding-bottom: 8px;
          font-size: 14px;
        }
        .table-search input:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
        }
        .table-search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #6c757d;
          width: 16px;
          height: 16px;
        }
      `}</style>
      <Modal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        size="xl"
        centered
      >
        <Modal.Header
          closeButton
          className="border-0 pb-0"
          style={{
            backgroundColor: "#205EFA",
            margin: "-1rem 0rem 0 -.05rem",
            borderRadius: "12px 12px 12px 12px",
            position: "relative",
          }}
        >
          <Modal.Title
            className="w-100 text-center text-white m-0"
            style={{
              fontWeight: "bold",
              fontSize: "35px",
              padding: "20px 0",
            }}
          >
            Add your product
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ backgroundColor: "#EDF8F6", padding: "30px" }}>
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="productName">
                  <Form.Label
                    style={{ fontWeight: "500", marginBottom: "8px" }}
                  >
                    Product Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Type here"
                    style={{
                      padding: "12px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="productCategory">
                  <Form.Label
                    style={{ fontWeight: "500", marginBottom: "8px" }}
                  >
                    Category
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Type here"
                    style={{
                      padding: "12px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="skinCondition">
                  <Form.Label
                    style={{ fontWeight: "500", marginBottom: "8px" }}
                  >
                    Skin Condition
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Type here"
                    style={{
                      padding: "12px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="productDescription">
                  <Form.Label
                    style={{ fontWeight: "500", marginBottom: "8px" }}
                  >
                    Description
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    placeholder="Type here"
                    style={{
                      padding: "15px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                      resize: "none",
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <div
              style={{ width: "49%", marginLeft: "0px", marginTop: "-120px" }}
            >
              <Form.Group className="mb-4" controlId="ingredients">
                <Form.Label style={{ fontWeight: "500", marginBottom: "8px" }}>
                  Ingredients
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  placeholder="Type here"
                  style={{
                    padding: "15px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    resize: "none",
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="imageUpload">
                <Form.Label style={{ fontWeight: "500", marginBottom: "8px" }}>
                  Upload Image
                </Form.Label>
                <div
                  style={{
                    border: "2px dashed #ccc",
                    padding: "20px",
                    textAlign: "center",
                    borderRadius: "6px",
                    marginBottom: "12px",
                    backgroundColor: "white",
                    height: "80px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div>
                    <div
                      style={{
                        marginBottom: "4px",
                      }}
                    >
                      <img
                        src="/icons/uploadicon.png"
                        alt="Upload icon"
                        style={{
                          width: "29px",
                          height: "24px",
                          color: "#ddd", // This won't work for images, use filter instead
                          filter: "opacity(0.8)", // Makes it lighter like the original
                        }}
                      />
                    </div>
                    <p style={{ marginBottom: "-8px", fontSize: "14px" }}>
                      Drag & drop images or{" "}
                      <span
                        style={{
                          color: "#4285F4",
                          fontWeight: "500",
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        Browse
                      </span>
                    </p>
                    <small style={{ color: "#666", fontSize: "10px" }}>
                      Supported formats: JPG, PNG, PDF
                    </small>
                  </div>
                </div>

                {/* Uploaded files */}
                <div style={{ marginBottom: "8px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "8px 12px",
                      backgroundColor: "#e8f5e8",
                      border: "1px solid #4caf50",
                      borderRadius: "4px",
                      fontSize: "14px",
                      marginBottom: "4px",
                    }}
                  >
                    <span style={{ flexGrow: 1 }}>sampleimage.jpg</span>
                    <span style={{ color: "#4caf50", cursor: "pointer" }}>
                      ✕
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "8px 12px",
                      backgroundColor: "#e8f5e8",
                      border: "1px solid #4caf50",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  >
                    <span style={{ flexGrow: 1 }}>sampleimage.jpg</span>
                    <span style={{ color: "#4caf50", cursor: "pointer" }}>
                      ✕
                    </span>
                  </div>
                </div>
              </Form.Group>
            </div>
            <div
              className="d-flex justify-content-end"
              style={{ marginTop: "40px" }}
            >
              <Button
                variant="danger"
                className="me-3"
                onClick={() => setShowAddModal(false)}
                style={{
                  padding: "10px 40px",
                  fontWeight: "500",
                  borderRadius: "6px",
                }}
              >
                Cancel
              </Button>
              <Button
                style={{
                  backgroundColor: "#2857CC",
                  border: "none",
                  padding: "10px 40px",
                  fontWeight: "500",
                  borderRadius: "6px",
                }}
              >
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        size="xl"
        centered
      >
        <Modal.Header
          closeButton
          className="border-0 pb-0"
          style={{
            backgroundColor: "#205EFA",
            margin: "-1rem 0rem 0 -.05rem",
            borderRadius: "12px 12px 12px 12px",
            position: "relative",
          }}
        >
          <Modal.Title
            className="w-100 text-center text-white m-0"
            style={{
              fontWeight: "bold",
              fontSize: "35px",
              padding: "20px 0",
            }}
          >
            Edit your product
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ backgroundColor: "#EDF8F6", padding: "30px" }}>
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="editProductName">
                  <Form.Label
                    style={{ fontWeight: "500", marginBottom: "8px" }}
                  >
                    Product Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Type here"
                    defaultValue={editingProduct?.product || ""}
                    style={{
                      padding: "12px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="editProductCategory">
                  <Form.Label
                    style={{ fontWeight: "500", marginBottom: "8px" }}
                  >
                    Category
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Type here"
                    defaultValue={editingProduct?.category || ""}
                    style={{
                      padding: "12px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="editSkinCondition">
                  <Form.Label
                    style={{ fontWeight: "500", marginBottom: "8px" }}
                  >
                    Skin Condition
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Type here"
                    defaultValue={editingProduct?.skinType || ""}
                    style={{
                      padding: "12px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="editProductDescription">
                  <Form.Label
                    style={{ fontWeight: "500", marginBottom: "8px" }}
                  >
                    Description
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    placeholder="Type here"
                    defaultValue={editingProduct?.description || ""}
                    style={{
                      padding: "15px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                      resize: "none",
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <div
              style={{ width: "49%", marginLeft: "0px", marginTop: "-120px" }}
            >
              <Form.Group className="mb-4" controlId="editIngredients">
                <Form.Label style={{ fontWeight: "500", marginBottom: "8px" }}>
                  Ingredients
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  placeholder="Type here"
                  defaultValue={editingProduct?.ingredients || ""}
                  style={{
                    padding: "15px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    resize: "none",
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="editImageUpload">
                <Form.Label style={{ fontWeight: "500", marginBottom: "8px" }}>
                  Upload Image
                </Form.Label>
                <div
                  style={{
                    border: "2px dashed #ccc",
                    padding: "20px",
                    textAlign: "center",
                    borderRadius: "6px",
                    marginBottom: "12px",
                    backgroundColor: "white",
                    height: "80px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div>
                    <div
                      style={{
                        marginBottom: "4px",
                      }}
                    >
                      <img
                        src="/icons/uploadicon.png"
                        alt="Upload icon"
                        style={{
                          width: "29px",
                          height: "24px",
                          color: "#ddd",
                          filter: "opacity(0.8)",
                        }}
                      />
                    </div>
                    <p style={{ marginBottom: "-8px", fontSize: "14px" }}>
                      Drag & drop images or{" "}
                      <span
                        style={{
                          color: "#4285F4",
                          fontWeight: "500",
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        Browse
                      </span>
                    </p>
                    <small style={{ color: "#666", fontSize: "10px" }}>
                      Supported formats: JPG, PNG, PDF
                    </small>
                  </div>
                </div>

                {/* Uploaded files */}
                <div style={{ marginBottom: "8px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "8px 12px",
                      backgroundColor: "#e8f5e8",
                      border: "1px solid #4caf50",
                      borderRadius: "4px",
                      fontSize: "14px",
                      marginBottom: "4px",
                    }}
                  >
                    <span style={{ flexGrow: 1 }}>sampleimage.jpg</span>
                    <span style={{ color: "#4caf50", cursor: "pointer" }}>
                      ✕
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "8px 12px",
                      backgroundColor: "#e8f5e8",
                      border: "1px solid #4caf50",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  >
                    <span style={{ flexGrow: 1 }}>sampleimage.jpg</span>
                    <span style={{ color: "#4caf50", cursor: "pointer" }}>
                      ✕
                    </span>
                  </div>
                </div>
              </Form.Group>
            </div>
            <div
              className="d-flex justify-content-end"
              style={{ marginTop: "40px" }}
            >
              <Button
                variant="danger"
                className="me-3"
                onClick={() => setShowEditModal(false)}
                style={{
                  padding: "10px 40px",
                  fontWeight: "500",
                  borderRadius: "6px",
                }}
              >
                Cancel
              </Button>
              <Button
                style={{
                  backgroundColor: "#2857CC",
                  border: "none",
                  padding: "10px 40px",
                  fontWeight: "500",
                  borderRadius: "6px",
                }}
              >
                Save Changes
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        size="xl"
        centered
      >
        <Modal.Header
          className="border-0 pb-0"
          style={{
            backgroundColor: "#205EFA",
            margin: "-1rem 0rem 0 -.05rem",
            borderRadius: "12px 12px 12px 12px",
            position: "relative",
            color: "white",
          }}
        >
          <Modal.Title
            className="w-100 text-center text-white m-0 d-flex align-items-center justify-content-center"
            style={{
              fontWeight: "bold",
              fontSize: "30px",
              padding: "20px 0",
              gap: "10px",
            }}
          >
            🔎 Product Information
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          style={{
            backgroundColor: "#F8F9FA",
            padding: "30px",
            position: "relative",
          }}
        >
          {/* Close Button - Top Right Corner */}
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setShowViewModal(false)}
            style={{
              position: "absolute",
              top: "15px",
              right: "40px",
              background: "none",
              border: "none",
              fontSize: "30px",
              color: "#000000",
              cursor: "pointer",
              zIndex: 1000,
            }}
          >
            ✕
          </button>

          {viewingProduct && (
            <>
              {/* Product ID - Single Line */}
              <div className="row mb-0">
                <div className="col-12">
                  <div
                    className="mb-2"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <strong style={{ minWidth: "120px" }}>Product ID:</strong>
                    <span style={{ marginLeft: "10px" }}>
                      {viewingProduct.id}
                    </span>
                  </div>
                </div>
              </div>

              {/* Product Name - Single Line */}
              <div className="row mb-0">
                <div className="col-12">
                  <div
                    className="mb-2"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <strong style={{ minWidth: "120px" }}>Product Name:</strong>
                    <span style={{ marginLeft: "10px" }}>
                      {viewingProduct.product}
                    </span>
                  </div>
                </div>
              </div>

              {/* Date Created - Single Line */}
              <div className="row mb-4">
                <div className="col-12">
                  <div
                    className="mb-3"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <strong style={{ minWidth: "120px" }}>Date Created:</strong>
                    <span style={{ marginLeft: "10px" }}>
                      {new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Category - Single Line */}
              <div className="row mb-0">
                <div className="col-12">
                  <div
                    className="mb-2"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <strong style={{ minWidth: "120px" }}>Category:</strong>
                    <span style={{ marginLeft: "10px" }}>
                      {viewingProduct.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Skin Condition - Single Line */}
              <div className="row mb-4">
                <div className="col-12">
                  <div
                    className="mb-2"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <strong style={{ minWidth: "120px" }}>
                      Skin Condition:
                    </strong>
                    <span style={{ marginLeft: "10px" }}>
                      {viewingProduct.skinType}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="row mb-3">
                <div className="col-12">
                  <div className="mb-3">
                    <strong>Description:</strong>
                    <div
                      style={{
                        marginLeft: "20px",
                        marginTop: "5px",
                        lineHeight: "1.6",
                      }}
                    >
                      Cetaphil Gentle Skin Cleanser is a mild, non-irritating
                      formula that soothes and cleanses the skin without
                      stripping its natural moisture. Ideal for sensitive or dry
                      skin, it can be used with or without water and is suitable
                      for daily use on the face and body.
                    </div>
                  </div>
                </div>
              </div>

              {/* Ingredients */}
              <div className="row mb-4">
                <div className="col-12">
                  <div className="mb-1">
                    <strong>Ingredients:</strong>
                    <div
                      style={{
                        marginLeft: "20px",
                        marginTop: "5px",
                        lineHeight: "1.6",
                      }}
                    >
                      {viewingProduct.ingredients}
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Rating */}
              <div className="row mb-2">
                <div className="col-12">
                  <div className="mb-1">
                    <strong>Product Rating:</strong>
                    <div
                      style={{
                        marginLeft: "20px",
                        marginTop: "10px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <div style={{ display: "flex", gap: "2px" }}>
                        {[1, 2, 3, 4].map((star) => (
                          <svg
                            key={star}
                            width="20"
                            height="20"
                            fill="#FFD700"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                        <svg
                          width="20"
                          height="20"
                          fill="#FFD700"
                          viewBox="0 0 24 24"
                          style={{ position: "relative" }}
                        >
                          <defs>
                            <linearGradient id="halfStar">
                              <stop offset="50%" stopColor="#FFD700" />
                              <stop offset="50%" stopColor="#E0E0E0" />
                            </linearGradient>
                          </defs>
                          <path
                            fill="url(#halfStar)"
                            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                          />
                        </svg>
                      </div>
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "#333",
                        }}
                      >
                        4.5 / 5
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Image */}
              <div className="row mb-4">
                <div className="col-12">
                  <div className="mb-3">
                    <strong>Product Image:</strong>
                    <div style={{ marginLeft: "20px", marginTop: "15px" }}>
                      <img
                        src={viewingProduct.image || "/icons/productimage.png"}
                        alt={viewingProduct.product || "Product Image"}
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "cover",
                          borderRadius: "12px",
                          border: "2px solid #e0e0e0",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        }}
                        onError={(e) => {
                          e.target.src =
                            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSIjRjBGMEYwIiByeD0iMTIiLz4KPHN2ZyB4PSIzNSIgeT0iMzUiIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjQ0NDQ0NDIj4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIxIDEzdjEwaDEwdi0xMGgtMTB6TTMgM3YxOGgxOHYtMThoLTE4eiIgZmlsbD0iI0NDQ0NDQyIvPgo8Y2lyY2xlIGN4PSIxNSIgY3k9IjEwIiByPSIyIiBmaWxsPSIjQ0NDQ0NDIi8+Cjwvc3ZnPgo8L3N2Zz4KPC9zdmc+";
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Edit Product Button - Bottom Right */}
              <div className="row">
                <div className="col-12 d-flex justify-content-end">
                  <button
                    className="btn btn-primary"
                    style={{
                      backgroundColor: "#205EFA",
                      border: "none",
                      borderRadius: "8px",
                      marginRight: "15px",
                      padding: "10px 40px",
                      fontWeight: "500",
                    }}
                    onClick={() => {
                      setShowViewModal(false);
                      handleEdit(viewingProduct);
                    }}
                  >
                    Edit Product
                  </button>
                </div>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body
          style={{
            backgroundColor: "#FFFFFF",
            padding: "30px 30px",
            borderRadius: "50px", // Increased border radius
            border: "none",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
            textAlign: "center",
            position: "relative",
          }}
        >
          {/* Trash Icon */}
          <div style={{ marginBottom: "20px" }}>
            <svg
              width="150"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              style={{ margin: "0 auto" }}
            >
              <circle cx="30" cy="30" r="30" fill="#FFE6E6" />
              <path
                d="M22 26h16m-2 0v12a2 2 0 01-2 2H26a2 2 0 01-2-2V26m3 0V24a2 2 0 012-2h2a2 2 0 012 2v2"
                stroke="#FF4444"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Title */}
          <h4
            style={{
              color: "#205EFA", // Changed text color
              fontWeight: "bold",
              marginBottom: "12px",
              fontSize: "25px",
            }}
          >
            Do you wish to delete this product?
          </h4>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => setShowDeleteModal(false)}
              style={{
                backgroundColor: "#DC3545", // Red background
                color: "white",
                border: "none",
                borderRadius: "15px", // Increased border radius
                padding: "12px 24px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s ease",
                minWidth: "100px",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#C82333";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#DC3545";
              }}
            >
              No
            </button>

            <button
              onClick={confirmDelete}
              style={{
                backgroundColor: "#205EFA", // Blue background
                color: "white",
                border: "none",
                borderRadius: "15px", // Increased border radius
                padding: "12px 24px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s ease",
                minWidth: "100px",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#1848C7";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#205EFA";
              }}
            >
              Yes
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <div className="d-flex flex-column vh-100">
        {/* Header - keeping exactly as is */}
        <Navbar bg="white" className="border-bottom px-4 py-3">
          <Container fluid>
            <div className="brand-section">
              <img
                src="/icons/DermaScanLogo.png"
                alt="DermaScan Logo"
                style={{ width: "80px", height: "60px", marginRight: "12px" }}
              />
              <div>
                <img
                  src="/icons/DermaScan.png"
                  alt="DermaScan Text Logo"
                  style={{ height: "24px" }}
                />
                <div className="brand-tagline">Scan.Detect.Care</div>
                <div className="brand-tagline">Dermatologist Page</div>
              </div>
            </div>

            <div className="header-actions">
              <div className="search-container">
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Type here..."
                    className="custom-search-input"
                  />
                  <img
                    src="/icons/searchicon.png"
                    alt="Search"
                    className="search-icon"
                    style={{ width: "20px", height: "20px" }}
                  />
                </InputGroup>
              </div>

              <div style={{ position: "relative" }}>
                <button
                  className="header-icon"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <img
                    src="/icons/notificationicon.png"
                    alt="Notification"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <div className="notification-badge"></div>
                </button>

                {showNotifications && (
                  <div className="notification-dropdown">
                    <div className="notification-header">
                      <h5 className="notification-title">New Appointments</h5>
                      <a href="#" className="mark-read-link">
                        Mark all as read
                      </a>
                    </div>

                    {notifications.map((appt, index) => (
                      <div key={index} className="notification-item">
                        <div className="notification-icon">
                          <img
                            src="/icons/notificationcalendar.png"
                            alt="Calendar"
                            style={{ width: "20px", height: "20px" }}
                          />
                        </div>
                        <div className="notification-content">
                          <p className="notification-text">
                            New appointment from {appt.name}
                          </p>
                          <p className="notification-time">
                            Appointment scheduled for {appt.time}
                          </p>
                          <div className="notification-meta">
                            <span className="notification-ago">{appt.ago}</span>
                            <span className="notification-tag">
                              APPOINTMENT
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button className="header-icon">
                <img
                  src="/icons/profileicon.png"
                  alt="User"
                  style={{ width: "30px", height: "30px" }}
                />
              </button>
            </div>
          </Container>
        </Navbar>

        <div className="d-flex flex-grow-1">
          {/* Sidebar - keeping exactly as is */}
          <div className="sidebar" style={{ width: "250px" }}>
            <Nav className="flex-column pt-4">
              <a
                href="#"
                className={`sidebar-item ${
                  active === "dashboard" ? "active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "dashboard"; // Change to your actual file names
                }}
                onMouseEnter={() => setHovered("dashboard")}
                onMouseLeave={() => setHovered("")}
              >
                <img
                  src={`/icons/dashboardicon-${
                    hovered === "dashboard"
                      ? "white"
                      : active === "dashboard"
                      ? "blue"
                      : "blue"
                  }.png`}
                  alt="Dashboard"
                  className="sidebar-icon"
                  style={{ width: "15px", height: "15px", marginRight: "10px" }}
                />
                <span className="ms-2">Dashboard</span>
              </a>
              <a
                href="#"
                className={`sidebar-item ${
                  active === "products" ? "active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "productmanagement"; // Change to your actual file names
                }}
                onMouseEnter={() => setHovered("products")}
                onMouseLeave={() => setHovered("")}
              >
                <img
                  src={`/icons/productsicon-${
                    hovered === "products" || active === "products"
                      ? "white"
                      : "blue"
                  }.png`}
                  alt="Products"
                  className="sidebar-icon"
                  style={{ width: "15px", height: "18px", marginRight: "10px" }}
                />
                <span className="ms-2">Products</span>
              </a>
              <a
                href="#"
                className={`sidebar-item ${
                  active === "bookings" ? "active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "bookings"; // Change to your actual file names
                }}
                onMouseEnter={() => setHovered("bookings")}
                onMouseLeave={() => setHovered("")}
              >
                <img
                  src={`/icons/bookingsicon-${
                    hovered === "bookings" ? "white" : "blue"
                  }.png`}
                  alt="Bookings"
                  className="sidebar-icon"
                  style={{ width: "18px", height: "18px", marginRight: "10px" }}
                />
                <span className="ms-2">Bookings</span>
              </a>

              <a
                href="#"
                className={`sidebar-item ${
                  active === "patients" ? "active" : ""
                }`}
                onClick={() => setActive("patients")}
                onMouseEnter={() => setHovered("patients")}
                onMouseLeave={() => setHovered("")}
              >
                <img
                  src={`/icons/patientsicon-${
                    hovered === "patients" ? "white" : "blue"
                  }.png`}
                  alt="Patients"
                  className="sidebar-icon"
                  style={{ width: "16px", height: "18px", marginRight: "10px" }}
                />
                <span className="ms-2">Patients</span>
              </a>
              <a
                href="#"
                className={`sidebar-item ${
                  active === "subscription" ? "active" : ""
                }`}
                onClick={() => setActive("subscription")}
                onMouseEnter={() => setHovered("subscription")}
                onMouseLeave={() => setHovered("")}
              >
                <img
                  src={`/icons/subscriptionicon-${
                    hovered === "subscription" ? "white" : "blue"
                  }.png`}
                  alt="Subscriptions"
                  className="sidebar-icon"
                  style={{ width: "18px", height: "18px", marginRight: "10px" }}
                />
                <span className="ms-2">Subscriptions</span>
              </a>
            </Nav>
          </div>

          {/* NEW Main Content - Products Table */}
          <div
            className="flex-grow-1 main-content"
            style={{ marginTop: "-70px", marginLeft: "-50px" }}
          >
            <Container fluid>
              <Row className="mb-4">
                <Col>
                  <div className="products-table-container">
                    {/* Table Controls */}
                    <div className="table-controls">
                      <div className="d-flex align-items-center gap-3">
                        <div className="entries-selector">
                          Show
                          <select
                            className="entries-select"
                            value={entriesPerPage}
                            onChange={(e) =>
                              setEntriesPerPage(Number(e.target.value))
                            }
                          >
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                          </select>
                          entries
                        </div>
                        <div className="table-search">
                          <svg
                            className="table-search-icon"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                          <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                        <div
                          className="d-flex align-items-center"
                          style={{ color: "#000000", cursor: "pointer" }}
                        >
                          <img
                            src="/icons/filtericon.png"
                            alt="Filter"
                            style={{
                              width: "15px",
                              height: "11px",
                              marginRight: "6px",
                              filter: "brightness(0)",
                            }}
                          />
                          <span
                            style={{ fontSize: "16px", fontWeight: "bold" }}
                          >
                            Filter
                          </span>
                        </div>
                      </div>
                      <button
                        className="add-product-btn"
                        onClick={() => setShowAddModal(true)}
                      >
                        <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                          +
                        </span>
                        Add Product
                      </button>
                    </div>

                    {/* Table */}
                    <div className="table-wrapper">
                      <Table className="products-table">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Skin Type</th>
                            <th>Description</th>
                            <th>Ingredients</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredProducts
                            .slice(0, entriesPerPage)
                            .map((product, index) => (
                              <tr key={index}>
                                <td>{product.id}</td>
                                <td style={{ fontWeight: 500 }}>
                                  {product.product}
                                </td>
                                <td>{product.category}</td>
                                <td>{product.skinType}</td>
                                <td
                                  style={{
                                    maxWidth: "200px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {product.description}
                                </td>
                                <td
                                  style={{
                                    maxWidth: "200px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {product.ingredients}
                                </td>
                                <td>
                                  <div className="action-buttons">
                                    <button
                                      className="action-btn view-btn"
                                      title="View"
                                      onClick={() => handleView(product)}
                                    >
                                      <svg
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                                      </svg>
                                    </button>
                                    <button
                                      className="action-btn edit-btn"
                                      title="Edit"
                                      onClick={() => handleEdit(product)}
                                    >
                                      <svg
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                                      </svg>
                                    </button>
                                    <button
                                      className="action-btn delete-btn"
                                      title="Delete"
                                      onClick={() => handleDelete(product)}
                                    >
                                      <svg
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                                      </svg>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    </div>

                    {/* Pagination */}
                    <div className="pagination-container">
                      <button className="pagination-btn" disabled>
                        Previous
                      </button>
                      <button className="pagination-btn active">1</button>
                      <button className="pagination-btn">2</button>
                      <button className="pagination-btn">3</button>
                      <button className="pagination-btn">Next</button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
};

export default DermaProductManagement;
