import React, { useState } from 'react'
import Navbar from '../components/navbar/navbar'
import Footer from '../components/footer/footer'
import { auth, db, storage } from '../services/firebase'
import { useHistory } from 'react-router-dom'

const AddProjects = () => {

    const history = useHistory()

    var [projectState, setProjectState] = useState({
        title: '', 
        domain: '', 
        description: '', 
        github: '', 
        deployedLink: '', 
        image: '',
        dateTime: ''
    })

    var [uploadedImage, setUploadedImage] = useState(null)

    const projectSubmitHandler = async event => {
        event.preventDefault()
        event.target.reset()

        const uploadTaskSnapshot = await storage.ref(`project-images/${uploadedImage.name}`).put(uploadedImage)

        const imageURL = await uploadTaskSnapshot.ref.getDownloadURL()

        const uploadDataSnapshot = await db.collection('projects').add({ ...projectState, image:imageURL, dateTime: Date.now() })

        if(uploadDataSnapshot)
            alert("Data Uploaded Successfully")
        else
            console.log("ERROR")
    }

    const handleInputChange = event => {
        event.preventDefault()

        setProjectState({
            ...projectState,
            [event.target.name] : event.target.value
        })
    }

    const handleImageInputChange = event => {
        event.preventDefault()

        if(event.target.files[0])
            setUploadedImage(event.target.files[0])
    }

    const logoutHandler = event => {
        event.preventDefault()
        auth.signOut().then(() => history.push('/'))
    }

    return (
        <div>
            <Navbar source="add-projects" />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#000000" fillOpacity="1" d="M0,224L720,160L1440,256L1440,0L720,0L0,0Z"></path>
            </svg>

            <div className="container p-5" style={{ backgroundColor: 'lightgrey' }}>
                <h1 style={{ textAlign: 'center', fontWeight: '800' }}
                    className="pb-4">ADD PROJECT</h1>
                <form onSubmit={projectSubmitHandler}>
                    <div className="row">
                        <div className="col-lg-6 col-12">
                            <input type="text" name="title" onChange={handleInputChange}
                                style={{ borderRadius: '0', border: 'none' }}
                                className="form-control" placeholder="Project Title" />
                        </div>
                        <div className="col-lg-6 col-12 pt-lg-0 pt-4">
                            <input type="text" name="domain" onChange={handleInputChange}
                                style={{ borderRadius: '0', border: 'none' }}
                                className="form-control" placeholder="Project Domain" />
                        </div>
                    </div>
                    <div className="form-group pt-3">
                        <textarea name="description" rows="5" className="form-control" onChange={handleInputChange}
                            style={{ borderRadius: '0', border: 'none' }} placeholder="Project Description"></textarea>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-12">
                            <input type="text" name="github" onChange={handleInputChange}
                                style={{ borderRadius: '0', border: 'none' }}
                                className="form-control" placeholder="Github URL" />
                        </div>
                        <div className="col-lg-6 col-12 pt-lg-0 pt-4">
                            <input type="text" name="deployedLink" onChange={handleInputChange}
                                style={{ borderRadius: '0', border: 'none' }}
                                className="form-control" placeholder="Deployed URL" />
                        </div>
                    </div>
                    <div className="form-group pt-4">
                        <label htmlFor="project-image">Upload Project Image</label>
                        <input type="file" className="form-control-file" id="project-image" 
                               onChange={handleImageInputChange} />
                    </div>
                    <center>
                        <button className="btn btn-outline-secondary" style={{ borderRadius: '0' }}>SUBMIT</button>
                    </center>
                </form>
            </div>

            <center>
                <button className="btn btn-outline-dark mt-5" onClick={logoutHandler} 
                        style={{ borderRadius: '0' }}>LOG OUT</button>
            </center>
            
            <Footer />
        </div>
    )
}

export default AddProjects;