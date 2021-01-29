import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineGithub, AiOutlineTwitter } from 'react-icons/ai'
import { FaLinkedin } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="navbar is-fixed-bottom">
      <div className="container is-fluid level">
        <div className="level-item has-text-centered">FASTival is a labour of love done as part of the GA Software Engineering Immersive Course. <br />If you want to support me or find out more, follow the links</div>
        <div className="is-menu level-item">

          <Link to="https://github.com/HotSauceNinja"><AiOutlineGithub className="icon is-medium mx-2"/></Link> 

          <Link to="https://www.linkedin.com/in/sandraspighel/"><FaLinkedin className="icon is-medium mx-2"/></Link>     

          <Link to="https://twitter.com/H0tSauceNinja" ><AiOutlineTwitter className="icon is-medium mx-2"/></Link>

        </div>
        <br/>
      </div>
    </footer>
  )
}



export default Footer