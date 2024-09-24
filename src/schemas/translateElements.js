
export const translateElements = (x, y, elements) => elements.map(e => {
  const r = { ...e };
  if (!isNaN(r.x)) r.x = r.x + x;
  if (!isNaN(r.y)) r.y = r.y + y;
  return r;
});
