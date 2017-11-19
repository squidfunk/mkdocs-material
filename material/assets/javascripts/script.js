/* Scroll Behavior polyfill */
/* https://github.com/iamdustan/smoothscroll */
!function(){"use strict";function o(o){var t=["MSIE ","Trident/","Edge/"];return new RegExp(t.join("|")).test(o)}function t(){function t(o,t){this.scrollLeft=o,this.scrollTop=t}function r(o){return.5*(1-Math.cos(Math.PI*o))}function i(o){if(null===o||"object"!=typeof o||void 0===o.behavior||"auto"===o.behavior||"instant"===o.behavior)return!0;if("object"==typeof o&&"smooth"===o.behavior)return!1;throw new TypeError("behavior member of ScrollOptions "+o.behavior+" is not a valid value for enumeration ScrollBehavior.")}function s(o,t){return"Y"===t?o.clientHeight+h<o.scrollHeight:"X"===t?o.clientWidth+h<o.scrollWidth:void 0}function c(o,t){var e=l.getComputedStyle(o,null)["overflow"+t];return"auto"===e||"scroll"===e}function n(o){var t=s(o,"Y")&&c(o,"Y"),l=s(o,"X")&&c(o,"X");return t||l}function f(o){var t;do{t=(o=o.parentNode)===e.body}while(!1===t&&!1===n(o));return t=null,o}function a(o){var t,e,i,s=(y()-o.startTime)/v;t=r(s=s>1?1:s),e=o.startX+(o.x-o.startX)*t,i=o.startY+(o.y-o.startY)*t,o.method.call(o.scrollable,e,i),e===o.x&&i===o.y||l.requestAnimationFrame(a.bind(l,o))}function p(o,r,i){var s,c,n,f,p=y();o===e.body?(s=l,c=l.scrollX||l.pageXOffset,n=l.scrollY||l.pageYOffset,f=u.scroll):(s=o,c=o.scrollLeft,n=o.scrollTop,f=t),a({scrollable:s,method:f,startTime:p,startX:c,startY:n,x:r,y:i})}if(!("scrollBehavior"in e.documentElement.style&&!0!==l.__forceSmoothScrollPolyfill__)){var d=l.HTMLElement||l.Element,v=468,h=o(l.navigator.userAgent)?1:0,u={scroll:l.scroll||l.scrollTo,scrollBy:l.scrollBy,elementScroll:d.prototype.scroll||t,scrollIntoView:d.prototype.scrollIntoView},y=l.performance&&l.performance.now?l.performance.now.bind(l.performance):Date.now;l.scroll=l.scrollTo=function(){void 0!==arguments[0]&&(!0!==i(arguments[0])?p.call(l,e.body,void 0!==arguments[0].left?~~arguments[0].left:l.scrollX||l.pageXOffset,void 0!==arguments[0].top?~~arguments[0].top:l.scrollY||l.pageYOffset):u.scroll.call(l,void 0!==arguments[0].left?arguments[0].left:"object"!=typeof arguments[0]?arguments[0]:l.scrollX||l.pageXOffset,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:l.scrollY||l.pageYOffset))},l.scrollBy=function(){void 0!==arguments[0]&&(i(arguments[0])?u.scrollBy.call(l,void 0!==arguments[0].left?arguments[0].left:"object"!=typeof arguments[0]?arguments[0]:0,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:0):p.call(l,e.body,~~arguments[0].left+(l.scrollX||l.pageXOffset),~~arguments[0].top+(l.scrollY||l.pageYOffset)))},d.prototype.scroll=d.prototype.scrollTo=function(){if(void 0!==arguments[0])if(!0!==i(arguments[0])){var o=arguments[0].left,t=arguments[0].top;p.call(this,this,void 0===o?this.scrollLeft:~~o,void 0===t?this.scrollTop:~~t)}else{if("number"==typeof arguments[0]&&void 0===arguments[1])throw new SyntaxError("Value couldn't be converted");u.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left:"object"!=typeof arguments[0]?~~arguments[0]:this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top:void 0!==arguments[1]?~~arguments[1]:this.scrollTop)}},d.prototype.scrollBy=function(){void 0!==arguments[0]&&(!0!==i(arguments[0])?this.scroll({left:~~arguments[0].left+this.scrollLeft,top:~~arguments[0].top+this.scrollTop,behavior:arguments[0].behavior}):u.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left+this.scrollLeft:~~arguments[0]+this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top+this.scrollTop:~~arguments[1]+this.scrollTop))},d.prototype.scrollIntoView=function(){if(!0!==i(arguments[0])){var o=f(this),t=o.getBoundingClientRect(),r=this.getBoundingClientRect();o!==e.body?(p.call(this,o,o.scrollLeft+r.left-t.left,o.scrollTop+r.top-t.top),"fixed"!==l.getComputedStyle(o).position&&l.scrollBy({left:t.left,top:t.top,behavior:"smooth"})):l.scrollBy({left:r.left,top:r.top,behavior:"smooth"})}else u.scrollIntoView.call(this,void 0===arguments[0]||arguments[0])}}}var l=window,e=document;"object"==typeof exports?module.exports={polyfill:t}:t()}();

