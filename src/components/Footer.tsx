
import React from 'react';
import infomineoLogo from '@/assets/infomineo-logo.png';
import { Github, Twitter, Facebook, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-16 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-8 md:mb-0">
            <img src={infomineoLogo} alt="Infomineo Logo" className="h-12 w-auto mb-4" />
            <p className="text-gray-600 max-w-md text-sm leading-relaxed">
              Providing data-driven insights on global market trends, with specialized expertise 
              in emerging markets and trade dynamics. Our analyses help organizations navigate 
              complex geopolitical landscapes.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:gap-16">
            <div>
              <h3 className="text-infomineo-blue font-bold mb-4 text-lg">Contact Us</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="font-medium mr-2">Email:</span>
                  <a href="mailto:hello@infomineo.com" className="hover:text-infomineo-blue">hello@infomineo.com</a>
                </li>
                <li className="flex items-center">
                  <span className="font-medium mr-2">Phone:</span>
                  <a href="tel:+15551234567" className="hover:text-infomineo-blue">+1 (555) 123-4567</a>
                </li>
                <li>
                  <span className="font-medium">Address:</span>
                  <div className="mt-1">123 Market Avenue<br/>New York, NY 10001</div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-infomineo-blue font-bold mb-4 text-lg">Connect With Us</h3>
              <div className="flex space-x-4 mb-6">
                <a href="#" className="bg-gray-100 hover:bg-infomineo-blue/10 p-3 rounded-full transition-colors hover:text-infomineo-blue text-gray-500">
                  <Twitter size={18} />
                </a>
                <a href="#" className="bg-gray-100 hover:bg-infomineo-blue/10 p-3 rounded-full transition-colors hover:text-infomineo-blue text-gray-500">
                  <Linkedin size={18} />
                </a>
                <a href="#" className="bg-gray-100 hover:bg-infomineo-blue/10 p-3 rounded-full transition-colors hover:text-infomineo-blue text-gray-500">
                  <Facebook size={18} />
                </a>
                <a href="#" className="bg-gray-100 hover:bg-infomineo-blue/10 p-3 rounded-full transition-colors hover:text-infomineo-blue text-gray-500">
                  <Github size={18} />
                </a>
              </div>
              
              <div className="text-sm text-gray-600">
                <p><span className="font-medium">Business Hours:</span></p>
                <p className="mt-1">Monday - Friday: 9AM - 6PM EST</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-center text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Infomineo. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-gray-500 hover:text-infomineo-blue">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-infomineo-blue">Terms of Service</a>
            <a href="#" className="text-sm text-gray-500 hover:text-infomineo-blue">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
