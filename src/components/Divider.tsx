import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";

const cvaDivider = cva("my-6 border-t border-t-primary-200");

export default function Divider(
  p: React.HTMLAttributes<HTMLHRElement> & VariantProps<typeof cvaDivider>,
) {
  const classes = twMerge(cvaDivider({ className: p.className }));

  return <hr {...p} className={classes} />;
}
