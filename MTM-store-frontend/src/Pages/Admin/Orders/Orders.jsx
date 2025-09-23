import React, { useState, useEffect } from 'react';
import AdminLayout from '../AdminPanel/AdminLayout';
import './Orders.scss';
import { useNavigate } from 'react-router-dom';
import Loader from "../../../Components/Loader/Loader";
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import AddressModal from '../../User/Address/AddressModal';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [filters, setFilters] = useState({
    orderId: '',
    deliveryStatus: '',
    fulfillment: '',
    channel: '',
    paymentStatus: '',
    name: '',        // New filter for customer name
    mobile: '',      // New filter for mobile number
    invoiceStatus: '' // New filter for invoice status
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState({
    orderId: '',
    deliveryStatus: '',
    fulfillment: '',
    channel: '',
    paymentStatus: '',
    name: '',        // New filter for customer name
    mobile: '',      // New filter for mobile number
    invoiceStatus: '' // New filter for invoice status
  });
  const [isAWBModalOpen, setIsAWBModalOpen] = useState(false);
  const [awbNumber, setAwbNumber] = useState('');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [currentOrderForAddressChange, setCurrentOrderForAddressChange] = useState(null);
  const [states, setStates] = useState([]);
  const navigate = useNavigate();
  //NEW
  const [isEditMode, setIsEditMode] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedNewProducts, setSelectedNewProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [orders, filters]);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const body = document.body;

    if (isMobile && (isModalOpen || isInvoiceModalOpen || isFilterModalOpen || isAWBModalOpen || isAddressModalOpen || isProductModalOpen)) {
      body.classList.add('modal-open');
    } else {
      body.classList.remove('modal-open');
    }

    return () => {
      body.classList.remove('modal-open');
    };
  }, [isModalOpen, isInvoiceModalOpen, isFilterModalOpen, isAWBModalOpen, isAddressModalOpen, isProductModalOpen]);


  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_API}/states`);
        const data = await response.json();
        setStates(data.states || []);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };

    fetchStates();
  }, []);




  const fetchOrders = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_API}/orders`);
      const data = await response.json();
      setOrders(data);
      setFilteredOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTempFilterChange = (e) => {
    const { name, value } = e.target;
    setTempFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = () => {
    let result = [...orders];

    if (filters.orderId) {
      result = result.filter(order =>
        order.order_id.toLowerCase().includes(filters.orderId.toLowerCase())
      );
    }

    if (filters.deliveryStatus) {
      result = result.filter(order =>
        order.delivery_status.toLowerCase() === filters.deliveryStatus.toLowerCase()
      );
    }

    if (filters.fulfillment) {
      if (filters.fulfillment === 'fulfilled') {
        result = result.filter(order => order.fulfillment_status === 1 || order.fulfillment_status === true);
      } else if (filters.fulfillment === 'pending') {
        result = result.filter(order => order.fulfillment_status === 0 || order.fulfillment_status === false);
      }
    }

    if (filters.channel) {
      result = result.filter(order =>
        order.channel === filters.channel
      );
    }

    if (filters.paymentStatus) {
      result = result.filter(order =>
        order.payment_status.toLowerCase() === filters.paymentStatus.toLowerCase()
      );
    }

    // New filter for customer name
    if (filters.name) {
      result = result.filter(order => {
        const customerName = getCustomerName(order).toLowerCase();
        return customerName.includes(filters.name.toLowerCase());
      });
    }

    // New filter for mobile number
    if (filters.mobile) {
      result = result.filter(order =>
        order.address?.mobile?.includes(filters.mobile)
      );
    }

    // New filter for invoice status
    if (filters.invoiceStatus) {
      if (filters.invoiceStatus === 'pending') {
        result = result.filter(order => !order.invoice_number);
      } else if (filters.invoiceStatus === 'added') {
        result = result.filter(order => order.invoice_number);
      }
    }

    setFilteredOrders(result);
  };

  const applyTempFilters = () => {
    setFilters(tempFilters);
    setIsFilterModalOpen(false);
  };

  const clearFilters = () => {
    setFilters({
      orderId: '',
      deliveryStatus: '',
      fulfillment: '',
      channel: '',
      paymentStatus: ''
    });
    setTempFilters({
      orderId: '',
      deliveryStatus: '',
      fulfillment: '',
      channel: '',
      paymentStatus: ''
    });
  };

  const handleChangeAddressClick = (order) => {
    setCurrentOrderForAddressChange(order);
    setIsAddressModalOpen(true);
  };

  const handleAddressSave = async (formData) => {
    if (!currentOrderForAddressChange) return;

    try {
      setIsProcessing(true);
      const token = localStorage.getItem('token');

      // Encode the order ID for the URL
      const encodedOrderId = encodeURIComponent(currentOrderForAddressChange.order_id);

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API}/orders/${encodedOrderId}/change-address`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      toast.success('Address updated successfully!');

      // Update the local state with the new address
      setOrders(prevOrders => {
        return prevOrders.map(order => {
          if (order.order_id === currentOrderForAddressChange.order_id) {
            // Update the address in the order
            return {
              ...order,
              address: response.data.address // Assuming your API returns the updated address
            };
          }
          return order;
        });
      });

      // Also update filteredOrders to keep them in sync
      setFilteredOrders(prevOrders => {
        return prevOrders.map(order => {
          if (order.order_id === currentOrderForAddressChange.order_id) {
            return {
              ...order,
              address: response.data.address
            };
          }
          return order;
        });
      });

      // If the updated order is the currently selected one, update that too
      if (selectedOrder?.order_id === currentOrderForAddressChange.order_id) {
        setSelectedOrder(prev => ({
          ...prev,
          address: response.data.address
        }));
      }

      setIsAddressModalOpen(false);
      setCurrentOrderForAddressChange(null);
    } catch (error) {
      console.error('Error updating address:', error);
      toast.error(error.response?.data?.message || 'Failed to update address');
    } finally {
      setIsProcessing(false);
    }
  };


  const formatIST = (utcDate) => {
    const date = new Date(utcDate);
    return date.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCustomerName = (order) => {
    if (order.customer_id) {
      return order.address?.name || 'Online Customer';
    }
    return order.address?.name || 'Walk-in Customer';
  };

  const handleOrderIdClick = (order) => {
    if (order.order_status === 'PENDING' || order.order_status === 'REJECTED') {
      setSelectedOrder(order);
      setIsModalOpen(true);
      toast.info('Please accept the order first');
    } else {
      navigate(`/orders/${encodeURIComponent(order.order_id)}`);
    }
  };

  const handleStatusClick = (order) => {
    const orderClone = {
      ...order,
      items: order.items.map((item, index) => ({
        ...item,
        // Ensure we have a valid item_id
        item_id: item.item_id
          ? (item.item_id.toString().startsWith('new-')
            ? item.item_id
            : `${item.item_id}-${index}`)
          : `new-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 5)}`
      }))
    };
    setSelectedOrder(orderClone);
    setIsModalOpen(true);
  };

  const handleInvoiceClick = (order) => {
    setCurrentOrderId(order.order_id);
    setInvoiceNumber(order.invoice_number || '');
    setIsInvoiceModalOpen(true);
  };

  const handleInvoiceSave = async () => {
    if (!invoiceNumber.trim()) {
      toast.error('Please enter a valid invoice number');
      return;
    }

    try {
      setIsProcessing(true);
      const token = localStorage.getItem('token');

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API}/update-invoice`,
        {
          order_id: currentOrderId,
          invoice_number: invoiceNumber
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      toast.success('Invoice number updated successfully!');
      fetchOrders();
      setIsInvoiceModalOpen(false);
    } catch (error) {
      console.error('Error updating invoice:', error);
      toast.error(error.response?.data?.error || 'Failed to update invoice number');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAWBClick = (order) => {
    // Check if order is fulfilled and either Delhivery is not available OR Delhivery is available
    const isFulfilled = order.fulfillment_status === 1 || order.fulfillment_status === true;
    const isDelhiveryAvailable = String(order.address?.is_available).toLowerCase() === 'true';

    if (isFulfilled) {
      setCurrentOrderId(order.order_id);
      setAwbNumber(order.awb_number || '');
      setIsAWBModalOpen(true);
    } else {
      toast.info('Order must be fulfilled to update AWB number');
    }
  };

  const handleAWBSave = async () => {
    if (!awbNumber.trim()) {
      toast.error('Please enter a valid AWB number');
      return;
    }

    try {
      setIsProcessing(true);
      const token = localStorage.getItem('token');

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API}/update-awb`,
        {
          order_id: currentOrderId,
          awb_number: awbNumber
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      toast.success('AWB number updated successfully!');
      fetchOrders();
      setIsAWBModalOpen(false);
    } catch (error) {
      console.error('Error updating AWB:', error);
      toast.error(error.response?.data?.error || 'Failed to update AWB number');
    } finally {
      setIsProcessing(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const changeOrderStatus = async (newStatus) => {
    if (!selectedOrder) return;

    try {
      setIsProcessing(true);
      const token = localStorage.getItem('token');

      const orderId = encodeURIComponent(selectedOrder.order_id);

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API}/change-order-status/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );
      toast.success(`Order status changed to ${newStatus} successfully!`);
      fetchOrders();
      closeModal();
    } catch (error) {
      console.error('Error changing order status:', error);
      toast.error(error.response?.data?.error || `Failed to change status to ${newStatus}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const renderModalContent = () => {
    if (!selectedOrder) return null;

    // Function to calculate delivery charges
    const calculateDeliveryCharge = (subtotal) => {
      if (subtotal <= 999) return 0;
      if (subtotal <= 5000) return 90;
      if (subtotal <= 10000) return 180;
      if (subtotal <= 20000) return 240;
      if (subtotal <= 30000) return 560;
      return 850;
    };

    // Function to update item quantity
    // Function to update item quantity
    const updateQuantity = (itemId, newQuantity) => {
      if (newQuantity < 1) return;

      setSelectedOrder(prev => {
        if (!prev || !prev.items) return prev;

        // Create a deep copy of the order and its items
        const updatedOrder = JSON.parse(JSON.stringify(prev));

        // Find and update only the specific item
        updatedOrder.items = updatedOrder.items.map(item => {
          if (item.item_id === itemId) {
            return {
              ...item,
              quantity: newQuantity,
              total_price: item.unit_price * newQuantity
            };
          }
          return item; // Return unchanged items
        });

        // Recalculate totals based on all items
        const newSubtotal = updatedOrder.items.reduce((sum, item) => sum + item.total_price, 0);
        const discountAmount = (newSubtotal * (updatedOrder.discount_percent || 0)) / 100;
        const amountAfterDiscount = newSubtotal - discountAmount;
        const subtotalWithoutGst = amountAfterDiscount / 1.18;
        const gst = amountAfterDiscount - subtotalWithoutGst;
        const deliveryCharge = updatedOrder.is_free_delivery ? 0 : calculateDeliveryCharge(amountAfterDiscount);
        const totalAmount = amountAfterDiscount + deliveryCharge;

        return {
          ...updatedOrder,
          subtotal: subtotalWithoutGst,
          gst: gst,
          delivery_charge: deliveryCharge,
          total_amount: totalAmount,
          total_items: updatedOrder.items.reduce((sum, item) => sum + item.quantity, 0)
        };
      });
    };

    // Function to remove an item from the order
    // Function to remove an item from the order
    const removeItem = (itemId) => {
      setSelectedOrder(prev => {
        console.log('Removing item:', itemId, 'from:', prev.items);

        // Simplified removal logic - just filter by item_id
        const updatedItems = prev.items.filter(item => item.item_id !== itemId);

        console.log('Filtered items:', updatedItems);

        // Recalculate order totals
        const newSubtotal = updatedItems.reduce((sum, item) => sum + item.total_price, 0);
        const discountAmount = (newSubtotal * (prev.discount_percent || 0)) / 100;
        const amountAfterDiscount = newSubtotal - discountAmount;
        const subtotalWithoutGst = amountAfterDiscount / 1.18;
        const gst = amountAfterDiscount - subtotalWithoutGst;
        const deliveryCharge = prev.is_free_delivery ? 0 : calculateDeliveryCharge(amountAfterDiscount);
        const totalAmount = amountAfterDiscount + deliveryCharge;

        return {
          ...prev,
          items: updatedItems,
          subtotal: subtotalWithoutGst,
          gst: gst,
          delivery_charge: deliveryCharge,
          total_amount: totalAmount,
          total_items: updatedItems.reduce((sum, item) => sum + item.quantity, 0)
        };
      });
    };

    // Calculate current order totals for display
    const currentSubtotal = selectedOrder.items.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0);
    const currentDiscountAmount = (currentSubtotal * (selectedOrder.discount_percent || 0)) / 100;
    const currentAmountAfterDiscount = currentSubtotal - currentDiscountAmount;
    const currentSubtotalWithoutGst = currentAmountAfterDiscount / 1.18;
    const currentGst = currentAmountAfterDiscount - currentSubtotalWithoutGst;
    const currentDeliveryCharge = selectedOrder.is_free_delivery ? 0 : calculateDeliveryCharge(currentAmountAfterDiscount);
    const currentTotalAmount = currentAmountAfterDiscount + currentDeliveryCharge;

    return (
      <div className="order-details-modal">
        <div className="modal-header">
          <h3>Order Details - {selectedOrder.order_id}</h3>
          <button onClick={closeModal} className="close-modal">
            &times;
          </button>
        </div>

        <div className="modal-body">
          <div className="customer-section">
            <h4>Customer Details</h4>
            <p><strong>Name:</strong> {getCustomerName(selectedOrder)}</p>
            <p><strong>Order Date:</strong> {formatIST(selectedOrder.created_at)}</p>

            <div className="detail-row">
              <strong>Email:</strong>
              <span className={selectedOrder.address?.email ? 'available' : 'not-available'}>
                {selectedOrder.address?.email || 'Not provided'}
              </span>
            </div>

            <div className="detail-row">
              <strong>GST Number:</strong>
              <span className={selectedOrder.address?.gst ? 'available' : 'not-available'}>
                {selectedOrder.address?.gst || 'Not provided'}
              </span>
            </div>

            <p><strong>Delivery Address:</strong></p>
            <div className="address-box">
              <p>{selectedOrder.address?.address_line || 'N/A'}</p>
              <p>{selectedOrder.address?.locality || ''}, {selectedOrder.address?.city || ''}</p>
              <p>{selectedOrder.address?.state?.name || ''} - {selectedOrder.address?.pincode || ''}</p>
              <p><strong>Phone:</strong> {selectedOrder.address?.mobile || 'N/A'}</p>
            </div>
          </div>

          <div className="items-section">
            <h4>Order Items ({selectedOrder.items.reduce((sum, item) => sum + item.quantity, 0)})</h4>

            {isEditMode && (
              <div className="edit-mode-notice">
                <p>You are in edit mode. Update quantities or add new products as needed.</p>
                <button
                  className="add-products-btn"
                  onClick={() => setIsProductModalOpen(true)}
                >
                  + Add Products
                </button>
              </div>
            )}

            <div className="items-grid">
              {selectedOrder.items?.map((item, index) => (
                <div key={`${item.item_id}-${index}`} className="item-card">
                  <div className="item-image">
                    {item?.image_url ? (
                      <img
                        src={`${import.meta.env.VITE_SERVER_API}/${item.image_url.replace(/^\/+/, '')}`}
                        alt="Product"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.parentElement.innerHTML = '<div class="no-image">No Image</div>';
                        }}
                      />
                    ) : (
                      <div className="no-image">No Image</div>
                    )}
                  </div>
                  <div className="item-details">
                    <p><strong>Id:</strong> {item?.product_id || 'N/A'}</p>
                    <p><strong>Name:</strong> {item?.product_name || 'N/A'}</p>
                    {item?.model_id && <p><strong>Model:</strong> {item.model_id}</p>}

                    {isEditMode ? (
                      <div className="quantity-edit-container">
                        <div className="quantity-edit">
                          <strong>Qty:</strong>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateQuantity(item.item_id, item.quantity - 1);
                            }}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => {
                              const newQty = parseInt(e.target.value) || 1;
                              updateQuantity(item.item_id, newQty);
                            }}
                            onClick={(e) => e.stopPropagation()}
                            min="1"
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateQuantity(item.item_id, item.quantity + 1);
                            }}
                            disabled={item.quantity >= (item.stock || 999)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="remove-item-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeItem(item.item_id);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <p><strong>Qty:</strong> {item?.quantity || 0}</p>
                    )}

                    <p><strong>Price:</strong> ₹{item?.unit_price?.toFixed(2) || '0.00'}</p>
                    <p><strong>Total:</strong> ₹{(item?.unit_price * item?.quantity).toFixed(2) || '0.00'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="summary-section">
            <h4>Order Summary</h4>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{currentSubtotalWithoutGst.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Discount ({selectedOrder.discount_percent || 0}%):</span>
              <span>-₹{currentDiscountAmount.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>GST (18%):</span>
              <span>₹{currentGst.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery:</span>
              <span>₹{currentDeliveryCharge.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>₹{currentTotalAmount.toFixed(2)}</span>
            </div>
          </div>

          <div className="action-buttons">
            {isEditMode ? (
              <>
                <button
                  className="save-changes-btn"
                  onClick={handleSaveChanges}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  className="cancel-edit-btn"
                  onClick={() => {
                    setIsEditMode(false);
                    fetchOrders(); // Refresh to get original data
                  }}
                  disabled={isProcessing}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                {selectedOrder.order_status === 'PENDING' && (
                  <>
                    <button
                      className="approve-btn"
                      onClick={() => changeOrderStatus('APPROVED')}
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : 'Approve Order'}
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => changeOrderStatus('REJECTED')}
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : 'Reject Order'}
                    </button>
                    <button
                      className="edit-order-btn"
                      onClick={() => setIsEditMode(true)}
                      disabled={isProcessing}
                    >
                      Edit Order
                    </button>
                    <button
                      className="change-address-btn"
                      onClick={() => handleChangeAddressClick(selectedOrder)}
                      disabled={isProcessing}
                    >
                      Change Address
                    </button>
                  </>
                )}
                {selectedOrder.order_status === 'APPROVED' && (
                  <>
                    <button
                      className="reject-btn"
                      onClick={() => changeOrderStatus('REJECTED')}
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : 'Reject Order'}
                    </button>
                    <button
                      className="edit-order-btn"
                      onClick={() => setIsEditMode(true)}
                      disabled={isProcessing}
                    >
                      Edit Order
                    </button>
                    <button
                      className="change-address-btn"
                      onClick={() => handleChangeAddressClick(selectedOrder)}
                      disabled={isProcessing}
                    >
                      Change Address
                    </button>
                  </>
                )}
                {selectedOrder.order_status === 'REJECTED' && (
                  <>
                    <button
                      className="approve-btn"
                      onClick={() => changeOrderStatus('APPROVED')}
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : 'Approve Order'}
                    </button>
                    <button
                      className="edit-order-btn"
                      onClick={() => setIsEditMode(true)}
                      disabled={isProcessing}
                    >
                      Edit Order
                    </button>
                    <button
                      className="change-address-btn"
                      onClick={() => handleChangeAddressClick(selectedOrder)}
                      disabled={isProcessing}
                    >
                      Change Address
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  const handleEditOrderClick = (order) => {
    setSelectedOrder(order);
    setIsEditMode(true);
    setIsModalOpen(true);
  };


  // Add this useEffect for fetching products
  // In your useEffect for fetching products:
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_API}/products`);
        const data = await response.json();

        const transformedProducts = data.flatMap(product => {
          // For variable products (with models)
          if (product.models && product.models.length > 0) {
            return product.models.flatMap(model => {
              // For each model, include all color variants
              if (model.colors && model.colors.length > 0) {
                return model.colors.map(color => ({
                  product_id: product.product_id,
                  model_id: model.model_id,
                  color_id: color.color_id,
                  name: `${product.name} - ${model.name}${color.name ? ` - ${color.name}` : ''}`,
                  price: color.price || 0,
                  original_price: color.original_price || null,
                  stock: color.stock_quantity || 0,
                  image_url: color.images?.[0]?.image_url ||
                    model.images?.[0]?.image_url ||
                    product.images?.[0]?.image_url,
                  isVariable: true
                }));
              }
              // For models without colors
              return {
                product_id: product.product_id,
                model_id: model.model_id,
                name: `${product.name} - ${model.name}`,
                price: model.price || 0,
                original_price: model.original_price || null,
                stock: model.stock_quantity || 0,
                image_url: model.images?.[0]?.image_url ||
                  product.images?.[0]?.image_url,
                isVariable: true
              };
            });
          }

          // For single products with colors
          if (product.colors && product.colors.length > 0) {
            return product.colors.map(color => ({
              product_id: product.product_id,
              name: `${product.name}${color.name ? ` - ${color.name}` : ''}`,
              price: color.price || 0,
              original_price: color.original_price || null,
              stock: color.stock_quantity || 0,
              image_url: color.images?.[0]?.image_url ||
                product.images?.[0]?.image_url,
              isVariable: false
            }));
          }

          // For simple single products
          return {
            product_id: product.product_id,
            name: product.name,
            price: product.price || 0,
            original_price: product.original_price || null,
            stock: product.stock_quantity || 0,
            image_url: product.images?.[0]?.image_url,
            isVariable: false
          };
        });

        setProducts(transformedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products');
      }
    };

    if (isProductModalOpen) {
      fetchProducts();
    }
  }, [isProductModalOpen]);

  // Add this function for adding new products
  const handleAddProducts = (newProducts) => {
    setSelectedOrder(prev => ({
      ...prev,
      items: [...prev.items, ...newProducts.map(product => ({
        ...product,
        item_id: `new-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        quantity: 1,
        unit_price: product.price,
        total_price: product.price,
        original_price: product.price,
        finalPrice: product.price,
        extraDiscountPercentage: 0
      }))]
    }));
    setIsProductModalOpen(false);
  };


  // Update the handleSaveChanges function
  const handleSaveChanges = async () => {
    try {
      setIsProcessing(true);
      const token = localStorage.getItem('token');
      const encodedOrderId = encodeURIComponent(selectedOrder.order_id);

      // Prepare items data with proper structure
      const itemsData = selectedOrder.items.map(item => {
        // For existing items, include item_id and other fields
        if (item.item_id && !item.item_id.toString().startsWith('new-')) {
          return {
            item_id: item.item_id,
            product_id: item.product_id,
            quantity: item.quantity,
            unit_price: item.unit_price,
            ...(item.model_id && { model_id: item.model_id }),
            ...(item.color_id && { color_id: item.color_id })
          };
        }
        // For new items (added in this edit session)
        return {
          product_id: item.product_id,
          quantity: item.quantity,
          unit_price: item.unit_price,
          ...(item.model_id && { model_id: item.model_id }),
          ...(item.color_id && { color_id: item.color_id })
        };
      });

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API}/update-order/${encodedOrderId}`,
        { items: itemsData },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      toast.success('Order updated successfully!');
      fetchOrders(); // Refresh the orders list
      setIsModalOpen(false);
      setIsEditMode(false);
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error(error.response?.data?.error || 'Failed to update order');
    } finally {
      setIsProcessing(false);
    }
  };

  // Add this component to render the product selection modal
  const renderProductSelectionModal = () => (
    <div className="modal-overlay" onClick={() => setIsProductModalOpen(false)}>
      <div className="order-product-selection-modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal header */}
        <div className="order-product-modal-header">
          <h3>Add Products to Order</h3>
          <button onClick={() => {
            setIsProductModalOpen(false);
            setSelectedNewProducts([]);
          }} className="close-modal">
            &times;
          </button>
        </div>

        <div className="order-product-modal-body">
          {/* Search input */}
          <div className="order-product-search-container">
            <input
              type="text"
              placeholder="Search products..."
              className="order-product-search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Product list */}
          <div className="order-product-list-container">
            <h4>Available Products</h4>
            <div className="order-product-list">
              {products
                .filter(product => {
                  const searchLower = searchTerm.toLowerCase();
                  return (
                    product.name.toLowerCase().includes(searchLower) ||
                    (product.product_id && product.product_id.toString().includes(searchLower)) ||
                    (product.model_id && product.model_id.toString().includes(searchLower))
                  );
                })
                .map(product => {
                  const isOutOfStock = product.stock <= 0;
                  const isSelected = selectedNewProducts.some(p =>
                    p.product_id === product.product_id &&
                    p.model_id === product.model_id &&
                    p.color_id === product.color_id
                  );

                  return (
                    <div
                      key={`${product.product_id}-${product.model_id || ''}-${product.color_id || ''}`}
                      className={`order-product-item ${isSelected ? 'selected' : ''} ${isOutOfStock ? 'out-of-stock' : ''}`}
                      onClick={() => {
                        if (isOutOfStock) return;
                        if (isSelected) {
                          setSelectedNewProducts(prev =>
                            prev.filter(p =>
                              !(p.product_id === product.product_id &&
                                p.model_id === product.model_id &&
                                p.color_id === product.color_id)
                            )
                          );
                        } else {
                          setSelectedNewProducts(prev => [...prev, product]);
                        }
                      }}
                    >
                      {/* Product badge - always rendered */}
                      <div className="order-product-badge">
                        {product.isVariable ? 'Variable' : 'Single'}
                      </div>

                      <div className="order-product-image">
                        {product.image_url ? (
                          <img
                            src={`${import.meta.env.VITE_SERVER_API}/${product.image_url.replace(/^\/+/, '')}`}
                            alt={product.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/placeholder-product.png';
                            }}
                          />
                        ) : (
                          <div className="no-image">No Image</div>
                        )}
                        {isOutOfStock && (
                          <div className="order-stock-overlay">Out of Stock</div>
                        )}
                      </div>

                      <div className="order-product-info">
                        <h4>
                          {product.name.split(' - ').slice(0, product.isVariable ? 2 : 1).join(' - ')}
                        </h4>
                        <p>Product ID: {product.product_id}</p>
                        {product.model_id && <p>Model ID: {product.model_id}</p>}
                        <div className="order-price-info">
                          <span className="order-current-price">
                            ₹{Number(product.price).toFixed(2)}
                          </span>
                          {product.original_price && (
                            <span className="order-original-price">
                              ₹{Number(product.original_price).toFixed(2)}
                            </span>
                          )}
                          <span className="order-stock-info">
                            ({product.stock} available)
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Selected products */}
          <div className="order-selected-products-container">
            <h4>Selected Products ({selectedNewProducts.length})</h4>
            {selectedNewProducts.length > 0 ? (
              <div className="order-selected-products-list">
                {selectedNewProducts.map(product => (
                  <div key={`${product.product_id}-${product.model_id || ''}-${product.color_id || ''}`}
                    className="order-selected-product-item">
                    <span>{product.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedNewProducts(prev =>
                          prev.filter(p =>
                            !(p.product_id === product.product_id &&
                              p.model_id === product.model_id &&
                              p.color_id === product.color_id)
                          ));
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="order-no-selection">No products selected</p>
            )}
          </div>

          {/* Modal actions */}
          <div className="order-product-modal-actions">
            <button
              className="order-cancel-btn"
              onClick={() => {
                setIsProductModalOpen(false);
                setSelectedNewProducts([]);
              }}
            >
              Cancel
            </button>
            <button
              className="order-confirm-btn"
              onClick={() => {
                handleAddProducts(selectedNewProducts);
                setIsProductModalOpen(false);
                setSelectedNewProducts([]);
              }}
              disabled={selectedNewProducts.length === 0}
            >
              Add Selected Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );




  return (
    <AdminLayout>
      <div className="orders-container">
        <h1>Order Management</h1>

        <div className="filters-container">
          <div className="filters-row">
            <div className="filter-group">
              <label htmlFor="orderId">Order ID</label>
              <input
                type="text"
                id="orderId"
                name="orderId"
                value={filters.orderId}
                onChange={handleFilterChange}
                placeholder="Search by order ID"
              />
            </div>

            <div className="filter-group">
              <label htmlFor="name">Customer Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={filters.name}
                onChange={handleFilterChange}
                placeholder="Search by name"
              />
            </div>

            <div className="filter-group">
              <label htmlFor="mobile">Mobile Number</label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={filters.mobile}
                onChange={handleFilterChange}
                placeholder="Search by mobile"
              />
            </div>

            <div className="filter-group">
              <label htmlFor="deliveryStatus">Delivery Status</label>
              <select
                id="deliveryStatus"
                name="deliveryStatus"
                value={filters.deliveryStatus}
                onChange={handleFilterChange}
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="intransit">In Transit</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="filters-row">
            <div className="filter-group">
              <label htmlFor="fulfillment">Fulfillment</label>
              <select
                id="fulfillment"
                name="fulfillment"
                value={filters.fulfillment}
                onChange={handleFilterChange}
              >
                <option value="">All</option>
                <option value="fulfilled">Fulfilled</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="channel">Channel</label>
              <select
                id="channel"
                name="channel"
                value={filters.channel}
                onChange={handleFilterChange}
              >
                <option value="">All Channels</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="invoiceStatus">Invoice Status</label>
              <select
                id="invoiceStatus"
                name="invoiceStatus"
                value={filters.invoiceStatus}
                onChange={handleFilterChange}
              >
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="added">Added</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="paymentStatus">Payment</label>
              <select
                id="paymentStatus"
                name="paymentStatus"
                value={filters.paymentStatus}
                onChange={handleFilterChange}
              >
                <option value="">All Payments</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            <button className="clear-filters" onClick={clearFilters}>
              Clear All
            </button>
          </div>
        </div>

        {/* Mobile Filter Button - Only visible on mobile */}
        <button className="mobile-filter-btn" onClick={() => setIsFilterModalOpen(true)}>
          Filters
        </button>

        {loading ? (
          <Loader />
        ) : (
          <div className="table-container">
            <div className="results-count">
              Showing {filteredOrders.length} of {orders.length} orders
            </div>
            <div className="table-wrapper">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date & Time</th>
                    <th>Customer</th>
                    <th>Mobile</th>
                    <th>City</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Channel</th>
                    <th>Payment</th>
                    <th>Fulfill</th>
                    <th>Status</th>
                    <th>Delhivery</th>
                    <th>AWB</th>
                    <th>Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.order_id}>
                      <td
                        className="order-id-link"
                        onClick={() => handleOrderIdClick(order)}
                      >
                        {order.order_id}
                      </td>
                      <td>{formatIST(order.created_at)}</td>
                      <td>{getCustomerName(order)}</td>
                      <td>{order.address?.mobile || 'N/A'}</td>
                      <td>{order.address?.city || 'N/A'}</td>
                      <td>{order.total_items}</td>
                      <td>₹{order.total_amount.toFixed(2)}</td>
                      <td className={`channel ${order.channel}`}>
                        {order.channel}
                      </td>
                      <td className={`payment ${order.payment_status}`}>
                        {order.payment_status}
                      </td>
                      <td className={order.fulfillment_status ? 'fulfilled' : 'pending'}>
                        {order.fulfillment_status ? 'Yes' : 'No'}
                      </td>
                      <td
                        className={`status ${order.order_status}`}
                        onClick={() => handleStatusClick(order)}
                      >
                        {order.order_status === 'APPROVED' ? 'APPR' :
                          order.order_status === 'PENDING' ? 'PEND' :
                            order.order_status === 'REJECTED' ? 'REJC' : order.order_status}
                      </td>
                      <td className={String(order.address?.is_available).toLowerCase() === 'true' ? 'available' : 'unavailable'}>
                        {String(order.address?.is_available).toLowerCase() === 'true' ? 'Yes' : 'No'}
                      </td>
                      <td
                        className={order.awb_number ? 'awb-link' : 'pending-awb'}
                        onClick={() => handleAWBClick(order)}
                      >
                        {order.awb_number || 'N/A'}
                      </td>
                      <td
                        className={order.invoice_number ? 'invoice-link' : 'pending-invoice'}
                        onClick={() => handleInvoiceClick(order)}
                      >
                        {order.invoice_number || 'Pending'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          {renderModalContent()}
        </div>
      )}

      {isInvoiceModalOpen && (
        <div className="modal-overlay">
          <div className="invoice-modal">
            <div className="modal-header">
              <h3>{invoiceNumber ? 'Edit Invoice Number' : 'Add Invoice Number'}</h3>
              <button onClick={() => setIsInvoiceModalOpen(false)} className="close-modal">
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Invoice Number</label>
                <input
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  placeholder="Enter invoice number"
                />
              </div>
              <div className="action-buttons">
                <button
                  className="cancel-btn"
                  onClick={() => setIsInvoiceModalOpen(false)}
                  disabled={isProcessing}
                >
                  Cancel
                </button>
                <button
                  className="save-btn"
                  onClick={handleInvoiceSave}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Saving...' : 'Save Invoice'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {isAWBModalOpen && (
        <div className="modal-overlay">
          <div className="awb-modal">
            <div className="modal-header">
              <h3>{awbNumber ? 'Edit AWB Number' : 'Add AWB Number'}</h3>
              <button onClick={() => setIsAWBModalOpen(false)} className="close-modal">
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>AWB Number</label>
                <input
                  type="text"
                  value={awbNumber}
                  onChange={(e) => setAwbNumber(e.target.value)}
                  placeholder="Enter AWB number"
                />
              </div>
              <div className="action-buttons">
                <button
                  className="cancel-btn"
                  onClick={() => setIsAWBModalOpen(false)}
                  disabled={isProcessing}
                >
                  Cancel
                </button>
                <button
                  className="save-btn"
                  onClick={handleAWBSave}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Saving...' : 'Save AWB'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Modal for Mobile */}
      {isFilterModalOpen && (
        <div className="modal-overlay">
          <div className="filter-modal">
            <div className="modal-header">
              <h3>Filter Orders</h3>
              <button onClick={() => setIsFilterModalOpen(false)} className="close-modal">
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="filter-group">
                <label htmlFor="mobile-orderId">Order ID</label>
                <input
                  type="text"
                  id="mobile-orderId"
                  name="orderId"
                  value={tempFilters.orderId}
                  onChange={handleTempFilterChange}
                  placeholder="Search by order ID"
                />
              </div>

              <div className="filter-group">
                <label htmlFor="mobile-name">Customer Name</label>
                <input
                  type="text"
                  id="mobile-name"
                  name="name"
                  value={tempFilters.name}
                  onChange={handleTempFilterChange}
                  placeholder="Search by name"
                />
              </div>

              <div className="filter-group">
                <label htmlFor="mobile-mobile">Mobile Number</label>
                <input
                  type="text"
                  id="mobile-mobile"
                  name="mobile"
                  value={tempFilters.mobile}
                  onChange={handleTempFilterChange}
                  placeholder="Search by mobile"
                />
              </div>


              <div className="filter-group">
                <label htmlFor="mobile-deliveryStatus">Delivery Status</label>
                <select
                  id="mobile-deliveryStatus"
                  name="deliveryStatus"
                  value={tempFilters.deliveryStatus}
                  onChange={handleTempFilterChange}
                >
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="intransit">In Transit</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="mobile-fulfillment">Fulfillment</label>
                <select
                  id="mobile-fulfillment"
                  name="fulfillment"
                  value={tempFilters.fulfillment}
                  onChange={handleTempFilterChange}
                >
                  <option value="">All</option>
                  <option value="fulfilled">Fulfilled</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="mobile-invoiceStatus">Invoice Status</label>
                <select
                  id="mobile-invoiceStatus"
                  name="invoiceStatus"
                  value={tempFilters.invoiceStatus}
                  onChange={handleTempFilterChange}
                >
                  <option value="">All</option>
                  <option value="pending">Pending</option>
                  <option value="added">Added</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="mobile-channel">Channel</label>
                <select
                  id="mobile-channel"
                  name="channel"
                  value={tempFilters.channel}
                  onChange={handleTempFilterChange}
                >
                  <option value="">All Channels</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="mobile-paymentStatus">Payment</label>
                <select
                  id="mobile-paymentStatus"
                  name="paymentStatus"
                  value={tempFilters.paymentStatus}
                  onChange={handleTempFilterChange}
                >
                  <option value="">All Payments</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              <div className="filter-modal-actions">
                <button className="clear-btn" onClick={clearFilters}>
                  Clear All
                </button>
                <button className="apply-btn" onClick={applyTempFilters}>
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isAddressModalOpen && (
        <div className="modal-overlay">
          <AddressModal
            isOpen={isAddressModalOpen}
            onClose={() => {
              setIsAddressModalOpen(false);
              setCurrentOrderForAddressChange(null);
            }}
            onSave={handleAddressSave}
            states={states} // You'll need to fetch states if not already available
            initialData={currentOrderForAddressChange?.address}
            isEditMode={false}
          />
        </div>
      )}


      {isProductModalOpen && renderProductSelectionModal()}

      {/* {isEditMode && (
  <div className="quantity-controls">
    <button onClick={() => updateQuantity(item.item_id, item.quantity - 1)}>-</button>
    <input
      type="number"
      value={item.quantity}
      onChange={(e) => updateQuantity(item.item_id, parseInt(e.target.value))}
    />
    <button onClick={() => updateQuantity(item.item_id, item.quantity + 1)}>+</button>
  </div>
)} */}

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

export default Orders;