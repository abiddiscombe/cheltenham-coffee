import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";

const cvaSurface = cva(
  "p-4 bg-white overflow-hidden rounded-md border border-primary-200",
  {
    variants: {
      shadow: {
        true: "shadow",
        false: "",
      },
      interactive: {
        true: "cursor-pointer hover:shadow hover:bg-primary-100 active:bg-primary-200",
        false: "",
      },
    },
    defaultVariants: {
      shadow: false,
      interactive: false,
    },
  },
);

export default function Surface(
  p: React.HTMLAttributes<HTMLElement> &
    VariantProps<typeof cvaSurface> & {
      as?: React.ElementType;
      shadow?: boolean;
      interactive?: boolean;
    },
) {
  const Tag = p.as ?? "div";
  const classes = twMerge(
    cvaSurface({
      shadow: p.shadow,
      interactive: p.interactive,
      className: p.className,
    }),
  );

  return (
    <Tag {...p} className={classes}>
      {p.children}
    </Tag>
  );
}
