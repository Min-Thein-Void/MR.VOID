import React, { useState } from "react";

function Home() {
  const [showIslandContent, setShowIslandContent] = useState(false);

  const toggleIsland = () => {
    setShowIslandContent(!showIslandContent);
  };

  return (
    <div className="bg-orange-950">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center py-16 px-6 gap-10">
        {/* 🍽️ Left Section: About the App */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-orange-600 mb-6">
            Your Pocket Recipe Book 📖
          </h1>
          <p className="text-lg text-gray-300 mb-6 max-w-xl">
            Discover new and delicious recipes every day. Save your favorites,
            create your own recipe book, and start cooking like a pro — right
            from your phone.
          </p>
          <p className=" text-white font-semibold font-display">
            Explore Recipes Now....
          </p>
        </div>

        {/* 📱 Right Section: iPhone Mockup */}
        <div className="flex-1 flex justify-center">
          <div className="h-[604px] w-[293px] bg-orange-100 bg-opacity-30 flex justify-center rounded-[48px]">
            <div className="relative border-[9px] overflow-hidden border-black w-[290px] h-[600px] rounded-[48px] bg-black">
              {/* Top Half */}
              <div className="border-b-[3px] border-gray-400 bg-gradient-to-b from-white via-orange-600 to-black w-[272px] h-[290px] rounded-b-full flex flex-col items-center relative z-10">
                {/* Dynamic Island Button */}
                <div
                  onClick={toggleIsland}
                  className="bg-black w-[80px] h-6 mt-2 rounded-[19px] transition-all duration-300 ease-in-out hover:scale-110 active:scale-125 cursor-pointer flex items-center justify-end pr-2"
                >
                  <div className="bg-gray-700 w-[20px] h-[20px] rounded-full"></div>
                </div>

                {/* Dynamic Island Content */}
                {showIslandContent && (
                  <div className="absolute top-10 bg-black w-[250px] px-4 py-5 rounded-2xl text-white shadow-xl transition-all duration-500">
                    <h3 className="text-lg font-semibold text-orange-500 mb-2">
                      About Recipes App
                    </h3>
                    <p className="text-sm text-gray-300 leading-snug">
                      Easily discover, save, and create recipes anytime,
                      anywhere. Perfect for food lovers on the go.
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Half with App Icons */}
              <div className="border-t-[3px] border-gray-300 w-[273px] h-[300px] rounded-t-full bg-gradient-to-t from-zinc-100 via-orange-700 to-black flex flex-wrap items-start justify-center px-3 pt-4 gap-3">
                {/* App Icon */}
                <div className="flex flex-col items-center text-white text-xs font-medium">
                  <div className="bg-orange-500 w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner">
                    🍲
                  </div>
                  <span className="mt-1">Recipes</span>
                </div>

                <div className="flex flex-col items-center text-white text-xs font-medium">
                  <div className="bg-orange-300 w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner">
                    🛒
                  </div>
                  <span className="mt-1">Groceries</span>
                </div>

                <div className="flex flex-col items-center text-white text-xs font-medium">
                  <div className="bg-orange-400 w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner">
                    📋
                  </div>
                  <span className="mt-1">Planner</span>
                </div>

                <div className="flex flex-col items-center text-white text-xs font-medium">
                  <div className="bg-orange-400 w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner">
                    ⚙️
                  </div>
                  <span className="mt-1">Settings</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
