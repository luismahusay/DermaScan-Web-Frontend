import React, { useState } from 'react';
import { Card, Table, Button, Dropdown, DropdownButton, InputGroup, FormControl, Row, Col, Pagination, Badge, Modal, Form } from 'react-bootstrap';
import { BsEye, BsPencil, BsTrash, BsArrowUpRight, BsTrashFill, BsStarFill, BsStarHalf } from 'react-icons/bs';
import '../styles/admin_product_management.css';

const productData = [
  { id: '#20462', product: 'ClearGlow Serum', category: 'Serum', skinType: 'Oily', submittedBy: 'Dr. Michael Cruz', date: '2025-06-05', canEdit: true },
  { id: '#18933', product: 'HydraMask Pro', category: 'Mask', skinType: 'Dry', submittedBy: 'Dr. Emily Santos', date: '2025-06-05', canEdit: true },
  { id: '#85252', product: 'SunGuard Ultra', category: 'Sunscreen', skinType: 'All', submittedBy: 'Dr. Michael Cruz', date: '2025-06-05', canEdit: true },
  { id: '#85252', product: 'SunGuard Ultra', category: 'Sunscreen', skinType: 'All', submittedBy: 'Dr. Michael Cruz', date: '2025-06-05', canEdit: true },
  { id: '#20462', product: 'ClearGlow Serum', category: 'Serum', skinType: 'Combination', submittedBy: 'Dr. Michael Cruz', date: '2025-06-05', canEdit: true },
  { id: '#18933', product: 'HydraMask Pro', category: 'Mask', skinType: 'Normal', submittedBy: 'Dr. Emily Santos', date: '2025-06-05', canEdit: true },
  { id: '#20462', product: 'ClearGlow Serum', category: 'Serum', skinType: 'Oily', submittedBy: 'Dr. Michael Cruz', date: '2025-06-05', canEdit: true },
  { id: '#18933', product: 'HydraMask Pro', category: 'Mask', skinType: 'Dry', submittedBy: 'Dr. Emily Santos', date: '2025-06-05', canEdit: true },
  { id: '#20462', product: 'ClearGlow Serum', category: 'Serum', skinType: 'Combination', submittedBy: 'Dr. Michael Cruz', date: '2025-06-05', canEdit: true },
  { id: '#85252', product: 'SunGuard Ultra', category: 'Sunscreen', skinType: 'All', submittedBy: 'Dr. Michael Cruz', date: '2025-06-05', canEdit: true },
];

