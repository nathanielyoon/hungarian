/** Finds a minimum-cost bipartite matching. */
export const hungarian = (
  weights: Float64Array,
  workers: number,
): Float64Array | null => {
  const a = weights.length / workers;
  if (!a || !workers || a > workers || a > ~~a) return null;
  const b = new Float64Array(a + 1), c = new Int32Array(workers + 1).fill(-1);
  const d = new Uint8Array(workers + 1), e = new Float64Array(workers + 1);
  const f = new Float64Array(workers + 1), g = new Int32Array(workers + 1);
  let z = 0, y, x, h, i, j, k;
  do {
    c[y = workers] = z, d.fill(0), e.fill(Infinity);
    do {
      x = 0, h = c[y], d[y] = 1, i = Infinity, j = -1;
      do if (!d[x]) {
        k = weights[h * workers + x] - b[h] - f[x];
        if (k < e[x]) e[x] = k, g[x] = y;
        if (e[x] < i) i = e[j = x];
      } while (++x < workers);
      do d[x] ? (/*~c[x] &&*/ b[c[x]] += i, f[x] -= i) : e[x] -= i; while (x--);
    } while (~c[y = j]);
    do c[y] = c[y = g[y]]; while (y !== workers);
  } while (++z < a);
  do if (~c[--y]) b[c[y]] = y; while (y);
  return b[a] = -f[workers], b.subarray(0, -1);
};
