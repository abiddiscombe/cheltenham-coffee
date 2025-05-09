import { Suspense } from "react";
import Canvas from "./_Canvas";
import OverlayNav from "./_OverlayNav";
import OverlayPanel from "./_OverlayPanel";

export default function Page() {
  return (
    <Suspense>
      <div className="h-full grid grid-rows-1 grid-cols-1 [&>*]:row-1 [&>*]:col-1">
        <Canvas />
        <div className="z-20 pointer-events-none [&>*]:pointer-events-auto pb-12 flex flex-col justify-between sm:block">
          <OverlayNav />
          <OverlayPanel />
        </div>
      </div>
    </Suspense>
  );
}
