import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const SCROLL_THRESHOLD = 100;

const useAutoScroll = <T extends HTMLElement>(
  dependencies: unknown[],
) => {
  const containerRef = useRef<T | null>(null);

  const [shouldAutoScroll, setShouldAutoScroll] =
    useState(true);

  const scrollToBottom = useCallback(
    (behavior: ScrollBehavior = "smooth") => {
      const container = containerRef.current;

      if (!container) {
        return;
      }

      container.scrollTo({
        top: container.scrollHeight,
        behavior,
      });
    },
    [],
  );

  const handleScroll = useCallback(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const distanceFromBottom =
      container.scrollHeight -
      container.scrollTop -
      container.clientHeight;

    setShouldAutoScroll(
      distanceFromBottom <= SCROLL_THRESHOLD,
    );
  }, []);

  useEffect(() => {
    if (!shouldAutoScroll) {
      return;
    }

    scrollToBottom();
  }, [dependencies, shouldAutoScroll, scrollToBottom]);

  return {
    containerRef,
    handleScroll,
    scrollToBottom,
    shouldAutoScroll,
  };
};

export default useAutoScroll;