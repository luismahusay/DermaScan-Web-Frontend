import React, { useState } from 'react';
import { Table, Button, Pagination, Image, Modal, Form } from 'react-bootstrap';
import { BsSearch, BsFilter, BsArrowDown } from 'react-icons/bs';
import '../styles/admin_activity_logs.css';

const activityData = [
  {
    type: 'Approved product',
    date: 'May 27, 2025',
    time: '10:15 AM',
    ip: '192.168.1.45',
    email: 'maria.delacruz@gmail.com',
  },
  // ...repeat for 15 sample rows
];
while (activityData.length < 15) {
  activityData.push({
    type: 'Viewed user profile',
    date: 'May 27, 2025',
    time: '10:20 AM',
    ip: '192.168.1.46',
    email: 'john.smith@gmail.com',
  });
}

function AdminActivityLogs() {
  const [page, setPage] = useState(1);
  const totalPages = 3;
  const [showFilter, setShowFilter] = useState(false);
  const [filterType, setFilterType] = useState('');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');
  const [filterIP, setFilterIP] = useState('');
  const [filterEmail, setFilterEmail] = useState('');

  const handleApplyFilter = () => {
    // Implement filter logic here
    setShowFilter(false);
  };
  const handleResetFilter = () => {
    setFilterType('');
    setFilterDateFrom('');
    setFilterDateTo('');
    setFilterIP('');
    setFilterEmail('');
  };
  return (
    <div className="container-fluid ps-4">
      {/* Header Section */}
      <div className="d-flex flex-row justify-content-between align-items-center mb-4">
        <div className="d-flex flex-column">
          <h2 className="fw-bold fs-4 mb-1">Activity Logs</h2>
          <span className="text-secondary fs-6">Accountability starts here.</span>
        </div>
        <Button
          variant="link"
          className="d-flex align-items-center gap-2 px-3 py-2 rounded-3 text-decoration-none shadow-none border-0"
          onClick={() => setShowFilter(true)}
        >
          <BsFilter size={20} className="text-secondary" />
          <span className="fw-semibold text-secondary">Filter</span>
        </Button>
      </div>

      {/* Filter Modal */}
      <Modal show={showFilter} onHide={() => setShowFilter(false)} centered dialogClassName="card-modal-body">
        <Modal.Header closeButton>
          <Modal.Title>Filter Activity Logs</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Date From</Form.Label>
              <Form.Control type="date" value={filterDateFrom} onChange={e => setFilterDateFrom(e.target.value)} className="form-control form-control-sm" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date To</Form.Label>
              <Form.Control type="date" value={filterDateTo} onChange={e => setFilterDateTo(e.target.value)} className="form-control form-control-sm" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>IP Address</Form.Label>
              <Form.Control type="text" placeholder="Enter IP address" value={filterIP} onChange={e => setFilterIP(e.target.value)} className="form-control form-control-sm" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter email address" value={filterEmail} onChange={e => setFilterEmail(e.target.value)} className="form-control form-control-sm" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleResetFilter}>
            Reset
          </Button>
          <Button variant="primary" onClick={handleApplyFilter}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Activity Logs Table */}
      <div className="bg-white rounded-4 shadow-sm p-3">
        <Table hover responsive className="mb-0 align-middle" style={{ minWidth: 900 }}>
          <thead className="table-light">
            <tr>
              <th className="fw-semibold">Activity Type <BsArrowDown className="ms-1" /></th>
              <th className="fw-semibold">Date <BsArrowDown className="ms-1" /></th>
              <th className="fw-semibold">Time <BsArrowDown className="ms-1" /></th>
              <th className="fw-semibold">IP Address <BsArrowDown className="ms-1" /></th>
              <th className="fw-semibold">Email Address <BsArrowDown className="ms-1" /></th>
            </tr>
          </thead>
          <tbody>
            {activityData.map((row, idx) => (
              <tr key={idx} className="border-bottom text-secondary">
                <td className="py-3">{row.type}</td>
                <td className="py-3">{row.date}</td>
                <td className="py-3">{row.time}</td>
                <td className="py-3 text-monospace">{row.ip}</td>
                <td className="py-3 text-monospace">{row.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {/* Pagination */}
        <div className="d-flex justify-content-center align-items-center mt-3">
          <Pagination className="mb-0">
            <Pagination.Prev disabled={page === 1} onClick={() => setPage(page - 1)} className="rounded-pill" />
            {[1, 2, 3].map(num => (
              <Pagination.Item
                key={num}
                active={page === num}
                onClick={() => setPage(num)}
                className={`rounded-pill ${page === num ? 'bg-primary text-white fw-bold' : ''}`}
              >
                {num}
              </Pagination.Item>
            ))}
            <Pagination.Next disabled={page === totalPages} onClick={() => setPage(page + 1)} className="rounded-pill" />
          </Pagination>
        </div>
    </div>
  );
}

export default AdminActivityLogs;
