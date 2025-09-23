import React, { useState, useEffect } from 'react';
import {
    FaInfoCircle,
    FaUsers,
    FaMedal,
    FaTools,
    FaEye,
    FaBullseye,
    FaHandshake,
    FaThumbsUp,
    FaAward,
    FaBuilding,
    FaChartLine,
    FaUniversity,
    FaMoneyBillWave,
    FaCertificate,
    FaRocket,
    FaUserTie,
    FaShieldAlt,
    FaNetworkWired,
    FaGraduationCap,
    FaLightbulb,
    FaGlobe,
    FaHandsHelping,
    FaCogs,
    FaPiggyBank,
    FaChartBar,
    FaMapMarkerAlt,
    FaDesktop,
    FaWarehouse, FaTruck, FaClipboardCheck, FaBoxes, FaBalanceScale,
    FaCheckCircle,
    FaTrophy,
    FaHeartbeat,
    FaArrowRight,
    FaNewspaper, FaDownload, FaMapMarkedAlt, FaSeedling, FaCalendarAlt,
    FaTags
} from 'react-icons/fa';
import { FaStar, FaStarHalfAlt, FaRegStar, FaQuoteLeft } from 'react-icons/fa';
import axios from 'axios';
import './Aboutus.scss';
import isoCert from '../../assets/Images/isocertificate.jpg';
import udyamCert from '../../assets/Images/udyam-cert.jpg';
import startupIndiaCert from '../../assets/Images/startup-india.jpg';
import Ayush from '../../assets/Images/Ayush Sharma.jpg';
import Saquib from '../../assets/Images/Saquib Siraj.jpg';
import Anil from '../../assets/Images/Anil Sharma.jpg';
import Ashfaq from '../../assets/Images/Ashfaq Ahmad.jpg';
import Logo from '../../assets/Logo/logo.jpg';
import Infra from '../../assets/Images/infra.jpg';
import Office from '../../assets/Images/office.jpg';
import Brochure from '../../assets/Brochure/maseehum-task-manager-private-limited.pdf';

