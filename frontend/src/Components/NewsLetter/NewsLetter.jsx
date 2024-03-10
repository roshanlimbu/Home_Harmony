import React from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className="newsletter">
      <h1>Get Exclusive Offers On You Email</h1>
      <p>Subscribe to our newsletter and stay updated</p>
      <div>
        <input type="email" placeholder="Your email address" />
        <button>Subscribt</button>

      </div>


    </div>
  )
}


export default NewsLetter;
