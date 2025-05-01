import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";

const cvaExternalLink = cva(
  "underline-offset-2 underline decoration-primary-200 hover:decoration-inherit active:decoration-2",
);

export default function ExternalLink(
  p: React.AnchorHTMLAttributes<HTMLAnchorElement> &
    VariantProps<typeof cvaExternalLink>,
) {
  const classes = twMerge(cvaExternalLink({ className: p.className }));

  return (
    <a
      {...p}
      target="_blank"
      className={classes}
      rel="external nofollow noreferrer"
      aria-label={`${p.children} (Opens in a New Tab)`}
    >
      {p.children}
    </a>
  );
}
