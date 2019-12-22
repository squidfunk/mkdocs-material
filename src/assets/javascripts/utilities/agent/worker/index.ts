/*
 * Copyright (c) 2016-2019 Martin Donath <martin.donath@squidfunk.com>
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

import { Observable, fromEvent } from "rxjs"
import { pluck, share, switchMapTo, tap, throttle } from "rxjs/operators"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Worker message
 */
export interface WorkerMessage {
  type: unknown                        /* Message type */
  data: unknown                        /* Message data */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Options
 *
 * @template T - Worker message type
 */
interface Options<T extends WorkerMessage> {
  send$: Observable<T>                 /* Message observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch a web worker
 *
 * This function returns an observable that will send all values emitted by the
 * message observable to the web worker. Web worker communication is expected
 * to be bidirectional (request-response) and synchronous. Messages that are
 * emitted during a pending request are throttled, the last one is emitted.
 *
 * @param worker - Web worker
 *
 * @return Worker message observable
 */
export function watchWorker<T extends WorkerMessage>(
  worker: Worker, { send$ }: Options<T>
): Observable<T> {

  /* Intercept messages from web worker */
  const recv$ = fromEvent(worker, "message")
    .pipe(
      pluck<Event, T>("data"),
      share()
    )

  /* Send and receive messages, return hot observable */
  return send$
    .pipe(
      throttle(() => recv$, { leading: true, trailing: true }),
      tap(message => worker.postMessage(message)),
      switchMapTo(recv$),
      share()
    )
}
