import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text3D } from '@react-three/drei'
import * as THREE from 'three'
import './Home.css'
import { Typewriter } from 'react-simple-typewriter';
import { FaXTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa6';


function SpiralField({ count = 3500, floaters = 300 }) {
  const meshRef = useRef()
  const dummy = new THREE.Object3D()
  const colorArray = new Float32Array((count + floaters) * 3)

  useEffect(() => {
    if (!meshRef.current) return

    for (let i = 0; i < count + floaters; i++) {
      let x, y, z
      if (i < count) {
        const angle = i * 0.05
        const radius = 3 + i * 0.007
        x = radius * Math.cos(angle)
        y = radius * Math.sin(angle)
        z = (Math.random() - 0.5) * 6
      } else {
        const r = Math.random() * 20 + 6
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        x = r * Math.sin(phi) * Math.cos(theta)
        y = r * Math.sin(phi) * Math.sin(theta)
        z = r * Math.cos(phi)
      }

      dummy.position.set(x, y, z)
      const sizeRand = Math.random()
      const scale = sizeRand < 0.33 ? 0.06 : sizeRand < 0.66 ? 0.09 : 0.13
      dummy.scale.set(scale, scale, scale)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)

      const color = new THREE.Color()
      color.setHSL(0.05 + 0.4 * (i / (count + floaters)), 1, 0.6)
      color.toArray(colorArray, i * 3)
    }

    meshRef.current.geometry.setAttribute('color', new THREE.InstancedBufferAttribute(colorArray, 3))
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [count, floaters])

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.001
    }
  })

  return (
    <instancedMesh ref={meshRef} args={[null, null, count + floaters]}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshStandardMaterial
        vertexColors
        emissive="#ffffff"
        emissiveIntensity={0.15}
        roughness={0.3}
        metalness={0.3}
      />
    </instancedMesh>
  )
}

function FloatingLogo() {
  return (
    <group position={[0, 0, 0]}>
      <Text3D
        font="/fonts/helvetiker_bold.typeface.json"
        size={3}
        height={0.3}
        bevelEnabled
        bevelSize={0.03}
        bevelThickness={0.05}
        curveSegments={12}
        position={[-3.5, -1.2, 0]}
      >
        2
        <meshStandardMaterial color="#FDF5E6" />
      </Text3D>
      <Text3D
        font="/fonts/helvetiker_bold.typeface.json"
        size={1.5}
        height={0.3}
        bevelEnabled
        bevelSize={0.03}
        bevelThickness={0.05}
        curveSegments={12}
        position={[-0.7, 0.1, 0]}
      >
        DAY
        <meshStandardMaterial color="#FDF5E6" />
      </Text3D>
    </group>
  )
}


