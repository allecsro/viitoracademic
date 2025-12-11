

type Lang = "ro" | "en";

interface Props {
  lang: Lang;
  currentPath: string;
  variant?: "desktop" | "mobile";
}

const FlagRO = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    className="w-full h-full object-cover transform scale-150"
    preserveAspectRatio="xMidYMid slice"
  >
    <path fill="#f6d44a" d="M10 4H22V28H10z"></path>
    <path
      d="M5,4h6V28H5c-2.208,0-4-1.792-4-4V8c0-2.208,1.792-4,4-4Z"
      fill="#0c267b"
    ></path>
    <path
      d="M25,4h6V28h-6c-2.208,0-4-1.792-4-4V8c0-2.208,1.792-4,4-4Z"
      transform="rotate(180 26 16)"
      fill="#be2a2c"
    ></path>
  </svg>
);

const FlagEN = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    className="w-full h-full object-cover transform scale-150"
    preserveAspectRatio="xMidYMid slice"
  >
    <rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#fff"></rect>
    <path
      d="M1.638,5.846H30.362c-.711-1.108-1.947-1.846-3.362-1.846H5c-1.414,0-2.65,.738-3.362,1.846Z"
      fill="#a62842"
    ></path>
    <path
      d="M2.03,7.692c-.008,.103-.03,.202-.03,.308v1.539H31v-1.539c0-.105-.022-.204-.03-.308H2.03Z"
      fill="#a62842"
    ></path>
    <path fill="#a62842" d="M2 11.385H31V13.231H2z"></path>
    <path fill="#a62842" d="M2 15.077H31V16.923000000000002H2z"></path>
    <path fill="#a62842" d="M1 18.769H31V20.615H1z"></path>
    <path
      d="M1,24c0,.105,.023,.204,.031,.308H30.969c.008-.103,.031-.202,.031-.308v-1.539H1v1.539Z"
      fill="#a62842"
    ></path>
    <path
      d="M30.362,26.154H1.638c.711,1.108,1.947,1.846,3.362,1.846H27c1.414,0,2.65-.738,3.362-1.846Z"
      fill="#a62842"
    ></path>
    <path d="M5,4h11v12.923H1V8c0-2.208,1.792-4,4-4Z" fill="#102d5e"></path>
  </svg>
);

export default function LanguageSwitcher({
  lang,
  variant = "desktop",
}: Props) {
  const handleSelect = (nextLang: Lang) => {
    if (nextLang === lang) return;
    const target = nextLang === "en" ? "/en" : "/";
    window.location.href = target;
  };

  const isMobile = variant === "mobile";
  const roLabel = isMobile ? "Romanian" : "Ro";
  const enLabel = isMobile ? "English" : "En";

  // Dynamic classes based on variant
  const containerClass = `flex items-center ${isMobile ? "gap-8" : "gap-3"}`;
  const buttonBaseClass =
    "relative rounded-full overflow-hidden transition-all duration-300 shadow-md border-2 cursor-pointer";
  const buttonSizeClass = isMobile ? "w-8 h-8" : "w-6 h-6";

  // Active border color
  const activeBorderClass = isMobile
    ? "border-white scale-110 opacity-100"
    : "border-primary-blue scale-110 opacity-100";

  const inactiveClass =
    "border-transparent opacity-60 hover:opacity-100 hover:scale-105 grayscale hover:grayscale-0";

  // Label classes
  const labelClass = isMobile
    ? "text-white text-xs font-semibold mt-2 tracking-wide"
    : "lang-label text-[15px] font-bold uppercase leading-none transition-colors duration-300";

  return (
    <div className={containerClass}>
      {/* Romanian Option */}
      <div className="flex flex-col items-center gap-1">
        <button
          onClick={() => handleSelect("ro")}
          className={`${buttonBaseClass} ${buttonSizeClass} ${
            lang === "ro" ? activeBorderClass : inactiveClass
          }`}
          aria-label="Switch to Romanian"
          title="Romanian"
        >
          <FlagRO />
        </button>
        <span className={labelClass}>{roLabel}</span>
      </div>

      {/* English Option */}
      <div className="flex flex-col items-center gap-1">
        <button
          onClick={() => handleSelect("en")}
          className={`${buttonBaseClass} ${buttonSizeClass} ${
            lang === "en" ? activeBorderClass : inactiveClass
          }`}
          aria-label="Switch to English"
          title="English"
        >
          <FlagEN />
        </button>
        <span className={labelClass}>{enLabel}</span>
      </div>
    </div>
  );
}

