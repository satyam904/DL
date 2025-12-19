const AnimatedGrid = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      
      {/* BASE PINK BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-pink-200 to-pink-100" />

      {/* MOVING GRID */}
      <div className="animated-grid-visible absolute inset-0" />

      {/* LIGHT SWEEP */}
      <div className="grid-light-sweep absolute inset-0" />
    </div>
  );
};

export default AnimatedGrid;
