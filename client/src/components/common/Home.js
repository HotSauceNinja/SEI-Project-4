import React from 'react'
import Hero from './Hero'
import Footer from './Footer'

function Home(){
  return (
    <div className="container">
      <h1>If not logged in show:</h1>
      <Hero />
      <div>About section | how to use</div>
      <br />
      <h1>If logged in, show:</h1>
      <div>Dashboard</div>
      <div>Stats: how many films, how many cinemas, how many sections and section names</div>
      <div>User activity</div>
      <Footer />
    </div>
  )
}

export default Home