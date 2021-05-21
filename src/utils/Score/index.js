export const scoreColor = score => {
  if (score >= 90) {
    return 'rgba(43, 231, 208, 1)';
  }
  if (score >= 70) {
    return 'rgba(81, 230, 43, 1)';
  }
  if (score >= 30) {
    return 'rgba(232, 140, 56, 1)';
  }
  if (score >= 0) {
    return 'rgba(232, 78, 56, 1)';
  }
  return 'black';
};
