import { Suspense } from "react";
import MapCanvas from "./_MapCanvas";
import MapOverlay from "./_MapOverlay";

export default function Page() {
  return (
    <Suspense>
      <div className="h-full grid grid-rows-1 grid-cols-1 [&>*]:row-1 [&>*]:col-1">
        <MapCanvas />
        <MapOverlay />
      </div>
    </Suspense>
  );
}
