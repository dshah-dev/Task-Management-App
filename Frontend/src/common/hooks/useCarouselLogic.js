import { useState, useRef } from "react";

export const useCarouselLogic = (items = []) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % items.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + items.length) % items.length);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    startX.current = e.pageX;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const currentX = e.pageX;
    const diff = currentX - startX.current;

    if (diff > 30) {
      prev();
      startX.current = currentX;
    } else if (diff < -30) {
      next();
      startX.current = currentX;
    }
  };

  const stopDragging = () => setIsDragging(false);

  const getCardStyles = (index) => {
    const total = items.length;
    if (total === 0)
      return { offset: 0, absOffset: 0, isActive: true, isVisible: false };

    let offset = index - activeIndex;

    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;

    const absOffset = Math.abs(offset);
    return {
      offset,
      absOffset,
      isActive: offset === 0,
      isVisible: absOffset <= 3,
    };
  };

  return {
    activeIndex,
    setActiveIndex,
    next,
    prev,
    getCardStyles,
    handleMouseDown,
    handleMouseMove,
    stopDragging,
  };
};
