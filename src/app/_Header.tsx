import { CoffeeIcon } from "lucide-react";
import Tag from "@/components/Tag";
import Typography from "@/components/Typography";
import HeaderOverview from "./_HeaderOverview";

export default function Header() {
  return (
    <header className="bg-white border-b border-b-primary-200 px-4 sm:px-6 py-0.5 min-h-14 flex gap-4 items-center justify-between">
      <div
        aria-hidden={true}
        className="p-1.5 bg-gradient-to-tr from-orange-400 to-rose-400 rounded"
      >
        <CoffeeIcon className="text-white h-4.5 w-4.5" />
      </div>
      <Typography variant="h1" className="font-semibold">
        Cheltenham Coffee
      </Typography>
      <hr className="border-none grow" />
      <Tag variant="orange">Beta</Tag>
      <HeaderOverview />
    </header>
  );
}