/**
 * --------------------------------------------------------------------------
 * General
 * --------------------------------------------------------------------------
 */

/* Adds md-tabbing class to html when using TAB key, removes it when using mouse, it is important to not have focus styles when clicking on labels (because they now have tabindex="0" and clicking on them would cause focus style (blue outline in Chrome for example) */
function handleFirstTab(ev) {
  if (ev.keyCode === 9) {
    document.documentElement.classList.add('md-tabbing')
    window.removeEventListener('keyup', handleFirstTab, false)
    window.addEventListener('mousedown', handleMouseDownOnce, false)
  }
}
function handleMouseDownOnce() {
  document.documentElement.classList.remove('md-tabbing')
  window.removeEventListener('mousedown', handleMouseDownOnce, false)
  window.addEventListener('keyup', handleFirstTab, false)
}
window.addEventListener('keyup', handleFirstTab, false)

/* Get all elements that should be focusable (labels) which are not 'a', 'button', 'input' or something like that because they are focusable by default */
const focusableElements = document.querySelectorAll('.md-icon--menu, .md-nav__item .md-nav__title, label.md-nav__link, .md-icon--search')

const drawerToggle = document.querySelector('[data-md-toggle="drawer"]')
const searchToggle = document.querySelector('[data-md-toggle="search"]')
const searchQuery = document.querySelector('[data-md-component="query"]')
const searchReset = document.querySelector('[data-md-component="reset"]')
const searchResults = document.querySelector('.md-search-result__list')

const sidebarPrimary = document.querySelector('.md-sidebar--primary')

const siteTitle = document.querySelector('.md-nav__title--site')
const tableOfContentsLabel = document.querySelector('.md-sidebar__inner > .md-nav--secondary > .md-nav__title[for="toc"]')

const tabs = document.querySelector('.md-tabs')

let focusedElementBeforeSearchOrDrawerOpened = null

/* Make labels focusable */
Array.prototype.forEach.call(focusableElements, function(el) {
  el.tabIndex = 0
})

/* If tabs exist - remove tabindex from label with pointer events none (I'm changing tabindex of that when opening drawer) */
if(tabs) {
  document.querySelector('.md-tabs--active ~ .md-main .md-nav--primary > .md-nav__list > .md-nav__item--nested > .md-nav__link').removeAttribute('tabindex')
}

/* Blur collapsible nav toggles on click (to remove focus color because now labels have tabindex=0 and when you click to open collapsible nav it will have a focus color) */
const navLinkLabels = document.querySelectorAll('.md-nav__link[for]:not(.md-nav__link--active)')
Array.prototype.forEach.call(navLinkLabels, function(el) {
  el.addEventListener('mouseup', function() {
    this.blur()
  }, false)
})

/* Skip to main content, just an example, you can include it in HTML */
const skipToContent = document.createElement('a')
skipToContent.classList.add('md-skip')
skipToContent.innerHTML = 'Skip to main content'
const mdContent = document.querySelector('.md-content')
const headerlink = mdContent.querySelector('h1 > a')
if(headerlink) {
  skipToContent.href = headerlink.hash
  skipToContent.tabIndex = 1
  document.querySelector('.md-container').append(skipToContent)
}

