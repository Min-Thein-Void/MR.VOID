import { useState } from "react";
import girl from "../assets/girl.png";

function Home() {
  const [showIslandContent, setShowIslandContent] = useState(false);

  const toggleIsland = () => {
    setShowIslandContent(!showIslandContent);
  };

  return (
    <section
      id="home"
      className=" min-h-screen flex items-center justify-center px-6 bg-gradient-to-r from-gray-700 to-orange-400"
    >
      <div className="mx-auto max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-5 py-5 mt-14">
        {/* Left: Text */}
        <div>
          <div>
            {/* Liquid Glass Card */}
            <div className="relative mb-8 p-8 mt-[70px]">
              {/* Decorative Glass Bubbles */}
              <span className="absolute -top-8 -left-8 w-32 h-32 bg-white/20 rounded-full blur-2xl opacity-60 pointer-events-none"></span>
              <span className="absolute -bottom-10 right-0 w-40 h-40 bg-orange-200/30 rounded-full blur-3xl opacity-40 pointer-events-none"></span>
              <span className="absolute top-1/2 left-1/2 w-20 h-20 bg-orange-100/40 rounded-full blur-xl opacity-30 pointer-events-none"></span>
              {/* Main Content */}
              <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-orange-500 drop-shadow-lg">
                <span className="text-orange-500">Recipe Maker App</span> မှ
                ကြိုဆိုပါတယ်!
              </h1>
              <p className="text-base md:text-lg text-orange-300 mb-4">
                မိမိအကြိုက်ဆုံး ဟင်းလျာများကို ရှာဖွေ၊ ဖန်တီး၊ မျှဝေနိုင်သော
                အခမဲ့ Recipe Maker App ဖြစ်ပါတယ်။
                <br />
                မိမိအိမ်မှာရှိတဲ့ ပစ္စည်းတွေနဲ့ လွယ်ကူစွာ ဟင်းလျာအသစ်များ
                ဖန်တီးနိုင်ပြီး၊ အခြားအသုံးပြုသူများ၏ ဟင်းလျာများကိုလည်း
                ကြည့်ရှုနိုင်ပါတယ်။
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <a
                  href="/recipes"
                  className="px-8 py-3 rounded-full font-bold bg-orange-400/70 hover:bg-orange-500/80 text-white shadow-lg backdrop-blur-md border border-white/30 transition text-base"
                >
                  ဟင်းလျာများကြည့်မည်
                </a>
                <a
                  href="/register"
                  className="px-8 py-3 rounded-full font-bold bg-white/60 hover:bg-white/80 text-orange-700 shadow-lg backdrop-blur-md border border-orange-200 transition text-base"
                >
                  အကောင့်ဖွင့်မည်
                </a>
              </div>
              {/* Feature Badges */}
              <div className="flex flex-wrap gap-3 mt-8">
                <span className="px-4 py-2 rounded-full bg-orange-100/60 text-orange-700 font-semibold text-xs shadow backdrop-blur-md border border-orange-200">
                  ဟင်းလျာအမျိုးအစားစုံလင်မှု
                </span>
                <span className="px-4 py-2 rounded-full bg-orange-100/60 text-orange-700 font-semibold text-xs shadow backdrop-blur-md border border-orange-200">
                  လွယ်ကူသော ရှာဖွေရေး
                </span>
                <span className="px-4 py-2 rounded-full bg-orange-100/60 text-orange-700 font-semibold text-xs shadow backdrop-blur-md border border-orange-200">
                  ကိုယ်ပိုင်ဟင်းလျာ ဖန်တီးနိုင်မှု
                </span>
              </div>
            </div>

            {/* Stats Section */}
            <div className="flex flex-row flex-wrap gap-6 justify-between items-center">
              {[
                ["၅,၀၀၀+", "အသုံးပြုသူများ"],
                ["၁,၀၀၀+", "ဟင်းလျာများ"],
                ["၉၅%", "ကျေနပ်မှုနှုန်း"],
              ].map(([value, label], i) => (
                <div
                  key={i}
                  className="flex-1 min-w-[180px] p-6 rounded-2xl bg-white/30 backdrop-blur-lg border border-white/30 shadow-lg flex flex-col items-center"
                  style={{
                    boxShadow: "0 4px 16px 0 rgba(251, 146, 60, 0.13)",
                    border: "1.5px solid rgba(255,255,255,0.18)",
                  }}
                >
                  <span className="text-2xl font-bold text-orange-700">
                    {value}
                  </span>
                  <span className="text-orange-900 font-semibold mt-2 text-base">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Image with animated stars */}
        <div className="flex justify-center relative w-full h-full">
          <div className="w-[400px] md:w-[600px] max-w-full aspect-[1/1] relative">
            <img
              src={girl}
              alt="Recipe Maker Dashboard"
              className="inset-0 w-full h-full object-cover z-10 mt-6 rounded-3xl"
              style={{ pointerEvents: "none" }}
            />

            {/* Orbiting Stars */}
            {[
              {
                orbit: "orbit1",
                size: 50,
                color: "#FFFFFF",
                filter:
                  "drop-shadow(0 0 32px #fff) drop-shadow(0 0 12px #fff8)",
                opacity: "opacity-90",
              },
              {
                orbit: "orbit2",
                size: 50,
                color: "#FFA500",
                filter:
                  "drop-shadow(0 0 18px #FFA500) drop-shadow(0 0 5px #FFA50099)",
                opacity: "opacity-80",
              },
              {
                orbit: "orbit3",
                size: 50,
                color: "#FFFFFF",
                filter:
                  "drop-shadow(0 0 24px white) drop-shadow(0 0 6px #ffffff88)",
                opacity: "opacity-85",
              },
              {
                orbit: "orbit3",
                size: 50,
                color: "#FFD700",
                filter:
                  "drop-shadow(0 0 18px #ffd700) drop-shadow(0 0 5px #ffd700aa)",
                opacity: "opacity-80",
              },
              {
                orbit: "orbit3",
                size: 50,
                color: "#FFFFFF",
                filter:
                  "drop-shadow(0 0 16px white) drop-shadow(0 0 4px #ffffffaa)",
                opacity: "opacity-75",
              },
              {
                orbit: "orbit4",
                size: 50,
                color: "#FF9800",
                filter:
                  "drop-shadow(0 0 14px #ff9800) drop-shadow(0 0 4px #ff980099)",
                opacity: "opacity-70",
              },
              {
                orbit: "orbit5",
                size: 50,
                color: "#FFB347",
                filter:
                  "drop-shadow(0 0 20px #ffb347) drop-shadow(0 0 6px #ffb347aa)",
                opacity: "opacity-85",
              },
            ].map(({ orbit, size, color, filter, opacity }, idx) => (
              <span
                key={idx}
                className={`absolute left-1/2 top-1/2 animate-${orbit} z-20 pointer-events-none`}
              >
                <svg
                  width={size}
                  height={size}
                  viewBox="0 0 24 24"
                  className={opacity}
                  style={{ filter }}
                >
                  <path
                    fill={color}
                    d="M12 2l2.4 6.9H22l-5.8 4.2L18.2 22 12 17.3 5.8 22l1.8-8.9L2 8.9h7.6z"
                  />
                </svg>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Star orbit animations */}
      <style>
        {`
          @keyframes orbit1 {
            0% { transform: translate(-50%, -50%) rotate(0deg) translateX(180px) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg) translateX(180px) rotate(-360deg); }
          }
          @keyframes orbit2 {
            0% { transform: translate(-50%, -50%) rotate(0deg) translateX(120px) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(-360deg) translateX(120px) rotate(360deg); }
          }
          @keyframes orbit3 {
            0% { transform: translate(-50%, -50%) rotate(0deg) translateY(90px) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg) translateY(90px) rotate(-360deg); }
          }
          @keyframes orbit4 {
            0% { transform: translate(-50%, -50%) rotate(0deg) translateX(60px) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(-360deg) translateX(60px) rotate(360deg); }
          }
          @keyframes orbit5 {
            0% { transform: translate(-50%, -50%) rotate(0deg) translateY(-140px) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg) translateY(-140px) rotate(-360deg); }
          }
          .animate-orbit1 { animation: orbit1 7s linear infinite; }
          .animate-orbit2 { animation: orbit2 10s linear infinite; }
          .animate-orbit3 { animation: orbit3 13s linear infinite; }
          .animate-orbit4 { animation: orbit4 6s linear infinite; }
          .animate-orbit5 { animation: orbit5 11s linear infinite; }
        `}
      </style>
    </section>
  );
}

export default Home;
