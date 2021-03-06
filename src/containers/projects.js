import { db } from '../services/firebase'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar/navbar'
import Footer from '../components/footer/footer'
import ProjectsPreview from '../components/projects-preview/projects-preview'
import { getLoadingSpinner } from '../assets/inline-svgs'

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

        return () => setProjects([])
    }, [])

    return ( 
        <div>
            <Navbar />

            <div className="container">
                <h1 style={{ textAlign: 'center', fontWeight: '800' }}>MY PROJECTS</h1>
                { projects.length !== 0 ? projects.map((project, i) => {
                    if(i % 2 === 0)
                        return <ProjectsPreview orientation="lr"
                                                title = {project.title}
                                                domain = {project.domain}
                                                description = {project.description}
                                                imageURL = {project.image}
                                                github = { project.github ? project.github : null}
                                                deployedLink = { project.deployedLink ? project.deployedLink : null}
                                                key = {project.id} />
                    else
                        return <ProjectsPreview orientation="rl"
                                                title = {project.title}
                                                domain = {project.domain}
                                                description = {project.description}
                                                imageURL = {project.image}
                                                github = { project.github ? project.github : null}
                                                deployedLink = { project.deployedLink ? project.deployedLink : null}
                                                key = {project.id} />                     
                }) : <div className='mt-5'>{getLoadingSpinner()}</div>
                }
            </div>
            <Footer />
        </div>
    )
}
 
export default Projects;