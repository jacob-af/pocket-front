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

  const pullToRefreshThreshold = 100;

  const handleTouchStart = (e: TouchEvent) => {
    if (window.scrollY === 0) {
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
      if (pullDistance > pullToRefreshThreshold) {
        onRefresh();
      }
      setIsPulling(false);
      setPullHeight(0);
    }
  };

  useEffect(() => {
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
  }, [isPulling, pullHeight]);

  return (
    <div id="pull-to-refresh-container" className="overflow-hidden">
      <div
        className="transition-height fixed left-0 right-0 top-0 flex h-0 items-center justify-center bg-gray-200 duration-300 ease-in-out"
        style={{ height: `${pullHeight}px` }}
      >
        {pullHeight > pullToRefreshThreshold
          ? "Refreshing..."
          : "↓ Pull to refresh"}
      </div>
      {children}
    </div>
  );
};

export default PullToRefresh;
