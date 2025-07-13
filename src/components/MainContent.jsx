import { useContext } from "react";
import {
  FaCode,
  FaCompass,
  FaLightbulb,
  FaMicrophone,
  FaUserCircle,
} from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { MdAddPhotoAlternate } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { Context } from "../context/Context";
import geminiLogo from "../assets/geminiLogo.png";

const MainContent = () => {
  const {
    input,
    setInput,
    recentPrompt,
    showResult,
    loading,
    resultData,
    onSent,
  } = useContext(Context);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-white text-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between text-xl p-5 shadow-sm">
        <p className="text-lg font-bold">Gemini</p>
        <FaUserCircle className="text-2xl" />
      </div>

      {/* Body */}
      <div className="max-w-[900px] w-full mx-auto flex-1 p-4">
        {!showResult ? (
          <>
            <div className="text-[36px] sm:text-[48px] font-semibold mt-12 text-gray-500">
              <p>
                <span className="bg-gradient-to-r from-[#368ddd] to-[#ff5546] bg-clip-text text-transparent">
                  Hello, Rahul.
                </span>
              </p>
              <p className="text-gray-400 text-lg mt-1">
                How can I help you today?
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
              {[
                {
                  text: "Suggest top 10 web series.",
                  icon: <FaCompass />,
                },
                {
                  text: "What is loop in Javascript?",
                  icon: <FaLightbulb />,
                },
                {
                  text: `Who is the "Mother of Dragons"?`,
                  icon: <FaMessage />,
                },
                {
                  text: "Who sits on the Iron Throne at the end?",
                  icon: <FaCode />,
                },
              ].map((card, index) => (
                <div
                  key={index}
                  className="h-[180px] p-4 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-sm relative cursor-pointer"
                >
                  <p className="text-sm font-medium text-gray-700">
                    {card.text}
                  </p>
                  <div className="absolute bottom-2 right-2 text-2xl text-gray-500">
                    {card.icon}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="py-5 px-2 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
            <div className="flex items-center gap-3 mb-6">
              <FaUserCircle className="text-2xl text-gray-700" />
              <p className="text-base font-medium">{recentPrompt}</p>
            </div>

            <div className="flex items-start gap-4">
              <img src={geminiLogo} alt="logo" className="w-8 h-8 rounded-full" />

              {loading ? (
                <div className="w-full flex flex-col gap-3">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-4 w-full bg-gradient-to-r from-[#81cafe] via-white to-[#81cafe] rounded animate-pulse"
                    ></div>
                  ))}
                </div>
              ) : (
                <p
                  dangerouslySetInnerHTML={{ __html: resultData }}
                  className="text-base leading-relaxed"
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer - Input */}
      <div className="w-full py-3 px-5 shadow-inner bg-gray-50">
        <div className="max-w-[900px] mx-auto">
          <div className="flex items-center bg-gray-200 rounded-full px-4 py-2">
            <input
              type="text"
              placeholder="Enter a prompt here..."
              className="flex-1 bg-transparent border-none outline-none text-base px-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onSent();
                  setInput("");
                }
              }}
            />
            <div className="flex items-center gap-3 text-gray-600">
              <MdAddPhotoAlternate className="text-xl cursor-pointer" />
              <FaMicrophone className="text-xl cursor-pointer" />
              {input && (
                <IoMdSend
                  className="text-xl cursor-pointer text-blue-500"
                  onClick={onSent}
                />
              )}
            </div>
          </div>

          <p className="text-center text-xs text-gray-500 mt-2">
            Gemini may display inaccurate info, including about people. Double-check responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
