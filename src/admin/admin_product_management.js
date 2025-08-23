import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  Button,
  Dropdown,
  DropdownButton,
  InputGroup,
  FormControl,
  Row,
  Col,
  Pagination,
  Badge,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";
import {
  BsEye,
  BsPencil,
  BsTrash,
  BsArrowUpRight,
  BsTrashFill,
  BsStarFill,
  BsStarHalf,
} from "react-icons/bs";
import "../styles/admin_product_management.css";
import { useImageUpload } from "../hooks/useImageUpload";
import { useProduct } from "../contexts/ProductContext";
import { useAuth } from "../contexts/AuthContext";

const ProductManagement = () => {
  // Context hooks
  const {
    products,
    loading,
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    updateProductStatus,
  } = useProduct();
  const { userProfile } = useAuth();
  const { uploadImages, uploading, uploadError } = useImageUpload();

  // State management
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [editUploadedImages, setEditUploadedImages] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductData, setDeleteProductData] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewProduct, setViewProduct] = useState(null);
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

  // Load products on component mount
  useEffect(() => {
    getProducts();
  }, []);

  // Utility functions
  const generateProductId = () => {
    return `product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false, type: "", message: "" }), 5000);
  };

  // Computed values (after state is defined)
  const filtered = products.filter(
    (p) =>
      p.Product_Name?.toLowerCase().includes(search.toLowerCase()) ||
      p.Product_ID?.toLowerCase().includes(search.toLowerCase()) ||
      p.Product_Category?.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice((page - 1) * entries, page * entries);
  const totalPages = Math.ceil(filtered.length / entries) || 1;

  // Form handlers
  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEditFormChange = (field, value) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Image handlers
  const handleImageRemove = (index, isEdit = false) => {
    if (isEdit) {
      setEditUploadedImages((prev) => prev.filter((_, i) => i !== index));
      setEditSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    } else {
      setUploadedImages((prev) => prev.filter((_, i) => i !== index));
      setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // Product operations
  const handleAddProduct = async () => {
    try {
      if (!formData.productName.trim()) {
        showAlert("error", "Product name is required");
        return;
      }

      let imageUrls = [];
      if (selectedFiles.length > 0) {
        const tempProductId = generateProductId();
        imageUrls = await uploadImages(tempProductId, selectedFiles);
      }

      await addProduct(
        {
          productName: formData.productName,
          category: formData.category,
          skinCondition: formData.skinCondition,
          description: formData.description,
          ingredients: formData.ingredients,
          dermatologistId: userProfile?.User_ID,
        },
        imageUrls
      );

      // Reset form
      setFormData({
        productName: "",
        category: "",
        skinCondition: "",
        description: "",
        ingredients: "",
      });
      setShowModal(false);
      setUploadedImages([]);
      setSelectedFiles([]);
      showAlert("success", "Product added successfully");
    } catch (error) {
      console.error("Error adding product:", error);
      showAlert("error", "Failed to add product");
    }
  };

  const handleEditSubmit = async () => {
    try {
      if (!editFormData.productName.trim()) {
        showAlert("error", "Product name is required");
        return;
      }

      let newImageUrls = [];
      if (editSelectedFiles.length > 0) {
        newImageUrls = await uploadImages(
          editProduct.Product_ID,
          editSelectedFiles
        );
      }

      await updateProduct(editProduct.Product_ID, editFormData, newImageUrls);

      setShowEditModal(false);
      setEditUploadedImages([]);
      setEditSelectedFiles([]);
      showAlert("success", "Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
      showAlert("error", "Failed to update product");
    }
  };

  const openEditModal = (product) => {
    setEditProduct(product);
    setEditFormData({
      productName: product.Product_Name || "",
      category: product.Product_Category || "",
      skinCondition: product.Product_SkinCondition || "",
      description: product.Product_Desc || "",
      ingredients: product.Product_Ingredients || "",
    });
    setEditUploadedImages([]);
    setShowEditModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteProductData?.Product_ID) return;

    try {
      await deleteProduct(deleteProductData.Product_ID);
      setShowDeleteModal(false);
      setDeleteProductData(null);
      showAlert("success", "Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      showAlert("error", "Failed to delete product");
    }
  };

  return (
    <Row className="g-4 ps-4 container-fluid">
      <Col lg={9}>
        {/* Alert */}
        {alert.show && (
          <Alert
            variant={alert.type === "error" ? "danger" : "success"}
            className="mb-3"
          >
            {alert.message}
          </Alert>
        )}

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fw-bold mb-0">Product Management</h3>
        </div>

        <div className="d-flex flex-wrap align-items-center mb-2 gap-4">
          <div className="d-flex align-items-center gap-2">
            <span>Show</span>
            <DropdownButton
              id="dropdown-entries"
              title={entries}
              variant="outline-secondary"
              size="sm"
              onSelect={(val) => {
                setEntries(Number(val));
                setPage(1);
              }}
            >
              {[10, 25, 50, 100].map((num) => (
                <Dropdown.Item key={num} eventKey={num}>
                  {num}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <span>entries</span>
          </div>
          <InputGroup style={{ maxWidth: 260 }}>
            <FormControl
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </InputGroup>
          <div className="ms-auto">
            <Button
              variant="primary"
              className="fw-semi-bold px-2 rounded-3 min-w-150 ms-5"
              onClick={() => setShowModal(true)}
            >
              + Add Product
            </Button>
          </div>
        </div>

        {/* Products Table */}
        <Card className="shadow-sm rounded-4">
          <Card.Body className="p-0">
            <Table hover responsive className="mb-0 align-middle product-table">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Skin Type</th>
                  <th>Submitted By</th>
                  <th>Submitted Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-4">
                      Loading products...
                    </td>
                  </tr>
                ) : paginated.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-4">
                      No products found.
                    </td>
                  </tr>
                ) : (
                  paginated.map((p, idx) => (
                    <tr key={p.Product_ID || idx}>
                      <td>{p.Product_ID}</td>
                      <td>{p.Product_Name}</td>
                      <td>{p.Product_Category}</td>
                      <td>{p.Product_SkinCondition}</td>
                      <td>{p.Dermatologist_ID}</td>
                      <td>
                        {p.Product_DateCreated
                          ? new Date(p.Product_DateCreated).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="d-flex gap-2">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          title="View"
                          className="rounded-2 py-1 px-2 action-icon-btn"
                          onClick={() => {
                            setViewProduct(p);
                            setShowViewModal(true);
                          }}
                        >
                          <BsEye />
                        </Button>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          title="Edit"
                          className="rounded-2 py-1 px-2 text-primary border-primary action-icon-btn"
                          onClick={() => openEditModal(p)}
                        >
                          <BsPencil />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          title="Delete"
                          className="rounded-2 py-1 px-2 text-danger border-danger action-icon-btn"
                          onClick={() => {
                            setDeleteProductData(p);
                            setShowDeleteModal(true);
                          }}
                        >
                          <BsTrash />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {/* Add Product Modal */}
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          centered
          contentClassName="add-product-modal-bg"
          size="lg"
        >
          <Modal.Header className="bg-primary rounded-top" closeButton={false}>
            <Modal.Title className="fw-bold text-white w-100 text-center">
              Add product
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-2 px-4 bg-mint rounded-bottom">
            <Form>
              <Row className="g-5">
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-label">Product Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Type here"
                      value={formData.productName}
                      onChange={(e) =>
                        handleFormChange("productName", e.target.value)
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-label">
                      Skin Condition
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Type here"
                      value={formData.skinCondition}
                      onChange={(e) =>
                        handleFormChange("skinCondition", e.target.value)
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-label">Ingredients</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Type here"
                      rows={7}
                      value={formData.ingredients}
                      onChange={(e) =>
                        handleFormChange("ingredients", e.target.value)
                      }
                    />
                  </Form.Group>
                  {/* Image Upload Section */}
                  <div className="mt-2 mb-3">
                    <div
                      className="upload-area border border-2 border-dashed rounded-3 p-4 text-center mb-2"
                      style={{ background: "#E6FAF5", cursor: "pointer" }}
                    >
                      <div className="fw-semibold mb-1">
                        Drag & drop images or{" "}
                        <span
                          className="text-primary text-decoration-underline"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            document
                              .getElementById("product-image-upload")
                              .click()
                          }
                        >
                          Browse
                        </span>
                        <input
                          type="file"
                          id="product-image-upload"
                          accept="image/jpeg,image/jpg,image/png"
                          multiple
                          style={{ display: "none" }}
                          onChange={(e) => {
                            const files = Array.from(e.target.files);
                            if (files.length) {
                              setSelectedFiles(files);
                              setUploadedImages(
                                files.map((f) => ({
                                  name: f.name,
                                  file: f,
                                }))
                              );
                            }
                            e.target.value = "";
                          }}
                        />
                      </div>
                      <div className="small text-muted">
                        Supported formats: JPEG, JPG, PNG
                      </div>
                    </div>
                    {uploadedImages.length > 0 && (
                      <div>
                        {uploadedImages.map((img, idx) => (
                          <div
                            key={idx}
                            className="d-flex align-items-center justify-content-between bg-white rounded-2 px-3 py-2 mb-2 shadow-sm w-100"
                          >
                            <span className="text-truncate">{img.name}</span>
                            <Button
                              variant="link"
                              className="p-0 ms-2 text-danger"
                              size="sm"
                              onClick={() => handleImageRemove(idx)}
                            >
                              <BsTrashFill />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Col>
                <Col
                  md={6}
                  className="d-flex flex-column justify-content-between"
                  style={{ minHeight: 420 }}
                >
                  <div>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-label">Category</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.category}
                        onChange={(e) =>
                          handleFormChange("category", e.target.value)
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-label">
                        Description
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={7}
                        value={formData.description}
                        onChange={(e) =>
                          handleFormChange("description", e.target.value)
                        }
                      />
                    </Form.Group>
                  </div>
                  <div className="d-flex justify-content-center align-items-end gap-5 mt-4">
                    <Button
                      onClick={() => setShowModal(false)}
                      className="btn-danger fw-bold text-white px-4 w-100"
                    >
                      Cancel
                    </Button>
                    <Button
                      className="btn-primary fw-bold text-white px-4 w-100"
                      disabled={uploading || loading}
                      onClick={handleAddProduct}
                    >
                      {uploading || loading ? "Saving..." : "Submit"}
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Edit Product Modal */}
        <Modal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          centered
          contentClassName="add-product-modal-bg"
          size="lg"
        >
          <Modal.Header className="bg-primary rounded-top" closeButton={false}>
            <Modal.Title className="fw-bold text-white w-100 text-center">
              Edit product
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-2 px-4 bg-mint rounded-bottom">
            <Form>
              <Row className="g-5">
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-label">Product Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Type here"
                      value={editFormData.productName}
                      onChange={(e) =>
                        handleEditFormChange("productName", e.target.value)
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-label">
                      Skin Condition
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Type here"
                      value={editFormData.skinCondition}
                      onChange={(e) =>
                        handleEditFormChange("skinCondition", e.target.value)
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-label">Ingredients</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Type here"
                      rows={7}
                      value={editFormData.ingredients}
                      onChange={(e) =>
                        handleEditFormChange("ingredients", e.target.value)
                      }
                    />
                  </Form.Group>
                  {/* Edit Image Upload Section */}
                  <div className="mt-2 mb-3">
                    <div
                      className="upload-area border border-2 border-dashed rounded-3 p-4 text-center mb-2"
                      style={{ background: "#E6FAF5", cursor: "pointer" }}
                    >
                      <div className="fw-semibold mb-1">
                        Drag & drop images or{" "}
                        <span
                          className="text-primary text-decoration-underline"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            document
                              .getElementById("edit-product-image-upload")
                              .click()
                          }
                        >
                          Browse
                        </span>
                        <input
                          type="file"
                          id="edit-product-image-upload"
                          accept="image/jpeg,image/jpg,image/png"
                          multiple
                          style={{ display: "none" }}
                          onChange={(e) => {
                            const files = Array.from(e.target.files);
                            if (files.length) {
                              setEditSelectedFiles(files);
                              setEditUploadedImages(
                                files.map((f) => ({
                                  name: f.name,
                                  file: f,
                                }))
                              );
                            }
                            e.target.value = "";
                          }}
                        />
                      </div>
                      <div className="small text-muted">
                        Supported formats: JPEG, JPG, PNG
                      </div>
                    </div>
                    {editUploadedImages.length > 0 && (
                      <div>
                        {editUploadedImages.map((img, idx) => (
                          <div
                            key={idx}
                            className="d-flex align-items-center justify-content-between bg-white rounded-2 px-3 py-2 mb-2 shadow-sm w-100"
                          >
                            <span className="text-truncate">{img.name}</span>
                            <Button
                              variant="link"
                              className="p-0 ms-2 text-danger"
                              size="sm"
                              onClick={() => handleImageRemove(idx, true)}
                            >
                              <BsTrashFill />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Col>
                <Col
                  md={6}
                  className="d-flex flex-column justify-content-between"
                  style={{ minHeight: 420 }}
                >
                  <div>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-label">Category</Form.Label>
                      <Form.Control
                        type="text"
                        value={editFormData.category}
                        onChange={(e) =>
                          handleEditFormChange("category", e.target.value)
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-label">
                        Description
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={7}
                        value={editFormData.description}
                        onChange={(e) =>
                          handleEditFormChange("description", e.target.value)
                        }
                      />
                    </Form.Group>
                  </div>
                  <div className="d-flex justify-content-center align-items-end gap-5 mt-4">
                    <Button
                      onClick={() => setShowEditModal(false)}
                      className="btn-danger fw-bold text-white px-4 w-100"
                    >
                      Cancel
                    </Button>
                    <Button
                      className="btn-primary fw-bold text-white px-3 w-100"
                      disabled={uploading || loading}
                      onClick={handleEditSubmit}
                    >
                      {uploading || loading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
        </Modal>

        {/* View Product Modal */}
        <Modal
          show={showViewModal}
          onHide={() => setShowViewModal(false)}
          centered
          contentClassName="add-product-modal-bg"
          size="lg"
        >
          <Modal.Header className="bg-primary rounded-top d-flex align-items-center justify-content-center">
            <div className="fw-bold text-white fs-5">Product Information</div>
          </Modal.Header>
          <Modal.Body className="bg-white rounded-bottom p-4 px-5">
            {viewProduct && (
              <Row>
                <Col md={12}>
                  <div className="d-flex justify-content-end">
                    <button
                      onClick={() => setShowViewModal(false)}
                      className="btn btn-link p-0 m-0 bg-transparent border-0"
                      aria-label="Close"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="mb-2">
                    <span className="fw-semibold">Product ID:</span>{" "}
                    {viewProduct.Product_ID}
                  </div>
                  <div className="mb-2">
                    <span className="fw-semibold">Product Name:</span>{" "}
                    {viewProduct.Product_Name}
                  </div>
                  <div className="mb-2">
                    <span className="fw-semibold">Status:</span>{" "}
                    {viewProduct.Product_Status}
                  </div>
                  <hr className="my-3" />
                  <div className="mb-2">
                    <span className="fw-semibold">Category:</span>{" "}
                    {viewProduct.Product_Category}
                  </div>
                  <div className="mb-3">
                    <span className="fw-semibold">Skin Condition:</span>{" "}
                    {viewProduct.Product_SkinCondition}
                  </div>
                  <div className="mb-3">
                    <span className="fw-semibold">Description:</span>{" "}
                    <span className="text-muted">
                      {viewProduct.Product_Desc}
                    </span>
                  </div>
                  <div className="mb-2">
                    <span className="fw-semibold">Ingredients:</span>{" "}
                    <span className="text-muted">
                      {viewProduct.Product_Ingredients}
                    </span>
                  </div>
                  <div className="mb-3">
                    <span className="fw-semibold">Ratings:</span>{" "}
                    {viewProduct.Product_Ratings || 0} / 5
                  </div>
                  {viewProduct.Product_ImageURL && (
                    <div className="mb-3">
                      <img
                        src={viewProduct.Product_ImageURL}
                        alt="Product"
                        className="img-fluid rounded shadow"
                        style={{ maxHeight: 140 }}
                      />
                    </div>
                  )}
                  <div className="d-flex justify-content-end">
                    <Button
                      variant="primary"
                      className="fw-bold text-white px-5"
                      onClick={() => {
                        setShowViewModal(false);
                        openEditModal(viewProduct);
                      }}
                    >
                      Edit Product
                    </Button>
                  </div>
                </Col>
              </Row>
            )}
          </Modal.Body>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          centered
          size="sm"
        >
          <Modal.Body className="text-center py-4">
            <div className="mb-3">
              <BsTrash className="text-danger" size={40} />
            </div>
            <div className="fw-bold fs-5 mb-4">
              Do you wish to delete this product?
            </div>
            <div className="d-flex justify-content-center gap-4">
              <Button
                variant="primary"
                className="fw-bold px-4 text-white"
                onClick={handleDeleteConfirm}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Yes"}
              </Button>
              <Button
                variant="danger"
                className="fw-bold px-4 text-white"
                onClick={() => setShowDeleteModal(false)}
              >
                No
              </Button>
            </div>
          </Modal.Body>
        </Modal>

        {/* Pagination */}
        <div className="d-flex justify-content-center align-items-center mt-3">
          <Pagination className="mb-0">
            <Pagination.Prev
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            />
            {[...Array(totalPages)].map((_, i) => (
              <Pagination.Item
                key={i + 1}
                active={page === i + 1}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            />
          </Pagination>
        </div>
      </Col>

      {/* Summary Card */}
      <Col lg={3}>
        <Card className="shadow-sm rounded-4 summary-card">
          <Card.Body className="d-flex flex-column align-items-start justify-content-start py-2">
            <div className="fw-semibold fs-5">Total Products</div>
            <div className="fw-bold mb-1 text-primary fs-3">
              {products.length}
            </div>
            <hr className="w-100 my-2 border border-gray opacity-100" />
            <div className="d-flex align-items-center gap-2">
              <span className="text-success fw-semibold fs-6">+36%</span>
              <span className="text-success d-flex align-items-center fs-6">
                <BsArrowUpRight />
              </span>
              <span className="text-muted small">than last month</span>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ProductManagement;
