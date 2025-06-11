# hungarian

Find a [bipartite graph's minimum-cost perfect matching](https://w.wiki/DTd7a).

```ts
import { hungarian } from "@nyoon/hungarian";
import { assertEquals } from "jsr:@std/assert@^1.0.13";

assertEquals(
  new Float64Array(
    hungarian(new Float64Array([8, 5, 9, 4, 2, 4, 7, 3, 8]), 3)!.buffer,
  ),
  new Float64Array([0, 2, 1, 15]),
);
```
