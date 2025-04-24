import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Projects.css'

const projects = [
  {
    title: 'Puma x NFT',
    slug: 'louvre-france',
    video: '/videos/day2.3.mp4',
  },
  {
    title: 'The Louvre',
    slug: 'procurian',
    image: '/images/2day.1.jpg',
  },
  {
    title: 'Miller',
    slug: 'on-the-bench',
    video: '/videos/day2.4.mp4',
  },
  {
    title: 'Johnson & Johnson',
    slug: 'corktown',
    image: '/images/2day.2.jpg',
  },
  {
    title: 'IAN AI',
    slug: 'IANAI-project',
    video: '/videos/2day.10.mp4',
  },
  {
    title: 'Ceres',
    slug: 'Ceres-project',
    video: '/videos/day2.5.mp4',
  },
  {
    title: 'Janick Cusine',
    slug: 'heineken-concept',
    image: '/images/2day.9.jpg',
  },
  {
    title: 'Innerself Running',
    slug: 'innerself-project',
    video: '/videos/2day.6.mp4',
  },
]

export default function Projects() {
  return (
    <div className="projects-page">
      <h1 className="projects-heading">Recent Work</h1>
      <div className="projects-grid">
        {projects.map((project, i) => (
          <motion.div
            key={project.slug}
            className="project-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Link to={`/projects/${project.slug}`}>
              <div className="media-wrapper">
                {project.video ? (
                  <video
                    src={project.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="project-media"
                  />
                ) : (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-media"
                  />
                )}
              </div>
              <h2 className="project-title">{project.title}</h2>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
