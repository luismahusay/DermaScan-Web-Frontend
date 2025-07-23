import React, { useState } from 'react';
import { Table, Button, Pagination, Modal, Form } from 'react-bootstrap';
import { BsFilter } from 'react-icons/bs';
import '../styles/admin_booking_reviews.css';

const activityData = [
  {
    id: '123',
    user: 'Eufemio Yopacs',
    dermatologist: 'Jhonny Sins',
    timestamp: 'june 4, 2025 - 10:30 AM PHT',
    status: 'Completed',
    bookingType: 'Online',
    view: 'View ',
  },
  // ...repeat for 15 sample rows
];
while (activityData.length < 15) {
  activityData.push({
    id: '234',
    user: 'Jhon Mark Panimdim',
    dermatologist: 'Lexi Lore',
    timestamp: 'May 4, 2025 - 10:30 AM PHT',
    status: 'Completed',
    bookingType: 'Online',
    view: 'View ',
  });
}

function AdminActivityLogs() {
  const [page, setPage] = useState(1);
  const totalPages = 3;
  const [showFilter, setShowFilter] = useState(false);
  const [filterBookingType, setFilterBookingType] = useState('');
  const [filterUser, setFilterUser] = useState('');
  const [filterDermatologist, setFilterDermatologist] = useState('');
  const [filterTimestamp, setFilterTimestamp] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [showPatientReportModal, setShowPatientReportModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleApplyFilter = () => {
    // Implement filter logic here
    setShowFilter(false);
  };
  const handleResetFilter = () => {
    setFilterBookingType('');
    setFilterUser('');
    setFilterDermatologist('');
    setFilterTimestamp('');
    setFilterStatus('');
  };
  return (
    <div className="container-fluid ps-4">
      {/* Header Section */}
      <div className="d-flex flex-row justify-content-between align-items-center mb-4">
        <div className="d-flex flex-column">
          <h2 className="fw-bold fs-4 mb-1">Booking Reviews</h2>
          <span className="text-secondary fs-6">List of Bookings</span>
        </div>
        <Button
          variant="link"
          className="d-flex align-items-center gap-2 px-3 py-2 rounded-3 text-decoration-none shadow-none border-0"
          onClick={() => setShowFilter(true)}
        >
          <BsFilter size={20} className="text-secondary" />
          <span className="fw-semibold text-secondary">Filter Type</span>
        </Button>
      </div>

      {/* Filter Modal */}
      <Modal show={showFilter} onHide={() => setShowFilter(false)} centered dialogClassName="card-modal-body">
        <Modal.Header closeButton>
          <Modal.Title>Filter Booking Reviews</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>User</Form.Label>
              <Form.Control type="text" placeholder="Enter user" value={filterUser} onChange={e => setFilterUser(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Dermatologist</Form.Label>
              <Form.Control type="text" placeholder="Enter dermatologist" value={filterDermatologist} onChange={e => setFilterDermatologist(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Timestamp</Form.Label>
              <Form.Control type="date" value={filterTimestamp} onChange={e => setFilterTimestamp(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control type="text" placeholder="Enter status" value={filterStatus} onChange={e => setFilterStatus(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Booking Type</Form.Label>
              <Form.Control type="text" placeholder="Enter booking type" value={filterBookingType} onChange={e => setFilterBookingType(e.target.value)} />
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
              <th className="fw-semibold">Booking ID</th>
              <th className="fw-semibold">User</th>
              <th className="fw-semibold">Dermatologist</th>
              <th className="fw-semibold">Timestamp</th>
              <th className="fw-semibold">Status</th>
              <th className="fw-semibold">Booking Type</th>
              <th className="fw-semibold">View</th>
            </tr>
          </thead>
          <tbody>
            {activityData.map((row, idx) => (
              <tr key={idx} className="border-bottom text-secondary">
                <td className="py-3 fs-7 fw-normal">{row.id || '-'}</td>
                <td className="py-3 fs-7 fw-normal">{row.user || '-'}</td>
                <td className="py-3 fs-7 fw-normal">{row.dermatologist || '-'}</td>
                <td className="py-3 fs-7 fw-normal">{row.timestamp || '-'}</td>
                <td className="py-3 fs-7 fw-normal">{row.status || '-'}</td>
                <td className="py-3 fs-7 fw-normal">{row.bookingType || '-'}</td>
                <td className="py-3 fs-7 fw-normal">
                  <button
                    type="button"
                    className="btn btn-link text-primary text-decoration-underline fw-normal fs-7 p-0"
                    onClick={() => { setSelectedPatient(row); setShowPatientModal(true); }}
                  >
                    View Details
                  </button>
                </td>
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

      {/* Patient Information Modal */}
      <Modal show={showPatientModal} onHide={() => setShowPatientModal(false)} centered dialogClassName="modal-lg patient-modal">
        <div className="bg-primary rounded-top-2 px-4 pt-3 pb-2 d-flex justify-content-center align-items-center" style={{ position: 'relative' }}>
          <h5 className="text-white fw-bold mb-0">
            <span role="img" aria-label="search">🔍</span> Patient Information
          </h5>
        </div>
        <Modal.Body className="bg-white rounded-bottom-4 shadow-sm px-4 py-4">
          {selectedPatient && (
            <>
              {/* Patient Data */}
              <div className="mb-4">
                <div className="row mb-2">
                  <div className="col-3 text-secondary fw-semibold">Patient ID:</div>
                  <div className="col-7">{selectedPatient.id}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-3 text-secondary fw-semibold">Name:</div>
                  <div className="col-7">{selectedPatient.user}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-3 text-secondary fw-semibold">Booking Date:</div>
                  <div className="col-7">{selectedPatient.timestamp?.split(' - ')[0]}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-3 text-secondary fw-semibold">Booking Time:</div>
                  <div className="col-7">{selectedPatient.timestamp?.split(' - ')[1]}</div>
                </div>
              </div>
              <button
                className="btn p-0 position-absolute"
                style={{ right: '20px', top: '10px' }}
                onClick={() => setShowPatientModal(false)}
              >
                <img src="/icons/wrong_icon.png" alt="Close" width="28" height="28" />          
             </button>
             <hr className="b-5"></hr>
              {/* Booking Information */}
              <div className="mb-4">
                <h6 className="fw-bold text-black mb-3">Booking Information</h6>
                <div className="row mb-2">
                  <div className="col-3 text-secondary fw-semibold">Booking Type:</div>
                  <div className="col-7">Online</div>
                </div>
                <div className="row mb-2">
                  <div className="col-3 text-secondary fw-semibold">Platform:</div>
                  <div className="col-7">Google Meet</div>
                </div>
                <div className="row mb-2 align-items-center">
                  <div className="col-3 text-secondary fw-semibold">Google Meet Link:</div>
                  <div className="col-7">
                    <a href="https://meet.google.com/" target="_blank" rel="noopener noreferrer" className="text-primary text-decoration-underline">https://meet.google.com/</a>
                    <div className="mt-2 d-flex gap-2">
                      <Button variant="outline-primary" size="sm" onClick={() => navigator.clipboard.writeText('https://meet.google.com/')}>Copy Link</Button>
                      <Button variant="outline-secondary" size="sm" onClick={() => window.open('https://meet.google.com/', '_blank')}>Open in New Tab</Button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Face Scan Result */}
              <div className="mb-4">
                <h6 className="fw-bold text-black mb-3">Face Scan Result</h6>
                <div className="d-flex justify-content-start">
                  <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Face Scan" className="rounded-4 shadow-sm" style={{ width: 180, height: 180, objectFit: 'cover', background: '#f8f9fa' }} />
                </div>
              </div>
              {/* Next Button */}
              <div className="d-flex justify-content-end mt-4">
                <Button 
                  variant="primary" 
                  size="sm" 
                  className="px-5 rounded-2 fw-bold mb-3"
                  onClick={() => {
                    setShowPatientModal(false);
                    setShowPatientReportModal(true);
                  }}
                >
                  Next
                </Button>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>

      {/* Patient Report Modal - New Addition */}
      <Modal 
        show={showPatientReportModal} 
        onHide={() => setShowPatientReportModal(false)} 
        centered dialogClassName="modal-lg patient-report-modal"
      >
        <div className="bg-primary px-4 pt-3 pb-2 d-flex justify-content-center align-items-center position-relative rounded-top-2">
          <h5 className="text-white fw-bold mb-0 fs-4">
            <span role="img" aria-label="search">🔍</span> Patient Information
          </h5>
        </div>

        <Modal.Body className="bg-white rounded-bottom-4 shadow-sm px-4 py-2">
          {/* Patient Details Section */}
          <div className="mb-4">
            <div className="row mb-2">
              <div className="col-2 fw-medium text-black">Patient ID:</div>
              <div className="col-8">U-1012</div>
            </div>
            <div className="row mb-2">
              <div className="col-2 fw-medium text-black">Name:</div>
              <div className="col-8">Juan C. Dela Cruz</div>
            </div>
            <div className="row mb-2">
              <div className="col-2 fw-medium text-black">Date Booked:</div>
              <div className="col-8">2025-06-10</div>
            </div>
            <div className="row mb-2">
              <div className="col-2 fw-medium text-black">Time:</div>
              <div className="col-8">2:00 PM</div>
            </div>
          <button
            className="btn p-0 position-absolute"
            style={{ right: '20px', top: '10px' }}
            onClick={() => setShowPatientReportModal(false)}
          >
            <img src="/icons/wrong_icon.png" alt="Close" width="28" height="28" />          
          </button>
          </div>
          <hr className="b-5 mb-4"></hr>
          {/* Skin Analysis Section */}
          <div>
            <h6 className="fw-bold text-black mb-3">Skin Analysis</h6>
          </div>
          <div className="mb-3 d-flex gap-4">
            <div className="mb-2">
              <span className="fw-semibold text-secondary">Risk Assessment:</span>
              <span className="ms-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
            </div>
            <div className="mb-2">
              <div>
                <span className="fw-semibold text-secondary">Results:</span>
                <span className="text-primary ms-2">Acne 85%</span>
              </div>
              <div>
                <span className="fw-semibold text-secondary mb-2">Advice:</span>
                <span className="ms-2 text-primary">Visit a nearby dermatologist</span>
              </div>
            </div>
          </div>

          {/* Product Recommendations Section */}
          <div className="mb-4">
            <h6 className="fw-bold text-black mb-3">Product Recommendations:</h6>
            <div className="d-flex gap-4 overflow-auto pb-3">
              {[1, 2, 3].map((_, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-4 shadow-sm p-3"
                  style={{
                    minWidth: '260px',
                    maxWidth: '260px',
                    border: '1px solid #e3e6ef'
                  }}
                >
                  <div className="d-flex gap-3 mb-2">
                    <img
                      src="/icons/product.jpg"
                      alt="Product"
                      className="rounded-2"
                      width="48"
                      height="48"
                    />
                    <div>
                      <h6 className="fw-bold mb-1">Cetaphil</h6>
                      <p className="text-secondary small mb-0" style={{ minHeight: '40px' }}>
                        Short description about the product and its main purpose
                      </p>
                    </div>
                  </div>
                  <div className="small mb-2">
                    Developed by: <a href="#" className="text-primary text-decoration-underline">Dr. Name MD</a>
                  </div>
                  <div className="d-flex gap-4">
                    <div>
                      <Button variant="primary" size="sm" className="w-40">
                        View More Info
                      </Button>
                    </div>
                    <div>
                      {[...Array(5)].map((_, starIdx) => (
                        <span key={starIdx} className="text-primary fs-5">★</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Back Button */}
            <div className="d-flex justify-content-start mt-4">
              <Button 
                variant="primary" 
                size="sm" 
                className="px-5 rounded-2 fw-bold"
                onClick={() => {
                  setShowPatientModal(true);
                  setShowPatientReportModal(false);
                }}
              >
              Back
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AdminActivityLogs;
