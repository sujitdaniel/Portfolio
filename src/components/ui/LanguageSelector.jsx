import { useState, useEffect } from "react";
import { BsTranslate } from "react-icons/bs";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
];

export default function LanguageSelector({ selected, onChange }) {
  const [open, setOpen] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  // Optional: close dropdown when clicking outside (mainly for mobile)
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e) => {
      if (!e.target.closest("#lang-selector")) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [open]);

  return (
    <div
      id="lang-selector"
      className="relative text-xl md:text-2xl"
      {...(!isTouch && {
        onMouseEnter: () => setOpen(true),
        onMouseLeave: () => setOpen(false),
      })}
    >
      <button
        onClick={() => isTouch && setOpen((prev) => !prev)}
        className={`pointer-events-auto p-4 backdrop-blur-xs ${
          open ? "bg-neutral-800 rounded-t-xl" : "bg-neutral-800/40 rounded-xl"
        } cursor-pointer hover:bg-neutral-800`}
      >
        <BsTranslate className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {open && (
        <div className="text-center pointer-events-auto flex items-center justify-center px-4 pb-4 bg-neutral-800 rounded-b-xl z-10">
          <ul>
            {LANGUAGES.map(({ code, label }) => (
              <li key={code}>
                <button
                  onClick={() => {
                    onChange(code);
                    setOpen(false);
                  }}
                  className={`hover:text-red-500 ${
                    selected === code ? "text-neutral-200" : "text-neutral-400"
                  }`}
                >
                  {code}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
