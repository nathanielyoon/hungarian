import { assertAlmostEquals } from "jsr:@std/assert@^1.0.13";
import { hungarian } from "@nyoon/hungarian";

Deno.test("munkres", () =>
  Promise.all([
    fetch(
      "https://raw.githubusercontent.com/bmc/munkres/ac8af9e3b6093e4be8e3935829bc7d7fc45a84d2/munkres.py",
    ),
    fetch(
      "https://raw.githubusercontent.com/bmc/munkres/f37e6848ef27c902cad72ca20e48b4300b11f1d6/test/test_munkres.py",
    ),
  ].map(($) => $.then(($) => $.text()))).then(([munkres, test_munkres]) =>
    [
      ...munkres.slice(17105, 17980).match(/(?<=\().+?(?=\))/gs)!.map(($) => {
        const a = JSON.parse(`[${$}]`);
        return { weights: a[0].flat(), workers: a[0][0].length, total: a[1] };
      }),
      ...test_munkres.matchAll(
        /matrix = (\[[\s,-.\d[\]]+?\])\s+cost = _get_cost\(matrix\)\s+assert cost == (?:pytest\.approx\()?(\d+(?:\.\d+)?)/gs,
      ).take(7).map(($) => {
        const a = JSON.parse($[1]);
        return { weights: a.flat(), workers: a[0].length, total: +$[2] };
      }),
    ].forEach(($) =>
      assertAlmostEquals(
        new Float64Array(hungarian($.weights, $.workers)!.buffer).at(-1)!,
        $.total,
      )
    )
  ));
