import React, { useState } from 'react';
import AdminLayout from '../AdminPanel/AdminLayout';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Device.scss';

const Device = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [newDeviceData, setNewDeviceData] = useState({
    device_srno: '',
    model_name: '',
    sku_id: '',
    price: '',
    remarks: '',
    order_id: '',
    in_out: 1
  });
  const [creatingDevice, setCreatingDevice] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searching, setSearching] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      toast.error('Please enter a search term');
      return;
    }

    setSearching(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_SERVER_API}/search-device`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ search_term: searchTerm.trim() })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Search failed');
      }

      setSearchResults(data.data);
      // Get transactions from the nested data.data.transactions
      setTransactions(data.data?.transactions || []);

      if (!data.data) {
        toast.info('No device found with this SR number');
      }
    } catch (error) {
      console.error('Search Error:', error);
      toast.error(error.message || 'Failed to search device');
      setSearchResults(null);
      setTransactions([]);
    } finally {
      setSearching(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'IN_STOCK':
        return 'status-in-stock';
      case 'SOLD':
        return 'status-sold';
      case 'RETURN':
        return 'status-return';
      case 'SOLD_WITHOUT_IN':
        return 'status-sold-without-in';
      default:
        return 'status-unknown';
    }
  };

  const getTransactionTypeLabel = (type) => {
    switch (type) {
      case 1: return 'IN';
      case 2: return 'OUT';
      case 3: return 'RETURN';
      default: return 'UNKNOWN';
    }
  };

  const getTransactionTypeClass = (type) => {
    switch (type) {
      case 1: return 'transaction-in';
      case 2: return 'transaction-out';
      case 3: return 'transaction-return';
      default: return 'transaction-unknown';
    }
  };

  // ... (keep all other existing functions like handleFileChange, handleUpload, createNewDevice)
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadStatus('');
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus('Please select a file first.');
      toast.error('Please select a file first.');
      return;
    }

    setUploading(true);
    setUploadStatus('Uploading...');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_SERVER_API}/upload-device-transaction`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `Upload failed with status ${response.status}`);
      }

      const successMessage = data.message || `Upload successful! Processed ${data.success_count || 0} rows`;
      setUploadStatus(successMessage);
      setFile(null);
      setShowUploadModal(false);
      toast.success(successMessage);

      if (data.failed_count > 0) {
        toast.warning(`${data.failed_count} rows failed. Check console for details.`);
      }

    } catch (error) {
      console.error('Upload Error:', error);
      setUploadStatus(error.message || 'Upload failed.');
      toast.error(error.message || 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const createNewDevice = async () => {
    if (!newDeviceData.device_srno || !newDeviceData.model_name) {
      toast.error('Device SR No and Model Name are required');
      return;
    }

    setCreatingDevice(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_API}/add-device`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...newDeviceData,
          in_out: parseInt(newDeviceData.in_out) || 1
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `Server responded with status ${response.status}`);
      }

      toast.success('Device created successfully');
      setShowCreateModal(false);
      setNewDeviceData({
        device_srno: '',
        model_name: '',
        sku_id: '',
        price: '',
        remarks: '',
        order_id: '',
        in_out: 1
      });
    } catch (error) {
      console.error('Create Error:', error);
      toast.error(error.message || 'Failed to create device');
    } finally {
      setCreatingDevice(false);
    }
  };

  return (
    <AdminLayout>
      <div className="device-management-container">
        <h1>SR Number Management</h1>

        <div className="search-container">
          <div className="search-input-group">
            <input
              type="text"
              placeholder="Search by SR Number or SKU ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={handleSearch} disabled={searching}>
              {searching ? 'Searching...' : 'Search'}
            </button>
          </div>

          <div className="action-buttons">
            <button onClick={() => setShowCreateModal(true)}>
              Create New Device
            </button>
            <button onClick={() => setShowUploadModal(true)}>
              Import Devices (CSV)
            </button>
          </div>
        </div>

        {searchResults && (
          <div className="device-details-container">
            {/* Common Device Info Section */}
            <div className="device-summary">
              <h3>Device Summary</h3>
              <div className="summary-grid">
                <div className="summary-item">
                  <span className="label">SR Number:</span>
                  <span className="value">{searchResults.device_srno || 'N/A'}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Model Name:</span>
                  <span className="value">{searchResults.model_name || 'N/A'}</span>
                </div>
                <div className="summary-item">
                  <span className="label">SKU ID:</span>
                  <span className="value">{searchResults.sku_id || 'N/A'}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Status:</span>
                  <span className={`value status-badge ${getStatusBadgeClass(searchResults.status)}`}>
                    {searchResults.status || 'N/A'}
                  </span>
                </div>
                {searchResults.in_price && (
                  <div className="summary-item">
                    <span className="label">Purchase Price:</span>
                    <span className="value">₹{searchResults.in_price}</span>
                  </div>
                )}
                {searchResults.out_price && (
                  <div className="summary-item">
                    <span className="label">Selling Price:</span>
                    <span className="value">₹{searchResults.out_price}</span>
                  </div>
                )}
                {searchResults.profit && (
                  <div className="summary-item">
                    <span className="label">Profit:</span>
                    <span className="value">₹{searchResults.profit}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Transaction History Section */}
            <div className="transaction-history">
              <h3>Transaction History</h3>
              {transactions.length > 0 ? (
                <div className="transactions-table">
                  <div className="table-header">
                    <div className="header-cell">Type</div>
                    <div className="header-cell">Order ID</div>
                    <div className="header-cell">Date</div>
                    <div className="header-cell">Price</div>
                    <div className="header-cell">Remarks</div>
                  </div>
                  {transactions.map((txn, index) => (
                    <div key={index} className={`table-row ${getTransactionTypeClass(txn.in_out)}`}>
                      <div className="table-cell">
                        <span className="txn-type-badge">{getTransactionTypeLabel(txn.in_out)}</span>
                      </div>
                      <div className="table-cell">{txn.order_id || 'N/A'}</div>
                      <div className="table-cell">{formatDate(txn.create_date)}</div>
                      <div className="table-cell">₹{txn.price || 'N/A'}</div>
                      <div className="table-cell">{txn.remarks || 'N/A'}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-transactions">No transactions found for this device</p>
              )}
            </div>
          </div>
        )}

        {/* Create Device Modal */}
        {showCreateModal && (
          <div className="device-modal">
            <div className="device-modal-content">
              <div className="device-modal-header">
                <h3>Create New Device</h3>
                <button onClick={() => setShowCreateModal(false)}>×</button>
              </div>

              <div className="device-modal-body">
                <div className="form-group">
                  <label className="required">Device SR No</label>
                  <input
                    type="text"
                    value={newDeviceData.device_srno}
                    onChange={(e) => setNewDeviceData({ ...newDeviceData, device_srno: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="required">Model Name</label>
                  <input
                    type="text"
                    value={newDeviceData.model_name}
                    onChange={(e) => setNewDeviceData({ ...newDeviceData, model_name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>SKU ID</label>
                  <input
                    type="text"
                    value={newDeviceData.sku_id}
                    onChange={(e) => setNewDeviceData({ ...newDeviceData, sku_id: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Order ID</label>
                  <input
                    type="text"
                    value={newDeviceData.order_id}
                    onChange={(e) => setNewDeviceData({ ...newDeviceData, order_id: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Transaction Type</label>
                  <select
                    value={newDeviceData.in_out}
                    onChange={(e) => setNewDeviceData({ ...newDeviceData, in_out: e.target.value })}
                  >
                    <option value="1">IN</option>
                    <option value="2">OUT</option>
                    <option value="3">RETURN</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Price (₹)</label>
                  <input
                    type="number"
                    value={newDeviceData.price}
                    onChange={(e) => setNewDeviceData({ ...newDeviceData, price: e.target.value })}
                    step="0.01"
                  />
                </div>

                <div className="form-group">
                  <label>Remarks</label>
                  <textarea
                    value={newDeviceData.remarks}
                    onChange={(e) => setNewDeviceData({ ...newDeviceData, remarks: e.target.value })}
                    rows="3"
                  />
                </div>
              </div>

              <div className="device-modal-footer">
                <button
                  className="cancel-button"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="submit-button"
                  onClick={createNewDevice}
                  disabled={creatingDevice}
                >
                  {creatingDevice ? 'Creating...' : 'Create Device'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Upload CSV Modal */}
        {showUploadModal && (
          <div className="device-modal">
            <div className="device-modal-content">
              <div className="device-modal-header">
                <h3>Upload Device Transactions</h3>
                <button onClick={() => {
                  setShowUploadModal(false);
                  setUploadStatus('');
                  setFile(null);
                }}>×</button>
              </div>

              <div className="device-modal-body">
                <div className="upload-instructions">
                  <h4>CSV File Requirements</h4>
                  <div className="requirements-grid">
                    <div className="requirement-item">
                      <span className="requirement-label">Mandatory Fields:</span>
                      <span className="requirement-value">device_srno, model_name, in_out</span>
                    </div>
                    <div className="requirement-item">
                      <span className="requirement-label">Optional Fields:</span>
                      <span className="requirement-value">sku_id, order_id, price, remarks</span>
                    </div>
                  </div>

                  <div className="csv-format">
                    <h5>CSV Format:</h5>
                    <div className="format-table">
                      <div className="format-header">
                        <span>Column 1</span>
                        <span>Column 2</span>
                        <span>Column 3</span>
                        <span>Column 4</span>
                        <span>Column 5</span>
                        <span>Column 6</span>
                        <span>Column 7</span>
                      </div>
                      <div className="format-values">
                        <span>device_srno</span>
                        <span>model_name</span>
                        <span>sku_id</span>
                        <span>order_id</span>
                        <span>in_out</span>
                        <span>price</span>
                        <span>remarks</span>
                      </div>
                    </div>
                  </div>

                  <div className="note">
                    <p><strong>Note:</strong> Column names in your CSV can be anything, but the data must be in this exact order.</p>
                  </div>
                </div>

                <div className="form-group">
                  <label>Select File (CSV or Excel)</label>
                  <input
                    type="file"
                    accept=".csv, .xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    onChange={handleFileChange}
                  />
                </div>
                {uploadStatus && (
                  <p className={`upload-status ${uploadStatus.includes('success') ? 'success' : 'error'}`}>
                    {uploadStatus}
                  </p>
                )}
              </div>

              <div className="device-modal-footer">
                <button
                  className="cancel-button"
                  onClick={() => {
                    setShowUploadModal(false);
                    setUploadStatus('');
                    setFile(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="submit-button"
                  onClick={handleUpload}
                  disabled={!file || uploading}
                >
                  {uploading ? 'Uploading...' : 'Upload'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>


      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </AdminLayout>
  );
};

export default Device;