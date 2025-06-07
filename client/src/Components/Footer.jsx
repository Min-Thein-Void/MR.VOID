import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-6 bg-opacity-80">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="text-lg font-semibold">
          <p>&copy; 2025 MySite. All rights reserved.</p>
        </div>

        <div className="flex space-x-6">
          <a href="#" className="hover:text-gray-400">Facebook</a>
          <a href="#" className="hover:text-gray-400">Twitter</a>
          <a href="#" className="hover:text-gray-400">Instagram</a>
        </div>
      </div>
    </footer>
  );
}

