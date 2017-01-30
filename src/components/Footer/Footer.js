import React from 'react'
import './Footer.css'

const Footer = () => (
    <footer className="app-footer">
        <div className="app-footer__container">
            <small>&copy; Copyright { new Date().getFullYear() } Nathan Fisher</small>
        </div>
    </footer>
)

export default Footer