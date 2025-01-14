export default function GamesPage({ language }) {
  const content = {
    en: {
      title: "Coming Soon",
    },
    de: {
      title: "Demnächst",
    },
  };

  const t = content[language] || content.en;
  return (
    <div className="relative w-full h-full bg-neutral-200">
      <div className="absolute bg-grid w-full h-full "></div>
      <div className="w-full h-full flex items-center justify-center font-mono">
        <h1 className="text-neutral-600 text-5xl">{t.title}</h1>
      </div>
    </div>
  );
}
