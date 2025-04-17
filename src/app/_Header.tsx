import Typography from "@/components/Typography";
import HeaderFilters from "./_HeaderFilters";
import HeaderOverview from "./_HeaderOverview";

export default function Header() {
  return (
    <header className="z-10 shadow-xs bg-white border-b border-b-primary-200 px-6 py-1.5">
      <div className="min-h-12 flex gap-2 items-center justify-between">
        <Typography variant="h1" className="grow">
          Cheltenham Coffee Map
        </Typography>
        <HeaderFilters />
        <HeaderOverview />
      </div>
    </header>
  );
}
