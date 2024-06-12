import { ReactNode, useEffect, useRef, useState } from "react";

interface PullToRefreshProps {
  onRefresh: () => void;
  children: ReactNode;
}

const PullToRefresh: React.FC<PullToRefreshProps> = ({
  onRefresh,
  children
}) => {
  const [isPulling, setIsPulling] = useState(false);
  const [pullHeight, setPullHeight] = useState(0);
  const startYRef = useRef(0);

  const pullToRefreshThreshold = 50;

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        console.log("Touch Start");
        startYRef.current = e.touches[0].pageY;
        setIsPulling(true);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isPulling) {
        const currentY = e.touches[0].pageY;
        const pullDistance = currentY - startYRef.current;
        if (pullDistance > 0) {
          e.preventDefault();
          setPullHeight(Math.min(pullDistance, pullToRefreshThreshold));
        }
      }
    };

    const handleTouchEnd = () => {
      if (isPulling) {
        const pullDistance = pullHeight;
        console.log("Touch End", pullDistance);
        if (pullDistance >= pullToRefreshThreshold) {
          console.log("Refreshing...");
          onRefresh();
        }
        setIsPulling(false);
        setPullHeight(0);
      }
    };

    const options = { passive: false };
    const container = document.getElementById("pull-to-refresh-container");

    container?.addEventListener("touchstart", handleTouchStart, options);
    container?.addEventListener("touchmove", handleTouchMove, options);
    container?.addEventListener("touchend", handleTouchEnd);

    return () => {
      container?.removeEventListener("touchstart", handleTouchStart);
      container?.removeEventListener("touchmove", handleTouchMove);
      container?.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isPulling, pullHeight, onRefresh]);

  return (
    <div id="pull-to-refresh-container">
      <div
        className="transition-height fixed left-0 right-0 top-0 flex items-center justify-center bg-gray-200 duration-300 ease-in-out"
        style={{ height: `${pullHeight}px` }}
      >
        {pullHeight > pullToRefreshThreshold
          ? "Refreshing..."
          : "↓ Pull to refresh"}
      </div>
      <div style={{ marginTop: `${pullHeight}px` }}>{children}</div>
    </div>
  );
};

export default PullToRefresh;
