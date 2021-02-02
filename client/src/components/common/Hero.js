import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import theatrebw from '../images/theatrebw.jpg'
import theatre02 from '../images/theatre02.jpg'

function Hero() {

  const [isShown, setIsShown] = useState(false)

  return (
    <div>
      <Link to="/schedule/" >
        <section className="hero is-dark is-fullheight">
          <div
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}>
            {isShown ?
              <img src={theatre02} />
              :
              <img src={theatrebw} />
            }
          </div>
        </section>
      </Link>
    </div>
  )
}

export default Hero