/*
 * Copyright (c) 2016-2022 Martin Donath <martin.donath@squidfunk.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Table for indexing
 */
export type PositionTable = number[][]

/**
 * Position
 */
export type Position = number

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Highlight all occurrences in a string
 *
 * This function receives a field's value (e.g. like `title` or `text`), it's
 * position table that was generated during indexing, and the positions found
 * when executing the query. It then highlights all occurrences, and returns
 * their concatenation. In case of multiple blocks, two are returned.
 *
 * @param value - String value
 * @param table - Table for indexing
 * @param positions - Occurrences
 *
 * @returns Highlighted string value
 */
export function highlight(
  value: string, table: PositionTable, positions: Position[]
): string {

  /* Map occurrences to blocks */
  const blocks = new Map<number, number[]>()
  for (const i of positions.sort((a, b) => a - b)) {
    const block = i >>> 20
    const index = i & 0xFFFFF

    /* Ensure presence of block group */
    let group = blocks.get(block)
    if (typeof group === "undefined")
      blocks.set(block, group = [])

    /* Add index to group */
    group.push(index)
  }

  /* Compute slices */
  const slices: string[] = []
  for (const [block, indexes] of blocks) {
    const t = table[block]

    /* Extract positions and length */
    const start  = t[0]            >>> 12
    const end    = t[t.length - 1] >>> 12
    const length = t[t.length - 1] >>> 2 & 0x3FF

    /* Extract and highlight slice/block */
    let slice = value.slice(start, end + length)
    for (const i of indexes.sort((a, b) => b - a)) {

      /* Retrieve offset and length of match */
      const p = (t[i] >>> 12) - start
      const q = (t[i] >>> 2 & 0x3FF) + p

      /* Wrap occurrence */
      slice = [
        slice.slice(0, p),
        "<mark>", slice.slice(p, q), "</mark>",
        slice.slice(q)
      ].join("")
    }

    /* Append slice and abort if we have two */
    if (slices.push(slice) === 2)
      break
  }

  /* Return highlighted string value */
  return slices.join("")
}