const Aboutus = () => {
    const [activeSection, setActiveSection] = useState('introduction');
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    const sections = [
        { id: 'introduction', icon: <FaInfoCircle />, label: 'Introduction' },
        { id: 'testimonial', icon: <FaThumbsUp />, label: 'Testimonials' },
        { id: 'certificates', icon: <FaCertificate />, label: 'Certificates' },
        { id: 'infrastructure', icon: <FaTools />, label: 'Infrastructure & Facilities' },
        { id: 'business', icon: <FaBuilding />, label: 'Business Objectives' },
        { id: 'board', icon: <FaUserTie />, label: 'Board of Directors' },
        { id: 'ethics', icon: <FaShieldAlt />, label: 'Our Ethics' },
        { id: 'whyus', icon: <FaMedal />, label: 'Why Us' },
        { id: 'vision', icon: <FaEye />, label: 'Vision/Mission' },
        { id: 'services', icon: <FaHandsHelping />, label: 'Our Services' },
        { id: 'news', icon: <FaNewspaper />, label: 'News' },
        { id: 'brochure', icon: <FaDownload />, label: 'Download Brochure' }
    ];

    const [reviews, setReviews] = useState({
        average_rating: 0,
        ratings_breakdown: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        reviews: [],
        total_reviews: 0
    });

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_API}/reviews/testimonials`);
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, []);

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<FaStar key={i} className="star-icon" />);
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(<FaStarHalfAlt key={i} className="star-icon" />);
            } else {
                stars.push(<FaRegStar key={i} className="star-icon" />);
            }
        }

        return stars;
    };

    const handleDownload = () => {
        // Create a temporary anchor element
        const link = document.createElement('a');
        link.href = Brochure;
        link.download = 'Maseehum-Task-Manager-Brochure.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // You could add analytics tracking here
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSectionClick = (sectionId) => {
        setActiveSection(sectionId);
        setIsMenuOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    return (
        <div className="about-us-container">
            <div className="sidebar">
                <div className="sidebar-title">
                    About Us
                    <button className="mobile-menu-toggle" onClick={toggleMenu}>
                        {isMenuOpen ? '✕' : '☰'}
                    </button>
                </div>
                <ul className={`sidebar-menu ${isMenuOpen ? 'open' : ''}`}>
                    {sections.map((section) => (
                        <li
                            key={section.id}
                            className={`sidebar-item ${activeSection === section.id ? 'active' : ''}`}
                            onClick={() => handleSectionClick(section.id)}
                        >
                            <span className="sidebar-icon">{section.icon}</span>
                            {section.label}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="main-content" >
                {activeSection === 'introduction' && (
                    <div className="content-section animate-fade">
                        <h2>Introduction</h2>
                        <div className="info-grid">
                            <div className="info-card">
                                <h3><FaBuilding /> Basic Information</h3>
                                <ul>
                                    <li><strong>Nature of Business:</strong> Trader - Retailer</li>
                                    <li><strong>Additional Business:</strong> Retail Business, Wholesale Business</li>
                                    <li><strong>Recipient of Goods or Services:</strong> Supplier of Services</li>
                                    <li><strong>Office:</strong> Sale Office</li>
                                    <li><strong>Company CEO:</strong> Ashfaq Ahmad</li>
                                    <li><strong>Registered Address:</strong> FA-32, 4th FLOOR, LEFT SIDE, THOKAR NO-4 NA, NEW DELHI, South Delhi, New Delhi- 110025, Delhi, India</li>
                                    <li><strong>Total Number of Employees:</strong> 26 to 50 People</li>
                                    <li><strong>GST Registration Date:</strong> 18-09-2021</li>
                                    <li><strong>Legal Status of Firm:</strong> Limited Company</li>
                                    <li><strong>Annual Turnover:</strong> 1.5 - 5 Cr</li>
                                    <li><strong>GST Partner Name:</strong> Ashfaq Ahmad, Mohammad Saquib Siraj, Ayush Sharma</li>
                                </ul>
                            </div>

                            <div className="info-card">
                                <h3><FaUniversity /> Statutory Profile</h3>
                                <ul>
                                    <li><strong>TAN No:</strong> DELM4*****</li>
                                    <li><strong>Banker:</strong> ICICI BANKING CORPORATION LTD</li>
                                    <li><strong>GST No:</strong> 07AAOCM9338C1Z7</li>
                                    <li><strong>CIN No:</strong> U51909DL2021PTC386125</li>
                                </ul>
                            </div>

                            <div className="info-card">
                                <h3><FaMoneyBillWave /> Packaging/Payment and Shipment Details</h3>
                                <ul>
                                    <li><strong>Payment Mode:</strong> Cash, Cheque, DD, Bank Transfer, Online, Credit Card</li>
                                    <li><strong>Shipment Mode:</strong> By Road</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === 'certificates' && (
                    <div className="content-section animate-fade">
                        <h2>Our Certificates & Achievements</h2>

                        <div className="achievements-section">
                            <h3><FaRocket /> Our Achievements</h3>
                            <div className="achievements-grid">
                                <div className="achievement-item">
                                    <FaNetworkWired className="achievement-icon" />
                                    <p>Working with 500+ retailers and 100+ district coordinators</p>
                                </div>
                                <div className="achievement-item">
                                    <FaMoneyBillWave className="achievement-icon" />
                                    <p>Retailers sell value-added services increasing their income</p>
                                </div>
                                <div className="achievement-item">
                                    <FaMedal className="achievement-icon" />
                                    <p>Introducing innovative services like online Doctor Consultancy in rural areas</p>
                                </div>
                                <div className="achievement-item">
                                    <FaGraduationCap className="achievement-icon" />
                                    <p>Retailers qualified to sell financial products</p>
                                </div>
                                <div className="achievement-item">
                                    <FaUserTie className="achievement-icon" />
                                    <p>Retailers with 5+ years field experience ensuring seamless operations</p>
                                </div>
                                <div className="achievement-item">
                                    <FaLightbulb className="achievement-icon" />
                                    <p>Training programs enhancing Customer Management skills</p>
                                </div>
                            </div>
                        </div>

                        <div className="certificates-section">
                            <h3><FaCertificate /> Our Certifications</h3>
                            <div className="certificates-grid">
                                <div className="certificate-card">
                                    <div className="certificate-image">
                                        <img src={isoCert} alt="ISO Certification" />
                                    </div>
                                    <div className="certificate-details">
                                        <h4>ISO Certification</h4>
                                        <p>Recognized for quality management systems</p>
                                    </div>
                                </div>
                                <div className="certificate-card">
                                    <div className="certificate-image">
                                        <img src={udyamCert} alt="Udyam Certificate" />
                                    </div>
                                    <div className="certificate-details">
                                        <h4>Udyam Certificate</h4>
                                        <p>Government recognized MSME registration</p>
                                    </div>
                                </div>
                                <div className="certificate-card">
                                    <div className="certificate-image">
                                        <img src={startupIndiaCert} alt="Startup India Recognition" />
                                    </div>
                                    <div className="certificate-details">
                                        <h4>Startup India Recognition</h4>
                                        <p>Officially recognized by Government of India</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === 'business' && (
                    <div className="content-section animate-fade">
                        <div className="business-objectives-section">
                            <div className="objectives-header">
                                <FaChartBar className="header-icon" />
                                <h2>Business Objectives</h2>
                            </div>

                            <p style={{ color: '#555', lineHeight: '1.7', marginBottom: '30px' }}>
                                Our primary business objectives at mTm are focused on achieving sustainable growth
                                and establishing a strong leadership position in both the financial services and
                                technology product sales sectors.
                            </p>

                            <div className="objectives-grid">
                                <div className="objective-card">
                                    <div className="objective-image">
                                        <img
                                            src="https://img.freepik.com/free-photo/people-tablet-with-bar-graph_1134-473.jpg?ga=GA1.1.90714434.1748242857&semt=ais_hybrid&w=740"
                                            alt="Market Expansion"
                                        />
                                    </div>
                                    <div className="objective-content">
                                        <h3><FaGlobe /> Expanding Market Presence</h3>
                                        <p>
                                            To strategically grow our footprint within the financial services industry by offering
                                            innovative and competitive solutions that attract a wider client base. Simultaneously,
                                            we aim to increase our market share in the technology product sales division by
                                            establishing strong distribution channels and building lasting customer relationships
                                            in New Delhi and beyond.
                                        </p>
                                    </div>
                                </div>

                                <div className="objective-card">
                                    <div className="objective-image">
                                        <img
                                            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1500&q=80"
                                            alt="Driving Innovation"
                                        />
                                    </div>
                                    <div className="objective-content">
                                        <h3><FaLightbulb /> Driving Innovation</h3>
                                        <p>
                                            To continuously develop and implement cutting-edge financial services and offer the
                                            latest, most reliable technology products, ensuring we remain at the forefront of
                                            industry advancements. This includes exploring new technologies and adapting our
                                            services to meet the evolving needs of the Indian market.
                                        </p>
                                    </div>
                                </div>

                                <div className="objective-card">
                                    <div className="objective-image">
                                        <img
                                            src="https://img.freepik.com/free-vector/business-deal_52683-6262.jpg?ga=GA1.1.90714434.1748242857&semt=ais_hybrid&w=740"
                                            alt="Enhancing Customer Value"
                                        />
                                    </div>
                                    <div className="objective-content">
                                        <h3><FaHandsHelping /> Enhancing Customer Value</h3>
                                        <p>
                                            To consistently deliver exceptional value to our customers through tailored financial
                                            advice, superior product quality, and outstanding customer support in both our
                                            financial and product divisions. We are committed to building long-term relationships
                                            based on trust and mutual success.
                                        </p>
                                    </div>
                                </div>

                                <div className="objective-card">
                                    <div className="objective-image">
                                        <img
                                            src="https://img.freepik.com/free-vector/isometric-illustration-landing-page_52683-68357.jpg?ga=GA1.1.90714434.1748242857&semt=ais_hybrid&w=740"
                                            alt="Operational Excellence"
                                        />
                                    </div>
                                    <div className="objective-content">
                                        <h3><FaCogs /> Achieving Operational Excellence</h3>
                                        <p>
                                            To optimize our internal processes and infrastructure to ensure efficiency, scalability,
                                            and profitability across all our business operations. This includes investing in talent
                                            development and fostering a culture of continuous improvement.
                                        </p>
                                    </div>
                                </div>

                                <div className="objective-card">
                                    <div className="objective-image">
                                        <img
                                            src="https://plus.unsplash.com/premium_photo-1663100794696-6b7afa02016c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fEVuc3VyaW5nJTIwRmluYW5jaWFsJTIwU3RyZW5ndGh8ZW58MHx8MHx8fDA%3D"
                                            alt="Financial Strength"
                                        />
                                    </div>
                                    <div className="objective-content">
                                        <h3><FaPiggyBank /> Ensuring Financial Strength</h3>
                                        <p>
                                            To achieve and maintain robust financial performance, ensuring the long-term sustainability
                                            and growth of mTm, allowing us to reinvest in innovation and better serve our clients in
                                            the Indian market.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === 'board' && (
                    <div className="content-section animate-fade">
                        <div className="directors-header">
                            <FaUserTie className="header-icon" />
                            <h2>Board of Directors</h2>
                        </div>

                        <p className="directors-intro">
                            Our leadership team brings together decades of experience in banking, technology,
                            and business management to drive MTM's vision forward.
                        </p>

                        <div className="directors-grid">
                            {/* Chairman */}
                            <div className="director-card">
                                <div className="director-image">
                                    <img
                                        src={Anil}
                                        alt="Anil Sharma - Chairman"
                                    />
                                    <div className="director-badge">Chairman</div>
                                </div>
                                <div className="director-details">
                                    <h3>Anil Sharma <span className="director-role">- Chairman</span></h3>
                                    <div className="director-highlights">
                                        <div className="highlight-item">
                                            <FaUniversity className="highlight-icon" />
                                            <span>40+ years banking experience</span>
                                        </div>
                                        <div className="highlight-item">
                                            <FaShieldAlt className="highlight-icon" />
                                            <span>Former GM, Central Bank of India</span>
                                        </div>
                                        <div className="highlight-item">
                                            <FaChartLine className="highlight-icon" />
                                            <span>National Resource Person for Ministry of Rural Development</span>
                                        </div>
                                    </div>
                                    <p className="director-bio">
                                        Anil Sharma is a seasoned banking professional with over 40 years of experience,
                                        having retired as General Manager of the Central Bank of India. A CAIIB-certified
                                        expert, he has spearheaded major initiatives in financial inclusion, MSME development,
                                        and rural banking, and has served on key committees of the RBI, IBA, and NPCI.
                                    </p>
                                    <p className="director-bio">
                                        Currently serving as a National Resource Person for the Ministry of Rural Development,
                                        he also holds influential roles across various economic sectors in India.
                                    </p>
                                </div>
                            </div>

                            {/* CEO */}
                            <div className="director-card">
                                <div className="director-image">
                                    <img
                                        src={Ashfaq}
                                        alt="Ashfaq Ahmad - CEO"
                                    />
                                    <div className="director-badge">CEO</div>
                                </div>
                                <div className="director-details">
                                    <h3>Ashfaq Ahmad <span className="director-role">- CEO</span></h3>
                                    <div className="director-highlights">
                                        <div className="highlight-item">
                                            <FaNetworkWired className="highlight-icon" />
                                            <span>20+ years field experience</span>
                                        </div>
                                        <div className="highlight-item">
                                            <FaBuilding className="highlight-icon" />
                                            <span>Managed 9000 centers for major banks</span>
                                        </div>
                                        <div className="highlight-item">
                                            <FaHandsHelping className="highlight-icon" />
                                            <span>Expert in project architecture and integration</span>
                                        </div>
                                    </div>
                                    <p className="director-bio">
                                        Entered this domain in 2001, played an active part in establishing Synapse Solutions
                                        an IT Company and started his own company Maseehum Task Manager. His experience in
                                        project architecture and integration software, testing, network and business development
                                        is very beneficial for this Start up.
                                    </p>
                                    <p className="director-bio">
                                        Mr. Ashfaq Ahmad has managed 9000 centers for CBI, PNB, UBI and two RRBs in Delhi,
                                        U.P, Bihar, M.P and Jharkhand. With his links spread all over the country this start
                                        up is able to sustain itself.
                                    </p>
                                </div>
                            </div>

                            {/* Director 1 */}
                            <div className="director-card">
                                <div className="director-image">
                                    <img
                                        src={Saquib}
                                        alt="Saquib Siraj - Director"
                                    />
                                    <div className="director-badge">Director</div>
                                </div>
                                <div className="director-details">
                                    <h3>Saquib Siraj <span className="director-role">- Director</span></h3>
                                    <div className="director-highlights">
                                        <div className="highlight-item">
                                            <FaLightbulb className="highlight-icon" />
                                            <span>Tech enthusiast & innovator</span>
                                        </div>
                                        <div className="highlight-item">
                                            <FaCogs className="highlight-icon" />
                                            <span>Digital transformation expert</span>
                                        </div>
                                        <div className="highlight-item">
                                            <FaRocket className="highlight-icon" />
                                            <span>Business growth strategist</span>
                                        </div>
                                    </div>
                                    <p className="director-bio">
                                        A young and dynamic tech enthusiast, brings a deep understanding of emerging
                                        technologies and business innovation. His strong technical expertise and
                                        forward-thinking approach drive MTM's digital transformation and growth.
                                    </p>
                                    <p className="director-bio">
                                        As Director, he plays a key role in leveraging technology for efficiency,
                                        enhancing user experiences, and expanding the company's impact in the
                                        financial and IT sectors.
                                    </p>
                                </div>
                            </div>

                            {/* Director 2 */}
                            <div className="director-card">
                                <div className="director-image">
                                    <img
                                        src={Ayush}
                                        alt="Ayush Sharma - Director"
                                    />
                                    <div className="director-badge">Director</div>
                                </div>
                                <div className="director-details">
                                    <h3>Ayush Sharma <span className="director-role">- Director</span></h3>
                                    <div className="director-highlights">
                                        <div className="highlight-item">
                                            <FaGraduationCap className="highlight-icon" />
                                            <span>Computer Engineering graduate</span>
                                        </div>
                                        <div className="highlight-item">
                                            <FaChartBar className="highlight-icon" />
                                            <span>MBA candidate at UWA</span>
                                        </div>
                                        <div className="highlight-item">
                                            <FaPiggyBank className="highlight-icon" />
                                            <span>5+ years in Finance & IT</span>
                                        </div>
                                    </div>
                                    <p className="director-bio">
                                        A Computer Engineering graduate from the University of Pune, is pursuing an MBA
                                        at the University of Western Australia and holds a Professional Certificate in
                                        Advanced Business Management from IIM Kozhikode.
                                    </p>
                                    <p className="director-bio">
                                        With over five years of experience in Finance and IT Services, he specializes in
                                        UI/UX design, combining creativity with a user-centric approach. As Director,
                                        Ayush drives innovation and growth, leveraging his technical expertise and
                                        strategic insights to propel the company forward.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === 'testimonial' && (
                    <div className="content-section animate-fade">
                        <div className="testimonials-section">
                            <div className="testimonials-header">
                                {/* <FaThumbsUp className="header-icon" /> */}
                                <h2>Customer Testimonials</h2>
                                <p className="testimonials-subtitle">
                                    Hear what our valued customers say about our products and services
                                </p>
                            </div>

                            <div className="rating-summary">
                                <div className="overall-rating">
                                    <div className="average-rating">
                                        {reviews?.average_rating != null
                                            ? reviews.average_rating.toFixed(1)
                                            : "N/A"}
                                        <span className="rating-out-of">/5</span>
                                    </div>
                                    <div className="stars">
                                        {renderStars(reviews?.average_rating || 0)}
                                    </div>
                                    <div className="total-reviews">
                                        Based on {reviews?.total_reviews || 0} reviews
                                    </div>
                                </div>

                                {reviews?.ratings_breakdown && (
                                    <div className="rating-breakdown">
                                        <h4>Rating Distribution</h4>
                                        {[5, 4, 3, 2, 1].map((star) => (
                                            <div className="breakdown-item" key={star}>
                                                <div className="star-label">
                                                    {star} {star === 1 ? 'Star' : 'Stars'}
                                                </div>
                                                <div className="progress-container">
                                                    <div
                                                        className="progress-bar"
                                                        style={{
                                                            width: `${(reviews.ratings_breakdown[star] / (reviews.total_reviews || 1)) * 100}%`
                                                        }}
                                                    ></div>
                                                </div>
                                                <div className="count">
                                                    {reviews.ratings_breakdown[star] || 0} ({Math.round((reviews.ratings_breakdown[star] / (reviews.total_reviews || 1)) * 100)}%)
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="testimonials-grid">
                                {reviews?.reviews?.length > 0 ? (
                                    reviews.reviews.map((review, index) => (
                                        <div className="testimonial-card" key={index}>
                                            <div className="quote-icon">
                                                <FaQuoteLeft />
                                            </div>
                                            <div className="testimonial-content">
                                                <p className="review-text">
                                                    {review.review_text || "This customer hasn't left a written review yet."}
                                                </p>
                                                <div className="review-meta">
                                                    <div className="review-product">
                                                        <span className="meta-label">Product:</span>
                                                        <span className="meta-value">{review.product_name || "Not specified"}</span>
                                                    </div>
                                                    <div className="review-date">
                                                        <span className="meta-label">Date:</span>
                                                        <span className="meta-value">
                                                            {new Date(review.date).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="testimonial-author">
                                                <div className="author-avatar">
                                                    {review.customer_name ? review.customer_name.charAt(0).toUpperCase() : 'U'}
                                                </div>
                                                <div className="author-info">
                                                    <div className="author-name">
                                                        {review.customer_name || "Anonymous Customer"}
                                                    </div>
                                                    <div className="author-rating">
                                                        {renderStars(review.rating)}
                                                        <span className="rating-value">{review.rating.toFixed(1)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="no-reviews">
                                        <div className="no-reviews-icon">
                                            <FaThumbsUp />
                                        </div>
                                        <h4>No testimonials yet</h4>
                                        <p>Be the first to share your experience with us!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === 'infrastructure' && (
                    <div className="content-section animate-fade">
                        <div className="infrastructure-header">
                            <FaBuilding className="header-icon" />
                            <h2>Infrastructure & Facilities</h2>
                        </div>

                        <div className="infrastructure-intro">
                            <p>
                                Our state-of-the-art infrastructure supports our operations and enables us to deliver
                                exceptional products and services to our clients across India.
                            </p>
                        </div>

                        <div className="infrastructure-grid">
                            {/* Strategic Location Card */}
                            <div className="infrastructure-card strategic-location">
                                <div className="card-content-wrapper">
                                    <div className="card-image-container">
                                        <img
                                            src={Infra}
                                            alt="Hemkunt Chambers, Nehru Place"
                                            className="card-image"
                                            style={{ objectFit: 'contain' }}
                                        />
                                        <div className="image-caption">Hemkunt Chambers, Nehru Place</div>
                                    </div>
                                    <div className="card-text-content">
                                        <div className="title-wrapper">
                                            <div className="infrastructure-icon">
                                                <FaGlobe />
                                            </div>
                                            <h3>Our Strategic Location</h3>
                                        </div>
                                        <div className="infrastructure-content">
                                            <p>
                                                We are strategically situated in the heart of Delhi's premier Commercial IT hub,
                                                Nehru Place, within the prestigious Hemkunt Chambers. This prime location places
                                                us at the epicenter of technological innovation and business activity in the region.
                                            </p>
                                            <p>
                                                Being a part of this dynamic ecosystem allows us to stay at the forefront of industry
                                                trends, foster valuable partnerships, and readily connect with a diverse range of
                                                clients and collaborators.
                                            </p>
                                            <div className="location-highlights">
                                                <div className="highlight-item">
                                                    <FaMapMarkerAlt className="highlight-icon" />
                                                    <span>Prime location in Delhi's IT hub</span>
                                                </div>
                                                <div className="highlight-item">
                                                    <FaNetworkWired className="highlight-icon" />
                                                    <span>Excellent connectivity and accessibility</span>
                                                </div>
                                                <div className="highlight-item">
                                                    <FaHandshake className="highlight-icon" />
                                                    <span>Proximity to business partners and clients</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Office Setup Card */}
                            <div className="infrastructure-card office-setup">
                                <div className="card-content-wrapper reverse">
                                    <div className="card-image-container">
                                        <img
                                            src={Office}
                                            alt="Our Corporate Office"
                                            className="card-image"
                                            style={{ objectFit: 'contain' }}
                                        />
                                        <div className="image-caption">Our Corporate Office</div>
                                    </div>
                                    <div className="card-text-content">
                                        <div className="title-wrapper">
                                            <div className="infrastructure-icon">
                                                <FaNetworkWired />
                                            </div>
                                            <h3>Our Office Setup</h3>
                                        </div>
                                        <div className="infrastructure-content">
                                            <p>
                                                Maseehum Task Manager Private Limited (mTm) has its registered office at FA-32,
                                                4th FLOOR, LEFT SIDE, THOKAR NO-4 NA, NEW DELHI, South Delhi, Delhi, 110025.
                                                Our Corporate office is located at 722B, Hemkunt Chambers 89, Nehru Place,
                                                New Delhi - 110019.
                                            </p>
                                            <p>
                                                We maintain a modern, well-equipped workspace designed to foster productivity
                                                and collaboration. Our facilities include dedicated areas for product demonstration,
                                                client meetings, and team collaboration.
                                            </p>
                                            <div className="facility-highlights">
                                                <div className="highlight-item">
                                                    <FaDesktop className="highlight-icon" />
                                                    <span>Modern workstations with latest technology</span>
                                                </div>
                                                <div className="highlight-item">
                                                    <FaWarehouse className="highlight-icon" />
                                                    <span>Secure product storage and display area</span>
                                                </div>
                                                <div className="highlight-item">
                                                    <FaUsers className="highlight-icon" />
                                                    <span>Comfortable meeting and collaboration spaces</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Product Facilities Card */}
                            <div className="infrastructure-card product-facilities">
                                <div className="card-content-wrapper">
                                    <div className="card-image-container">
                                        <img
                                            src={Office}
                                            alt="Our Product Storage Facility"
                                            className="card-image"
                                            style={{ objectFit: 'contain' }}
                                        />
                                        <div className="image-caption">Our Product Storage Facility</div>
                                    </div>
                                    <div className="card-text-content">
                                        <div className="title-wrapper">
                                            <div className="infrastructure-icon">
                                                <FaBoxes />
                                            </div>
                                            <h3>Product Facilities</h3>
                                        </div>
                                        <div className="infrastructure-content">
                                            <p>
                                                As suppliers of Kiosk Hardware and various electronic products, we maintain
                                                excellent facilities for product storage, testing, and demonstration.
                                                Customers can visit our corporate office to experience our stock firsthand.
                                            </p>
                                            <p>
                                                We specialize in bulk, wholesale supply of products such as Pax D180C Pinpad,
                                                Mantra MFS100, Android POS, Epson PLQ-35 Passbook Printers, and more.
                                            </p>
                                            <div className="product-highlights">
                                                <div className="highlight-item">
                                                    <FaClipboardCheck className="highlight-icon" />
                                                    <span>Quality testing facilities for all products</span>
                                                </div>
                                                <div className="highlight-item">
                                                    <FaShieldAlt className="highlight-icon" />
                                                    <span>Secure storage with climate control</span>
                                                </div>
                                                <div className="highlight-item">
                                                    <FaTruck className="highlight-icon" />
                                                    <span>Efficient logistics and shipping capabilities</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === 'ethics' && (
                    <div className="content-section animate-fade">
                        <div className="ethics-header">
                            <FaShieldAlt className="header-icon" />
                            <h2>Our Ethics</h2>
                        </div>

                        <div className="ethics-intro">
                            <p>
                                At mTm, ethical conduct is the bedrock of our organization and guides every decision we make in New Delhi and beyond.
                                We are deeply committed to upholding the highest standards of integrity, transparency, and fairness in all our
                                interactions with clients, partners, employees, and the wider community in India.
                            </p>
                        </div>

                        <div className="ethics-banner">
                            <img
                                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                                alt="Ethical Business Practices"
                            />
                            <div className="banner-overlay">
                                <h3>Ethical Foundations for Sustainable Success</h3>
                                <p>Guiding principles that shape our business decisions and relationships</p>
                            </div>
                        </div>

                        <div className="ethics-principles">
                            <h3 className="principles-title">
                                Our ethical framework is built on the following core principles:
                            </h3>

                            <div className="principles-grid">
                                {/* Integrity */}
                                <div className="principle-card">
                                    <div className="principle-icon">
                                        <FaHandshake />
                                    </div>
                                    <div className="principle-content">
                                        <h4>Integrity</h4>
                                        <p>
                                            We operate with honesty and truthfulness in all our dealings. We are committed to being transparent about
                                            our services, products, and processes, ensuring that our clients in New Delhi and across India can trust our word.
                                        </p>
                                    </div>
                                </div>

                                {/* Client Focus */}
                                <div className="principle-card">
                                    <div className="principle-icon">
                                        <FaUsers />
                                    </div>
                                    <div className="principle-content">
                                        <h4>Client Focus</h4>
                                        <p>
                                            We prioritize the best interests of our clients. Our advice and solutions, whether in financial services or
                                            product sales, are tailored to meet their specific needs and goals. We strive to build long-lasting relationships
                                            based on trust and mutual respect within the Indian context.
                                        </p>
                                    </div>
                                </div>

                                {/* Compliance */}
                                <div className="principle-card">
                                    <div className="principle-icon">
                                        <FaClipboardCheck />
                                    </div>
                                    <div className="principle-content">
                                        <h4>Compliance</h4>
                                        <p>
                                            We are dedicated to adhering to all applicable laws, regulations, and industry best practices in India.
                                            We maintain strict internal controls to ensure compliance and mitigate risks effectively within the local
                                            legal and regulatory landscape.
                                        </p>
                                    </div>
                                </div>

                                {/* Confidentiality */}
                                <div className="principle-card">
                                    <div className="principle-icon">
                                        <FaShieldAlt />
                                    </div>
                                    <div className="principle-content">
                                        <h4>Confidentiality</h4>
                                        <p>
                                            We recognize the sensitivity of the information entrusted to us by our clients and partners in India.
                                            We are committed to maintaining the highest levels of confidentiality and data security, protecting their
                                            privacy at all times.
                                        </p>
                                    </div>
                                </div>

                                {/* Professionalism */}
                                <div className="principle-card">
                                    <div className="principle-icon">
                                        <FaUserTie />
                                    </div>
                                    <div className="principle-content">
                                        <h4>Professionalism</h4>
                                        <p>
                                            We conduct ourselves with the utmost professionalism in all our engagements. Our team is committed to
                                            continuous learning and development to provide expert advice and service to our clients in New Delhi and
                                            throughout India.
                                        </p>
                                    </div>
                                </div>

                                {/* Fairness */}
                                <div className="principle-card">
                                    <div className="principle-icon">
                                        <FaBalanceScale />
                                    </div>
                                    <div className="principle-content">
                                        <h4>Fairness</h4>
                                        <p>
                                            We believe in treating everyone with fairness and respect. We are committed to providing equal opportunities
                                            to our employees and ensuring fair and transparent practices in all our business dealings within the diverse
                                            Indian market.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="ethics-commitment">
                            <div className="commitment-content">
                                <h3>Our Unwavering Commitment</h3>
                                <p>
                                    Our commitment to these ethical principles is unwavering, as we believe it is essential for building a sustainable
                                    and reputable business that contributes positively to the financial well-being and technological advancement of
                                    individuals and businesses in India.
                                </p>
                            </div>
                            <div className="commitment-image">
                                <img
                                    src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                                    alt="Ethical Commitment"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === 'whyus' && (
                    <div className="content-section animate-fade">
                        <div className="whyus-header">
                            <FaMedal className="header-icon" />
                            <h2>Why Choose mTm?</h2>
                        </div>

                        <div className="whyus-intro">
                            <div className="intro-content">
                                <h3>Established in 2020, mTm's journey so far:</h3>
                                <ul className="journey-list">
                                    <li>
                                        <FaCheckCircle /> Successfully networked and established more than 500 highly motivated,
                                        skilled and experienced retailers across the country
                                    </li>
                                    <li>
                                        <FaCheckCircle /> Introduced Online Medical Consultation Services with the help of Vhealth
                                    </li>
                                    <li>
                                        <FaCheckCircle /> mTm-store our product sales division deals in electronics and all the
                                        necessary security devices required by various businesses
                                    </li>
                                    <li>
                                        <FaCheckCircle /> MTM has successfully developed loyal customer base through associated
                                        task workers as a supply chain network across the country
                                    </li>
                                </ul>
                            </div>
                            <div className="intro-logo">
                                <img
                                    src={Logo}
                                    alt="mTm Logo"
                                    className="company-logo"
                                />
                            </div>
                        </div>

                        <div className="whyus-achievements">
                            <div className="achievements-header">
                                <FaTrophy className="header-icon" />
                                <h3>Our Achievements</h3>
                            </div>

                            <div className="achievements-grid">
                                <div className="achievement-card">
                                    <div className="achievement-icon">
                                        <FaUsers />
                                    </div>
                                    <div className="achievement-content">
                                        <h4>500+ Retailers Network</h4>
                                        <p>
                                            MTM is already working with more than 500 retailers, more 100 district coordinators
                                            and we are yet to work on our full strength!
                                        </p>
                                    </div>
                                </div>

                                <div className="achievement-card">
                                    <div className="achievement-icon">
                                        <FaMoneyBillWave />
                                    </div>
                                    <div className="achievement-content">
                                        <h4>Value Added Services</h4>
                                        <p>
                                            Our retailers also sell value added services which increases there income substantially.
                                        </p>
                                    </div>
                                </div>

                                <div className="achievement-card">
                                    <div className="achievement-icon">
                                        <FaHeartbeat />
                                    </div>
                                    <div className="achievement-content">
                                        <h4>Healthcare Innovation</h4>
                                        <p>
                                            Introducing new services in the market such as online Doctor Consultancy in rural areas
                                            which helps in getting quality health care.
                                        </p>
                                    </div>
                                </div>

                                <div className="achievement-card">
                                    <div className="achievement-icon">
                                        <FaChartLine />
                                    </div>
                                    <div className="achievement-content">
                                        <h4>Financial Expertise</h4>
                                        <p>
                                            Our retailers are qualified to sell financial products with proper training and certification.
                                        </p>
                                    </div>
                                </div>

                                <div className="achievement-card">
                                    <div className="achievement-icon">
                                        <FaUserTie />
                                    </div>
                                    <div className="achievement-content">
                                        <h4>Experienced Team</h4>
                                        <p>
                                            Our retailers have at least 5 years of on field experience which helps us to work seamlessly.
                                        </p>
                                    </div>
                                </div>

                                <div className="achievement-card">
                                    <div className="achievement-icon">
                                        <FaGraduationCap />
                                    </div>
                                    <div className="achievement-content">
                                        <h4>Training Programs</h4>
                                        <p>
                                            Training Programs for new retailers helps them to learn Customer Management skills and provide Quality service.
                                        </p>
                                    </div>
                                </div>

                                <div className="achievement-card">
                                    <div className="achievement-icon">
                                        <FaRocket />
                                    </div>
                                    <div className="achievement-content">
                                        <h4>Product Promotion</h4>
                                        <p>
                                            MTM's sales division can also promote a new product or service effectively.
                                        </p>
                                    </div>
                                </div>

                                <div className="achievement-card">
                                    <div className="achievement-icon">
                                        <FaShieldAlt />
                                    </div>
                                    <div className="achievement-content">
                                        <h4>Strong Fundamentals</h4>
                                        <p>
                                            MTM is a start up but our network and fundamental are strong enough to out perform our competition.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="whyus-cta">
                            <div className="cta-content">
                                <h3>Ready to experience the mTm difference?</h3>
                                <p>
                                    Join our growing network of retailers and partners to be part of India's
                                    financial and technological revolution.
                                </p>
                                <button className="cta-button">
                                    Contact Us <FaArrowRight />
                                </button>
                            </div>
                            <div className="cta-image">
                                <img
                                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                                    alt="Join mTm Network"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === 'vision' && (
                    <div className="content-section animate-fade">
                        <div className="vision-mission-section">
                            <div className="section-header">
                                <FaEye className="header-icon" />
                                <h2>Our Vision & Mission</h2>
                            </div>

                            <div className="vision-mission-grid">
                                {/* Aim Card */}
                                <div className="vm-card aim-card">
                                    <div className="vm-icon-container">
                                        <FaBullseye className="vm-icon" />
                                    </div>
                                    <h3>Our Aim</h3>
                                    <div className="vm-content">
                                        <p>
                                            Our primary aim is to redefine excellence within the financial services sector.
                                            We are strategically focused on consistently outperforming the competition by
                                            leveraging our robust network and strong fundamental principles.
                                        </p>
                                        <p>
                                            This drive for superior performance isn't just about market share; it's about
                                            setting new benchmarks for innovation, efficiency, and client satisfaction,
                                            ultimately creating greater value for all stakeholders.
                                        </p>
                                        <p>
                                            Furthermore, through our product sales endeavors, we aim to be a leading supplier,
                                            distributor, trader, and dealer of essential technology products like Fingerprint
                                            Scanners and POS Machines, ensuring widespread accessibility and reliable support
                                            for our customers.
                                        </p>
                                    </div>
                                </div>

                                {/* Vision Card */}
                                <div className="vm-card vision-card">
                                    <div className="vm-icon-container">
                                        <FaGlobe className="vm-icon" />
                                    </div>
                                    <h3>Our Vision</h3>
                                    <div className="vm-content">
                                        <p>
                                            Our vision is to reimagine finance for a brighter tomorrow. We envision a future
                                            where financial services are more accessible, intuitive, and empowering for
                                            individuals and businesses alike.
                                        </p>
                                        <p>
                                            This means moving beyond traditional paradigms to foster an ecosystem where financial
                                            well-being is attainable for everyone, supported by cutting-edge solutions and a
                                            deep understanding of evolving needs.
                                        </p>
                                        <p>
                                            Complementing this, we foresee our product sales extending the reach of vital
                                            technological tools, thereby enhancing operational efficiency and digital
                                            capabilities across various industries, contributing to a truly connected and
                                            empowered future.
                                        </p>
                                    </div>
                                </div>

                                {/* Mission Card */}
                                <div className="vm-card mission-card">
                                    <div className="vm-icon-container">
                                        <FaRocket className="vm-icon" />
                                    </div>
                                    <h3>Our Mission</h3>
                                    <div className="vm-content">
                                        <p>
                                            As a dynamic and agile startup, mTm's mission is to rapidly establish a commanding
                                            presence in the financial services sector. We are committed to achieving this by
                                            relentlessly delivering innovative and transformative financial solutions.
                                        </p>
                                        <p>
                                            Our approach is grounded in our robust network and strong foundational principles,
                                            which enable us to navigate market complexities, foster trust, and consistently
                                            provide exceptional value.
                                        </p>
                                        <p>
                                            Simultaneously, our mission extends to our product sales division, where we are
                                            dedicated to providing high-quality Fingerprint Scanners and POS Machines as a
                                            trusted supplier, distributor, trader, and dealer.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === 'services' && (
                    <div className="content-section animate-fade">
                        <div className="services-header">
                            <FaHandshake className="header-icon" />
                            <h2>Our Services</h2>
                        </div>

                        <div className="services-intro">
                            <p>
                                mTm has established a strong presence in the financial services sector, working with over 2,000 retailers and CSP centers,
                                supported by more than 50 district coordinators and a dedicated team at our centralized office in New Delhi.
                            </p>
                        </div>

                        <div className="services-features">
                            <div className="feature-card">
                                <div className="feature-header">
                                    <div className="feature-icon">
                                        <FaNetworkWired />
                                    </div>
                                    <h3>Extensive Retailer Network</h3>
                                </div>
                                <div className="feature-content">
                                    <p>
                                        Working with over 2,000 retailers and CSP centers across India, supported by more than 50 district coordinators
                                        and our centralized New Delhi office.
                                    </p>
                                </div>
                            </div>

                            <div className="feature-card">
                                <div className="feature-header">
                                    <div className="feature-icon">
                                        <FaChartLine />
                                    </div>
                                    <h3>Value-Added Services</h3>
                                </div>
                                <div className="feature-content">
                                    <p>
                                        Our retailers not only facilitate financial transactions but also offer value-added services,
                                        significantly enhancing their income potential.
                                    </p>
                                </div>
                            </div>

                            <div className="feature-card">
                                <div className="feature-header">
                                    <div className="feature-icon">
                                        <FaMapMarkedAlt />
                                    </div>
                                    <h3>Pan-India Presence</h3>
                                </div>
                                <div className="feature-content">
                                    <p>
                                        Strong footprint across key states: West Bengal, Maharashtra, Bihar, Jharkhand, Uttar Pradesh,
                                        Madhya Pradesh, Rajasthan, and Assam.
                                    </p>
                                </div>
                            </div>

                            <div className="feature-card">
                                <div className="feature-header">
                                    <div className="feature-icon">
                                        <FaUserTie />
                                    </div>
                                    <h3>Experienced Team</h3>
                                </div>
                                <div className="feature-content">
                                    <p>
                                        Our retailers bring at least five years of field experience, enabling seamless operations
                                        and exceptional customer support.
                                    </p>
                                </div>
                            </div>

                            <div className="feature-card">
                                <div className="feature-header">
                                    <div className="feature-icon">
                                        <FaGraduationCap />
                                    </div>
                                    <h3>Training Programs</h3>
                                </div>
                                <div className="feature-content">
                                    <p>
                                        Comprehensive training equips new retailers with customer management skills
                                        and ensures high service standards.
                                    </p>
                                </div>
                            </div>

                            <div className="feature-card">
                                <div className="feature-header">
                                    <div className="feature-icon">
                                        <FaRocket />
                                    </div>
                                    <h3>Product Promotion</h3>
                                </div>
                                <div className="feature-content">
                                    <p>
                                        Our sales division effectively promotes new products and services to maximize reach and impact.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="services-coverage">
                            <div className="coverage-content">
                                <h3>Our Nationwide Coverage</h3>
                                <p>
                                    We ensure widespread accessibility to financial services across India with our growing network
                                    of experienced professionals and strategically located centers.
                                </p>
                                <div className="state-list">
                                    <div className="state-item">
                                        <FaCheckCircle /> West Bengal
                                    </div>
                                    <div className="state-item">
                                        <FaCheckCircle /> Maharashtra
                                    </div>
                                    <div className="state-item">
                                        <FaCheckCircle /> Bihar
                                    </div>
                                    <div className="state-item">
                                        <FaCheckCircle /> Jharkhand
                                    </div>
                                    <div className="state-item">
                                        <FaCheckCircle /> Uttar Pradesh
                                    </div>
                                    <div className="state-item">
                                        <FaCheckCircle /> Madhya Pradesh
                                    </div>
                                    <div className="state-item">
                                        <FaCheckCircle /> Rajasthan
                                    </div>
                                    <div className="state-item">
                                        <FaCheckCircle /> Assam
                                    </div>
                                </div>
                            </div>
                            <div className="coverage-image">
                                <img
                                    src="https://images.unsplash.com/photo-1580519542036-c47de6196ba5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                                    alt="India Map Coverage"
                                />
                            </div>
                        </div>

                        <div className="services-potential">
                            <div className="potential-icon">
                                <FaSeedling />
                            </div>
                            <h3>Growing Potential</h3>
                            <p>
                                Despite our rapid growth to over 2,000 centers, we have yet to reach our full potential.
                                As a startup with robust networks and strong fundamentals, we're positioned to outperform
                                the competition in the financial services industry.
                            </p>
                        </div>
                    </div>
                )}

                {activeSection === 'brochure' && (
                    <div className="content-section animate-fade">
                        <div className="brochure-section">
                            <h2><FaDownload /> Download Brochure</h2>
                            <div className="brochure-content">
                                <img src={Logo} alt="Company Logo" className="brochure-logo" />
                                <p className="brochure-description">
                                    Download our comprehensive company brochure to learn more about our services,
                                    products, and business offerings.
                                </p>
                                {/* <a
                                    href={Brochure}
                                    download="Maseehum-Task-Manager-Brochure.pdf"
                                    className="download-button"
                                >
                                    <FaDownload /> Download Brochure (PDF)
                                </a> */}
                                <button onClick={handleDownload} className="download-button">
                                    <FaDownload /> Download Brochure (PDF)
                                </button>
                                {/* <p className="brochure-note">
                                    File size: 2.5 MB | Updated: June 2023
                                </p> */}
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === 'news' && (
                    <div className="content-section animate-fade">
                        <div className="news-section">
                            <div className="section-header">
                                <FaNewspaper className="header-icon" />
                                <h2>Latest News</h2>
                            </div>

                            <div className="news-card">
                                <div className="news-header">
                                    <div className="news-badge">
                                        <FaTrophy className="badge-icon" />
                                        <span>Achievement</span>
                                    </div>
                                    <h3>mTm now recognized by #StartupIndia</h3>
                                </div>

                                <div className="news-content">
                                    <div className="news-text">
                                        <p>
                                            We are extremely happy to share this precious news, that Maseehum Task Manager Private Limited
                                            is now recognized as a startup by the Department for Promotion of Industry and Internal Trade
                                            for working in 'IT Service' industry and 'Project Management' sector.
                                        </p>
                                        <p>
                                            With your constant support and help we can achieve more and outperform the competition.
                                        </p>
                                    </div>

                                    <div className="news-image-container">
                                        <img
                                            src={startupIndiaCert}
                                            alt="Startup India Recognition Certificate"
                                            className="news-image"
                                        />
                                        <div className="image-caption">Our Startup India Recognition Certificate</div>
                                    </div>
                                </div>

                                <div className="news-footer">
                                    <div className="news-date">
                                        <FaCalendarAlt className="footer-icon" />
                                        <span>June 2022</span>
                                    </div>
                                    <div className="news-tags">
                                        <FaTags className="footer-icon" />
                                        <span>#StartupIndia #Recognition #Achievement</span>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="news-cta">
                                <p>Stay updated with our latest news and announcements</p>
                                <button className="cta-button">
                                    Subscribe to Newsletter <FaArrowRight className="cta-icon" />
                                </button>
                            </div> */}
                        </div>
                    </div>
                )}





            </div>
        </div>
    );
};

export default Aboutus;