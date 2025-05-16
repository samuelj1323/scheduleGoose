import React from "react";

export const ActivityChart: React.FC = () => {
  return (
    <div className="w-full h-[180px] relative">
      <div
        className="absolute inset-0 bg-no-repeat bg-center"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 600 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,100 C150,180 250,0 600,100' fill='none' stroke='%233f51b5' stroke-width='3'/%3E%3C/svg%3E")`,
          backgroundSize: "cover",
        }}
      ></div>

      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#3f51b5]/10 to-transparent"></div>

      <div className="absolute bottom-0 left-0 text-sm text-gray-500">
        Mar 31
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-sm text-gray-500">
        Apr 7
      </div>
      <div className="absolute bottom-0 right-0 text-sm text-gray-500">
        Apr 20
      </div>
    </div>
  );
};
