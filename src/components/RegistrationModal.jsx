import React, { useState } from 'react';
import { createPortal } from 'react-dom';

// Replace this with your actual Google Apps Script Web App URL after deployment
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyfufZK67lakniYZ1QIeEQi4_RRWHUfr7wzqsTqBJoEgIX1pYGsrmBGdiAAx4Q21mho/exec";

export default function RegistrationModal({ isOpen, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handlePhoneChange = (e) => {
    let value = e.target.value;

    if (value === '+63' || value === '+63 ') {
      setContactNumber('');
      return;
    }

    let digits = value.replace(/\D/g, '');

    if (digits.startsWith('63')) digits = digits.substring(2);
    else if (digits.startsWith('0')) digits = digits.substring(1);

    digits = digits.substring(0, 10);

    let formatted = '';
    if (digits.length > 0) {
      formatted = '+63';
      formatted += digits.substring(0, 3);
      if (digits.length > 3) formatted += '' + digits.substring(3, 6);
      if (digits.length > 6) formatted += '' + digits.substring(6, 10);
    }

    setContactNumber(formatted);
  };

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent spam clicks
    setIsSubmitting(true);
    setStatusMessage("Submitting...");

    const form = e.target;
    const formData = new FormData(form);

    // Add timestamp
    formData.append("timestamp", new Date().toLocaleString());

    fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: formData,
      mode: 'no-cors' // Required for Google Apps Script to avoid CORS errors
    })
      .then(() => {
        setIsSubmitting(false);
        form.reset();
        setContactNumber('');
        setStatusMessage("");
        setShowSuccessModal(true);
      })
      .catch((error) => {
        console.error('Error!', error.message);
        setStatusMessage("Error submitting registration. Please try again.");
        setIsSubmitting(false);
      });
  };

  if (showSuccessModal) {
    return createPortal(
      <div className="modal-overlay" onClick={() => { setShowSuccessModal(false); onClose(); }} style={{ alignItems: 'center' }}>
        <div className="modal-content" style={{ textAlign: 'center', padding: '3rem 2rem', borderRadius: '20px' }} onClick={(e) => e.stopPropagation()}>
          <div style={{ fontSize: '4rem', color: '#2e7d32', marginBottom: '1rem' }}>✓</div>
          <h2 style={{ color: '#2e7d32', marginBottom: '1rem' }}>Registration Successful!</h2>
          <p style={{ marginBottom: '2rem', color: '#666' }}>Your details have been successfully submitted. We will be in touch shortly.</p>
          <button className="btn btn-accent" onClick={() => { setShowSuccessModal(false); onClose(); }} style={{ padding: '0.8rem 2rem', width: 'auto', display: 'inline-block' }}>
            Continue
          </button>
        </div>
      </div>,
      document.body
    );
  }

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} disabled={isSubmitting}>&times;</button>
        <h2>Registration Form</h2>

        {statusMessage && (
          <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: statusMessage.includes('Error') ? '#ffebee' : '#e8f5e9', color: statusMessage.includes('Error') ? '#c62828' : '#2e7d32', borderRadius: '4px', textAlign: 'center', fontWeight: '500' }}>
            {statusMessage}
          </div>
        )}

        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Personal Details</h3>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input type="text" name="firstName" required placeholder="John" disabled={isSubmitting} />
              </div>
              <div className="form-group">
                <label>Surname</label>
                <input type="text" name="surname" required placeholder="Doe" disabled={isSubmitting} />
              </div>
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="email" required placeholder="john@example.com" disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>Contact Number</label>
              <input
                type="tel"
                name="contactNumber"
                required
                placeholder="+63 900 000 0000"
                disabled={isSubmitting}
                value={contactNumber}
                onChange={handlePhoneChange}
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Company Details</h3>
            <div className="form-group">
              <label>Company Name</label>
              <input type="text" name="companyName" required placeholder="Discovery Corp" disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>Position / Designation</label>
              <input type="text" name="position" required placeholder="Manager" disabled={isSubmitting} />
            </div>
          </div>

          <div className="form-group checkbox-group" style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', margin: '1.5rem 0 1rem' }}>
            <input type="checkbox" id="privacyPolicy" name="privacyPolicy" value="Agreed" required style={{ width: 'auto', marginTop: '3px', transform: 'scale(1.2)', cursor: 'pointer' }} disabled={isSubmitting} />
            <label htmlFor="privacyPolicy" style={{ fontSize: '0.85rem', color: 'rgba(13, 13, 13, 0.8)', textTransform: 'none', fontWeight: '500', letterSpacing: 'normal', lineHeight: '1.5', cursor: 'pointer' }}>
              I agree that Discovery Capital Finance Corp. may collect, use, and process my personal information provided in this form for the purposes of registration and related updates.
            </label>
          </div>

          <button type="submit" className="btn btn-accent" style={{ width: '100%', marginTop: '1rem', opacity: isSubmitting ? 0.7 : 1 }} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Registration'}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}
