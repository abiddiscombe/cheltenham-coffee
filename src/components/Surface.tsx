import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";

const cvaSurface = cva(
  "p-4 bg-white overflow-hidden shadow rounded-md border border-primary-200",
);

export default function Surface(
  p: React.HTMLAttributes<HTMLElement> &
    VariantProps<typeof cvaSurface> & {
      as?: React.ElementType;
    },
) {
  const Tag = p.as ?? "div";
  const classes = twMerge(cvaSurface({ className: p.className }));

  return (
    <Tag {...p} className={classes}>
      {p.children}
    </Tag>
  );
}
