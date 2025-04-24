import React from 'react'
import { Link } from 'react-router-dom'
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
]

export default function Projects() {
  return (
    <div style={{ paddingTop: '64px', minHeight: '100vh' }}>
      <div className="projects-page">
        <div className="projects-grid">
          {projects.map((project) => (
            <Link to={`/projects/${project.slug}`} key={project.slug} className="project-card">
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
          ))}
        </div>
      </div>
    </div>
  )
}