/* If hash in url - focus on headerlink */
const activeHeaderlink = document.querySelector(".headerlink[href='" + location.hash + "']")
if(location.hash) {
  activeHeaderlink.focus()
}
/* If hash in url - scroll with animation (opinionated) */
window.onload = function() {
  if(location.hash) {
    setTimeout(function() {
      window.scroll({
        top: activeHeaderlink.offsetTop - 88,
        left: 0,
        behavior: "smooth"
      })
    }, 0)
  }
}

/* Listener: keyboard handlers */
window.addEventListener('keydown', function(ev) {

  /* Abort if meta key (macOS) or ctrl key (Windows) is pressed */
  if (ev.metaKey || ev.ctrlKey)
    return

  /* Space/Enter/Return: Open collapsible nav */
  if (ev.keyCode === 13 || ev.keyCode === 32) {
    if (document.activeElement && document.activeElement.hasAttribute('for') && (document.activeElement.classList.contains('md-nav__link') || document.activeElement.classList.contains('md-nav__title'))) {
      ev.preventDefault()

      /* Need to fire click event because max-height animation is done in JS on click */
      document.activeElement.click()
    }
  }

}, false)

window.addEventListener('keyup', function(ev) {

  /* Get last focused element on each TAB key (when target is in .md-container or it is .md-source) - thanks to that we can focus on last focused element when using F/S keys to open search and then using ESC to close or when closing drawer */
  if (ev.keyCode === 9) {
    if(!searchToggle.checked && !drawerToggle.checked) {
      if(document.activeElement && (document.querySelector('.md-container').contains(document.activeElement) || document.activeElement === document.querySelector('.md-source')) && document.activeElement !== document.querySelector('.md-skip')) {
        focusedElementBeforeSearchOrDrawerOpened = document.activeElement
      }
    }
  }
}, false)

/* 960px <=> */
function mediaMedium(mql) {
  if (mql.matches) {
    searchQuery.tabIndex = 0
    if(drawerToggle.checked) {
      /* When drawer and toc menu is opened if you increase browser width we need to change menus in drawer */
      document.querySelectorAll('label.md-nav__link--active')[0].previousElementSibling.checked = false
      focusDrawer()
    }

    /* Clicking on that label on bigger screens causes checking input inside drawer, it is ok but for table of contents label which is inside drawer (not on desktop secondary nav) */
    tableOfContentsLabel.setAttribute('for', '')
  } else {

    /* Search input should not be focusable through tab on smaller screens (now it fetches JSON if you are tabbing even when you don't see search input) */
    searchQuery.tabIndex = -1
    tableOfContentsLabel.setAttribute('for', 'drawer')
  }
}
const matchMediaMedium = matchMedia("(min-width: 960px)")
matchMediaMedium.addListener(mediaMedium)
mediaMedium(matchMediaMedium)

function mediaLarge(mql) {
  if (mql.matches) {
    // When screen is big and you click on the site title (Material for MkDocs in primary nav - it opens the drawer because of for attribute)
    siteTitle.setAttribute('for', '')
    // If drawer is opened - reset menus
    if (drawerToggle.checked) {
      resetDrawer()
    }
    // Make site title not focusable on bigger screens
    siteTitle.tabIndex = -1
  } else {
    siteTitle.setAttribute('for', 'drawer')
    // If drawer is opened - focus on proper elements inside drawer
    if (drawerToggle.checked) {
      focusDrawer()
    }
  }
}
const matchMediaLarge = matchMedia("(min-width: 1220px)")
matchMediaLarge.addListener(mediaLarge)
mediaLarge(matchMediaLarge)





/**
 * --------------------------------------------------------------------------
 * Search
 * --------------------------------------------------------------------------
 */

/* Search reset button should be focusable only when search is open */
searchReset.tabIndex = -1

/* Set initial search input state to active (if you find something for the first time you don't have to TAB twice to focus on reset button, you can set it in HTML) */
searchQuery.dataset.mdState = "active"

