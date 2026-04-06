const LeafDivider = () => (
  <div className="flex justify-center py-16 md:py-24">
    <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M60 75 C60 75 60 40 60 30 C60 20 50 10 35 5 C50 15 55 25 55 35 C55 45 55 75 55 75"
        stroke="hsl(var(--primary-lightest))"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M60 75 C60 75 60 40 60 30 C60 20 70 10 85 5 C70 15 65 25 65 35 C65 45 65 75 65 75"
        stroke="hsl(var(--primary-lightest))"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="60" cy="28" r="3" fill="hsl(var(--primary-lightest))" />
    </svg>
  </div>
);

export default LeafDivider;
