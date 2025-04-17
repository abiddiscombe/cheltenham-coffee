import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const cvaButton = cva("shrink-0 rounded border flex items-center", {
  variants: {
    size: {
      text: "gap-2.5 px-6 h-9 max-h-9 text-md",
      icon: "w-10 max-w-10 h-9 max-h-9 text-md justify-center",
    },
    variant: {
      ghost:
        "text-primary-800 bg-transparent hover:bg-primary-100 hover:active:bg-primary-200 border-none hover:border-primary-100 hover:active:border-primary-200",
      solid:
        "shadow-sm text-white bg-primary-950 hover:bg-primary-800 hover:active:bg-primary-700 border-primary-950 hover:border-primary-800 hover:active:border-primary-700",
      outline:
        "text-primary-800 bg-transparent hover:bg-primary-100 hover:active:bg-primary-200 border-primary-200",
      destructive:
        "shadow-sm text-white bg-red-600 hover:bg-red-700 hover:active:bg-red-800 border-red-600 hover:border-red-700 hover:active:border-red-800",
    },
  },
  defaultVariants: {
    size: "text",
    variant: "outline",
  },
});

export default function Button(
  p: React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof cvaButton>,
) {
  const classes = twMerge(
    cvaButton({
      size: p.size,
      variant: p.variant,
      className: p.className,
    }),
  );

  return (
    <button {...p} className={classes}>
      {p.children}
    </button>
  );
}
