import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";

const cvaIconList = cva(
  "my-2 space-y-2.5 [&>li]:flex [&>li]:items-center [&>li]:gap-4 [&>li]:text-primary-800 [&>li>span:first-of-type]:p-2 [&>li>span:first-of-type]:rounded-full [&>li>span:first-of-type]:bg-primary-100 [&>li>span:first-of-type>svg]:h-3.5 [&>li>span:first-of-type>svg]:w-3.5 [&>li>span:first-of-type>svg]:text-primary-600",
);

export default function IconList(
  p: React.HTMLAttributes<HTMLUListElement> &
    VariantProps<typeof cvaIconList> & {
      items: {
        icon: React.ReactNode;
        label: React.ReactNode;
      }[];
    },
) {
  const classes = twMerge(cvaIconList({ className: p.className }));

  return (
    <ul {...p} className={classes}>
      {p.items.map((item, i) => (
        <li key={i}>
          <span aria-hidden={true}>{item.icon}</span>
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  );
}
