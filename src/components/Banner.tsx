import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";

const cvaBanner = cva("px-4 py-2 shrink-0 rounded border", {
  variants: {
    variant: {
      info: "bg-blue-300/40 text-blue-800 border-blue-200",
      error: "bg-red-300/40 text-red-800 border-red-200",
      warning: "bg-orange-300/40 text-orange-800 border-orange-200",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

export default function Banner(
  p: React.HTMLAttributes<HTMLElement> & VariantProps<typeof cvaBanner>,
) {
  const classes = twMerge(
    cvaBanner({ variant: p.variant, className: p.className }),
  );

  return (
    <aside {...p} className={classes}>
      {p.children}
    </aside>
  );
}
