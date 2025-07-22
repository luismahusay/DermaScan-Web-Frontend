import React, { useState, useRef, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Container, Row, Col, Card, Table, Badge, InputGroup, FormControl, Button, Dropdown, DropdownButton, Pagination } from 'react-bootstrap';
import '../styles/user_management.css';

const mockPatients = Array.from({ length: 24 }, (_, i) => ({
  id: 1000 + i,
  firstName: 'Matt',
  lastName: 'Dickerson',
  middleInitial: 'A',
  email: `matt${i}@mail.com`,
  plan: 'Basic',
  status: i % 2 === 0 ? 'Active' : 'Inactive',
}));

const mockDerms = Array.from({ length: 18 }, (_, i) => ({
  id: 2000 + i,
  firstName: 'Jane',
  lastName: 'Smith',
  middleInitial: 'B',
  email: `jane${i}@mail.com`,
  specialization: i % 2 === 0 ? 'Acne Treatment' : 'Pediatric Derm',
  license: i % 3 === 0 ? 'Yes' : 'No',
  status: i % 2 === 0 ? 'Active' : 'Inactive',
  clinicName: i % 2 === 0 ? 'DermaCare Clinic' : 'SkinHealth Center',
  clinicAddress: i % 2 === 0 ? '123 Main St, Cityville' : '456 Elm Ave, Townsville',
  clinicSchedule: i % 2 === 0 ? 'Mon-Fri 9am-5pm' : 'Tue-Sat 10am-6pm',
  licenseIdImg: 'https://randomuser.me/api/portraits/med/men/44.jpg',
  validIdImg: 'https://randomuser.me/api/portraits/med/men/45.jpg',
}));

const statusBadge = status => status === 'Active'
  ? <Badge bg="success" className="status-badge">Active</Badge>
  : <Badge bg="warning" text="dark" className="status-badge">Inactive</Badge>;

