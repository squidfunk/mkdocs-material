/*
 * Copyright (c) 2016-2021 Martin Donath <martin.donath@squidfunk.com>
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

import { Observable, Subject, fromEvent } from "rxjs"
import {
  map,
  share,
  switchMapTo,
  tap,
  throttle
} from "rxjs/operators"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Worker message
 */
export interface WorkerMessage {
  type: unknown                        /* Message type */
  data?: unknown                       /* Message data */
}

/**
 * Worker handler
 *
 * @template T - Message type
 */
export interface WorkerHandler<
  T extends WorkerMessage
> {
  tx$: Subject<T>                      /* Message transmission subject */
  rx$: Observable<T>                   /* Message receive observable */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Watch options
 *
 * @template T - Worker message type
 */
interface WatchOptions<T extends WorkerMessage> {
  tx$: Observable<T>                   /* Message transmission observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch a web worker
 *
 * This function returns an observable that sends all values emitted by the
 * message observable to the web worker. Web worker communication is expected
 * to be bidirectional (request-response) and synchronous. Messages that are
 * emitted during a pending request are throttled, the last one is emitted.
 *
 * @param worker - Web worker
 * @param options - Options
 *
 * @returns Worker message observable
 */
export function watchWorker<T extends WorkerMessage>(
  worker: Worker, { tx$ }: WatchOptions<T>
): Observable<T> {

  /* Intercept messages from worker-like objects */
  const rx$ = fromEvent<MessageEvent>(worker, "message")
    .pipe(
      map(({ data }) => data as T)
    )

  /* Send and receive messages, return hot observable */
  return tx$
    .pipe(
      throttle(() => rx$, { leading: true, trailing: true }),
      tap(message => worker.postMessage(message)),
      switchMapTo(rx$),
      share()
    )
}
