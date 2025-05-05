import { LinkIcon, MapPinIcon } from "lucide-react";
import Typography from "@/components/Typography";
import ExternalLink from "@/components/ExternalLink";

export default function MapOverlayExp(p: {
  metadata: { [key: string]: string } | undefined;
}) {
  if (!p.metadata) {
    return null;
  }

  function Tag(p: { icon: React.ReactNode; children: React.ReactNode }) {
    return (
      <li className="min-h-8 flex items-center gap-4 [&>svg]:h-4.5 [&>svg]:w-4.5 [&>svg]:text-primary-600 [&>p]:last-of-type:m-0 [&>p]:m-0">
        {p.icon}
        <Typography variant="body">{p.children}</Typography>
      </li>
    );
  }

  return (
    <ul className="mt-6">
      {p.metadata?.website && (
        <Tag icon={<LinkIcon />}>
          <ExternalLink href={`https://${p.metadata?.website}`}>
            {p.metadata?.website?.replace("www.", "")}
          </ExternalLink>
        </Tag>
      )}
      {p.metadata?.address && (
        <Tag icon={<MapPinIcon />}>
          Directions: &nbsp;
          <ExternalLink
            href={`https://google.com/maps/dir//${p.metadata.address}`}
          >
            Google
          </ExternalLink>
          &ensp;|&ensp;
          <ExternalLink
            href={`https://maps.apple.com/directions?destination=${p.metadata.address}`}
          >
            Apple
          </ExternalLink>
        </Tag>
      )}
    </ul>
  );
}
