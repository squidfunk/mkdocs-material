import { fromEvent } from "rxjs"

// Track click events
fromEvent(document.body, "click")
  .subscribe(ev => {
    if (ev.target instanceof HTMLElement) {
      var el = ev.target.closest("a[href^=http]")
      if (el instanceof HTMLLinkElement)
        ga("send", "event", "outbound", "click", el.href)
    }
  })