export default function Home() {
  









  const [billingCycle, setBillingCycle] = useState('monthly')
  const [selectedTab, setSelectedTab] = useState(0)
  const [openIndex, setOpenIndex] = useState(null)


  const faqData = [
    [
      { question: "How much does a project cost?", answer: "Our minimum is $1,000. Most range $2,000–$4,000." },
      { question: "How long does a project take?", answer: "Most projects take 1 week depending on scope." },
      { question: "How do I request changes?", answer: "Use slack or book a metting with us. Next-day turnaround is standard." },
      { question: "Can I cancel anytime?", answer: "Yes — you can pause or cancel any time on monthly plans." },
      { question: "What's included in the files?", answer: "All source files: Figma, Webflow, PDFs, images, and more." }
    ],
    [
      { question: "What tools do you use?", answer: "Figma, Webflow, Notion, Slack, Loom — best-in-class tools." },
      { question: "Do I need to onboard?", answer: "We keep it simple. Book a call and we start within 24 hrs." },
      { question: "Can I invite my developer?", answer: "Yes. We can coordinate directly and hand off clean specs." },
      { question: "Do you do branding too?", answer: "Absolutely. Logos, guidelines, voice, color — everything." },
      { question: "Is this scalable?", answer: "Yes. Start small or scale to a full design pod over time." }
    ],
    [
      { question: "What’s the minimum cost?", answer: "$1,000. Most custom builds go higher depending on scope." },
      { question: "What’s your billing schedule?", answer: "50% upfront, 50% upon completion. Monthly plans auto-renew." },
      { question: "How soon can we start?", answer: "Within 24 hours of signing - our guarantee." },
      { question: "Do you offer discounts?", answer: "Yes. For long-term retainers or multi-project clients." },
      { question: "Do you work with startups?", answer: "Yes. 80%+ of our clients are smaller brands or startups." }
    ]
  ]

  useEffect(() => {
    const cards = document.querySelectorAll('.card')
    const revealCards = () => {
      cards.forEach(card => {
        const rect = card.getBoundingClientRect()
        if (rect.top < window.innerHeight - 100) {
          card.classList.add('reveal')
        }
      })
    }
    window.addEventListener('scroll', revealCards)
    revealCards()
    return () => window.removeEventListener('scroll', revealCards)
  }, [])
  
  useEffect(() => {
    const isDesktop = window.innerWidth >= 768
    if (!isDesktop) return
  
    const handleScroll = (event) => {
      const heroSection = document.querySelector('.hero-section')
  
      if (!heroSection) return
  
      const heroTop = heroSection.getBoundingClientRect().top + window.scrollY
  
      // If at the very top and scrolling down → snap to hero
      if (window.scrollY === 0 && event.deltaY > 0) {
        heroSection.scrollIntoView({ behavior: 'smooth' })
      }
  
      // If near hero section and scrolling up → snap back to top (Canvas)
      if (window.scrollY >= heroTop && window.scrollY < heroTop + 100 && event.deltaY < 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  
    window.addEventListener('wheel', handleScroll, { passive: true })
  
    return () => {
      window.removeEventListener('wheel', handleScroll)
    }
  }, [])
  



  return (
    <div className="home-container" style={{ position: 'relative' }}>
      <Canvas
        shadows
        camera={{ position: [12, -1, 30], fov: 50 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          zIndex: 0,
        }}
      >
        <color attach="background" args={['#111111']} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} />
        <spotLight position={[0, 10, 5]} angle={0.3} intensity={1.7} penumbra={0.4} castShadow />
        <OrbitControls enableZoom={false} enablePan={false} />
        <SpiralField />
        <FloatingLogo />
      </Canvas>

      {/* 🌟 MOBILE BUTTON HERE */}
      <button
        className="enter-button"
        onClick={() =>
          document.querySelector('.hero-section').scrollIntoView({ behavior: 'smooth' })
        }
      >
        Enter →
      </button>

      {/*HERO SECTION*/}

    

      <section className="hero-section">
        <h1 className="hero-headline">
          Launch your{' '}
          <span className="hero-word">
            <Typewriter
              words={['brand', 'idea', 'site', 'product']}
              loop={Infinity}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </span>
        </h1>
        <h2 className="hero-subheading">
        We design and launch your brand, website, and social presence in just 2 days, giving startups and creators everything they need to stand out.
        </h2>

      </section>




   
    

      {/* Offerings Section */}
      <section className="offerings-section">
        <div className="section-pill">
          What we offer
        </div>
 
        <h2>
          We support your business with the full stack to help you{' '}
          <span className="highlighted-word">stand out</span>.
        </h2>

        <div className="cards">
          <div className="card">
            <img src="/images/2day.1.jpg" alt="Web Design" />
            <h3>Web Design & Development</h3>
            <p>Get a stunning website that converts your users. We ship high-conversion landing pages to enterprise websites quickly while stressing the details.</p>
          </div>
          <div className="card">
            <img src="/images/2day.2.jpg" alt="Brand Design" />
            <h3>Brand Design</h3>
            <p>Build a strong brand right from it's inception. We help startups with everything from strategy to guidelines to templates.</p>
          </div>
          <div className="card">
            <img src="/images/2day.7.jpg" alt="Design Sprints" />
            <h3>Design Sprints</h3>
            <p>To test the waters for a design partnership or retainer, we also run sprints to support with your startup's product or digital design needs.</p>
          </div>
        </div>

        <div className="tldr-section">
          <h4>2DAY...</h4>
          <div className="tldr-pills">
            {['Brand Design', 'Web Builders', 'Pitch Decks', 'Product Design', 'Design Systems', 'Social Posts', 'Canva Templates', 'Digital Design', 'Launch Videos'].map((text, i) => (
              <div key={i} className="pill-small">
                <span className="sparkle-icon">✦</span>
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      



      {/* Pricing Section */}
      <section className="pricing-section">
        <div className="section-pill">
          Transparent Pricing
        </div>

        <h2>
          We support your business with <span className="italic">plans</span> and <span className="italic">options</span>
        </h2>
        <div className="toggle-container">
          <button className={`toggle-button ${billingCycle === 'monthly' ? 'active' : ''}`} onClick={() => setBillingCycle('monthly')}>Monthly</button>
          <button className={`toggle-button ${billingCycle === 'quarterly' ? 'active' : ''}`} onClick={() => setBillingCycle('quarterly')}>Quarterly</button>
        </div>

        <div className="cards pricing-cards">
          <div className="card">
            <h4>Monthly Unlimited Service</h4>
            <div className="price">
              <span>{billingCycle === 'monthly' ? '$1,000' : '$2,500'}</span>
              <span className="subtext">{billingCycle === 'monthly' ? '+ tax / month' : '+ tax / 3 months'}</span>
            </div>
            <ul>
              <li>✔ Unlimited custom design requests (web, brand, social)</li>
              <li>✔ Fully custom website (design + build) included</li>
              <li>✔ Full social media management + content design</li>
              <li>✔ Unlimited revisions + ongoing updates</li>
              <li>✔ Fast 1–2 day turnaround per task</li>
              <li>✔ Slack + Notion collaboration, cancel anytime</li>
            </ul>
            <a href="https://calendly.com/contact-2day/30min" target="_blank" className="cta-button">Start a project →</a>
          </div>
          <div className="card">
            <h4>Adhoc Design Service</h4>
            <div className="price"><span>$750</span><span className="subtext">+ tax project min</span></div>
            <ul>
              <li>✔ Complete custom website (design + build)</li>
              <li>✔ Full visual brand identity (logo, colors, fonts, kit)</li>
              <li>✔ Custom social media kit + templates</li>
              <li>✔ One-off sprint: delivered in 7-10 days</li>
              <li>✔ Strategy session + kickoff call</li>
              <li>✔ All final files, brand book, and website assets delivered</li>
            </ul>
            <a href="https://calendly.com/contact-2day/30min" target="_blank" className="cta-button">Start a project →</a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="faq-wrapper">
          <div className="faq-tabs">
            {['Design Subscription', 'Services & Tools', 'Adhoc Pricing & Timeline'].map((tab, index) => (
              <button key={tab} className={`faq-tab ${selectedTab === index ? 'active' : ''}`} onClick={() => { setSelectedTab(index); setOpenIndex(null) }}>
                {tab}
              </button>
            ))}
          </div>
          <div className="faq-content">
            

            <h2 className="faq-title">
              Got some questions?<br />
              <span className="italic">Here are some answers.</span>
            </h2>
            {faqData[selectedTab].map((faq, index) => (
              <div key={index} className={`faq-item ${openIndex === index ? 'open' : ''}`}>
                <div className="faq-question" onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                  <span className="faq-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="faq-text">{faq.question}</span>
                  <span className="faq-toggle">{openIndex === index ? '−' : '+'}</span>
                </div>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

            {/* Call-to-Action Section */}
            <section className="cta-section">
        <h2 className="cta-title">See if we're right for you.</h2>
        <a href="https://calendly.com/contact-2day/30min" target="_blank" className="cta-main-button">
          Get Started
        </a>
        <div className="cta-features">
          <div className="cta-feature-item"> Cancel anytime</div>
          <div className="cta-feature-item"> Unlimited revisions</div>
          <div className="cta-feature-item"> Unlimited team members</div>
        </div>
      </section>




      <section className="nav-section">
        <div className="nav-socials">
          <a href="https://x.com" target="_blank" rel="noopener noreferrer">
            <FaXTwitter size={20} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn size={20} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={20} />
          </a>
        </div>

        <div className="nav-center">
          <h1>
            2DAY<br />STUDIO
          </h1>
        </div>

        <div className="nav-footer">
          © 2025 2DAY STUDIO INC.
        </div>
      </section>


    </div>
  )

  
}

