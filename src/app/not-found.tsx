import Button from "@/components/Button";
import Typography from "@/components/Typography";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="p-6 h-full grid place-items-center">
      <div className="text-center">
        <Typography variant="h2">404</Typography>
        <Typography variant="body">No coffee exists here!</Typography>
        <Link href="/map" passHref>
          <Button variant="solid" className="mx-auto cursor-pointer">
            Back to the Coffee Map
          </Button>
        </Link>
      </div>
    </div>
  );
}