const ProductManagement = () => {
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [editUploadedImages, setEditUploadedImages] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewProduct, setViewProduct] = useState(null);

  // Filtered and paginated data
  const filtered = productData.filter(
    p =>
      p.product.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.submittedBy.toLowerCase().includes(search.toLowerCase())
  );
  const paginated = filtered.slice((page - 1) * entries, page * entries);
  const totalPages = Math.ceil(filtered.length / entries) || 1;

  return (
    <Row className="g-4 p-4 container-fluid">
      <Col lg={9}>
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
              onSelect={val => { setEntries(Number(val)); setPage(1); }}
            >
              {[10, 25, 50, 100].map(num => (
                <Dropdown.Item key={num} eventKey={num}>{num}</Dropdown.Item>
              ))}
            </DropdownButton>
            <span>entries</span>
          </div>
          <InputGroup style={{ maxWidth: 260 }}>
            <FormControl
              placeholder="Search..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
            />
          </InputGroup>
          <div className="ms-auto">
          <Button variant="primary" className="fw-semi-bold px-2 rounded-3 min-w-150 ms-5" onClick={() => setShowModal(true)}>
            + Add Product
          </Button>
            {/* Add Product Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered contentClassName="add-product-modal-bg" size="lg">
              <Modal.Header className="bg-primary rounded-top" closeButton={false}>
                <Modal.Title className="fw-bold text-white w-100 text-center">Add product</Modal.Title>
              </Modal.Header>
              <Modal.Body className="p-2 px-4  bg-mint rounded-bottom">
                <Form>
                  <Row className="g-5">
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-label">Product Name</Form.Label>
                        <Form.Control type="text" placeholder="Type here" />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-label">Skin Condition</Form.Label>
                        <Form.Control type="text" placeholder="Type here" />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-label">Status</Form.Label>
                        <Form.Control type="text" placeholder="Type here" />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-label">Ingredients</Form.Label>
                        <Form.Control as="textarea" placeholder="Type here" rows={7} />
                      </Form.Group>
                      {/* Image Upload Section */}
                      <div className="mt-2 mb-3">
                        <div className="upload-area border border-2 border-dashed rounded-3 p-4 text-center mb-2" style={{ background: '#E6FAF5', cursor: 'pointer' }}>
                          <div className="fw-semibold mb-1">
                            Drag & drop images or{' '}
                            <span
                              className="text-primary text-decoration-underline"
                              style={{ cursor: 'pointer' }}
                              onClick={() => document.getElementById('product-image-upload').click()}
                            >
                              Browse
                            </span>
                            <input
                              type="file"
                              id="product-image-upload"
                              accept="image/jpeg,image/jpg,image/png"
                              multiple
                              style={{ display: 'none' }}
                              onChange={e => {
                                const files = Array.from(e.target.files);
                                if (files.length) {
                                  setUploadedImages(prev => [
                                    ...prev,
                                    ...files.map(f => ({ name: f.name }))
                                  ]);
                                }
                                e.target.value = '';
                              }}
                            />
                          </div>
                          <div className="small text-muted">Supported formats: JPEG, JPG, PNG</div>
                        </div>
                        {uploadedImages.length > 0 && (
                          <div>
                            {uploadedImages.map((img, idx) => (
                              <div key={idx} className="d-flex align-items-center justify-content-between bg-white rounded-2 px-3 py-2 mb-2 shadow-sm w-100">
                                <span className="text-truncate">{img.name}</span>
                                <Button
                                  variant="link"
                                  className="p-0 ms-2 text-danger"
                                  size="sm"
                                  onClick={() => setUploadedImages(prev => prev.filter((_, i) => i !== idx))}
                                >
                                  <BsTrashFill />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </Col>
                    <Col md={6} className="d-flex flex-column justify-content-between" style={{ minHeight: 420 }}>
                      <div>
                        <Form.Group className="mb-3">
                          <Form.Label className="text-label">Category</Form.Label>
                          <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label className="text-label">Description</Form.Label>
                          <Form.Control as="textarea" rows={7} />
                        </Form.Group>
                      </div>
                      {/* Action Buttons */}
                      <div className="d-flex justify-content-center align-items-end gap-5 mt-4">
                        <Button onClick={() => setShowModal(false)} className="btn-danger fw-bold text-white px-4 w-100">Cancel</Button>
                        <Button className="btn-primary fw-bold text-white px-4 w-100">Submit</Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </Modal.Body>
            </Modal>
          </div>
        </div>
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
                {paginated.length === 0 ? (
                  <tr><td colSpan={7} className="text-center py-4">No products found.</td></tr>
                ) : (
                  paginated.map((p, idx) => (
                    <tr key={idx}>
                      <td>{p.id}</td>
                      <td>{p.product}</td>
                      <td>{p.category}</td>
                      <td>{p.skinType}</td>
                      <td>{p.submittedBy}</td>
                      <td>{p.date}</td>
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
                        {p.canEdit && <Button
                          variant="outline-primary"
                          size="sm"
                          title="Edit"
                          className="rounded-2 py-1 px-2 text-primary border-primary action-icon-btn"
                          onClick={() => {
                            setEditProduct(p);
                            setEditUploadedImages([]);
                            setShowEditModal(true);
                          }}
                        ><BsPencil /></Button>}
                        <Button
                          variant="outline-danger"
                          size="sm"
                          title="Delete"
                          className="rounded-2 py-1 px-2 text-danger border-danger action-icon-btn"
                          onClick={() => {
                            setDeleteProduct(p);
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
      {/* Product Information Modal - view details */}
      <Modal
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        centered
        contentClassName="add-product-modal-bg"
        size="lg"
      >
        <Modal.Header className="bg-primary rounded-top d-flex align-items-center justify-content-center">
          <div className="fw-bold text-white fs-5">
            <span role="img" aria-label="search">🔍</span> Product Information
          </div>
        </Modal.Header>
        <Modal.Body className="bg-white rounded-bottom p-4 px-5">
          {viewProduct && (
            <Row>
              <Col md={13}>
                <div className="d-flex justify-content-end">
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="user-details-modal-close btn btn-link p-0 m-0 bg-transparent border-0"
                    aria-label="Close"
                  >
                    <img src="/icons/wrong_icon.png" alt="Close" className="img-fluid object-fit-contain w-28 h-28"/>
                  </button>
                </div>
                <div className="mb-2">
                  <span className="fw-semibold">Product ID:</span> {viewProduct.id || 'P-1032'}
                </div>
                <div className="mb-2">
                  <span className="fw-semibold">Product Name:</span> {viewProduct.product || 'Cetaphil Gentle Skin Cleanser'}
                </div>
                <div className="mb-2">
                  <span className="fw-semibold">Status:</span> Approved
                </div>
                <div className="mb-2">
                  <span className="fw-semibold">Reviewed By:</span> Dr. Katrina Santos
                </div>
                  <hr className="my-3 w-100 ms-auto" />
                <div>
                  <span className="fw-semibold">Category:</span> {viewProduct.category || 'Cleanser'}
                </div>
                <div className="mb-3">
                  <span className="fw-semibold">Skin Condition:</span> {viewProduct.skinType || 'Sensitive, Dry'}
                </div>
                <div className="mb-3">
                  <span className="fw-semibold">Description:</span> <span className="text-muted">A detailed explanation of the product’s benefits, usage, and formulation. It mentions: “mild, non-irritating formula… can be used with or without water… suitable for daily use on face and body.”</span>
                </div>
                <div className="mb-2">
                  <span className="fw-semibold">Ingredients:</span> <span className="text-muted">Water, Cetyl Alcohol, Propylene Glycol, Sodium Lauryl Sulfate, Stearyl Alcohol, Methylparaben, Butylparaben</span>
                </div>
                {/* Ratings */}
                <div className="d-flex align-items-center mt-3 mb-2">
                  <span className="me-2 fw-semibold">Ratings:</span>
                  <span className="text-warning fs-5 d-flex align-items-center">
                    {(() => {
                      const rating = typeof viewProduct.rating === 'number' ? viewProduct.rating : 4.5;
                      const fullStars = Math.floor(rating);
                      const halfStar = rating % 1 >= 0.25 && rating % 1 < 0.75;
                      const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
                      return [
                        ...Array(fullStars).fill(<BsStarFill />),
                        ...(halfStar ? [<BsStarHalf key="half" />] : []),
                        ...Array(emptyStars).fill(<span key={Math.random()} className="opacity-25"><BsStarFill /></span>),
                      ];
                    })()}
                  </span>
                  <span className="ms-2">{typeof viewProduct.rating === 'number' ? viewProduct.rating : 4.5} / 5</span>
                </div>
                {/* Product Image */}
                <div className="mb-3">
                  <img
                    src={viewProduct.imageUrl || "/icons/product_cetaphyl.png"}
                    alt="Product"
                    className="img-fluid rounded shadow"
                    style={{ maxHeight: 140, background: '#fff' }}
                  />
                </div>
                <div className="d-flex justify-content-end">
                  <Button
                    variant="primary"
                    className="fw-bold text-white px-5"
                    onClick={() => {
                      setShowViewModal(false);
                      setEditProduct(viewProduct);
                      setEditUploadedImages([]);
                      setShowEditModal(true);
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
          <div className="fw-bold fs-5 mb-4">Do you wish to delete this product?</div>
          <div className="d-flex justify-content-center gap-4">
            <Button
              variant="primary"
              className="fw-bold px-4 text-white"
              onClick={() => {
                // Here you would handle the actual delete logic
                setShowDeleteModal(false);
              }}
            >
              Yes
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
      {/* Edit Product Modal - render once, outside the table */}
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
                    defaultValue={editProduct?.product || ''}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="text-label">Skin Condition</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Type here"
                    defaultValue={editProduct?.skinType || ''}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="text-label">Status</Form.Label>
                  <Form.Control type="text" placeholder="Type here" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="text-label">Ingredients</Form.Label>
                  <Form.Control as="textarea" placeholder="Type here" rows={7} />
                </Form.Group>
                {/* Image Upload Section */}
                <div className="mt-2 mb-3">
                  <div
                    className="upload-area border border-2 border-dashed rounded-3 p-4 text-center mb-2"
                    style={{ background: '#E6FAF5', cursor: 'pointer' }}
                  >
                    <div className="fw-semibold mb-1">
                      Drag & drop images or{' '}
                      <span
                        className="text-primary text-decoration-underline"
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          document.getElementById('edit-product-image-upload').click()
                        }
                      >
                        Browse
                      </span>
                      <input
                        type="file"
                        id="edit-product-image-upload"
                        accept="image/jpeg,image/jpg,image/png"
                        multiple
                        style={{ display: 'none' }}
                        onChange={e => {
                          const files = Array.from(e.target.files);
                          if (files.length) {
                            setEditUploadedImages(prev => [
                              ...prev,
                              ...files.map(f => ({ name: f.name })),
                            ]);
                          }
                          e.target.value = '';
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
                            onClick={() =>
                              setEditUploadedImages(prev =>
                                prev.filter((_, i) => i !== idx)
                              )
                            }
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
                      defaultValue={editProduct?.category || ''}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-label">Description</Form.Label>
                    <Form.Control as="textarea" rows={7} />
                  </Form.Group>
                </div>
                {/* Action Buttons */}
                <div className="d-flex justify-content-center align-items-end gap-5 mt-4">
                  <Button
                    onClick={() => setShowEditModal(false)}
                    className="btn-danger fw-bold text-white px-4 w-100"
                  >
                    Cancel
                  </Button>
                  <Button className="btn-primary fw-bold text-white px-3 w-100">
                    Save Changes
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
        <div className="d-flex justify-content-center align-items-center mt-3">
          <Pagination className="mb-0">
            <Pagination.Prev disabled={page === 1} onClick={() => setPage(page - 1)} />
            {[...Array(totalPages)].map((_, i) => (
              <Pagination.Item key={i + 1} active={page === i + 1} onClick={() => setPage(i + 1)}>{i + 1}</Pagination.Item>
            ))}
            <Pagination.Next disabled={page === totalPages} onClick={() => setPage(page + 1)} />
          </Pagination>
        </div>
      </Col>
      <Col lg={3}>
        <Card className="shadow-sm rounded-4 summary-card">
          <Card.Body className="d-flex flex-column align-items-start justify-content-start py-2">
            <div className="fw-semibold fs-5">Total Product</div>
            <div className="fw-bold mb-1 text-primary fs-3">123</div>
            <hr className="w-100 my-2 border border-gray opacity-100" />
            <div className="d-flex align-items-center gap-2">
              <span className="text-success fw-semibold fs-6">+36%</span>
              <span className="text-success d-flex align-items-center fs-6"><BsArrowUpRight /></span>
              <span className="text-muted small">than last month</span>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
export default ProductManagement;