import { Link } from "@tanstack/react-router";
import { Banknote, ChevronDown, Home, MapPin, Play, Search } from "lucide-react";

import { useSite } from "@/lib/site-context";
import { cn } from "@/lib/utils";

const HOUSE_IMAGE = "https://cdn.unityaliving.com/Hero%20Image/House.png";

const facebookPath = "M14 8h3V4h-3c-3.3 0-5 1.9-5 5v3H6v4h3v8h4v-8h3.2l.8-4H13V9c0-.7.3-1 1-1z";

const twitterPath =
  "M22 5.8c-.7.3-1.5.5-2.3.6.8-.5 1.4-1.3 1.7-2.2-.8.5-1.7.8-2.6 1A4.1 4.1 0 0 0 11.7 8c0 .3 0 .6.1.9-3.4-.2-6.4-1.8-8.4-4.2-.4.6-.6 1.3-.6 2.1 0 1.4.7 2.7 1.7 3.4-.6 0-1.2-.2-1.8-.5v.1c0 2 1.4 3.7 3.3 4.1-.3.1-.7.1-1 .1-.2 0-.5 0-.7-.1.5 1.6 2 2.8 3.8 2.8A8.3 8.3 0 0 1 3 18.5 11.7 11.7 0 0 0 9.3 20c7.5 0 11.6-6.2 11.6-11.6v-.5c.8-.6 1.5-1.3 2.1-2.1z";

const linkedinPath =
  "M6.5 8.5H3V21h3.5V8.5zM4.8 3C3.7 3 3 3.8 3 4.8s.7 1.8 1.8 1.8 1.8-.8 1.8-1.8S5.9 3 4.8 3zM21 13.8c0-3.8-2-5.6-4.8-5.6-2.2 0-3.2 1.2-3.8 2v-1.7H9V21h3.5v-6.2c0-1.6.3-3.2 2.3-3.2 2 0 2 1.9 2 3.3V21H21v-7.2z";

const heroSocials = [
  { label: "Facebook", path: facebookPath },
  { label: "Twitter", path: twitterPath },
  { label: "LinkedIn", path: linkedinPath },
];

const searchFields = [
  {
    label: "Location",
    icon: MapPin,
    value: "Los Angeles, California",
  },
  {
    label: "Property Type",
    icon: Home,
    value: "Classic Apartment",
  },
  {
    label: "Price Range",
    icon: Banknote,
    value: "₹6,000 - ₹12,000 / month",
  },
];

