import React from 'react'
import Navbar from './components/navbar.jsx'
import Hero from './components/hero.jsx'

import IntegrationSection from './components/IntegrationSection.jsx'
import HeroVideo from './components/HeroVideo.jsx'
import TrustedLogos from './components/TrustedLogos.jsx'
import Features from './components/Features.jsx'
import FeatureAccordion from './components/FeatureAccordion.jsx'
import AnimatedCTA from './components/AnimatedCTA.jsx'
import Footer from './components/Footer.jsx'
import RightTeamSection from './components/righttimesection.jsx'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <HeroVideo/>
      <TrustedLogos/>
      <Features/>
      <RightTeamSection/>
      {/* <RightFlowSection/> */}
      <FeatureAccordion/>
      <IntegrationSection/>
      <AnimatedCTA/>
      <Footer/>
    </div>
  )
}

export default App