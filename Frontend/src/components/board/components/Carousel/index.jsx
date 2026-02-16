import React from "react";
import { useCarouselLogic } from "../../../../common/hooks/useCarouselLogic";

const TaskCarousel = ({ tasks }) => {
  const {
    next,
    prev,
    getCardStyles,
    setActiveIndex,
    handleMouseDown,
    handleMouseMove,
    stopDragging,
  } = useCarouselLogic(tasks);

  if (!tasks?.length) return null;

  return (
    <div
      className="carousel-container w-full h-auto flex flex-col justify-center items-center overflow-hidden "
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
    >
      <div className="relative w-full min-h-90 flex items-center justify-center transform-3d">
        {tasks.map((task, index) => {
          const { offset, absOffset, isActive, isVisible } =
            getCardStyles(index);

          if (!isVisible) return null;

          const translateX = offset * 220;
          const translateZ = absOffset * -110;
          const rotateY = offset * -25;
          const opacity = 1 - absOffset * 0.23;

          return (
            <div
              key={task.id}
              className={`carousel-card ${isActive ? "active" : ""}`}
              onDoubleClick={() => setActiveIndex(index)}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                opacity: opacity,
                zIndex: 10 - absOffset,
                cursor: isActive ? "default" : "grab",
              }}
            >
              <div className="card-inner">
                <div className="card-content absolute w-full px-5 py-4 text-center">
                  <h3 className=" text-white font-black uppercase text-lg">
                    {task.title}
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-4 mt-2">
        <button
          onClick={prev}
          className="bg-transparent border border-white/20 text-white px-5 py-1.25 rounded-[20px] cursor-pointer  hover:bg-white hover:text-black"
        >
          Prev
        </button>
        <button
          onClick={next}
          className="bg-transparent border border-white/20 text-white px-5 py-1.25 rounded-[20px] cursor-pointer  hover:bg-white hover:text-black"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TaskCarousel;
