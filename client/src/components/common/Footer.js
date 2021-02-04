import React from 'react'
import { AiOutlineGithub, AiOutlineTwitter } from 'react-icons/ai'
import { FaLinkedin } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="navbar is-fixed-bottom is-dark">
      <div className="container is-fluid level">
        <div className="level-item has-text-centered">FASTival is a labour of love done as part of the GA Software Engineering Immersive Course. <br />If you want to support me or find out more, follow the links</div>
        <br />
        
        <div className="is-menu level-item">
          <a href="https://github.com/HotSauceNinja" target="_blank" rel="noreferrer"><AiOutlineGithub className="icon is-medium mx-2"/></a> 

          <a href="https://www.linkedin.com/in/sandraspighel/" target="_blank" rel="noreferrer"><FaLinkedin className="icon is-medium mx-2"/></a>     

          <a href="https://twitter.com/H0tSauceNinja" target="_blank" rel="noreferrer"><AiOutlineTwitter className="icon is-medium mx-2"/></a>

        </div>
        <br/>
      </div>
    </footer>
  )
}

export default Footer