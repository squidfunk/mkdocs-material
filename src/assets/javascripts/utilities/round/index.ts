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
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Round a number for display with repository facts
 *
 * This is a reverse-engineered version of GitHub's weird rounding algorithm
 * for stars, forks and all other numbers. While all numbers below `1,000` are
 * returned as-is, bigger numbers are converted to fixed numbers:
 *
 * - `1,049` => `1k`
 * - `1,050` => `1.1k`
 * - `1,949` => `1.9k`
 * - `1,950` => `2k`
 *
 * @param value - Original value
 *
 * @returns Rounded value
 */
export function round(value: number): string {
  if (value > 999) {
    const digits = +((value - 950) % 1000 > 99)
    return `${((value + 0.000001) / 1000).toFixed(digits)}k`
  } else {
    return value.toString()
  }
}
