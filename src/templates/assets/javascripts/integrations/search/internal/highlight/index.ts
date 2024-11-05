/*
 * Copyright (c) 2016-2024 Martin Donath <martin.donath@squidfunk.com>
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
 * Position table
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
 * @param input - Input value
 * @param table - Table for indexing
 * @param positions - Occurrences
 * @param full - Full results
 *
 * @returns Highlighted string value
 */
export function highlight(
  input: string, table: PositionTable, positions: Position[], full = false
): string {
  return highlightAll([input], table, positions, full).pop()!
}

/**
 * Highlight all occurrences in a set of strings
 *
 * @param inputs - Input values
 * @param table - Table for indexing
 * @param positions - Occurrences
 * @param full - Full results
 *
 * @returns Highlighted string values
 */
export function highlightAll(
  inputs: string[], table: PositionTable, positions: Position[], full = false
): string[] {

  /* Map blocks to input values */
  const mapping = [0]
  for (let t = 1; t < table.length; t++) {
    const prev = table[t - 1]
    const next = table[t]

    /* Check if table points to new block */
    const p = prev[prev.length - 1] >>> 2 & 0x3FF
    const q = next[0]               >>> 12

    /* Add block to mapping */
    mapping.push(+(p > q) + mapping[mapping.length - 1])
  }

  /* Highlight strings one after another */
  return inputs.map((input, i) => {
    let cursor = 0

    /* Map occurrences to blocks */
    const blocks = new Map<number, number[]>()
    for (const p of positions.sort((a, b) => a - b)) {
      const index = p & 0xFFFFF
      const block = p >>> 20
      if (mapping[block] !== i)
        continue

      /* Ensure presence of block group */
      let group = blocks.get(block)
      if (typeof group === "undefined")
        blocks.set(block, group = [])

      /* Add index to group */
      group.push(index)
    }

    /* Just return string, if no occurrences */
    if (blocks.size === 0)
      return input

    /* Compute slices */
    const slices: string[] = []
    for (const [block, indexes] of blocks) {
      const t = table[block]

      /* Extract positions and length */
      const start  = t[0]            >>> 12
      const end    = t[t.length - 1] >>> 12
      const length = t[t.length - 1] >>> 2 & 0x3FF

      /* Add prefix, if full results are desired */
      if (full && start > cursor)
        slices.push(input.slice(cursor, start))

      /* Extract and highlight slice */
      let slice = input.slice(start, end + length)
      for (const j of indexes.sort((a, b) => b - a)) {

        /* Retrieve offset and length of match */
        const p = (t[j] >>> 12) - start
        const q = (t[j] >>> 2 & 0x3FF) + p

        /* Wrap occurrence */
        slice = [
          slice.slice(0, p),
          "<mark>",
          slice.slice(p, q),
          "</mark>",
          slice.slice(q)
        ].join("")
      }

      /* Update cursor */
      cursor = end + length

      /* Append slice and abort if we have two */
      if (slices.push(slice) === 2)
        break
    }

    /* Add suffix, if full results are desired */
    if (full && cursor < input.length)
      slices.push(input.slice(cursor))

    /* Return highlighted slices */
    return slices.join("")
  })
}
