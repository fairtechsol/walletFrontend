

import { lazy, Suspense } from "react";
import Loader from "../components/Loader";

const Loadable = (importFunc: any) => {
  const LazyComponent = lazy(() =>
    importFunc().catch((error: any) => {
      console.error("Dynamic import failed:", error);
      window.location.reload();
      throw error;
    })
  );

  return (props: any) => (
    <Suspense fallback={<Loader height={"100vh"} />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default Loadable;
