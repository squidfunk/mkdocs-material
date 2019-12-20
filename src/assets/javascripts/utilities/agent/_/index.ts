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

import { Observable, Subject } from "rxjs"

import {
  ViewportOffset,
  ViewportSize,
  watchDocument,
  watchLocation,
  watchLocationHash,
  watchMedia,
  watchViewportOffset,
  watchViewportSize
} from "utilities"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Agent document
 */
export interface AgentDocument {
  load$: Observable<Document>          /* Document observable */
}

/**
 * Agent location
 */
export interface AgentLocation {
  href$: Subject<string>               /* Location subject */
  hash$: Observable<string>            /* Location hash observable */
}

/**
 * Agent media
 */
export interface AgentMedia {
  screen$: Observable<boolean>         /* Media observable for screen */
  tablet$: Observable<boolean>         /* Media observable for tablet */
}

/**
 * Agent viewport
 */
export interface AgentViewport {
  offset$: Observable<ViewportOffset>  /* Viewport offset observable */
  size$: Observable<ViewportSize>      /* Viewport size observable */
}

/* ------------------------------------------------------------------------- */

/**
 * Agent
 */
export interface Agent {
  document: AgentDocument              /* Document observables */
  location: AgentLocation              /* Location observables */
  media: AgentMedia                    /* Media observables */
  viewport: AgentViewport              /* Viewport observables */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Create the agent
 *
 * This function returns a data structure that contains all observables that
 * are related to the browser and/or environment.
 *
 * @return Agent
 */
export function setupAgent(): Agent {
  return {
    document: {
      load$:   watchDocument()
    },
    location: {
      href$:   watchLocation(),
      hash$:   watchLocationHash()
    },
    media: {
      screen$: watchMedia("(min-width: 1220px)"),
      tablet$: watchMedia("(min-width: 960px)")
    },
    viewport: {
      offset$: watchViewportOffset(),
      size$:   watchViewportSize()
    }
  }
}
