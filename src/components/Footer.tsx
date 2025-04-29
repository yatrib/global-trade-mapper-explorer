
import React from 'react';
import infomineoLogo from '@/assets/infomineo-logo.png';
import { Github, Twitter, Facebook, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <img src={infomineoLogo} alt="Infomineo Logo" className="h-10 w-auto" />
            <p className="text-gray-600 mt-4 max-w-md text-sm">
              Providing data-driven insights on global market trends, with specialized expertise in emerging markets and trade dynamics.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:gap-16">
            <div>
              <h3 className="text-infomineo-blue font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>hello@infomineo.com</li>
                <li>+1 (555) 123-4567</li>
                <li>123 Market Avenue</li>
              </ul>
            </div>
            <div>
              <h3 className="text-infomineo-blue font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-infomineo-blue transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-500 hover:text-infomineo-blue transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="text-gray-500 hover:text-infomineo-blue transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-500 hover:text-infomineo-blue transition-colors">
                  <Github size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-10 pt-6">
          <p className="text-center text-gray-500 text-xs">
            © {new Date().getFullYear()} Infomineo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
