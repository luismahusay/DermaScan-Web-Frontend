import React, { useState } from 'react';
import { Card, Table, Button, Dropdown, DropdownButton, InputGroup, FormControl, Row, Col, Pagination, Badge } from 'react-bootstrap';
import { BsEye, BsPencil, BsTrash, BsArrowUpRight } from 'react-icons/bs';
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
            <Button variant="primary" className="fw-semi-bold px-2 rounded-3 min-w-150 ms-5">
              + Add Product
            </Button>
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
                        <Button variant="outline-primary" size="sm" title="View" className="rounded-2 py-1 px-2"><BsEye /></Button>
                        {p.canEdit && <Button variant="outline-secondary" size="sm" title="Edit" className="rounded-2 py-1 px-2 text-primary border-primary"><BsPencil /></Button>}
                        <Button variant="outline-danger" size="sm" title="Delete" className="rounded-2 py-1 px-2 text-danger border-danger"><BsTrash /></Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
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