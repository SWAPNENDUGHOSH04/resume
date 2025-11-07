import React from 'react'

const Features = () => {
    const featuresData = [
        {
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="text-purple-500 size-8 mt-4"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>),
            title: "Lightning-fast setup",
            description: "Launch production-ready pages in minutes with prebuilt components.",
        },
        {
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="text-purple-500 size-8 mt-4"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg>),
            title: "Pixel perfect",
            description: "Modern Figma-driven UI that translates to exact code.",
        },
        {
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="text-purple-500 size-8 mt-4"><path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z"/><rect x="3" y="14" width="7" height="7" rx="1"/><circle cx="17.5" cy="17.5" r="3.5"/></svg>),
            title: "Highly customizable",
            description: "Tailwind utility-first classes make customization trivial.",
        }
    ];
  return (
    <div id='features' className='flex flex-col items-center  scroll-mt-12 bg-black'>
        <section className="relative w-full py-20 bg-black text-white overflow-hidden">
      {/* Decorative background gradient (soft radial like Hero) */}
      <svg
        className="absolute inset-0 -z-10 w-full h-full opacity-70"
        viewBox="0 0 1440 676"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="-92"
          y="-948"
          width="1624"
          height="1624"
          rx="812"
          fill="url(#feature-bg)"
        />
        <defs>
          <radialGradient
            id="feature-bg"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="rotate(90 428 292) scale(812)"
          >
            <stop offset=".63" stopColor="#372AAC" stopOpacity="0" />
            <stop offset="1" stopColor="#372AAC" />
          </radialGradient>
        </defs>
      </svg>

      {/* Header */}
      <div className="text-center">
        <p className="font-medium text-indigo-300 px-10 py-1.5 rounded-full bg-indigo-950/50 border border-indigo-700 w-max mx-auto">
          Features
        </p>
        <h2 className="text-3xl font-semibold text-center mx-auto mt-4 text-white">
          Simple and easy to use
        </h2>
        <p className="mt-2 text-indigo-100/80 max-w-xl mx-auto">
          Our streamlined platform helps you create job winning resume in minutes 
        </p>
      </div>

      {/* Feature Cards */}
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-4 mt-12 px-6">
        {featuresData.map((feature, index) => (
          <div
            key={index}
            className={`hover:-translate-y-1 transition duration-300 ${
              index === 1
                ? "p-px rounded-[13px] bg-gradient-to-br from-[#9544FF] to-[#223B60]"
                : ""
            }`}
          >
            <div className="p-6 rounded-xl space-y-4 border border-indigo-800/60 bg-[#2E218A]/60 max-w-80 w-full backdrop-blur-sm">
              <div className="text-indigo-300">{feature.icon}</div>
              <h3 className="text-base font-medium text-white">
                {feature.title}
              </h3>
              <p className="text-indigo-200/70 line-clamp-2 pb-4">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
};

export default Features;