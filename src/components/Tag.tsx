import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";

const cvaTag = cva("block px-2 py-0.5 shrink-0 rounded text-xs", {
  variants: {
    variant: {
      red: "bg-red-200 text-red-700",
      gray: "bg-gray-200 text-gray-700",
      blue: "bg-blue-200 text-blue-700",
      green: "bg-green-200 text-green-700",
      orange: "bg-orange-200 text-orange-700",
    },
  },
  defaultVariants: {
    variant: "gray",
  },
});

export default function Tag(
  p: React.HTMLAttributes<HTMLElement> & VariantProps<typeof cvaTag>,
) {
  const classes = twMerge(
    cvaTag({ variant: p.variant, className: p.className }),
  );

  return (
    <span {...p} className={classes}>
      {p.children}
    </span>
  );
}
