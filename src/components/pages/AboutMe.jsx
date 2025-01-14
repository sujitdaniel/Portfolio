import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

export default function AboutMe({ setTarget, language }) {
  const content = {
    en: {
      title: "About Me",
      name: "I'm Sujit Daniel",
      desc1:
        "Passionate about learning new technologies, building things, breaking them, and figuring out how to make them better.",
      desc2:
        "Currently a student at the University of Arizona.",
      cv: "Check out my CV",
      cvFile: "/images/Sujit_Daniel_Resume.pdf"
    },
    de: {
      title: "Über mich",
      name: "Ich bin Sujit Daniel",
      desc1:
        "Begeistert davon, neue Technologien zu lernen, Dinge zu bauen, sie zu zerbrechen und herauszufinden, wie man sie verbessern kann.",
      desc2:
        "Derzeit Student an der University of Arizona.",
      cv: "Meinen Lebenslauf ansehen",
      cvFile: "/images/Sujit_Daniel_Resume.pdf"
    },
  };

  const t = content[language] || content.en;

  return (
    <div className="h-full w-full relative bg-neutral-200 select-none ">
      <div className="absolute w-full h-full bg-grid"></div>
      <div className="absolute w-full h-full text-sm md:text-xl p-4 flex flex-col items-center justify-between border gap-2 font-mono">
        <div className="w-full text-center items-center justify-between flex ">
          <button onClick={() => setTarget("Contact_Red_Text_Target")}>
            <MdKeyboardArrowLeft className="w-7 h-7 md:w-12 md:h-12" />
          </button>
          <h1 className="text-2xl md:text-4xl">{t.title}</h1>
          <button onClick={() => setTarget("Contact_Red_Text_Target")}>
            <MdKeyboardArrowRight className="w-7 h-7 md:w-12 md:h-12" />
          </button>
        </div>

        <div className="w-full h-full text-center items-center justify-between flex flex-col font-mono p-2 ">
          <p className="font-bold text-2xl md:text-3xl">{t.name}</p>
          <p>{t.desc1}</p>
          <p>{t.desc2}</p>

          <a
            href={t.cvFile}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono flex gap-4 items-center justify-center px-4 py-2 rounded-2xl shadow-md shadow-neutral-500 hover:scale-105 transition-transform bg-neutral-200/80  border border-neutral-50 "
          >
            {t.cv}
          </a>
        </div>
      </div>
    </div>
  );
}
