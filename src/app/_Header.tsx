import Tag from "@/components/Tag";
import Typography from "@/components/Typography";
import HeaderOverview from "./_HeaderOverview";

export default function Header() {
  return (
    <header className="bg-white border-b border-b-primary-200 px-4 sm:px-6 py-0.5 min-h-14 flex gap-4 items-center justify-between">
      <Typography variant="h1" className="font-semibold">
        Cheltenham Coffee
      </Typography>
      <Tag>Beta</Tag>
      <hr className="border-none grow" />
      <HeaderOverview />
    </header>
  );
}
