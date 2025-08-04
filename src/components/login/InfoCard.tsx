
import React from 'react';

const InfoCard = ({icon,title,desc}) => {
  return (
    <div className="flex items-start bg-white/10 p-5 rounded-xl transition-all duration-300 hover:bg-white/15">
                  <div className="w-10 h-10 rounded-lg bg-helixaa-green/20 flex items-center justify-center text-helixaa-green mr-4">
                    {icon && React.createElement(icon, { className: "text-xl" })}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-helixaa-green mb-1">{title}</h3>
                    <p className="text-sm text-gray-300">{desc}</p>
                  </div>
                </div>
  )
}

export default InfoCard