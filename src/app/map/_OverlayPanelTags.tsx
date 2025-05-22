import IconList from "@/components/IconList";
import { LOCATION_FILTERS } from "@/utilities/constants";

export default function OverlayPanelTags(p: { tags: string[] }) {
  return (
    <IconList
      className="mt-8"
      items={p.tags
        .map((tag) => {
          const matchedTag = LOCATION_FILTERS.find(
            (filterEntry) => filterEntry.id === tag,
          );
          return matchedTag
            ? {
                icon: <matchedTag.icon />,
                label: `${matchedTag.label}`,
              }
            : [];
        })
        .flat()}
    />
  );
}
