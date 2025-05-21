import { MapPinIcon, GlobeIcon } from "lucide-react";
import { conditionallyInclude } from "@/utilities/helpers";

export default function OverlayPanelSocial(p: {
  website?: string;
  address?: string;
}) {
  const isDesktopViewport = window && window.innerWidth >= 600;

  const items = [
    ...conditionallyInclude(!!p.website, {
      icon: <GlobeIcon />,
      href: `https://${p.website}`,
      label: "Website",
    }),
    ...conditionallyInclude(!!p.address, {
      icon: <MapPinIcon />,
      href: `https://google.com/maps/dir//${p.address}`,
      label: "Google Maps",
    }),
    ...conditionallyInclude(!!p.address && isDesktopViewport, {
      // Note: Apple Maps currently only works in desktop.
      icon: <MapPinIcon />,
      href: `https://maps.apple.com/directions?destination=${p.address}`,
      label: "Apple Maps",
    }),
  ];

  return (
    <ul
      className={[
        "mt-10 grid items-stretch gap-2 justify-evenly",
        items.length >= 3 ? "grid-cols-3" : "grid-cols-2",
      ].join(" ")}
    >
      {items.map((item, i) => (
        <li key={i}>
          <a
            href={item.href}
            target="_blank"
            className="cursor-pointer border border-primary-200 bg-white rounded min-h-20 hover:shadow-sm active:bg-primary-200 grid place-items-center"
          >
            <div className="text-primary-600 text-xs [&>svg]:text-primary-800 [&>svg]:mx-auto [&>svg]:mb-1.5 [&>svg]:h-5 [&>svg]:w-5">
              {item.icon}
              {item.label}
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
