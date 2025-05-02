import React from 'react';
import { Github, Twitter, Facebook, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div className="mb-8 md:mb-0">
            <img src="https://infomineo.com/wp-content/uploads/2023/03/Logo-2-bleus.png" alt="Infomineo Logo" className="h-12 w-auto mb-5" />
            <p className="text-gray-600 max-w-md text-sm leading-relaxed">
              Providing data-driven insights on global market trends, with specialized expertise 
              in emerging markets and trade dynamics. Our analyses help organizations navigate 
              complex geopolitical landscapes.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:gap-16">
            <div>
              <h3 className="text-infomineo-blue font-semibold mb-5 text-lg">Contact Us</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>
                  <span className="font-medium">Email:</span>
                  <a href="mailto:hello@infomineo.com" className="ml-2 hover:text-infomineo-blue transition-colors">hello@infomineo.com</a>
                </li>
                <li>
                  <span className="font-medium">Phone:</span>
                  <a href="tel:+15551234567" className="ml-2 hover:text-infomineo-blue transition-colors">+1 (555) 123-4567</a>
                </li>
                <li>
                  <span className="font-medium">Address:</span>
                  <div className="mt-1">123 Market Avenue<br/>New York, NY 10001</div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-infomineo-blue font-semibold mb-5 text-lg">Connect With Us</h3>
              <div className="flex space-x-3 mb-6">
                <a href="#" className="p-2.5 rounded-full bg-gray-50 text-gray-600 hover:bg-infomineo-blue hover:text-white transition-all duration-300">
                  <Twitter size={18} strokeWidth={1.5} />
                </a>
                <a href="#" className="p-2.5 rounded-full bg-gray-50 text-gray-600 hover:bg-infomineo-blue hover:text-white transition-all duration-300">
                  <Linkedin size={18} strokeWidth={1.5} />
                </a>
                <a href="#" className="p-2.5 rounded-full bg-gray-50 text-gray-600 hover:bg-infomineo-blue hover:text-white transition-all duration-300">
                  <Facebook size={18} strokeWidth={1.5} />
                </a>
                <a href="#" className="p-2.5 rounded-full bg-gray-50 text-gray-600 hover:bg-infomineo-blue hover:text-white transition-all duration-300">
                  <Github size={18} strokeWidth={1.5} />
                </a>
              </div>
              
              <div className="text-sm text-gray-600">
                <p><span className="font-medium">Business Hours:</span></p>
                <p className="mt-1">Monday - Friday: 9AM - 6PM EST</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-center text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Infomineo. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-gray-500 hover:text-infomineo-blue transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-infomineo-blue transition-colors">Terms of Service</a>
            <a href="#" className="text-sm text-gray-500 hover:text-infomineo-blue transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
