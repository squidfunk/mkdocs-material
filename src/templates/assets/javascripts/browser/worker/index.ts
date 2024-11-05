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

import {
  Observable,
  Subject,
  endWith,
  fromEvent,
  ignoreElements,
  mergeWith,
  share,
  takeUntil
} from "rxjs"

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

/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Create an observable for receiving from a web worker
 *
 * @template T - Data type
 *
 * @param worker - Web worker
 *
 * @returns Message observable
 */
function recv<T>(worker: Worker): Observable<T> {
  return fromEvent<MessageEvent<T>, T>(worker, "message", ev => ev.data)
}

/**
 * Create a subject for sending to a web worker
 *
 * @template T - Data type
 *
 * @param worker - Web worker
 *
 * @returns Message subject
 */
function send<T>(worker: Worker): Subject<T> {
  const send$ = new Subject<T>()
  send$.subscribe(data => worker.postMessage(data))

  /* Return message subject */
  return send$
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Create a bidirectional communication channel to a web worker
 *
 * @template T - Data type
 *
 * @param url - Worker URL
 * @param worker - Worker
 *
 * @returns Worker subject
 */
export function watchWorker<T extends WorkerMessage>(
  url: string, worker = new Worker(url)
): Subject<T> {
  const recv$ = recv<T>(worker)
  const send$ = send<T>(worker)

  /* Create worker subject and forward messages */
  const worker$ = new Subject<T>()
  worker$.subscribe(send$)

  /* Return worker subject */
  const done$ = send$.pipe(ignoreElements(), endWith(true))
  return worker$
    .pipe(
      ignoreElements(),
      mergeWith(recv$.pipe(takeUntil(done$))),
      share()
    ) as Subject<T>
}
