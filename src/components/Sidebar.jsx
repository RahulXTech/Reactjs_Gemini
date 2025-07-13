import  { useContext, useState } from "react";
import { IoMenu, IoSettings } from "react-icons/io5";
import { FaMessage, FaPlus, FaQuestion } from "react-icons/fa6";
import { MdHistory } from "react-icons/md";
import { Context } from "../context/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompt, setRecentPrompt, newChat } =
    useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className="min-h-screen bg-[#f1f3f6] w-[70px] sm:w-[250px] transition-all duration-300 ease-in-out p-4 flex flex-col justify-between shadow-lg">
      {/* Top - Menu & New Chat */}
      <div>
        <IoMenu
          onClick={() => setExtended(!extended)}
          className="text-2xl cursor-pointer text-gray-700 mb-5"
        />

        <div
          onClick={newChat}
          className="flex items-center gap-2 text-sm text-gray-700 bg-white rounded-full py-2 px-4 cursor-pointer hover:bg-gray-200 transition-all"
        >
          <FaPlus className="text-lg" />
          {extended && <span>New Chat</span>}
        </div>

        {/* Recent Prompts */}
        {extended && (
          <div className="mt-6">
            <h3 className="text-gray-500 text-sm mb-3">Recent</h3>
            <div className="space-y-2 overflow-y-auto max-h-[30vh] pr-1">
              {prevPrompt?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => loadPrompt(item)}
                  className="flex items-center gap-2 p-2 text-sm text-gray-700 rounded-full cursor-pointer hover:bg-gray-200"
                >
                  <FaMessage />
                  <p className="truncate w-[160px]">{item.slice(0, 18)}...</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom - Actions */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-gray-700 text-sm cursor-pointer hover:bg-gray-200 p-2 rounded-full">
          <FaQuestion />
          {extended && <span>Help</span>}
        </div>

        <div className="flex items-center gap-2 text-gray-700 text-sm cursor-pointer hover:bg-gray-200 p-2 rounded-full">
          <MdHistory />
          {extended && <span>Activity</span>}
        </div>

        <div className="flex items-center gap-2 text-gray-700 text-sm cursor-pointer hover:bg-gray-200 p-2 rounded-full">
          <IoSettings />
          {extended && <span>Settings</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
