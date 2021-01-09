import { db } from '../services/firebase'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar/navbar'
import Footer from '../components/footer/footer'
import ProjectsPreview from '../components/projects-preview/projects-preview'

const Projects = () => {

    var [projects, setProjects] = useState([])

    useEffect(() => {
        db
        .collection('projects')
        .orderBy('dateTime', 'desc')
        .onSnapshot(snap => {
            const newProjects = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setProjects(newProjects)
        })
    }, [])

    return ( 
        <div>
            <Navbar source="projects" />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#000000" fillOpacity="1" d="M0,224L720,160L1440,256L1440,0L720,0L0,0Z"></path>
            </svg>

            <div className="container">
                <h1 style={{ textAlign: 'center', fontWeight: '800' }}>MY PROJECTS</h1>
                { projects.map((project, i) => {
                    if(i % 2 === 0)
                        return <ProjectsPreview orientation="lr"
                                                title = {project.title}
                                                domain = {project.domain}
                                                description = {project.description}
                                                imageURL = {project.image}
                                                github = { project.github ? project.github : null }
                                                deployedLink = { project.deployedLink ? project.deployedLink : null }
                                                key = {project.id} />
                    else
                        return <ProjectsPreview orientation="rl"
                                                title = {project.title}
                                                domain = {project.domain}
                                                description = {project.description}
                                                imageURL = {project.image}
                                                github = { project.github ? project.github : null }
                                                deployedLink = { project.deployedLink ? project.deployedLink : null }
                                                key = {project.id} />                     
                })}
            </div>
            <Footer />
        </div>
    )
}
 
export default Projects;