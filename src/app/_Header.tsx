import Typography from "@/components/Typography";

export default function Header() {
  return (
    <header className="z-10 shadow-xs bg-white border-b border-b-primary-200 px-6 py-1.5">
      <div className="min-h-12 flex items-center justify-between">
        <Typography variant="h1">Cheltenham Coffee Map</Typography>
        <nav className="space-x-4">
          <button>Filters</button>
          <button>About</button>
        </nav>
      </div>
    </header>
  );
}
