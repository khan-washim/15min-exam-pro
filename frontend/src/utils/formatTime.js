export const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

export const getPerformanceLabel = (score, total) => {
  const pct = (score / total) * 100;
  if(pct >= 80) return { label: 'Expert', color: 'text-success' };
  if(pct >= 60) return { label: 'Good', color: 'text-primary' };
  if(pct >= 40) return { label: 'Average', color: 'text-warning' };
  return { label: 'beginner', color: 'text-danger' };
};