export function Hero() {
  const site = useSite();

  return (
    <section className="overflow-hidden bg-white">
      <div className="mx-auto w-full max-w-[1720px] px-6 md:px-10 xl:px-24">
        <div className="pt-[62px] pb-[50px]">
          <div className="relative mt-[15px] min-[1001px]:h-[650px]">
            {/* Hero copy */}
            <div
              className={cn(
                "relative z-10 w-full pt-[70px]",
                "max-[600px]:pt-[50px]",
                "min-[1001px]:absolute min-[1001px]:top-[126px] min-[1001px]:left-0 min-[1001px]:w-[520px] min-[1001px]:pt-0",
              )}
            >
              <h1 className="font-baloo text-[44px] leading-[1.02] tracking-[-1px] text-[#111] min-[600px]:text-[54px] min-[1001px]:text-[68px] min-[1001px]:tracking-[-1.4px]">
                <span className="block font-normal">Gateway to</span>
                <span className="block font-bold">Dream Homes</span>
              </h1>

              <p className="mt-[25px] max-w-[445px] font-poppins text-[14px] leading-[1.55] font-normal text-[#686868] min-[600px]:text-base max-[600px]:mt-5">
                Discover a curated collection of dream homes at your fingertips, simplified and
                personalized.
              </p>

              <div className="mt-10 flex items-center gap-[34px] max-[600px]:mt-7 max-[600px]:gap-5">
                <Link
                  to="/projects"
                  className="inline-flex h-[54px] cursor-pointer items-center justify-center rounded-full bg-[#111] px-9 font-baloo text-base font-semibold text-white transition-opacity duration-200 hover:opacity-80 max-[600px]:h-12 max-[600px]:px-[25px] max-[600px]:text-sm"
                >
                  Discover Now
                </Link>

                <button
                  type="button"
                  className="inline-flex cursor-pointer items-center gap-[13px] border-0 bg-transparent p-0 text-[#111]"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-[#111] max-[600px]:h-10 max-[600px]:w-10">
                    <Play className="ml-0.5 h-[13px] w-[13px] fill-[#111] text-[#111]" />
                  </span>
                  <span className="font-poppins text-[15px] font-semibold max-[600px]:text-[13px]">
                    Watch Demo
                  </span>
                </button>
              </div>

              <div className="mt-11 flex items-center gap-3 max-[600px]:mt-[26px] max-[600px]:gap-[10px]">
                {heroSocials.map((social) => {
                  const href =
                    site.socials.find((s) => s.label.toLowerCase() === social.label.toLowerCase())
                      ?.href ?? "#";
                  return (
                    <a
                      key={social.label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="flex h-7 w-7 items-center justify-center text-[#111] transition duration-200 hover:-translate-y-px hover:opacity-55 max-[600px]:h-[22px] max-[600px]:w-[22px]"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="block h-6 w-6 max-[600px]:h-[19px] max-[600px]:w-[19px]"
                      >
                        <path d={social.path} />
                      </svg>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* House image */}
            <div
              className={cn(
                "pointer-events-none relative z-[5] mt-[-10px] w-[110%] -ml-[5%]",
                "max-[600px]:mt-0 max-[600px]:w-[125%] max-[600px]:-ml-[12%]",
                "min-[1001px]:absolute min-[1001px]:top-5 min-[1001px]:right-[-100px] min-[1001px]:mt-0 min-[1001px]:ml-0 min-[1001px]:w-[70%]",
              )}
            >
              <img
                src={HOUSE_IMAGE}
                alt="Unitya Living Dream Home"
                width={1600}
                height={900}
                className="block h-auto w-full object-contain"
              />
            </div>
          </div>

          {/* Property search bar */}
          <div
            className={cn(
              "mx-auto",
              "max-[1000px]:mt-4",
              "min-[1001px]:relative min-[1001px]:z-[15] min-[1001px]:mt-[-92px] min-[1001px]:w-[81%]",
            )}
          >
            <div
              className={cn(
                "flex min-h-[98px] items-center rounded-[30px] border border-[#e7e7e7] bg-white px-[18px] py-[14px] pl-[27px] shadow-[0_18px_45px_rgba(0,0,0,.075)]",
                "max-[1000px]:min-h-0 max-[1000px]:flex-wrap max-[1000px]:gap-[15px] max-[1000px]:rounded-[24px] max-[1000px]:p-5",
                "max-[600px]:grid max-[600px]:grid-cols-1 max-[600px]:gap-[18px]",
              )}
            >
              {searchFields.map((field, i) => (
                <div key={field.label} className="contents">
                  {i > 0 ? (
                    <div className="h-[45px] w-px shrink-0 bg-[#e5e5e5] max-[1000px]:hidden" />
                  ) : null}
                  <div
                    className={cn(
                      "flex min-w-0 flex-1 flex-col justify-center gap-[5px] px-7 font-poppins",
                      "first:pl-0",
                      "max-[1000px]:w-[45%] max-[1000px]:flex-none max-[1000px]:p-0",
                      "max-[600px]:w-full",
                    )}
                  >
                    <div className="flex items-center gap-[7px] text-xs leading-none font-normal text-[#777]">
                      <field.icon className="h-[14px] w-[14px] shrink-0" strokeWidth={1.8} />
                      {field.label}
                    </div>
                    <div className="flex items-center justify-between gap-2.5">
                      <div className="text-sm leading-[1.2] font-semibold whitespace-nowrap text-[#111]">
                        {field.value}
                      </div>
                      <ChevronDown
                        className="h-[15px] w-[15px] shrink-0 text-[#111]"
                        strokeWidth={2}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Link
                to="/projects"
                aria-label="Search properties"
                className="ml-3 grid h-14 w-14 shrink-0 cursor-pointer place-items-center rounded-full bg-[#111] text-white transition-opacity duration-200 hover:opacity-80 max-[1000px]:ml-auto max-[600px]:ml-0 max-[600px]:h-[52px] max-[600px]:w-[52px]"
              >
                <Search className="h-5 w-5" strokeWidth={2.2} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
