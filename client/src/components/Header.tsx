'use client'
import React from 'react'
import './Header.scss'

const Header = () => {
  return (
    <div>
      <div className="container-header bg-white">
        <div>
          <p> Bonjour </p>
          <p className="text-orange"> Connected User </p>
        </div>
        <div className="relative">
          <img
            src="/assets/user.jpg"
            alt="image profile"
            className="user-profile"
          />
          <img
            src="/assets/trophy.png"
            alt="image profile"
            className="image-profile"
          />
        </div>
      </div>
    </div>
  )
}

export default Header
