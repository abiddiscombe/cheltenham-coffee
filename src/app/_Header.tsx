import Typography from "@/components/Typography";
import HeaderOverview from "./_HeaderOverview";

export default function Header() {
  return (
    <header className="bg-white border-b border-b-primary-200 px-8 py-0.5 min-h-12 flex gap-4 items-center justify-between">
      <Typography variant="h1" className="grow">
        Cheltenham Coffee
      </Typography>
      <HeaderOverview />
    </header>
  );
}
