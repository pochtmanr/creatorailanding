import { getTranslations } from "next-intl/server";
import { PhoneMockup } from "@/components/ui/phone-mockup";

const screenshots = [
  { src: "/screenshots/IMG_7010.PNG", alt: "CreatorAI app home screen" },
  { src: "/screenshots/IMG_7011.PNG", alt: "AI video creation interface" },
  { src: "/screenshots/IMG_7013_2.PNG", alt: "Video library view" },
  { src: "/screenshots/IMG_7014.PNG", alt: "Real-time preview" },
];

const features = [
  { icon: "sparkle", key: "aiEditing" },
  { icon: "tap", key: "oneTap" },
  { icon: "folder", key: "library" },
  { icon: "eye", key: "preview" },
];

export async function ProductShowcase() {
  const t = await getTranslations("showcase");

  return (
    <section className="py-24 px-4 sm:px-8 bg-surface-container-low relative z-40">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Phone */}
          <div className="w-full lg:w-[40%] flex justify-center">
            <PhoneMockup images={screenshots} />
          </div>

          {/* Features */}
          <div className="w-full lg:w-[60%]">
            <h2 className="text-3xl md:text-5xl font-headline font-bold tracking-tight mb-4">
              {t("title")}
            </h2>
            <p className="text-on-surface/50 mb-10 max-w-lg">
              {t("subtitle")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((f) => (
                <div key={f.key} className="flex items-start gap-4 p-4 glass-panel rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-primary-container/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-on-surface mb-1">{t(`${f.key}Title`)}</h3>
                    <p className="text-on-surface/50 text-sm">{t(`${f.key}Desc`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
