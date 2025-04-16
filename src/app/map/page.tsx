import MapCanvas from "./_MapCanvas";
import OverlayPanel from "./_OverlayPanel";

export default function Page() {
  return (
    <div className="h-full grid grid-rows-1 grid-cols-1 [&>*]:row-1 [&>*]:col-1">
      <MapCanvas />
      <OverlayPanel />
    </div>
  );
}
