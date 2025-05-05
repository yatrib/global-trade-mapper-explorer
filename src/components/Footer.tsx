
import React from 'react';
import { Youtube, Instagram, Facebook, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div className="mb-8 md:mb-0">
            <img src="https://infomineo.com/wp-content/uploads/2023/03/Logo-2-bleus.png" alt="Infomineo Logo" className="h-12 w-auto mb-5" />
            <p className="text-gray-600 max-w-md text-sm leading-relaxed">
              Whether you require comprehensive Business Research to gain valuable insights, eye-catching Graphic Design that captures your brand's essence, precise Data Analytics to inform your decision-making process, or engaging Content Services that resonate with your target audience, we've got you covered! Our professionals are passionate about delivering results that drive your success.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:gap-16">
            <div>
              <h3 className="text-infomineo-blue font-semibold mb-5 text-lg">Contact Us</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>
                  <span className="font-medium">Email:</span>
                  <a href="mailto:info@infomineo.com" className="ml-2 hover:text-infomineo-blue transition-colors">info@infomineo.com</a>
                </li>
                <li>
                  <span className="font-medium">Phone:</span>
                  <a href="tel:+97145546638" className="ml-2 hover:text-infomineo-blue transition-colors">+971 4 554 6638</a>
                </li>
                <li>
                  <span className="font-medium">Offices:</span>
                  <div className="mt-1">Dubai, Casablanca, Cairo, Barcelona, Mexico</div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-infomineo-blue font-semibold mb-5 text-lg">Connect With Us</h3>
              <div className="flex space-x-3 mb-6">
                <a href="https://www.youtube.com/channel/UCVUlLwMWL6Xbsu-frW8mdAA" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-gray-50 text-gray-600 hover:bg-infomineo-blue hover:text-white transition-all duration-300">
                  <Youtube size={18} strokeWidth={1.5} />
                </a>
                <a href="https://www.linkedin.com/company/infomineo/" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-gray-50 text-gray-600 hover:bg-infomineo-blue hover:text-white transition-all duration-300">
                  <Linkedin size={18} strokeWidth={1.5} />
                </a>
                <a href="https://www.facebook.com/Infomineo" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-gray-50 text-gray-600 hover:bg-infomineo-blue hover:text-white transition-all duration-300">
                  <Facebook size={18} strokeWidth={1.5} />
                </a>
                <a href="https://www.instagram.com/infomineo/" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-gray-50 text-gray-600 hover:bg-infomineo-blue hover:text-white transition-all duration-300">
                  <Instagram size={18} strokeWidth={1.5} />
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
            <a href="https://infomineo.com/wp-content/uploads/2021/04/Data-privacy-policy.pdf" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-infomineo-blue transition-colors">Privacy Policy</a>
            <a href="https://infomineo.com/wp-content/uploads/2021/07/202107-PO-Terms-and-conditions-Infomineo-Group.pdf" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-infomineo-blue transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
