import { twMerge } from "tailwind-merge";
import { cva } from "class-variance-authority";

const cvaDescriptionListEntry = cva(
  "[&>dt]:text-primary-700 [&>dl]:text-primary-800",
  {
    variants: {
      icon: {
        true: "flex items-start gap-4 [&>dt]:shrink-0 [&>dt]:mt-1 [&>dt>svg]:h-4 [&>dt>svg]:w-4",
        false: "[&:not(:last-child)]:mb-4 [&>dt]:text-sm [&>dl]:text-md",
      },
    },
  },
);

export default function DescriptionListEntry(
  p: React.HTMLAttributes<HTMLDivElement> & {
    name: string;
    summary: string | React.ReactNode;

    // 'p.name' is required. If 'p.icon' is provided,
    // the component uses 'p.name' for the aria-label.
    icon?: React.ReactNode;
  },
) {
  // On this occasion, we don't use CVA's VariantProps
  // because the 'p.icon' is type ReactNode, not boolean.

  const classes = twMerge(
    cvaDescriptionListEntry({
      icon: Boolean(p.icon),
      className: p.className,
    }),
  );

  return (
    <div {...p} className={classes}>
      <dt {...(p.icon && { "aria-label": p.name })}>{p.icon ?? p.name}</dt>
      <dl>{p.summary}</dl>
    </div>
  );
}