/* Focusable/not focusable search results */
function searchResultsFocusable(focusable) {
  if (searchResults.innerHTML.trim() !== '') {
    const results = document.querySelectorAll('.md-search-result__link')
    if(focusable) {
      Array.prototype.forEach.call(results, function(el) {
        el.tabIndex = 0
      })
    } else {
      Array.prototype.forEach.call(results, function(el) {
        el.tabIndex = -1
      })
    }
  }
}

/* Search input change event */
searchToggle.addEventListener('change', function() {
  if(this.checked) {
    searchResultsFocusable(true)
    /* Close drawer when opened */
    if (drawerToggle.checked) {
      drawerToggle.checked = false
      drawerToggle.dispatchEvent(new CustomEvent('change'))
    }
    /* Make reset button focusable */
    searchReset.tabIndex = 0
  } else {
    searchResultsFocusable(false)
    searchReset.tabIndex = -1
    /* Focus on last focused element before search open */
    if(focusedElementBeforeSearchOrDrawerOpened) {
      setTimeout(function() {
        focusedElementBeforeSearchOrDrawerOpened.focus()
      }, 0)
    }
  }
}, false)

/* Listener: keyboard handlers (search) */
window.addEventListener('keydown', function(ev) {
  const toggle = document.querySelector("[data-md-toggle=search]")
  if (!(toggle instanceof HTMLInputElement))
    throw new ReferenceError
  const query = document.querySelector("[data-md-component=query]")
  if (!(query instanceof HTMLInputElement))
    throw new ReferenceError
  const reset = document.querySelector("[data-md-component=reset]")
  if (!(reset instanceof HTMLButtonElement))
    throw new ReferenceError
  const searchIcon = document.querySelector(".md-icon--search")
  if (!(searchIcon instanceof HTMLLabelElement))
    throw new ReferenceError
  const results = document.querySelector('.md-search-result__list')
  if (!(results instanceof HTMLElement))
    throw new ReferenceError

  /* Abort if meta key (macOS) or ctrl key (Windows) is pressed */
  if (ev.metaKey || ev.ctrlKey)
    return

  /* Search is open */
  if (toggle.checked) {

    /* Tab/Shift + Tab: Close search when there are no results */
    if (ev.keyCode === 9) {
      if(results.innerHTML.trim() === "" && (document.activeElement && (document.activeElement === query || document.activeElement === reset))) {
        toggle.checked = false
        toggle.dispatchEvent(new CustomEvent('change'))
        if(ev.shiftKey) {
          setTimeout(function() {
            /* If Tab + Shift - focus either on logo or icon menu, depends on browser width */
            document.querySelector('.md-logo').focus()
            document.querySelector('.md-icon--menu').focus()
          }, 0)
        }
        return false
      }
    }

    /* Enter: prevent form submission */
    if (ev.keyCode === 13) {
      if (query === document.activeElement) {
        ev.preventDefault()

        /* Go to current active/focused link */
        const focus = document.querySelector(
          "[data-md-component=search] [href][data-md-state=active]")
        if (focus instanceof HTMLLinkElement) {
          window.location = focus.getAttribute("href")

          /* Close search */
          toggle.checked = false
          toggle.dispatchEvent(new CustomEvent("change"))
          query.blur()
        }
      }

    /* Escape: close search */
    } else if (ev.keyCode === 27) {
      toggle.checked = false
      toggle.dispatchEvent(new CustomEvent("change"))
      query.blur()

    /* Horizontal arrows and backspace: focus input */
    } else if ([8, 37, 39].indexOf(ev.keyCode) !== -1) {
      if (query !== document.activeElement)
        query.focus()

    /* Vertical arrows and tab: select previous or next search result */
    } else if ([9, 38, 40].indexOf(ev.keyCode) !== -1) {
      const map = ev.shiftKey ? 38 : 40
      const key = ev.keyCode === 9 ? map : ev.keyCode

      /* Retrieve all results */
      const links = Array.prototype.slice.call(
        document.querySelectorAll(
          /* Added reset button */
          "[data-md-component=query], [data-md-component=reset], [data-md-component=search] [href]"))

      /* Retrieve current active/focused result */
      const focus = links.find(link => {
        if (!(link instanceof HTMLElement))
          throw new ReferenceError
        return link.dataset.mdState === "active"
      })
      if (focus)
        focus.dataset.mdState = ""

      /* Calculate index depending on direction, add length to form ring */
      const index = Math.max(0, (
        links.indexOf(focus) + links.length + (key === 38 ? -1 : +1)
      ) % links.length)

      /* Set active state and focus */
      if (links[index]) {
        links[index].dataset.mdState = "active"
        links[index].focus()
      }

      /* Prevent scrolling of page */
      ev.preventDefault()
      ev.stopPropagation()

      /* Return false prevents the cursor position from changing */
      return false
    }

  /* Search is closed and we're not inside a form */
  } else if (document.activeElement && !document.activeElement.form) {

    /* F/S: Open search if not in input field */
    if (ev.keyCode === 70 || ev.keyCode === 83) {
      toggle.checked = true
      toggle.dispatchEvent(new CustomEvent("change"))
      ev.preventDefault()
    }
  }

  /* Space/Enter/Return: Open search when focus on search icon */
  if (ev.keyCode === 13 || ev.keyCode === 32) {
    if (document.activeElement && document.activeElement === searchIcon) {
      toggle.checked = true
      toggle.dispatchEvent(new CustomEvent('change'))
      ev.preventDefault()
    }
  }
}, false)