const UserManagement = () => {
  // Modal state
  const [showDetails, setShowDetails] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState('patient');
  const [search, setSearch] = useState('');
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const searchInputRef = useRef(null);
  // Detect if mobile (768px and below)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Focus input when shown
  useEffect(() => {
    if (showMobileSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showMobileSearch]);
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);
  const [sortCol, setSortCol] = useState('id');
  const [sortDir, setSortDir] = useState('asc');

  // Data selection
  const data = activeTab === 'patient' ? mockPatients : mockDerms;
  const columns = activeTab === 'patient'
    ? [
        { key: 'id', label: 'ID' },
        { key: 'firstName', label: 'First Name' },
        { key: 'lastName', label: 'Last Name' },
        { key: 'middleInitial', label: 'Middle Initial' },
        { key: 'email', label: 'Email Address' },
        { key: 'plan', label: 'Plan Type' },
        { key: 'status', label: 'Status' },
        { key: 'action', label: 'Action' },
      ]
    : [
        { key: 'id', label: 'ID' },
        { key: 'firstName', label: 'First Name' },
        { key: 'lastName', label: 'Last Name' },
        { key: 'middleInitial', label: 'Middle Initial' },
        { key: 'email', label: 'Email Address' },
        { key: 'specialization', label: 'Specialization' },
        { key: 'license', label: 'License Verified' },
        { key: 'status', label: 'Status' },
        { key: 'action', label: 'Action' },
      ];

  // Filtering
  const filtered = data.filter(row =>
    Object.values(row).some(val =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (a[sortCol] < b[sortCol]) return sortDir === 'asc' ? -1 : 1;
    if (a[sortCol] > b[sortCol]) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sorted.length / entries);
  const paginated = sorted.slice((page - 1) * entries, page * entries);

  const dermKPI = [
    { label: 'Total Dermatologists', value: 123, change: '+36%', up: true },
    { label: 'Approved', value: 100, change: '+10%', up: true },
    { label: 'Pending', value: 23, change: '-2%', up: false },
  ];

  // Handlers
  const handleSort = col => {
    if (sortCol === col) setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortCol(col);
      setSortDir('asc');
    }
  };
  const handleEntries = val => {
    setEntries(val);
    setPage(1);
  };
  const handlePage = val => setPage(val);

return (
    <div className="user-management-main">
      <Container fluid className="user-mgmt-container">
        {/* Header Row: Title, Toggle */}
        <Row className="align-items-start mb-3 flex-wrap user-mgmt-header-row mt-4">
          <Col xs={12} md={4} lg={4} className="mb-2 mb-lg-0 d-flex align-items-start justify-content-lg-start justify-content-start">
            <h2 className="fw-bold mb-0 user-mgmt-title">User Management</h2>
          </Col>
          <Col xs={12} md={5} lg="auto" className="d-flex align-items-start justify-content-lg-start justify-content-start mb-2 mb-lg-0">
            <div className="user-mgmt-tabs">
              <Button
                variant={activeTab === 'patient' ? 'primary' : 'outline-primary'}
                className={`tab-btn ${activeTab === 'patient' ? 'active' : ''} user-mgmt-tab-btn`}
                onClick={() => { setActiveTab('patient'); setPage(1); }}
              >
            
                <span className="d-none d-md-inline">Patient</span>
              </Button>
              <Button
                variant={activeTab === 'derm' ? 'primary' : 'outline-primary'}
                className={`tab-btn ${activeTab === 'derm' ? 'active' : ''} user-mgmt-tab-btn`}
                onClick={() => { setActiveTab('derm'); setPage(1); }}
              >
                <span className="d-none d-md-inline">Dermatologist</span>
              </Button>
            </div>
          </Col>
        </Row>
        {/* Filter Bar */}
        <div className="d-flex flex-wrap align-items-center mb-3 gap-4 user-mgmt-filter-row">
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
          <InputGroup size="sm" className="user-mgmt-search-group" style={{ maxWidth: 250 }}>
            <InputGroup.Text
              className="user-mgmt-search-icon-square"
              style={{ cursor: isMobile ? 'pointer' : 'default' }}
              onClick={() => {
                if (isMobile) setShowMobileSearch(true);
              }}
            >
              <img src="/icons/search.png" alt="Search" className="user-mgmt-search-icon" />
            </InputGroup.Text>
            {!isMobile && (
              <FormControl
                placeholder="Search..."
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
              />
            )}
          </InputGroup>
          {/* Mobile search overlay */}
          {isMobile && showMobileSearch && (
            <div
              className="mobile-search-overlay"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(255,255,255,0.98)',
                zIndex: 3000,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingTop: 60,
              }}
              onClick={() => setShowMobileSearch(false)}
            >
              <form
                style={{ width: '90%', maxWidth: 400, position: 'relative' }}
                onSubmit={e => { e.preventDefault(); setShowMobileSearch(false); }}
                onClick={e => e.stopPropagation()}
              >
                <FormControl
                  ref={searchInputRef}
                  placeholder="Search..."
                  value={search}
                  onChange={e => { setSearch(e.target.value); setPage(1); }}
                  style={{ fontSize: 18, padding: '12px 16px', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                />
                <Button
                  variant="secondary"
                  size="sm"
                  style={{ position: 'absolute', right: 8, top: 8, zIndex: 1 }}
                  onClick={() => setShowMobileSearch(false)}
                >
                  Close
                </Button>
              </form>
            </div>
          )}
        </div>
        <Row>
          {/* Table Section */}
          <Col xs={12} lg={8} className="mb-2">
            <Card className="shadow-lg user-table-card">
              <Card.Body>
                <div className="table-responsive">
                  <Table hover size="lg" className="user-table align-middle">
                    <thead>
                      <tr>
                        {columns.map(col => (
                          col.key !== 'action' ? (
                            <th
                              key={col.key}
                              className="sortable-col"
                              onClick={() => handleSort(col.key)}
                            >
                              {col.label}
                              {sortCol === col.key && (
                                <span className="sort-arrow ms-1">
                                  {sortDir === 'asc' ? '▲' : '▼'}
                                </span>
                              )}
                            </th>
                          ) : (
                            <th key={col.key}>{col.label}</th>
                          )
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {paginated.map((row, idx) => (
                        <tr key={row.id} className={idx % 2 === 0 ? 'table-row-alt' : ''}>
                      {columns.map(col => {
                        if (col.key === 'action') {
                          return (
                            <td key={col.key}>
                              <a
                                href="#"
                                className="view-details-link"
                                onClick={e => {
                                  e.preventDefault();
                                  setSelectedUser(row);
                                  setShowDetails(true);
                                }}
                              >
                                <img src="/icons/search.png" className="search-icon" alt="View"/> View Details
                              </a>
                            </td>
                          );
                        }
                        if (col.key === 'status') {
                          return <td key={col.key}>{statusBadge(row.status)}</td>;
                        }
                        return <td key={col.key}>{row[col.key]}</td>;
                      })}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
                {/* Pagination */}
                <div className="d-flex justify-content-center align-items-center mt-3">
                  <Pagination size="sm">
                    <Pagination.Prev disabled={page === 1} onClick={() => handlePage(page - 1)} />
                    {Array.from({ length: totalPages }, (_, i) => (
                      <Pagination.Item
                        key={i + 1}
                        active={page === i + 1}
                        onClick={() => handlePage(i + 1)}
                      >
                        {i + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next disabled={page === totalPages} onClick={() => handlePage(page + 1)} />
                  </Pagination>
                </div>
              </Card.Body>
            </Card>
          </Col>
          {/* KPI/Analytics Panel: All cards in one column for patient */}
          <Col xs={12} lg={4}>
            <div className="kpi-panel d-flex flex-column align-items-stretch user-kpi-panel-col">
              {activeTab === 'patient' ? (
                <>
                {/* total revenue */}
                  <Card className="kpi-card subscription-card mb-3 mobile-kpi-spacing">
                    <Card.Body className="p-3 position-relative">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <span className="kpi-label">Total Revenue</span>
                        <img src="/icons/today_subscriber.png" alt="Wallet" className="user-mgmt-revenue-icon" />
                      </div>
                      <div className="kpi-value user-mgmt-kpi-value">₱1000</div>
                      <div className="kpi-change text-danger mt-2 d-flex align-items-center user-mgmt-kpi-change">
                        -20% <span className="ms-1 user-mgmt-kpi-subtext">than last month</span>
                      </div>
                    </Card.Body>
                  </Card>
                  {/* Free Subscription Card */}
                  <Card className="kpi-card subscription-card mb-3 mobile-kpi-spacing">
                    <Card.Body>
                      <div className="subscription-header text-primary fw-bold">
                        Free
                      </div>
                      <div className="subscription-value fw-bold text-dark">
                        123 <span className="kpi-subscribtions">Subscriptions</span>
                      </div>
                      <div className="subscription-growth d-flex align-items-center mt-2">
                        <span className="me-1 label">&#128200;</span>
                        <span className="text-success success">+36% than last month</span>
                      </div>
                    </Card.Body>
                  </Card>
                  {/* Monthly Subscription Card */}
                  <Card className="kpi-card subscription-card mb-3 mobile-kpi-spacing">
                    <Card.Body>
                      <div className="subscription-header text-primary fw-bold">
                        Monthly
                      </div>
                      <div className="subscription-value fw-bold text-dark">
                        45 <span className="kpi-subscribtions">Subscriptions</span>
                      </div>
                      <div className="subscription-growth d-flex align-items-center mt-2">
                        <span className="me-1 label">&#128201;</span>
                        <span className="text-danger success">-10% than last month</span>
                      </div>
                    </Card.Body>
                  </Card>
                  {/* Yearly Subscription Card */}
                  <Card className="kpi-card subscription-card mb-3 mobile-kpi-spacing">
                    <Card.Body>
                      <div className="subscription-header text-primary fw-bold">
                        Yearly
                      </div>
                      <div className="subscription-value fw-bold text-dark" >
                        12 <span className="kpi-subscribtions">Subscriptions</span>
                      </div>
                      <div className="subscription-growth d-flex align-items-center mt-2">
                        <span className="me-1 label">&#128200;</span>
                        <span className="text-success success">+5% than last month</span>
                      </div>
                    </Card.Body>
                  </Card>
                </>
              ) : (
                <div className="d-flex flex-column justify-content-start align-items-start w-100">
                  {dermKPI.map((k, i) => (
                    <Card className=" subscription-card mb-3 mobile-kpi-spacing" key={k.label}>
                      <Card.Body>
                        <div className="subscription-header text-primary fw-bold">
                          {k.label}
                        </div>
                        <div className="subscription-value fw-bold text-dark">
                          {k.value}
                        </div>
                        <div className="subscription-growth d-flex align-items-center mt-2">
                          <span className="me-1 label">{k.up ? '▲' : '▼'}</span>
                          <span className={k.up ? 'text-success success' : 'text-danger success'}>{k.change} than last month</span>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </Col>
        </Row>
        {/* Patient & Dermatologist Details Modal */}
        <Modal
          show={showDetails && selectedUser}
          onHide={() => setShowDetails(false)}
          centered
          size="lg"
          dialogClassName={activeTab === 'derm' ? 'derm-info-modal-dialog' : ''}
          backdropClassName="user-details-modal-backdrop"
          contentClassName="user-details-modal-content"
        >
          {activeTab === 'derm' ? (
            <div className="user-details-modal-card user-details-modal-card-with-header">
              <div className="user-details-modal-header user-details-modal-header-bg">
                <span className="user-details-modal-title always-visible">
                  <span role="img" aria-label="search">🔍</span> Dermatologist Information
                </span>
              </div>
              <div className="user-details-modal-body">
                {/* Top Info Section */}
                <div className="user-details-modal-overview">
                  <div><b>User ID:</b> <span>D-{selectedUser?.id}</span></div>
                  <div><b>Status:</b> <span>{selectedUser?.status === 'Active' ? 'Verified' : selectedUser?.status}</span></div>
                  <div><b>License Verified:</b> <span>{selectedUser?.license}</span></div>
                </div>
                {/* Close Button */}
                <button
                  onClick={() => setShowDetails(false)}
                  className="user-details-modal-close"
                  aria-label="Close"
                >
                  <img src="/icons/wrong_icon.png" alt="Close" />
                </button>
                {/* Two-column layout for dermatologist modal */}
                <div className="derm-modal-row">
                  {/* Left column: Personal Info, Profile, Deactivate */}
                  <div className="derm-modal-col derm-modal-col-left">
                    <hr className="user-details-modal-section-hr" />
                    <div className="user-details-modal-section-title">Personal Information</div>
                    <div><b>First Name:</b> <span>{selectedUser?.firstName}</span></div>
                    <div><b>Middle Initial:</b> <span>{selectedUser?.middleInitial}.</span></div>
                    <div><b>Last Name:</b> <span>{selectedUser?.lastName}</span></div>
                    <div><b>Email Address:</b> <span>{selectedUser?.email}</span></div>
                    <div className="user-details-modal-section-title mt-4">Profile Picture</div>
                    <div className="user-details-modal-profile-pic-wrapper">
                      <div className="user-details-modal-profile-pic-bg">
                        <img
                          src="https://randomuser.me/api/portraits/women/44.jpg"
                          alt="Profile"
                          className="user-details-modal-profile-pic"
                        />
                      </div>
                    </div>
                    <div className="user-details-modal-profile-pic-link">
                      <a
                        href="https://randomuser.me/api/portraits/women/44.jpg"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span role="img" aria-label="search">🔍</span> Click to enlarge
                      </a>
                    </div>
                    <div className="user-details-modal-footer">
                      <Button
                        variant="danger"
                        className="user-details-modal-deactivate-btn"
                        onClick={() => alert('Deactivate action (implement logic here)')}
                      >
                        Deactivate Account
                      </Button>
                    </div>
                  </div>
                  {/* Vertical divider */}
                  <div className="derm-modal-divider"></div>
                  {/* Right column: Dermatologist Validation */}
                  <div className="derm-modal-col derm-modal-col-right">
                    <div className="user-details-modal-section-title">Dermatologist Validation</div>
                    <div><b>Clinic Name:</b> <span>{selectedUser?.clinicName || <span className="placeholder">(Not set)</span>}</span></div>
                    <div><b>Clinic Address:</b> <span>{selectedUser?.clinicAddress || <span className="placeholder">(Not set)</span>}</span></div>
                    <div><b>Clinic Schedule:</b> <span>{selectedUser?.clinicSchedule || <span className="placeholder">(Not set)</span>}</span></div>
                    <div className="mt-3">
                      <b>License ID:</b>
                      <div className="derm-info-modal-upload-preview d-flex align-items-center">
                        <a
                          href={selectedUser?.licenseIdImg || '/icons/id_placeholder.png'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="derm-info-modal-enlarge-link mt-4"
                        >
                          <span role="img" aria-label="search">🔍</span> Click to enlarge
                        </a>
                      </div>
                    </div>
                    <div className="mt-3">
                      <b>Valid ID:</b>
                      <div className="derm-info-modal-upload-preview d-flex align-items-center">
                        <a
                          href={selectedUser?.validIdImg || '/icons/id_placeholder.png'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="derm-info-modal-enlarge-link mt-4"
                        >
                          <span role="img" aria-label="search">🔍</span> Click to enlarge
                        </a>
                      </div>
                    </div>
                    <div className="derm-info-modal-action-btns mt-5">
                      <Button variant="success" className="btn-ReApp">Approve</Button>
                      <Button variant="danger" className="btn-ReApp">Reject</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="user-details-modal-card user-details-modal-card-with-header">
              <div className="user-details-modal-header user-details-modal-header-bg">
                <span className="user-details-modal-title always-visible">
                  <span role="img" aria-label="search">🔍</span> Patient Information
                </span>
              </div>
              <div className="user-details-modal-body">
                {/* Top Info Section */}
                <div className="user-details-modal-overview">
                  <div><b>User ID:</b> <span>U-{selectedUser?.id}</span></div>
                  <div><b>Status:</b> <span>{selectedUser?.status}</span></div>
                  <div><b>Plan Type:</b> <span>{selectedUser?.plan}</span></div>
                </div>
                {/* Close Button */}
                <button
                  onClick={() => setShowDetails(false)}
                  className="user-details-modal-close"
                  aria-label="Close"
                >
                  <img src="/icons/wrong_icon.png" alt="Close" />
                </button>
                {/* Personal Information Section */}
                <div className="user-details-modal-section">
                  <div className="user-details-modal-section-title">Personal Information</div>
                  <hr className="user-details-modal-section-hr" />
                  <div><b>First Name:</b> <span>{selectedUser?.firstName}</span></div>
                  <div><b>Middle Initial:</b> <span>{selectedUser?.middleInitial}.</span></div>
                  <div><b>Last Name:</b> <span>{selectedUser?.lastName}</span></div>
                  <div><b>Email Address:</b> <span>{selectedUser?.email}</span></div>
                </div>
                {/* Profile Picture Section */}
                <div className="user-details-modal-profile-pic-section">
                  <div className="user-details-modal-section-title">Profile Picture</div>
                  <div className="user-details-modal-profile-pic-wrapper">
                    <div className="user-details-modal-profile-pic-bg">
                      <img
                        src="https://randomuser.me/api/portraits/women/44.jpg"
                        alt="Profile"
                        className="user-details-modal-profile-pic"
                      />
                    </div>
                  </div>
                  <div className="user-details-modal-profile-pic-link">
                    <a
                      href="https://randomuser.me/api/portraits/women/44.jpg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span role="img" aria-label="search">🔍</span> Click to enlarge
                    </a>
                  </div>
                  <div className="user-details-modal-footer">
                    <Button
                      variant="danger"
                      className="user-details-modal-deactivate-btn"
                      onClick={() => alert('Deactivate action (implement logic here)')}
                    >
                      Deactivate Account
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </Container>
    </div>
  );
};

export default UserManagement;
