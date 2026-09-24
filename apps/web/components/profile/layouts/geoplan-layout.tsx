"use client";

import { motion } from "motion/react";
import { Mail, MapPin, Phone } from "lucide-react";
import { CardProps } from "./types";
import { cn } from "@/lib/utils";
import { CardQrCode } from "./card-qr-code";

// Geoplan corporate brand blue.
const GEOPLAN_BLUE = "#0C55A3";

const SERVICES = [
  "RTLS & GIS | AI & IoT | RUGGED MOBILE COMPUTING | VIDEO WALL",
  "CONFERENCING SOLUTIONS | AI SURVEILLANCE",
  "SMART SOLUTIONS | SYSTEM INTEGRATION",
];

export function GeoplanLayout({ profile, config, isFlipped }: CardProps) {
  const nickname = profile.nickname?.trim() || profile.firstName;
  const fullName = `${profile.firstName} ${profile.lastName}`.trim();

  const details = [
    { show: config?.cardShowPhone !== false, icon: Phone, value: profile.contactNumber },
    { show: config?.cardShowEmail !== false, icon: Mail, value: profile.email },
    { show: config?.cardShowAddress !== false, icon: MapPin, value: profile.companyAddress },
  ].filter((d) => d.show && d.value);

  return (
    <motion.div
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
      className="relative aspect-[1.586/1] rounded-lg"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Front Side */}
      <div
        className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-lg bg-white p-6"
        style={{ backfaceVisibility: "hidden" }}
      >
        {/* Header: identity + logo */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p
              className="truncate text-2xl font-extrabold leading-none tracking-tight"
              style={{ color: GEOPLAN_BLUE }}
            >
              {nickname}
            </p>
            <p className="mt-2 truncate text-base font-medium text-neutral-900">
              {fullName}
            </p>
            {profile.positionTitle && (
              <p
                className="mt-1 truncate text-xs font-medium"
                style={{ color: GEOPLAN_BLUE }}
              >
                {profile.positionTitle}
              </p>
            )}
          </div>

          <img
            src="/assets/geoplan-icon.png"
            alt="Geoplan"
            className="h-7 w-auto shrink-0 object-contain"
          />
        </div>

        {/* Contact details */}
        <div className="grid gap-2">
          {details.map(({ icon: Icon, value }, index) => (
            <span key={index} className="flex items-start gap-2.5 text-[0.7rem] font-medium text-neutral-800">
              <span
                className="flex size-5 shrink-0 items-center justify-center rounded-full text-white"
                style={{ backgroundColor: GEOPLAN_BLUE }}
              >
                <Icon className="size-3" aria-hidden="true" />
              </span>
              <span className="leading-5">{value}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Back Side */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-between overflow-hidden rounded-lg p-5 text-white"
        style={{
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          backgroundColor: GEOPLAN_BLUE,
        }}
      >
        <p className="text-center text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-white/90">
          Real People <span className="text-white/50">|</span> Real Service{" "}
          <span className="text-white/50">|</span> Real Result
        </p>

        {config?.showQrCode !== false ? (
          <CardQrCode className="size-20 shrink-0 rounded-md p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.25)]" />
        ) : (
          <div className="size-20" aria-hidden="true" />
        )}

        <p className="text-center text-[0.55rem] font-bold uppercase leading-relaxed tracking-wide text-white/90">
          {SERVICES.map((line, index) => (
            <span key={index} className={cn("block", index > 0 && "mt-0.5")}>
              {line}
            </span>
          ))}
        </p>
      </div>
    </motion.div>
  );
}
