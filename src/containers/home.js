import * as THREE from 'three'
import { db } from '../services/firebase'
import Typewriter from 'typewriter-effect'
import DOTS from 'vanta/dist/vanta.net.min'
import Footer from '../components/footer/footer'
import Navbar from '../components/navbar/navbar'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useHistory } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import ProjectsPreview from '../components/projects-preview/projects-preview'

import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
import 'react-circular-progressbar/dist/styles.css';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

const Home = () => {
  const history = useHistory()

  const [vantaEffect, setVantaEffect] = useState(0)
  var [projects, setProjects] = useState([])
  const myRef = useRef(null)

  useEffect(() => {

    if (!vantaEffect) {
      setVantaEffect(DOTS({
        el: myRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x3fb2ff,
        backgroundColor: 0xc0b0e,
        THREE: THREE
      }))
    }

    return () => {
      if (vantaEffect)
        vantaEffect.destroy()
    }

  }, [vantaEffect])

  useEffect(() => {
    db.collection('projects')
      .orderBy('dateTime', 'desc')
      .limit(3)
      .onSnapshot(snap => {
        const newProjects = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setProjects(newProjects)
      })

    return() =>{
      setProjects({})
    }
  }, [])

  return (
    <div>
      <Navbar source="home" />

      <section ref={myRef} style={{ color: 'white', minHeight: '100vh' }}>
        <div style={{ backgroundImage: 'linear-gradient(transparent, rgba(0,0,0,0.8))', minHeight: '100vh' }}>
          <div className="container" style={{ display: 'flex', alignItems: 'center', minHeight: '100vh' }}>
            <div>
              <h1 style={{ fontWeight: 800 }}>HELLO IT'S NEELANJAN MANNA</h1>
              <h3>
                <Typewriter
                  options={{
                    pauseFor: 2500,
                    strings: ["I'M A DATA SCIENCE ENTHUSIAST",
                      "I'M A MACHINE LEARNING ENTHUSIAST",
                      "I'M A FULL-STACK DEVELOPER"],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </h3>
            </div>
          </div>
        </div>
      </section>

      <section style={{ color: 'white', minHeight: '100vh' }}>
        <div style={{ backgroundColor: 'black' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-5" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={require("../assets/images/portrait.png")}
                  alt="portrait" width="400" className="img-fluid" />
              </div>
              <div className="col-lg-7">
                <h1 style={{ fontWeight: 800 }}>ABOUT ME</h1>
                <h5 className="mb-0" style={{ textAlign: 'justify' }}>
                  I have a dream. I have always wanted to impart a difference in people's lives, by empowering them with the goodness and opportunities they truly deserve.
                  <br/><br/> 
                  Being a computer science undergraduate, I realise my dream a little more each day, when I use my knowledge to solve crucial real world problems such as diagnosis of diseases, traffic accident prevention, blind and deaf assistance, to name a few.
                  <br/><br/> 
                  I am only awed to explore the realm of data science and machine learning, everyday. I feel exhilarated while learning any new skill and applying to solve a problem, which drives me to always keep learning. To build solutions for problems that can touch people's lives means the world to me.
                  <br/><br/> 
                  My specialities include development of Computer Vision applications, Deep Learning applications and Machine Learning applications. I am also well versed with MERN technology stack for web development and I am a seasoned JavaScript developer.
                </h5>
                <div className="pt-4">
                  <a href="https://www.github.com/neelanjan00"
                    target="_blank" rel="noopener noreferrer">
                    <img src={require("../assets/images/github.svg")}
                      alt="github" width="40" className="mx-3" />
                  </a>
                  <a href="https://www.linkedin.com/in/neelanjan00"
                    target="_blank" rel="noopener noreferrer">
                    <img src={require("../assets/images/linkedin.svg")} alt="linkedin"
                      width="40" className="mx-3" />
                  </a>
                  <a href="mailto:neelanjanmanna@gmail.com">
                    <svg width="2.8em" height="2.8em" viewBox="0 0 16 16" className="bi bi-envelope mx-3" fill="#fff" xmlns="http://www.w3.org/2000/svg" >
                      <path fillRule="evenodd" d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#0xc0b0e" fillOpacity="1" d="M0,160L720,96L1440,192L1440,0L720,0L0,0Z"></path>
        </svg>
      </section>

      <section className="pt-4">
        <div className="container">
          <h1 style={{ fontWeight: 800 }}>MY SKILLS</h1>
          <div className="row py-5">
            <div className="col-lg-3 col-12 p-5 p-lg-4">
              <CircularProgressbar value={70} text={`${70}%`} />
              <h3 className="pt-3" style={{ textAlign: 'center' }}>Machine Learning</h3>
            </div>
            <div className="col-lg-3 col-12 p-5 p-lg-4">
              <CircularProgressbar value={65} text={`${65}%`} />
              <h3 className="pt-3" style={{ textAlign: 'center' }}>Data Science</h3>
            </div>
            <div className="col-lg-3 col-12 p-5 p-lg-4">
              <CircularProgressbar value={85} text={`${85}%`} />
              <h3 className="pt-3" style={{ textAlign: 'center' }}>Web Development</h3>
            </div>
            <div className="col-lg-3 col-12 p-5 p-lg-4">
              <CircularProgressbar value={80} text={`${80}%`} />
              <h3 className="pt-3" style={{ textAlign: 'center' }}>Javascript</h3>
            </div>
          </div>
        </div>
      </section>

      <section style={{ minHeight: '100vh' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="rgb(230, 230, 230)" fillOpacity="1" d="M0,256L720,224L1440,288L1440,320L720,320L0,320Z"></path>
        </svg>
        <div style={{ backgroundColor: 'rgb(230, 230, 230)' }}>
          <div className="container">
            <h1 style={{ textAlign: 'center', fontWeight: 800 }} className="m-0 pb-5">MY PROJECTS</h1>
            {projects.map((project, i) => {
              if (i % 2 === 0)
                return <ProjectsPreview orientation="lr"
                  title={project.title}
                  domain={project.domain}
                  description={project.description}
                  imageURL={project.image}
                  github={project.github ? project.github : null}
                  deployedLink={project.deployedLink ? project.deployedLink : null}
                  key={project.id} />
              else
                return <ProjectsPreview orientation="rl"
                  title={project.title}
                  domain={project.domain}
                  description={project.description}
                  imageURL={project.image}
                  github={project.github ? project.github : null}
                  deployedLink={project.deployedLink ? project.deployedLink : null}
                  key={project.id} />
            })}
            <center>
              <button onClick={() => history.push('/projects')}
                className="btn btn-outline-secondary"
                style={{ borderRadius: '0' }}>View More</button>
            </center>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="rgb(230, 230, 230)" fillOpacity="1" d="M0,0L720,128L1440,64L1440,0L720,0L0,0Z"></path>
        </svg>
      </section>

      <section className="mb-5">
        <div className="container">
          <h1 className="pb-5" style={{ textAlign: 'center', fontWeight: 800 }}>EXPERIENCE</h1>
          <Swiper
            spaceBetween={30}
            slidesPerView={window.screen.width >= 1280 ? 3 : 1}
            pagination={{ clickable: true }}>
            <SwiperSlide>
              <div className="p-3" style={{
                minHeight: '200px',
                backgroundColor: 'rgb(230, 230, 230)'
              }} >
                <h5>IOT LAB, KIIT UNIVERSITY</h5>
                <h6>Aug, 2019 - Present</h6>
                <p className="pt-2">
                  IoT Lab is a research lab under the School of Computer Engineering, KIIT University. 
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="p-3" style={{
                minHeight: '200px',
                backgroundColor: 'rgb(230, 230, 230)'
              }} >
                <h5>WEC MINDS PVT. LTD.</h5>
                <h6>Nov, 2019 - Present</h6>
                <p className="pt-2">
                  Developed an online startup evaluation portal for Startup Odisha, an initiative by the Government of Odisha.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="p-3" style={{
                minHeight: '200px',
                backgroundColor: 'rgb(230, 230, 230)'
              }} >
                <h5>FIND ME MENTOR</h5>
                <h6>Jul, 2020 - Present</h6>
                <p className="pt-2">
                  Find Me Mentor is an educational startup which offers online education and courses of an individual's choice.
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home