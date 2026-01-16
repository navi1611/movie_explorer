import React from "react";
import { LoaderCircle } from "lucide-react";

const PageLoader: React.FC = () => {
  return (
    <div className="h-screen inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3">
        <LoaderCircle
          className="h-10 w-10 animate-spin text-primary"
          strokeWidth={2.5}
        />
        <span className="text-sm font-medium text-muted-foreground tracking-wide animate-pulse">
          Loading
        </span>
      </div>
    </div>
  );
};

export default PageLoader;