/* Listener: set active state for query if it is focused */
searchQuery.addEventListener('focus', function(ev) {
  const toggle = document.querySelector("[data-md-toggle=search]")
  if (!(toggle instanceof HTMLInputElement))
    throw new ReferenceError
  const query = document.querySelector("[data-md-component=query]")
  if (!(query instanceof HTMLInputElement))
    throw new ReferenceError
  query.dataset.mdState = "active"
}, false)





/**
 * --------------------------------------------------------------------------
 * Drawer
 * --------------------------------------------------------------------------
 */

/* Allow primary sidebar to be focusable in JS (makes possible to focus only on nav links when drawer is opened) */
sidebarPrimary.tabIndex = -1

/* It prevents focusing on other elements that are NOT in drawer */
function focusNavPrimaryInDrawer(ev) {
  if (document !== ev.target && sidebarPrimary !== ev.target && !sidebarPrimary.contains(ev.target)) {
    sidebarPrimary.focus()
    window.scroll(0, window.pageYOffset)
  }
}

/* Focus on proper menu in drawer */
function focusDrawer() {
  setTimeout(function() { /* it doesn't work properly without setTimeout - don't know why */

    /* Reset menus */
    const menus = document.querySelectorAll('[data-md-menu-state]')
    Array.prototype.forEach.call(menus, function(el) {
      el.removeAttribute('data-md-menu-state')
    })

    /* Get all inputs in drawer */
    const inputs = document.querySelectorAll('.md-nav--primary input')

    /* Checked inputs in drawer counter */
    let inputsChecked = 0

    /* Last checked input in drawer */
    let lastInput = null
    Array.prototype.forEach.call(inputs, function(el) {
      if (el.checked) {
        inputsChecked += 1
        lastInput = el
      }
    })

    /* this part is a little bit tricky, when inputsChecked = 0 it means that you are in the main menu, if 1 or 2 - you are in the submenu or TOC */
    /* main menu */
    if (inputsChecked === 0) {

      /* Make site title focusable */
      siteTitle.tabIndex = 0
      sidebarPrimary.dataset.mdMenu = 'main'
    } else if (inputsChecked >= 1) {

      /* If second sibling is nav it means it is submenu */
      if (lastInput.nextElementSibling.nextElementSibling.classList.contains('md-nav')) {
        sidebarPrimary.dataset.mdMenu = 'sub'

        /* Add active state for proper nav */
        lastInput.nextElementSibling.nextElementSibling.dataset.mdMenuState = 'active'

      /* If else it is toc menu */
      } else {
        sidebarPrimary.dataset.mdMenu = 'toc'

        /* Add active state for proper nav */
        lastInput.nextElementSibling.nextElementSibling.nextElementSibling.dataset.mdMenuState = 'active'
      }
    }
  }, 0)

  /* Focus only on primary sidebar when drawer is opened */
  sidebarPrimary.focus()
  document.removeEventListener('focus', focusNavPrimaryInDrawer, true)
  document.addEventListener('focus', focusNavPrimaryInDrawer, true)
}

