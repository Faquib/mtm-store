import {
  FiHome,
  FiList,
  FiEdit,
  FiGrid,
  FiArchive,
  FiClipboard,
  FiShoppingCart,
  FiHash,
  FiInfo,
  FiTag,
  FiUpload,
  FiMenu,
  FiX,
} from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './AdminSidebar.scss';

const AdminSidebar = ({ isOpen, toggleSidebar, isMobile }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/admindashboard', name: 'Dashboard', icon: <FiHome /> },                    // home
    { path: '/addproducts', name: 'List Products', icon: <FiList /> },                   // list view
    { path: '/updateproducts', name: 'Update Products', icon: <FiEdit /> },              // edit
    { path: '/categoryupdate', name: 'Category & Hsn', icon: <FiGrid /> },               // grid for categories
    { path: '/admininventory', name: 'Inventory Manage', icon: <FiArchive /> },          // archive/box
    { path: '/createorders', name: 'Offline Order', icon: <FiClipboard /> },             // clipboard/manual
    { path: '/adminorders', name: 'Orders', icon: <FiShoppingCart /> },                  // cart
    { path: '/srnumbermanage', name: 'SR Number Manage', icon: <FiHash /> },             // serial/hash
    { path: '/orderdetails', name: 'Order Details', icon: <FiInfo /> },                  // info/details
    { path: '/offers', name: 'Product Offers', icon: <FiTag /> },                        // tag for offers
    { path: '/updatedriver', name: 'Upload Driver', icon: <FiUpload /> },                // upload icon
  ];

  const handleNavClick = (path) => {
    if (isMobile) {
      toggleSidebar();
      setTimeout(() => navigate(path), 300);
    }
  };

  return (
    <aside className={`admin-sidebar ${isOpen ? 'open' : 'closed'} ${isMobile ? 'mobile' : ''}`}>
      <div className="sidebar-header">
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
        {isOpen && <h2 className="sidebar-title">Admin Panel</h2>}
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            to={item.path}
            key={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => handleNavClick(item.path)}
          >
            <span className="nav-icon">{item.icon}</span>
            {isOpen && <span className="nav-text">{item.name}</span>}
            {!isOpen && <span className="tooltip">{item.name}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;