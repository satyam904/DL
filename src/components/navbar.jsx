import React, { useState } from 'react'
import logo from '../assets/logo.svg'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white">
      {/* Gradient Border */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <img src={logo} alt="delightloop" className="h-12 sm:h-14 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* <a href="#home" className="text-gray-600 font-medium hover:text-purple-600 transition-colors">
              Home
            </a>
            <a href="#features" className="text-gray-600 font-medium hover:text-purple-600 transition-colors">
              Features
            </a>
            <a href="#about" className="text-gray-600 font-medium hover:text-purple-600 transition-colors">
              About
            </a> */}
            <button className="px-8 py-3 bg-[#6A41C6] text-white font-semibold rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              Start Nudging
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
            <span className={`w-6 h-0.5 bg-gray-900 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-gray-900 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-gray-900 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-64 pb-4' : 'max-h-0'}`}>
          <div className="space-y-3 pt-4 border-t border-gray-200">
            {/* <a href="#home" className="block text-gray-600 font-medium hover:text-purple-600 transition-colors py-2">
              Home
            </a>
            <a href="#features" className="block text-gray-600 font-medium hover:text-purple-600 transition-colors py-2">
              Features
            </a>
            <a href="#about" className="block text-gray-600 font-medium hover:text-purple-600 transition-colors py-2">
              About
            </a> */}
            <button className="w-full px-8 py-2.5 bg-[#6A41C6] text-white font-semibold rounded-full hover:shadow-lg transition-all">
              Start Nudging
            </button>
          </div>
          
        </div>
      </div>
            <div className="h-1 bg-gradient-to-r from-purple-600 via-pink-500 via-orange-500 to-green-500"></div>

    </nav>
  )
}

export default Navbar