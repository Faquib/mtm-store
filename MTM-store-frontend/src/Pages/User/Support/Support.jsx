import React, { useState, useEffect } from 'react';
import {
  FiHeadphones,
  FiMail,
  FiPhone,
  FiMessageSquare,
  FiChevronDown,
  FiChevronUp,
  FiClock,
  FiMapPin,
  FiHelpCircle,
  FiTruck,
  FiCreditCard,
  FiShield,
  FiRefreshCw,
  FiX,
  FiBox,
  FiDollarSign,
  FiGlobe,
  FiPackage,
  FiFileText,
  FiLock,
  FiArrowLeft
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
// import UserLayout from '../../User/UserPanel/UserLayout';
import './Support.scss';
import Loader from '../../../Components/Loader/Loader';
import { useLocation } from 'react-router-dom';

const Support = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('faq');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const openTopicModal = (topic) => {
    setSelectedTopic(topic);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLearnMore = () => {
    closeModal();
    navigate('/termsandprivacy');
  };

  const faqs = [
    {
      question: "What is your return policy?",
      answer: "We offer a 7-day return policy for most items. Items must be unused, in original packaging with all accessories. Some exclusions apply for opened software or personalized items."
    },
    {
      question: "Do you offer international shipping?",
      answer: "We don't do international shipping."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept only UPI and Bank Transfer."
    },
    {
      question: "How do I contact customer support?",
      answer: "You can reach us through our live chat, email at support@mtm-store.com, or phone at +91 9311886444 during business hours 10AM-7PM (Monday To Saturday)."
    },
    // {
    //   question: "Are my payments secure?",
    //   answer: "Absolutely. We use industry-standard SSL encryption and PCI-compliant payment processing through Razorpay. We never store your full payment details."
    // }
  ];

  const supportTopics = [
    {
      icon: <FiTruck size={24} />,
      title: "Shipping Policy",
      description: "Information about order processing, delivery timelines and shipping areas",
      content: `
        <h3>Shipment Processing Time</h3>
        <p>All orders are processed within 3–5 business days of receipt. Orders are not processed or shipped on Sunday, or holidays.</p>
        
        <h3>Delivery Delays</h3>
        <p>If we are experiencing a high volume of orders, shipments may be delayed by a few days. If your shipment experiences a significant delay, we will contact you via email or phone.</p>
        
        <h3>Shipping Areas</h3>
        <p>Maseehum Task Manager Pvt. Ltd. ships to addresses within the borders of INDIA. We currently do not ship internationally.</p>
        
        <h3>Order Tracking</h3>
        <p>You will receive a Order Confirmation email once your order has approved. you can track in your Orders section.</p>
      `
    },
    {
      icon: <FiBox size={24} />,
      title: "Damaged or Lost Items",
      description: "What to do if your order arrives damaged or goes missing",
      content: `
        <h3>Damaged Items</h3>
        <p>Maseehum Task Manager Pvt. Ltd. is not liable for any products damaged or lost during shipping. If you received your order damaged, please file a claim with the shipment carrier. Save all packaging materials and damaged goods before filing a claim.</p>
        
        <h3>Missing or Stolen Shipments</h3>
        <p>If you didn't receive your order but the shipping carrier has reported that it was delivered, please contact us immediately at:</p>
        <ul>
          <li>Phone: +91 9311886444</li>
          <li>WhatsApp: +91 9311886444</li>
          <li>Email: support@mtm-store.com</li>
        </ul>
        <p>We will file a claim with the shipping carrier and local law enforcement will be involved. We will replace or refund your order when the investigation is complete. Allow up to 30 days for the investigation.</p>
      `
    },
    {
      icon: <FiRefreshCw size={24} />,
      title: "Cancellation & Refund Policy",
      description: "How to cancel your order and our refund process",
      content: `
        <h3>Cancellation Timeframe</h3>
        <p>We know your time is valuable, and ours is too. Out of respect for our staff and our other clients, we ask that you please cancel the order before shipping details are provided to you i.e. within 24 hours of placing the order.</p>
        
        <h3>Late Cancellations</h3>
        <p>If you cancel after the shipping details have been provided (after 24 hours), courier charges will be deducted from your refund.</p>
        
        <h3>Refund Process</h3>
        <p>Once we receive your returned item, we will inspect it and notify you that we have received your returned item. We will immediately notify you on the status of your refund after inspecting the item. If your return is approved, we will initiate a refund to your original method of payment. You will receive the credit within a certain amount of days, depending on your card issuer's policies.</p>
      `
    },
    {
      icon: <FiFileText size={24} />,
      title: "Terms of Service",
      description: "Our terms and conditions for using our services",
      content: `
        <h3>Overview</h3>
        <p>This website is operated by Maseehum Task Manager Pvt. Ltd. By visiting our site and/or purchasing something from us, you engage in our "Service" and agree to be bound by the following terms and conditions.</p>
        
        <h3>Online Store Terms</h3>
        <p>By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence. You may not use our products for any illegal or unauthorized purpose.</p>
        
        <h3>General Conditions</h3>
        <p>We reserve the right to refuse service to anyone for any reason at any time. You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service without express written permission by us.</p>
        
        <h3>Changes to Terms</h3>
        <p>We reserve the right to update, change or replace any part of these Terms of Service by posting updates to our website. Your continued use of the website constitutes acceptance of those changes.</p>
        
        <h3>Contact Information</h3>
        <p>Questions about the Terms of Service should be sent to us at support@mtm-store.com.</p>
      `
    },
    {
      icon: <FiLock size={24} />,
      title: "Privacy Policy",
      description: "How we collect, use and protect your personal information",
      content: `
        <h3>Information Collection</h3>
        <p>When you purchase something from our store, we collect personal information you provide such as name, address and email address. We also automatically receive your computer's IP address.</p>
        
        <h3>Consent</h3>
        <p>When you provide personal information to complete a transaction, we imply you consent to our collecting it. If we ask for personal information for marketing, we will ask for your expressed consent.</p>
        
        <h3>Disclosure</h3>
        <p>We may disclose your personal information if required by law or if you violate our Terms of Service.</p>
        
        <h3>Changes to Policy</h3>
        <p>We reserve the right to modify this privacy policy at any time. Changes will take effect immediately upon posting on the website.</p>
      `
    },
    {
      icon: <FiGlobe size={24} />,
      title: "International Shipping",
      description: "Information about shipping outside India",
      content: `
        <h3>Current Shipping Policy</h3>
        <p>We currently do not ship outside India. All orders must be delivered to addresses within India.</p>
        
        <h3>Future Plans</h3>
        <p>We may expand our shipping to international locations in the future. Please check back for updates or subscribe to our newsletter to be notified when we begin international shipping.</p>
      `
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const scaleUp = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } }
  };

  return (

    <>
    {/* Back Button moved outside the support container */}
    <motion.button
      className="back-button"
      onClick={() => navigate('/')}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <FiArrowLeft size={20} />
      <span>Back to Home</span>
    </motion.button>
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="support-container"
    >

      {/* Back Button Added Here */}
      <motion.button
        className="back-button"
        onClick={() => navigate('/')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FiArrowLeft size={20} />
        <span>Back to Home</span>
      </motion.button>

      <motion.div variants={itemVariants} className="support-hero">
        <div className="hero-content">
          <h1>How can we help you today?</h1>
          <p className="hero-subtitle">We're here to help with any questions about your orders, products, or account.</p>
        </div>
        <div className="hero-image">
          <motion.div
            className="icon-wrapper"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear"
            }}
          >
            <FiHelpCircle size={60} />
          </motion.div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="support-tabs">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={activeTab === 'faq' ? 'active' : ''}
          onClick={() => setActiveTab('faq')}
        >
          FAQs
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={activeTab === 'contact' ? 'active' : ''}
          onClick={() => setActiveTab('contact')}
        >
          Contact Us
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={activeTab === 'topics' ? 'active' : ''}
          onClick={() => setActiveTab('topics')}
        >
          Support Topics
        </motion.button>
      </motion.div>

      <motion.div variants={fadeIn} className="tab-content">
        {activeTab === 'faq' && (
          <motion.div
            className="faq-section"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <h2>Frequently Asked Questions</h2>
            <p className="search-results-count">Showing {faqs.length} frequently asked questions</p>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className={`faq-item ${expandedFaq === index ? 'expanded' : ''}`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="faq-question" onClick={() => toggleFaq(index)}>
                    <h3>{faq.question}</h3>
                    {expandedFaq === index ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                  <AnimatePresence>
                    {expandedFaq === index && (
                      <motion.div
                        className="faq-answer"
                        initial={{ maxHeight: 0, opacity: 0 }}
                        animate={{ maxHeight: 200, opacity: 1 }}
                        exit={{ maxHeight: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <p>{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'contact' && (
          <motion.div
            className="contact-section"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <h2>Contact Our Support Team</h2>
            <p className="section-description">Get in touch with our customer support through any of these methods</p>

            <div className="contact-methods">
              <motion.div
                className="contact-card"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="contact-icon">
                  <FiHeadphones size={32} />
                </div>
                <h3>Live Chat</h3>
                <p>Start a conversation with our team on WhatsApp</p>
                <motion.a
                  className="contact-btn"
                  href="https://wa.me/919311886444"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="btn-icon"><FiMessageSquare /></span>
                  Start Chat
                </motion.a>
              </motion.div>

              <motion.div
                className="contact-card"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="contact-icon">
                  <FiMail size={32} />
                </div>
                <h3>Email Us</h3>
                <p>Send us an email, we typically reply within 2 hours</p>
                <motion.a
                  className="contact-btn"
                  href="mailto:support@mtm-store.com"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="btn-icon"><FiMail /></span>
                  Send Email
                </motion.a>
              </motion.div>

              <motion.div
                className="contact-card"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="contact-icon">
                  <FiPhone size={32} />
                </div>
                <h3>Call Us</h3>
                <p>10AM - 7PM IST , Monday to Saturday</p>
                <motion.a
                  className="contact-btn"
                  href="tel:+919311886444"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="btn-icon"><FiPhone /></span>
                  +91 9311886444
                </motion.a>
              </motion.div>
            </div>

            <div className="contact-info">
              <motion.div
                className="info-card"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <div className="info-icon">
                  <FiMapPin size={20} />
                </div>
                <div className="info-content">
                  <h4>Our Location</h4>
                  <p>722B, 7th Floor, Hemkunt Chambers</p>
                  <p>Nehru Place, New Delhi 110019</p>
                </div>
              </motion.div>
              <motion.div
                className="info-card"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <div className="info-icon">
                  <FiClock size={20} />
                </div>
                <div className="info-content">
                  <h4>Business Hours</h4>
                  <p>Monday - Saturday: 10:00 AM - 7:00 PM IST</p>
                  <p>Sunday: Closed</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {activeTab === 'topics' && (
          <motion.div
            className="topics-section"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <h2>Support Topics</h2>
            <p className="section-description">Find detailed information about our policies and procedures</p>

            <div className="topics-grid">
              {supportTopics.map((topic, index) => (
                <motion.div
                  className="topic-card"
                  key={index}
                  onClick={() => openTopicModal(topic)}
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="topic-icon"
                    whileHover={{ rotate: 10 }}
                  >
                    {topic.icon}
                  </motion.div>
                  <h3>{topic.title}</h3>
                  <p>{topic.description}</p>
                  <span className="learn-more">Learn more →</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Topic Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="topic-modal open"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-overlay"
              onClick={closeModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="modal-content"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <motion.button
                className="modal-close"
                onClick={closeModal}
                whileHover={{ rotate: 90 }}
              >
                <FiX size={24} />
              </motion.button>
              <div className="modal-header">
                <motion.div
                  className="topic-icon"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {selectedTopic?.icon}
                </motion.div>
                <h2>{selectedTopic?.title}</h2>
                <p className="modal-subtitle">{selectedTopic?.description}</p>
              </div>
              <div
                className="modal-body"
                dangerouslySetInnerHTML={{ __html: selectedTopic?.content }}
              />
              <div className="modal-footer">
                {(selectedTopic?.title === "Terms of Service" || selectedTopic?.title === "Privacy Policy") ? (
                  <motion.button
                    className="modal-button learn-more-btn"
                    onClick={handleLearnMore}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                  </motion.button>
                ) : (
                  <motion.button
                    className="modal-button"
                    onClick={closeModal}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Got it, thanks!
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
    </>
  );
};

export default Support;