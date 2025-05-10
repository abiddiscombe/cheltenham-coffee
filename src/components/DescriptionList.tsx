import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";

const cvaDescriptionList = cva("my-2 space-y-2");

export default function DescriptionList(
  p: React.HTMLAttributes<HTMLDListElement> &
    VariantProps<typeof cvaDescriptionList>,
) {
  const classes = twMerge(cvaDescriptionList({ className: p.className }));

  return <dl {...p} className={classes} />;
}
