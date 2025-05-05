import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const cvaTypography = cva("", {
  variants: {
    variant: {
      h1: "text-primary-900",
      h2: "text-primary-900 text-2xl font-medium mb-2",
      h3: "text-primary-900 text-lg font-medium mb-2",
      body: "text-primary-700 mb-2 last-of-type:mb-6",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

export default function Typography(
  p: React.HTMLAttributes<HTMLParagraphElement> &
    VariantProps<typeof cvaTypography>,
) {
  const Tag = p.variant === "body" ? "p" : (p.variant ?? "p");
  const classes = twMerge(
    cvaTypography({
      variant: p.variant,
      className: p.className,
    }),
  );

  return (
    <Tag {...p} className={classes}>
      {p.children}
    </Tag>
  );
}
