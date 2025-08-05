import { Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img
                src="https://i.postimg.cc/PrrCJSKJ/Whats-App-Image-2025-08-04-at-15-57-48-a9d55488.jpg"
                alt="TerraTattva Logo"
                className="w-12 h-12 object-cover rounded-lg shadow-lg"
              />
              <span className="text-2xl font-bold">TerraTattva</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Home décor with a desi touch – मिट्टी, मेहनत और mindful living.
              Empowering artisans, preserving traditions, and bringing authentic
              handcrafted pottery to homes around the world.
            </p>
            <div>
              <p className="text-gray-400 text-sm mb-3">Follow us here</p>
              <a
                href="https://www.instagram.com/terratattva?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2 rounded-full hover:opacity-80 transition-opacity"
              >
                <Instagram className="h-5 w-5" />
                <span className="text-white font-medium">Instagram</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Our Collection
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Our Artisans
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-orange-400" />
                <span className="text-gray-400">hello@terratattva.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-orange-400" />
                <span className="text-gray-400">+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-orange-400" />
                <span className="text-gray-400">Mumbai, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2024 TerraTattva. All rights reserved. Made with ❤️ for
            artisans worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
