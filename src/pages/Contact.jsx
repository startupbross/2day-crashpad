import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import './Contact.css' // Optional: for custom styling

export default function Contact() {
  const formRef = useRef()
  const [status, setStatus] = useState(null)

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs
      .sendForm(
        'default_service', // Replace if you're using a different one
        'template_n2z9osj',
        formRef.current,
        'chB-rPw0P1_eOE9iN' // Your public key
      )
      .then(
        () => {
          setStatus('SUCCESS')
          formRef.current.reset()
        },
        () => {
          setStatus('ERROR')
        }
      )
  }

  return (
    <div className="contact-page" style={{ color: 'white', padding: '4rem 2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Contact</h1>
      <p>Let’s move fast. Fill out the form and we’ll get back within the hour.</p>

      <form ref={formRef} onSubmit={sendEmail} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>
        <input type="text" name="name" placeholder="Your Name" required style={{ padding: '1rem', fontSize: '1rem' }} />
        <input type="email" name="email" placeholder="Your Email" required style={{ padding: '1rem', fontSize: '1rem' }} />
        <textarea name="message" placeholder="What do you need?" rows="6" required style={{ padding: '1rem', fontSize: '1rem' }} />
        <button type="submit" style={{ padding: '1rem', fontSize: '1rem', background: 'white', color: '#000', fontWeight: 'bold', border: 'none' }}>
          Send It
        </button>
      </form>

      {status === 'SUCCESS' && <p style={{ marginTop: '2rem', color: '#0f0' }}>Thanks — we’ll be in touch soon.</p>}
      {status === 'ERROR' && <p style={{ marginTop: '2rem', color: '#f00' }}>Oops, something went wrong. Try again.</p>}
    </div>
  )
}
