import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import './Contact.css'

export default function Contact() {
  const formRef = useRef()
  const [status, setStatus] = useState(null)

  const sendEmail = (e) => {
    e.preventDefault()
    emailjs
      .sendForm('default_service', 'template_n2z9osj', formRef.current, 'chB-rPw0P1_eOE9iN')
      .then(() => {
        setStatus('SUCCESS')
        formRef.current.reset()
      }, () => {
        setStatus('ERROR')
      })
  }

  return (
    <div style={{ paddingTop: '64px', minHeight: '100vh' }}>
      <div className="contact-wrapper">
        <div className="contact-grid">
          <div className="contact-block">
            <h2 className="section-title">BOOK A CALL</h2>
            <div className="calendar-container">
              <iframe
                src="https://calendly.com/contact-2day/30min"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Schedule with 2DAY"
                style={{ minHeight: '600px', borderRadius: '8px' }}
              />
            </div>
          </div>

          <div className="contact-block">
            <h2 className="section-title">DROP US A WORD</h2>
            <div className="form-container">
              <form ref={formRef} onSubmit={sendEmail} className="contact-form">
                <div className="form-row">
                  <input type="text" name="name" placeholder="Name" required />
                  <input type="text" name="company" placeholder="Company" />
                </div>
                <input type="text" name="phone" placeholder="Phone" />
                <input type="email" name="email" placeholder="Email" required />
                <textarea name="message" placeholder="Message" rows="6" required />
                <button type="submit">Send It</button>
              </form>
              {status === 'SUCCESS' && <p className="success">Thanks — we’ll be in touch soon.</p>}
              {status === 'ERROR' && <p className="error">Oops, something went wrong. Try again.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
