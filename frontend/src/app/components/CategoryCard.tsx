import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  id: string;
  name: string;
  icon: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ id, name, icon }) => {
  return (
    <Link to={`/shop?category=${id}`}>
      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border-2 border-green-300 p-8 hover:border-green-500 hover:shadow-xl transition-all duration-300 cursor-pointer group">
        <div className="text-center space-y-4">
          <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-700 transition-colors">
            {name}
          </h3>
        </div>
      </div>
    </Link>
  );
};