function resetDrawer() {
  /* Make site title not focusable */
  siteTitle.tabIndex = -1
  sidebarPrimary.removeAttribute('data-md-menu')
  document.removeEventListener('focus', focusNavPrimaryInDrawer, true)

  /* Focus on last focused element before open drawer*/
  if(focusedElementBeforeSearchOrDrawerOpened) {
    setTimeout(function() {
      focusedElementBeforeSearchOrDrawerOpened.focus()
    }, 0)
  }
}

/* Elements that change menus in drawer */
const drawerTriggers = document.querySelectorAll('.md-sidebar--primary .md-nav__title, .md-nav__item--nested > label, .md-nav__item--active > label')

/* Change states when navigating in drawer */
Array.prototype.forEach.call(drawerTriggers, function(el) {
  el.addEventListener('click', function() {
    if (window.matchMedia("(max-width: 1219px)").matches) {
      if (drawerToggle.checked) {
        focusDrawer()
      }
    }
  }, false)
})

/* Drawer state change */
drawerToggle.addEventListener('change', function() {
  if(this.checked) {
    /* Close search if opened */
    if (searchToggle.checked) {
      searchToggle.checked = false
      searchToggle.dispatchEvent(new CustomEvent('change'))
    }
    focusDrawer()
  } else {
    resetDrawer()
  }
}, false)

/* Listener: keyboard handlers (drawer) */
window.addEventListener('keydown', function(ev) {
  const toggle = document.querySelector("[data-md-toggle=drawer]")
  if (!(toggle instanceof HTMLInputElement))
    throw new ReferenceError
  const drawerMenuIcon = document.querySelector(".md-header-nav__button[for]")
  if (!(drawerMenuIcon instanceof HTMLLabelElement))
    throw new ReferenceError

  /* Abort if meta key (macOS) or ctrl key (Windows) is pressed */
  if (ev.metaKey || ev.ctrlKey)
    return

  /* Space/Enter/Return: Open search when focus on drawer menu icon */
  if (ev.keyCode === 13 || ev.keyCode === 32) {
    if (document.activeElement === drawerMenuIcon) {
      toggle.checked = true
      toggle.dispatchEvent(new CustomEvent('change'))
      ev.preventDefault()
    }
  }

  /* M: Toggle drawer */
  if(ev.keyCode === 77) {
    if (document.activeElement && !document.activeElement.form && !searchResults.contains(document.activeElement)) {
      if (window.matchMedia("(max-width: 1219px)").matches) {
        ev.preventDefault()
        if (toggle.checked) {
          toggle.checked = false
        } else {
          toggle.checked = true
        }
        toggle.dispatchEvent(new CustomEvent('change'))
      }
    }
  }

  /* ESC: Close drawer */
  if (ev.keyCode === 27) {
    if(toggle.checked) {
      toggle.checked = false
      toggle.dispatchEvent(new CustomEvent('change'))
    }
  }

  /* Left arrow: Go to previous menu */
  if (ev.keyCode === 37) {
    if(toggle.checked) {
      const mdMenu = sidebarPrimary.dataset.mdMenu
      if(mdMenu === 'main') {
        toggle.checked = false
        toggle.dispatchEvent(new CustomEvent('change'))
      } else if(mdMenu === 'sub') {
        document.querySelector('[data-md-menu-state="active"]').previousElementSibling.previousElementSibling.checked = false
        focusDrawer()
      } else if(mdMenu === 'toc') {
        document.querySelector('[data-md-menu-state="active"]').previousElementSibling.previousElementSibling.previousElementSibling.checked = false
        focusDrawer()
      }
    }
  }

  /* Right arrow: Go to menu when focus on menu link */
  if (ev.keyCode === 39) {
    if(toggle.checked) {
      if(document.activeElement && document.activeElement.classList.contains('md-nav__link') && document.activeElement.hasAttribute('for')) {
        document.activeElement.click()
      }
    }
  }
}, false)
