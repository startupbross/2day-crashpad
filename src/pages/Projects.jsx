import React from 'react'
import { Link } from 'react-router-dom'
import './Projects.css'

const projects = [
  {
    title: 'The Louvre',
    slug: 'louvre-france',
    video: '/videos/louvre.mp4',
  },
  {
    title: 'Procurian',
    slug: 'procurian',
    image: '/images/2day.1.jpeg',
  },
  {
    title: 'On the Bench',
    slug: 'on-the-bench',
    video: '/videos/on-the-bench.mp4',
  },
  {
    title: 'Corktown',
    slug: 'corktown',
    image: '/images/2day.2.jpeg',
  },
]

export default function Projects() {
  return (
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
                />
              ) : (
                <img 
                  src={project.image}
                  alt={project.title}
                />
              )}
            </div>
            <h2>{project.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  )
}
