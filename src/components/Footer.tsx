import React from 'react';
import { Heart, PawPrint, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-purple-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <PawPrint className="h-8 w-8" />
              <span className="text-2xl font-bold">PuppyPack</span>
            </div>
            <p className="text-purple-200 max-w-md mb-6">
              Your AI-powered companion for raising a happy, well-behaved puppy. Get personalized guidance every step of the way.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://instagram.com/puppypack"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-800 hover:bg-purple-700 p-2 rounded-lg transition-colors group"
              >
                <Instagram className="h-5 w-5 text-purple-200 group-hover:text-white" />
              </a>
              <a
                href="https://facebook.com/puppypack"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-800 hover:bg-purple-700 p-2 rounded-lg transition-colors group"
              >
                <Facebook className="h-5 w-5 text-purple-200 group-hover:text-white" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-purple-200 hover:text-white transition-colors">Sign In</Link>
              </li>
              <li>
                <Link to="/features" className="text-purple-200 hover:text-white transition-colors">Features</Link>
              </li>
              <li>
                <Link to="/pricing" className="text-purple-200 hover:text-white transition-colors">Pricing</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-purple-200 hover:text-white transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-purple-200 hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-purple-200 hover:text-white transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-purple-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-purple-200">Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span className="text-purple-200">for puppy parents</span>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-purple-200">
                © {new Date().getFullYear()} PuppyPack. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;