import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Form,
  Button,
  Modal,
  Alert
} from "react-bootstrap";
import { Layout } from "./Layout";
import "../styles/derma_product_management.css";
import { useProduct } from "../contexts/ProductContext";
import { useAuth } from "../contexts/AuthContext";
import { useImageUpload } from "../hooks/useImageUpload";

const DermaProductManagement = () => {
  const { currentUser, loading: authLoading } = useAuth();
  const {
    products,
    loading: productLoading,
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct,
  } = useProduct();
  const { uploadImages, uploading, uploadError } = useImageUpload();

  // State management
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingProduct, setViewingProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [editUploadedFiles, setEditUploadedFiles] = useState([]);
  const [error, setError] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [editSelectedFiles, setEditSelectedFiles] = useState([]);
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  // Form data state
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    skinCondition: "",
    description: "",
    ingredients: "",
  });

  const [editFormData, setEditFormData] = useState({
    productName: "",
    category: "",
    skinCondition: "",
    description: "",
    ingredients: "",
  });

  // Filters state
  const [filters, setFilters] = useState({
    category: "",
    skinType: "",
    dateRange: "",
    status: "",
  });

  // Load products on component mount - only for current dermatologist
  useEffect(() => {
    let isMounted = true; // Prevent state updates if component unmounts

    const loadProductsWhenReady = async () => {
      // Wait for authentication to be ready
      if (authLoading) {
        console.log("Auth still loading, waiting...");
        return;
      }

      if (!currentUser?.uid) {
        console.log("No authenticated user found");
        return;
      }

      try {
        console.log("Loading products for user:", currentUser.uid);
        await getProducts({
          dermatologistId: currentUser.uid,
        });
        console.log("Products loaded successfully");
      } catch (error) {
        console.error("Failed to load products:", error);
        if (isMounted) {
          showAlert("error", "Failed to load products: " + error.message);
        }
      }
    };

    loadProductsWhenReady();

    return () => {
      isMounted = false;
    };
  }, [currentUser?.uid, authLoading]);

  const loadProducts = async () => {
    try {
      console.log("=== LOADING PRODUCTS ===");

      if (!currentUser?.uid) {
        console.warn("No current user UID available");
        return;
      }

      console.log("Loading products for dermatologist:", currentUser.uid);

      const productsData = await getProducts({
        dermatologistId: currentUser.uid,
      });

      console.log("Products loaded:", productsData?.length || 0, "products");
      console.log("First product sample:", productsData?.[0]);

      // Verify the products have images
      if (productsData?.length > 0) {
        productsData.forEach((product, index) => {
          console.log(
            `Product ${index + 1} images:`,
            product.Product_AllImageURLs
          );
        });
      }
    } catch (error) {
      console.error("=== LOAD PRODUCTS ERROR ===");
      console.error("Full error:", error);
      console.error("Error message:", error.message);

      const errorMessage = error?.message || "Failed to load products";
      showAlert("error", errorMessage);
      setError(errorMessage);
    }
  };

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false, type: "", message: "" }), 5000);
  };

  // Form handlers
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEditFormChange = (field, value) => {
    setEditFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Image handlers
  const handleFileSelect = (files) => {
    const validFiles = Array.from(files).filter((file) => {
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      const isValidType = validTypes.includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024;

      if (!isValidType) {
        showAlert(
          "error",
          `Invalid file type: ${file.name}. Only JPEG, PNG, and JPG files are allowed.`
        );
        return false;
      }

      if (!isValidSize) {
        showAlert(
          "error",
          `File too large: ${file.name}. Maximum size is 5MB.`
        );
        return false;
      }

      return true;
    });

    setSelectedFiles(validFiles);
    setUploadedFiles(validFiles);
  };

  const handleEditFileSelect = (files) => {
    const validFiles = Array.from(files).filter((file) => {
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      return validTypes.includes(file.type) && file.size <= 5 * 1024 * 1024;
    });

    setEditSelectedFiles(validFiles);
    setEditUploadedFiles(validFiles);
  };

  const removeFile = (indexToRemove) => {
    setUploadedFiles((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
    setSelectedFiles((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const removeEditFile = (index) => {
    setEditUploadedFiles(editUploadedFiles.filter((_, i) => i !== index));
    setEditSelectedFiles(editSelectedFiles.filter((_, i) => i !== index));
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  const handleEditDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleEditFileSelect(files);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      productName: "",
      category: "",
      skinCondition: "",
      description: "",
      ingredients: "",
    });
    setEditFormData({
      productName: "",
      category: "",
      skinCondition: "",
      description: "",
      ingredients: "",
    });
    setUploadedFiles([]);
    setSelectedFiles([]);
    setEditSelectedFiles([]);
    setEditUploadedFiles([]);
  };

  // CRUD Operations
  const handleSubmit = async () => {
    try {
      setError("");
      console.log("=== STARTING PRODUCT SUBMISSION ===");

      // Validate authentication
      if (!currentUser || !currentUser.uid) {
        showAlert("error", "You must be logged in to add products");
        return;
      }

      // Validate required fields
      if (!formData.productName.trim()) {
        showAlert("error", "Product name is required");
        return;
      }

      console.log("Form data:", formData);
      console.log("Selected files:", selectedFiles);
      console.log("Current user ID:", currentUser.uid);

      // Upload images first if any
      let imageUrls = [];
      if (selectedFiles.length > 0) {
        console.log("Uploading images...");
        try {
          imageUrls = await uploadImages(currentUser.uid, selectedFiles);
          console.log("Images uploaded successfully:", imageUrls);
        } catch (uploadError) {
          console.error("Image upload failed:", uploadError);
          showAlert("error", "Failed to upload images: " + uploadError.message);
          return;
        }
      }

      // Prepare product data
      const productData = {
        productName: formData.productName.trim(),
        category: formData.category.trim(),
        skinCondition: formData.skinCondition.trim(),
        description: formData.description.trim(),
        ingredients: formData.ingredients.trim(),
        dermatologistId: currentUser.uid,
      };

      console.log("Adding product with data:", productData);
      console.log("With images:", imageUrls);

      // Add product to database
      const result = await addProduct(productData, imageUrls);
      console.log("Product added successfully:", result);

      // Success actions
      setShowAddModal(false);
      resetForm();
      showAlert("success", "Product added successfully!");

      // Reload products after a short delay to ensure database consistency
      setTimeout(async () => {
        try {
          await getProducts({
            dermatologistId: currentUser.uid,
          });
          console.log("Products reloaded after adding new product");
        } catch (reloadError) {
          console.error("Failed to reload products:", reloadError);
        }
      }, 1500);
    } catch (error) {
      console.error("=== PRODUCT SUBMISSION ERROR ===");
      console.error("Full error:", error);
      console.error("Error message:", error.message);
      console.error("Error code:", error.code);

      const errorMessage =
        error?.message || "Failed to add product. Please try again.";
      showAlert("error", errorMessage);
      setError(errorMessage);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setEditFormData({
      productName: product.Product_Name,
      category: product.Product_Category,
      skinCondition: product.Product_SkinCondition,
      description: product.Product_Desc,
      ingredients: product.Product_Ingredients,
    });
    setEditSelectedFiles([]);
    setEditUploadedFiles([]);
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    try {
      setError("");

      if (!editFormData.productName.trim()) {
        showAlert("error", "Product name is required");
        return;
      }

      let newImageUrls = [];
      if (editSelectedFiles.length > 0) {
        newImageUrls = await uploadImages(
          editingProduct.Product_ID,
          editSelectedFiles
        );
      }

      await updateProduct(
        editingProduct.Product_ID,
        editFormData,
        newImageUrls
      );
      setShowEditModal(false);
      resetForm();
      loadProducts();
      showAlert("success", "Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
      showAlert("error", "Failed to update product. Please try again.");
    }
  };

  const handleView = (product) => {
    setViewingProduct(product);
    setShowViewModal(true);
  };

  const handleDelete = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      if (!productToDelete?.Product_ID) return;

      await deleteProduct(productToDelete.Product_ID);
      setShowDeleteModal(false);
      setProductToDelete(null);
      loadProducts();
      showAlert("success", "Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      showAlert("error", "Failed to delete product");
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  // Filter logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.Product_Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.Product_Category?.toLowerCase().includes(
        searchTerm.toLowerCase()
      ) ||
      product.Product_SkinCondition?.toLowerCase().includes(
        searchTerm.toLowerCase()
      );

    const matchesCategory =
      !filters.category || product.Product_Category === filters.category;
    const matchesSkinType =
      !filters.skinType || product.Product_SkinCondition === filters.skinType;
    const matchesStatus =
      !filters.status || product.Product_Status === filters.status;

    return matchesSearch && matchesCategory && matchesSkinType && matchesStatus;
  });

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      skinType: "",
      dateRange: "",
      status: "",
    });
  };

  const applyFilters = () => {
    setShowFilterModal(false);
    setCurrentPage(1);
  };

  // Pagination
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  const totalPages = Math.ceil(filteredProducts.length / entriesPerPage);

  return (
    <Layout currentPage="products">
      {authLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div className="text-center">
            <div className="spinner-border text-primary mb-2" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div>Initializing...</div>
          </div>
        </div>
      )}
      {error && (
        <Alert variant="danger" dismissible onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {/* Alert */}
      {alert.show && (
        <Alert
          variant={alert.type === "error" ? "danger" : "success"}
          className="mb-3"
          dismissible
          onClose={() => setAlert({ show: false, type: "", message: "" })}
        >
          {alert.message}
        </Alert>
      )}

      {/* Add Product Modal */}
      <Modal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        size="lg"
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
            <Row className="mb-2" style={{ marginBottom: "0.75rem" }}>
              <Col lg={6} md={6} sm={12}>
                <Form.Group controlId="productName">
                  <Form.Label
                    style={{ fontWeight: "500", marginBottom: "8px" }}
                  >
                    Product Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Type here"
                    value={formData.productName}
                    onChange={(e) =>
                      handleInputChange("productName", e.target.value)
                    }
                    style={{
                      padding: "12px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                    }}
                  />
                </Form.Group>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <Form.Group controlId="productCategory">
                  <Form.Label
                    style={{ fontWeight: "500", marginBottom: "8px" }}
                  >
                    Category
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.category}
                    onChange={(e) =>
                      handleInputChange("category", e.target.value)
                    }
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

            <Row className="mb-1" style={{ marginBottom: "5rem" }}>
              <Col lg={6} md={6} sm={12}>
                <Form.Group controlId="skinCondition">
                  <Form.Label
                    style={{ fontWeight: "500", marginBottom: "8px" }}
                  >
                    Skin Condition
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.skinCondition}
                    onChange={(e) =>
                      handleInputChange("skinCondition", e.target.value)
                    }
                    placeholder="Type here"
                    style={{
                      padding: "12px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                    }}
                  />
                </Form.Group>
              </Col>
              <Col lg={6} md={6} sm={12}>
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
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
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

            <Row className="mb-1">
              <Col lg={6} md={6} sm={12}>
                <Form.Group className="mb-3" controlId="ingredients">
                  <Form.Label
                    style={{ fontWeight: "500", marginBottom: "8px" }}
                  >
                    Ingredients
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    placeholder="Type here"
                    value={formData.ingredients}
                    onChange={(e) =>
                      handleInputChange("ingredients", e.target.value)
                    }
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

            <Row className="mb-4">
              <Col lg={6} md={6} sm={12}>
                <Form.Group className="mb-3" controlId="imageUpload">
                  <Form.Label
                    style={{ fontWeight: "500", marginBottom: "8px" }}
                  >
                    Upload Image
                  </Form.Label>

                  {/* Hidden file input */}
                  <input
                    type="file"
                    id="fileInput"
                    multiple
                    accept="image/jpeg,image/png,image/jpg"
                    style={{ display: "none" }}
                    onChange={(e) => handleFileSelect(e.target.files)}
                  />

                  {/* Drop zone */}
                  <div
                    style={{
                      border: `2px dashed ${isDragging ? "#4285F4" : "#ccc"}`,
                      padding: "20px",
                      textAlign: "center",
                      borderRadius: "6px",
                      marginBottom: "12px",
                      backgroundColor: isDragging ? "#f8f9ff" : "white",
                      minHeight: "120px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    <div>
                      <div style={{ marginBottom: "4px" }}>
                        <img
                          src="/icons/uploadicon.png"
                          alt="Upload icon"
                          style={{
                            width: "29px",
                            height: "24px",
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
                        Supported formats: JPG, PNG • Max size: 5MB
                      </small>
                    </div>
                  </div>

                  {/* Display uploaded files */}
                  {uploadedFiles.length > 0 && (
                    <div style={{ marginBottom: "8px" }}>
                      {uploadedFiles.map((file, index) => (
                        <div
                          key={index}
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
                          <span style={{ flexGrow: 1, wordBreak: "break-all" }}>
                            {file.name} ({(file.size / 1024 / 1024).toFixed(2)}{" "}
                            MB)
                          </span>
                          <span
                            style={{
                              color: "#4caf50",
                              cursor: "pointer",
                              marginLeft: "8px",
                              fontWeight: "bold",
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFile(index);
                            }}
                          >
                            ✕
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>

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
                onClick={handleSubmit}
                disabled={uploading || productLoading}
                style={{
                  backgroundColor: "#2857CC",
                  border: "none",
                  padding: "10px 40px",
                  fontWeight: "500",
                  borderRadius: "6px",
                }}
              >
                {uploading || productLoading ? "Saving..." : "Submit"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Product Modal */}
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
                    value={editFormData.productName}
                    onChange={(e) =>
                      handleEditFormChange("productName", e.target.value)
                    }
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
                    value={editFormData.category}
                    onChange={(e) =>
                      handleEditFormChange("category", e.target.value)
                    }
                    style={{
                      padding: "12px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-2" style={{ marginBottom: "0.25rem" }}>
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
                    value={editFormData.skinCondition}
                    onChange={(e) =>
                      handleEditFormChange("skinCondition", e.target.value)
                    }
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
                    value={editFormData.description}
                    onChange={(e) =>
                      handleEditFormChange("description", e.target.value)
                    }
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

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3" controlId="editIngredients">
                  <Form.Label
                    style={{ fontWeight: "500", marginBottom: "8px" }}
                  >
                    Ingredients
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    placeholder="Type here"
                    value={editFormData.ingredients}
                    onChange={(e) =>
                      handleEditFormChange("ingredients", e.target.value)
                    }
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

            <Row className="mb-4">
              <Col md={6}>
                <Form.Group className="mb-4" controlId="editImageUpload">
                  <Form.Label
                    style={{ fontWeight: "500", marginBottom: "8px" }}
                  >
                    Upload Image
                  </Form.Label>

                  <input
                    type="file"
                    id="editFileInput"
                    multiple
                    accept="image/jpeg,image/png,image/jpg"
                    style={{ display: "none" }}
                    onChange={(e) => handleEditFileSelect(e.target.files)}
                  />

                  <div
                    style={{
                      border: `2px dashed ${isDragging ? "#4285F4" : "#ccc"}`,
                      padding: "20px",
                      textAlign: "center",
                      borderRadius: "6px",
                      marginBottom: "12px",
                      backgroundColor: isDragging ? "#f8f9ff" : "white",
                      height: "80px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleEditDrop}
                    onClick={() =>
                      document.getElementById("editFileInput").click()
                    }
                  >
                    <div>
                      <div style={{ marginBottom: "4px" }}>
                        <img
                          src="/icons/uploadicon.png"
                          alt="Upload icon"
                          style={{
                            width: "29px",
                            height: "24px",
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

                  {editUploadedFiles.length > 0 && (
                    <div style={{ marginBottom: "8px" }}>
                      {editUploadedFiles.map((file, index) => (
                        <div
                          key={index}
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
                          <span style={{ flexGrow: 1, wordBreak: "break-all" }}>
                            {file.name} ({(file.size / 1024 / 1024).toFixed(2)}{" "}
                            MB)
                          </span>
                          <span
                            style={{
                              color: "#4caf50",
                              cursor: "pointer",
                              marginLeft: "8px",
                              fontWeight: "bold",
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              removeEditFile(index);
                            }}
                          >
                            ✕
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>

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
                onClick={handleUpdate}
                disabled={uploading || productLoading}
                style={{
                  backgroundColor: "#2857CC",
                  border: "none",
                  padding: "10px 40px",
                  fontWeight: "500",
                  borderRadius: "6px",
                }}
              >
                {uploading || productLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Alert */}
      {alert.show && (
        <Alert
          variant={alert.type === "error" ? "danger" : "success"}
          className="mb-3"
          dismissible
          onClose={() => setAlert({ show: false, type: "", message: "" })}
        >
          {alert.message}
        </Alert>
      )}

      {/* View Product Modal */}
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
              {/* Product Images Section - FIXED */}
              {viewingProduct.Product_AllImageURLs &&
                viewingProduct.Product_AllImageURLs.length > 0 && (
                  <div className="row mb-4">
                    <div className="col-12">
                      <div className="mb-3">
                        <strong>Product Images:</strong>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "15px",
                            marginTop: "15px",
                            padding: "15px",
                            backgroundColor: "#ffffff",
                            borderRadius: "8px",
                            border: "1px solid #e0e0e0",
                          }}
                        >
                          {viewingProduct.Product_AllImageURLs.map(
                            (imageUrl, index) => (
                              <div
                                key={index}
                                style={{
                                  border: "2px solid #205EFA",
                                  borderRadius: "8px",
                                  overflow: "hidden",
                                  width: "200px",
                                  height: "200px",
                                  position: "relative",
                                  cursor: "pointer",
                                  transition: "transform 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform =
                                    "scale(1.05)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform = "scale(1)";
                                }}
                                onClick={() => window.open(imageUrl, "_blank")}
                              >
                                <img
                                  src={imageUrl}
                                  alt={`${
                                    viewingProduct.Product_Name
                                  } - Image ${index + 1}`}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                  onError={(e) => {
                                    console.error(
                                      "Failed to load image:",
                                      imageUrl
                                    );
                                    e.target.parentElement.style.display =
                                      "none";
                                  }}
                                  onLoad={() => {
                                    console.log(
                                      "Image loaded successfully:",
                                      imageUrl
                                    );
                                  }}
                                />
                                <div
                                  style={{
                                    position: "absolute",
                                    bottom: "5px",
                                    right: "5px",
                                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                                    color: "white",
                                    padding: "2px 6px",
                                    borderRadius: "4px",
                                    fontSize: "12px",
                                  }}
                                >
                                  {index + 1}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              {/* Show message if no images */}
              {(!viewingProduct.Product_AllImageURLs ||
                viewingProduct.Product_AllImageURLs.length === 0) && (
                <div className="row mb-4">
                  <div className="col-12">
                    <div className="mb-3">
                      <strong>Product Images:</strong>
                      <div
                        style={{
                          marginTop: "10px",
                          padding: "20px",
                          backgroundColor: "#f8f9fa",
                          border: "1px dashed #ccc",
                          borderRadius: "8px",
                          textAlign: "center",
                          color: "#666",
                        }}
                      >
                        No images uploaded for this product
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Rest of your existing product details... */}
              <div className="row mb-0">
                <div className="col-12">
                  <div
                    className="mb-2"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <strong style={{ minWidth: "120px" }}>Product ID:</strong>
                    <span style={{ marginLeft: "10px" }}>
                      {viewingProduct.Product_ID}
                    </span>
                  </div>
                </div>
              </div>

              <div className="row mb-0">
                <div className="col-12">
                  <div
                    className="mb-2"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <strong style={{ minWidth: "120px" }}>Product Name:</strong>
                    <span style={{ marginLeft: "10px" }}>
                      {viewingProduct.Product_Name}
                    </span>
                  </div>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-12">
                  <div
                    className="mb-3"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <strong style={{ minWidth: "120px" }}>Date Created:</strong>
                    <span style={{ marginLeft: "10px" }}>
                      {viewingProduct.Product_DateCreated
                        ? new Date(
                            viewingProduct.Product_DateCreated
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="row mb-0">
                <div className="col-12">
                  <div
                    className="mb-2"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <strong style={{ minWidth: "120px" }}>Category:</strong>
                    <span style={{ marginLeft: "10px" }}>
                      {viewingProduct.Product_Category}
                    </span>
                  </div>
                </div>
              </div>

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
                      {viewingProduct.Product_SkinCondition}
                    </span>
                  </div>
                </div>
              </div>

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
                      {viewingProduct.Product_Desc}
                    </div>
                  </div>
                </div>
              </div>

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
                      {viewingProduct.Product_Ingredients}
                    </div>
                  </div>
                </div>
              </div>

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
        onHide={cancelDelete}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body
          style={{
            backgroundColor: "#FFFFFF",
            padding: "30px 30px",
            borderRadius: "50px",
            border: "none",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
            textAlign: "center",
            position: "relative",
          }}
        >
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

          <h4
            style={{
              color: "#205EFA",
              fontWeight: "bold",
              marginBottom: "12px",
              fontSize: "25px",
            }}
          >
            Do you wish to delete this product?
          </h4>

          <div
            style={{ display: "flex", gap: "12px", justifyContent: "center" }}
          >
            <button
              onClick={cancelDelete}
              style={{
                backgroundColor: "#DC3545",
                color: "white",
                border: "none",
                borderRadius: "15px",
                padding: "12px 24px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s ease",
                minWidth: "100px",
              }}
            >
              No
            </button>

            <button
              onClick={confirmDelete}
              style={{
                backgroundColor: "#205EFA",
                color: "white",
                border: "none",
                borderRadius: "15px",
                padding: "12px 24px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s ease",
                minWidth: "100px",
              }}
            >
              Yes
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Filter Modal */}
      <Modal
        show={showFilterModal}
        onHide={() => setShowFilterModal(false)}
        size="md"
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
              fontSize: "28px",
              padding: "20px 0",
            }}
          >
            🔍 Filter Products
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ backgroundColor: "#EDF8F6", padding: "30px" }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: "500", marginBottom: "8px" }}>
                Category
              </Form.Label>
              <Form.Select
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                style={{
                  padding: "12px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="">All Categories</option>
                <option value="Serum / Treatment">Serum / Treatment</option>
                <option value="Mask">Mask</option>
                <option value="Cleanser">Cleanser</option>
                <option value="Sunscreen">Sunscreen</option>
                <option value="Treatment">Treatment</option>
                <option value="Toner">Toner</option>
                <option value="Moisturizer">Moisturizer</option>
                <option value="Cream">Cream</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: "500", marginBottom: "8px" }}>
                Skin Type
              </Form.Label>
              <Form.Select
                value={filters.skinType}
                onChange={(e) => handleFilterChange("skinType", e.target.value)}
                style={{
                  padding: "12px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="">All Skin Types</option>
                <option value="Oily">Oily</option>
                <option value="Dry">Dry</option>
                <option value="Combination">Combination</option>
                <option value="Normal">Normal</option>
                <option value="All">All</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label style={{ fontWeight: "500", marginBottom: "8px" }}>
                Date Range
              </Form.Label>
              <Form.Select
                value={filters.dateRange}
                onChange={(e) =>
                  handleFilterChange("dateRange", e.target.value)
                }
                style={{
                  padding: "12px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="">All Dates</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button
                variant="outline-secondary"
                onClick={clearFilters}
                style={{
                  padding: "10px 20px",
                  fontWeight: "500",
                  borderRadius: "6px",
                }}
              >
                Clear All
              </Button>
              <Button
                variant="danger"
                onClick={() => setShowFilterModal(false)}
                style={{
                  padding: "10px 20px",
                  fontWeight: "500",
                  borderRadius: "6px",
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={applyFilters}
                style={{
                  backgroundColor: "#2857CC",
                  border: "none",
                  padding: "10px 30px",
                  fontWeight: "500",
                  borderRadius: "6px",
                }}
              >
                Apply Filters
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Main Content */}
      <Container fluid className="px-2 px-md-3">
        <Row className="mb-4">
          <Col>
            <div className="products-table-container">
              {/* Table Controls */}
              <div className="table-controls">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center w-100 gap-3">
                  <div className="d-flex flex-wrap align-items-center gap-3">
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
                    <div className="d-flex gap-2">
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
                      onClick={() => setShowFilterModal(true)}
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
                      <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                        Filter
                      </span>
                    </div>
                  </div>
                  <div className="ms-auto">
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
                </div>
              </div>

              {/* Table */}
              <div className="table-wrapper table-responsive">
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
                    {productLoading ? (
                      <tr>
                        <td colSpan="7" className="text-center py-4">
                          <div className="d-flex justify-content-center align-items-center">
                            <div
                              className="spinner-border text-primary me-2"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                            <span>Loading products...</span>
                          </div>
                        </td>
                      </tr>
                    ) : filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="text-center py-4">
                          <div className="text-muted">
                            <svg
                              width="48"
                              height="48"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              className="mb-2"
                            >
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                            <div>No products found</div>
                            <small>Try adjusting your search or filters</small>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredProducts
                        .slice(
                          (currentPage - 1) * entriesPerPage,
                          currentPage * entriesPerPage
                        )
                        .map((product) => (
                          <tr key={product.Product_ID}>
                            <td>{product.Product_ID}</td>
                            <td style={{ fontWeight: 500 }}>
                              {product.Product_Name}
                            </td>
                            <td>{product.Product_Category}</td>
                            <td>{product.Product_SkinCondition}</td>
                            <td
                              style={{
                                maxWidth: "200px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {product.Product_Desc}
                            </td>
                            <td
                              style={{
                                maxWidth: "200px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {product.Product_Ingredients}
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
                        ))
                    )}
                  </tbody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="pagination-container">
                <button
                  className="pagination-btn"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    className={`pagination-btn ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  className="pagination-btn"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                >
                  Next
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default DermaProductManagement;