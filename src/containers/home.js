import p5 from 'p5'
import * as THREE from 'three';
import { db } from '../services/firebase'
import Typewriter from 'typewriter-effect'
import TOPOLOGY from 'vanta/dist/vanta.waves.min'
import Footer from '../components/footer/footer'
import Navbar from '../components/navbar/navbar'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useHistory } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper'
import ProjectsPreview from '../components/projects-preview/projects-preview'
import { getGithubIcon, getLinkedInIcon, getEmailIcon, getTwitterIcon, getLoadingSpinner } from '../assets/inline-svgs'
import useWindowSize from '../hooks/useWindow'

import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
import Experience from '../components/experience/experience';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay])

const Home = () => {
  const history = useHistory()
  const [width] = useWindowSize()

  const [vantaEffect, setVantaEffect] = useState(0)
  const [projects, setProjects] = useState([])
  const [videos, setVideos] = useState([])
  const myRef = useRef(null)

  useEffect(() => {

    if (!vantaEffect) {
      setVantaEffect(TOPOLOGY({
        el: myRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        scale: 1.00,
        scaleMobile: 1.00,
        minHeight: 200.00,
        minWidth: 200.00,
        p5: p5,
        THREE: THREE,
        color: 0x0,
        shininess: 64.00,
        waveHeight: 21.50,
        waveSpeed: 0.50,
        zoom: 0.84
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

  useEffect(() => {
    db.collection('videos')
      .orderBy('dateTime', 'desc')
      .onSnapshot(snap => {
        const newVideos = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setVideos(newVideos)
      })

    return() =>{
      setVideos({})
    }
  }, [])

  return (
    <div>
      <Navbar />

      <section ref={myRef} style={{ color: 'white', minHeight: '100vh' }}>
        <div style={{ backgroundImage: 'linear-gradient(transparent, rgba(0,0,0,0.8))', minHeight: '100vh' }}>
          <div className="container" style={{ display: 'flex', alignItems: 'center', minHeight: '100vh' }}>
            <div>
              <h1 style={{ fontWeight: 800 }}>Hello, I'm Neelanjan!</h1>
              <h3>
                <Typewriter
                  options={{
                    pauseFor: 1000,
                    strings: [
                      "I'm a Software Development Engineer at Harness",
                      "I'm a Cloud-Native Enthusiast",
                      "I'm an Open-Source Contributor",
                      "I develop LitmusChaos (a CNCF incubating project)"
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 40,
                    deleteSpeed: 20
                  }}
                />
              </h3>
            </div>
          </div>
        </div>
      </section>

      <section style={{ color: 'white', minHeight: '100vh' }} id="about-me">
        <div style={{ backgroundColor: 'black' }}>
          <div className="container pt-5">
            <h1 style={{ fontWeight: 800 }} className='pt-5'>ABOUT ME</h1>
            <div className="row">
              <div className="col-lg-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={require("../assets/images/portrait.png")} style={{padding: width > 1280 ? '0 0 0 0' : '0 50px 50px 50px'}} alt="portrait" width="400" className="img-fluid" />
              </div>
              <div className="col-lg-7 ml-1">
                <h5 className="mb-0" style={{ textAlign: 'justify' }}>
                  I'm a Software Engineer who believes that Software Engineering is not about programming. 
                  For me, software engineering has been about learning to better understand the problems to be solved and being responsible 
                  about how my software influences the end-user. <br />
                  <br />
                  I am a Software Development Engineer working at <a href='https://harness.io/' target="_blank" rel="noopener noreferrer">Harness</a> and 
                  a core contributor to <a href="https://litmuschaos.io/" target="_blank" rel="noopener noreferrer">LitmusChaos</a>, a CNCF Incubating project 
                  for performing Chaos Engineering in cloud-native environments. Prior to joining Harness, I have been an SDE intern at <a href='https://chaosnative.com/' 
                  target="_blank" rel="noopener noreferrer">ChaosNative</a>, the company behind the LitmusChaos framework, where I found the opportunity 
                  to step into the cloud-native realm, explore the magic of Kubernetes, and ofcourse develop LitmusChaos. While I am not solving problems 
                  and writing code, I love to share my learnings with fellow software engineers with my technical <a href="/blogs">blogs</a>. I tend 
                  to write on a variety of topics including Chaos Engineering, Kubernetes, Docker, LitmusChaos to name a few.<br />
                  <br />
                  Additionally, I am always on the lookout to be a part of open source meetups and tech conferences, either as an attendee or even better, 
                  as a speaker. I have been a speaker in multiple international and domestic meetups and conferences including <a href='https://community.cncf.io/events/details/cncf-kcd-bengaluru-presents-kubernetes-community-days-bengaluru-2022-virtual-event/' target="_blank" rel="noopener noreferrer">
                  KCD Bengaluru 2022</a>, <a href='https://chaoscarnival.io/' target="_blank" rel="noopener noreferrer">ChaosCarnival 2022
                  </a>, <a href='https://community.cncf.io/cloud-native-scale/' target="_blank" rel="noopener noreferrer">CNCF Cloud native @Scale Meetup
                  </a>, <a href='https://community.cncf.io/kubernetes-chaos-engineering-meetup-group/' target="_blank" rel="noopener noreferrer">CNCF Chaos 
                  Engineering Meetup</a> and <a href='https://www.meetup.com/Kubernetes-Sri-Lanka/' target="_blank" rel="noopener noreferrer">Kubernetes Sri Lanka Meetup</a>.<br />
                  <br />
                  Beyond the buzz of the tech life, I cherish a steaming pot of coffee and a hardcover book on rainy days and a long walk through the woods on summer evenings.
                </h5>
                <div className="pt-4">
                  <a href="https://www.github.com/neelanjan00" target="_blank" rel="noopener noreferrer">
                    {getGithubIcon('white')}
                  </a>
                  <a href="https://www.linkedin.com/in/neelanjan00" target="_blank" rel="noopener noreferrer">
                    {getLinkedInIcon('white')}
                  </a>
                  <a href="https://www.twitter.com/NeelanjanManna" target="_blank" rel="noopener noreferrer">
                    {getTwitterIcon('white')}
                  </a>
                  <a href="mailto:hi@neelanjan.dev" target="_blank" rel="noopener noreferrer">
                    {getEmailIcon('white')}
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

      <section style={{ minHeight: width >= 1280 ? '65vh' : '95vh' }} id="my-talks">
        <div className='container pt-5'>
          <h1 style={{'fontWeight': 800}} className='mt-5 mt-md-0 pt-5 pb-3'>MY TALKS</h1>
          { projects.length !== 0 ? <Swiper
            parallax={true}
            spaceBetween={90}
            slidesPerView={width >= 1280 ? 2 : 1}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 2500, pauseOnMouseEnter: true }}>
            {videos.map((video, i) => {
              return <SwiperSlide key={i}>
                <div className="embed-responsive embed-responsive-16by9">
                  <iframe className="embed-responsive-item" width="512" height="288" loading='lazy' src={video.embedURL} title="YouTube" frameBorder={0} order="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
              </SwiperSlide>
            })}
          </Swiper> : <div className='mt-5'>{getLoadingSpinner()}</div>}
        </div>
      </section>

      <section style={{ minHeight: '100vh' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="rgb(230, 230, 230)" fillOpacity="1" d="M0,256L720,224L1440,288L1440,320L720,320L0,320Z"></path>
        </svg>
        <div style={{ backgroundColor: 'rgb(230, 230, 230)' }}>
          <div className="container">
            <h1 style={{ textAlign: 'center', fontWeight: 800 }} className="m-0">MY PROJECTS</h1>
            { projects.length !== 0 ? projects.map((project, i) => {
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
            }) : <div className='my-5'>{getLoadingSpinner()}</div>}
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
        <Experience />
      </section>

      <Footer />
    </div>
  )
}

export default Home