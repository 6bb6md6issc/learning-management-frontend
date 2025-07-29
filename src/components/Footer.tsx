import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='footer'>
      <p>&copy; 2025 PeerLearn. All rights Reserved.</p>
      <div className="footer_links">
        {["About", "Privacy Policy", "Licensing", "Contact"].map((item) => (
          <Link 
            key={item}
            href={`/${item.toLowerCase().replace(" ", "-")}`}
            className='footer__link'
            scroll={false}
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Footer