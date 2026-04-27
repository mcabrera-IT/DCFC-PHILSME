import React from 'react';
import { createPortal } from 'react-dom';

export default function RegistrationModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>Registration Form</h2>
        
        <form className="registration-form" onSubmit={(e) => { e.preventDefault(); alert('Registration submitted!'); onClose(); }}>
          <div className="form-section">
            <h3>Personal Details</h3>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input type="text" required placeholder="John" />
              </div>
              <div className="form-group">
                <label>Surname</label>
                <input type="text" required placeholder="Doe" />
              </div>
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" required placeholder="john@example.com" />
            </div>
            <div className="form-group">
              <label>Contact Number</label>
              <input type="tel" required placeholder="+63 900 000 0000" />
            </div>
          </div>

          <div className="form-section">
            <h3>Company Details</h3>
            <div className="form-group">
              <label>Company Name</label>
              <input type="text" required placeholder="Discovery Corp" />
            </div>
            <div className="form-group">
              <label>Position / Designation</label>
              <input type="text" required placeholder="Manager" />
            </div>
          </div>

          <div className="form-group checkbox-group" style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', margin: '1.5rem 0 1rem' }}>
            <input type="checkbox" id="privacyPolicy" required style={{ width: 'auto', marginTop: '3px', transform: 'scale(1.2)', cursor: 'pointer' }} />
            <label htmlFor="privacyPolicy" style={{ fontSize: '0.85rem', color: 'rgba(13, 13, 13, 0.8)', textTransform: 'none', fontWeight: '500', letterSpacing: 'normal', lineHeight: '1.5', cursor: 'pointer' }}>
              I agree that Discovery Capital Finance Corp. may collect, use, and process my personal information provided in this form for the purposes of registration and related updates.
            </label>
          </div>

          <button type="submit" className="btn btn-accent" style={{ width: '100%', marginTop: '1rem' }}>
            Submit Registration
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}
