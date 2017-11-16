/**
 * --------------------------------------------------------------------------
 * Keyboard accesibility
 * --------------------------------------------------------------------------
 */

(function(window, document) {

  'use strict';

  /**
   * --------------------------------------------------------------------------
   * Variables
   * --------------------------------------------------------------------------
   */

  // Get all elements that should be focusable (labels) and they are not 'a', 'button', 'input' or something like that because they are focusable by default
  var focusableElements = document.querySelectorAll('.md-icon--menu, .md-nav__item .md-nav__title, label.md-nav__link, .md-icon--search');

  // Get search input
  var searchInput = document.querySelector('.md-search__input');

  // Get search toggle input
  var searchToggle = document.getElementById('search');

  // Get search reset button
  var searchReset = document.querySelector('.md-search__icon[type="reset"]');

  // Get drawer toggle input
  var drawerToggle = document.getElementById('drawer');

  // Get primary sidebar
  var sidebarPrimary = document.querySelector('.md-sidebar--primary');

  // Get primary nav
  var navPrimary = document.querySelector('.md-nav--primary');

  // Get secondary sidebar
  var sidebarSecondary = document.querySelector('.md-sidebar--secondary');

  // Get tabs
  var tabs = document.querySelector('.md-tabs');

  // Get nav titles
  var navTitles = document.getElementsByClassName('md-nav__title');

  // Get site title
  var siteTitle = document.querySelector('.md-nav__title--site');

  // Get all links and labels from primary and secondary nav in drawer
  var linksDrawer = document.querySelectorAll('.md-sidebar--primary .md-nav__link, .md-sidebar--primary .md-nav__title, .md-nav__item > .md-nav--secondary .md-nav__link, .md-source');

  // Get source header
  var sourceHeader = document.querySelector('.md-header-nav__source');

  // Get source link
  var sourceLink = document.querySelector('.md-source');

  // Get first focusable element in content
  var mdContent = document.querySelector('.md-content');
  var focusableContent = mdContent.querySelectorAll('button, [href], input, select, textarea');
  var firstFocusableContent = focusableContent[1]; // focusable[0] would be h1 headerlink which is hidden;

  // Get first focusable element in tabs
  var firstFocusableTabs
  if(tabs) {
    firstFocusableTabs = tabs.querySelector('a');
  }

  // Get first focusable element in primary sidebar
  var firstFocusableSidebarPrimary;
  var firstNavItem = sidebarPrimary.querySelector('.md-nav__item');
  if(firstNavItem.classList.contains('md-nav__item--nested')) {
    firstFocusableSidebarPrimary = sidebarPrimary.querySelector('label.md-nav__link')
  } else {
    firstFocusableSidebarPrimary = sidebarPrimary.querySelector('a.md-nav__link')
  }

  // Get first focusable element in secondary sidebar
  var firstFocusableSecondary = document.querySelector('.md-sidebar__inner > .md-nav--secondary .md-nav__link');



  /**
   * --------------------------------------------------------------------------
   * Make labels focusable
   * --------------------------------------------------------------------------
   */

  Array.prototype.forEach.call(focusableElements, function(el) {
    el.tabIndex = 0;
  });

  /**
   * --------------------------------------------------------------------------
   * Make reset button not focusable (when you are focusing on md-source
   * you don't have to press SHIFT+TAB twice to open saerch, but I'm not
   * sure about this, maybe reset button should be focusable?
   * --------------------------------------------------------------------------
   */

  if(searchInput) {
    searchReset.tabIndex = -1;
  }

  /**
   * --------------------------------------------------------------------------
   * Make source header focusable through JS (to focus on this after clicking
   * on search overlay if source exists)
   * --------------------------------------------------------------------------
   */

  if(sourceHeader) {
    sourceHeader.tabIndex = -1;
  }

  /**
   * --------------------------------------------------------------------------
   * Make tabs focusable through JS (to focus on this after clicking on search
   * overlay if source doesn't exist)
   * --------------------------------------------------------------------------
   */

  if(tabs) {
    tabs.tabIndex = -1;
  }

   /**
   * --------------------------------------------------------------------------
   * Make primary sidebar focusable through JS (to focus on this after clicking
   * on search overlay if source doesn't exist and to be able to focus only on
   * links inside drawer)
   * --------------------------------------------------------------------------
   */

  sidebarPrimary.tabIndex = -1;

  /**
   * --------------------------------------------------------------------------
   * Adds user-is-tabbing class to body when using TAB key, removes it when
   * using mouse, it is important to not have focus styles when clicking on
   * labels (because they now have tabindex=0 and clicking on them would cause
   * focus style (blue outline in Chrome for example), this class is used in
   * CSS to remove outline when user is NOT tabbing)
   * --------------------------------------------------------------------------
   */

  function handleFirstTab(ev) {
    if (ev.keyCode === 9) {
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keyup', handleFirstTab, false);
      window.addEventListener('mousedown', handleMouseDownOnce, false);
    }
  }
  function handleMouseDownOnce() {
    document.body.classList.remove('user-is-tabbing');
    window.removeEventListener('mousedown', handleMouseDownOnce, false);
    window.addEventListener('keyup', handleFirstTab, false);
  }
  window.addEventListener('keyup', handleFirstTab, false);



  /**
   * --------------------------------------------------------------------------
   * Function to reset tabindexes to initial state
   * --------------------------------------------------------------------------
   */

  function resetTabindexes() {
    Array.prototype.forEach.call(linksDrawer, function(el) {
      el.removeAttribute('tabindex');
    });
    Array.prototype.forEach.call(focusableElements, function(el) {
      el.tabIndex = 0;
    });
    document.removeEventListener('focus', focusPrimary, true);
  }



  /**
   * --------------------------------------------------------------------------
   * Change things (<=>1220px)
   * --------------------------------------------------------------------------
   */

  function mediaLarge(mql) {
    if (mql.matches) {
      // When screen is big and you click on the site title (Material for MkDocs in primary nav - it opens the drawer because of for attribute)
      siteTitle.setAttribute('for', '');
      if(drawerToggle.checked) {
        resetTabindexes();
      }
      // Make site title not focusable on bigger screens
      siteTitle.tabIndex = -1;
    } else {
      siteTitle.setAttribute('for', 'drawer');
      // If drawer is opened - focus on proper elements inside drawer
      if (drawerToggle.checked) {
        focusDrawer();
      }
    }
  }
  var matchMediaLarge = matchMedia("(min-width: 1220px)");
  matchMediaLarge.addListener(mediaLarge);
  mediaLarge(matchMediaLarge);

  /**
   * --------------------------------------------------------------------------
   * Change things (<=>960px)
   * --------------------------------------------------------------------------
   */

  function mediaMedium(mql) {
    if (mql.matches) {
      // make search input focusable on TAB key on bigger screens
      searchInput.tabIndex = 0;
      if (drawerToggle.checked) {
          // if drawer is opened and you are in toc menu on small screen and you increase screen width toc disappears so we have to reset tabindexes in drawer for proper focus
        document.querySelectorAll('label.md-nav__link--active')[0].previousElementSibling.checked = false;
        focusDrawer();
      }
    } else {
      // search input is focusable on smaller screens through tab even when it's hidden, so we have to make it not focusable
      searchInput.tabIndex = -1;
      if (drawerToggle.checked) {
        focusDrawer();
      }
    }
  }
  var matchMediaMedium = matchMedia("(min-width: 960px)");
  matchMediaMedium.addListener(mediaMedium);
  mediaMedium(matchMediaMedium);



  /**
   * --------------------------------------------------------------------------
   * Focus on proper element when closing search clicking on the search overlay
   * (I don't know why but when you click on search overlay and then press TAB
   * search is activated once again) - it fixes that changing focus
   * --------------------------------------------------------------------------
   */

  document.getElementsByClassName('md-search__overlay')[0].addEventListener('click', function() {
    if(sourceHeader) {
      // focus on repo source header, so next tab press will focus on source link
      sourceHeader.focus();
      return;
    // if tabs
    }
    if(tabs && window.getComputedStyle(tabs).display === 'block') {
      // focus on tabs
      tabs.focus();
      return;
    }
    // if no repo and tabs and primary sidebar is visible
    if(window.getComputedStyle(sidebarPrimary).visibility === 'visible') {
      sidebarPrimary.focus();
      return;
    }
    // focus on secondary sidebar
    sidebarSecondary.focus();
  }, false);

  /**
   * --------------------------------------------------------------------------
   * Remove necessity to press TAB key twice when navigating through search
   * results for the first time you find something, for sure you can do it
   * better ;)
   * --------------------------------------------------------------------------
   */

  searchInput.dataset.mdState = 'active';

  /**
   * --------------------------------------------------------------------------
   * Remove focus from search input after pressing TAB key when no results was
   * found
   * --------------------------------------------------------------------------
   */

  window.addEventListener('keydown', function(ev) {
    if (ev.keyCode === 9 && document.activeElement.name === 'query' && document.getElementsByClassName('md-search-result__list')[0].innerHTML.trim() === '') {
      searchToggle.checked = false;
      // if TAB + SHIFT - focus on logo or menu icon (it will focus on one element because the other is always hidden)
      if (ev.shiftKey) {
        document.getElementsByClassName('md-logo')[0].focus();
        document.getElementsByClassName('md-icon--menu')[0].focus();
      } else {
        if (window.matchMedia("(min-width: 960px)").matches) {
          // if only TAB key
          // if repo
          if(sourceHeader) {
            // focus on repo source
            sourceLink.focus();
            return;
          }
          // if tabs
          if(tabs && window.getComputedStyle(tabs).display === 'block') {
            // focus on tabs
            firstFocusableTabs.focus();
            return;
          }
          // if no repo and tabs and primary sidebar is visible (or you can check for 1220px media query)
          if(window.getComputedStyle(navPrimary).visibility === 'visible') {
            firstFocusableSidebarPrimary.focus();
            return;
          }
          // focus on first focusable element in secondary sidebar
          firstFocusableSecondary.focus();
        } else {
          // focus on first focusable element in content
          firstFocusableContent.focus();
        }
      }
    }
  }, false);

  /**
   * --------------------------------------------------------------------------
   * Make search results not focusable when search is disabled (it prevents
   * from tabbing couple of times and nothing happens because you go through
   * results when search is closed)
   * --------------------------------------------------------------------------
   */

  searchToggle.addEventListener('change', function() {
    if(document.getElementsByClassName('md-search-result__list')[0].innerHTML.trim() !== '') {
      var results = document.querySelectorAll('.md-search-result__link');
      if(this.checked) {
        Array.prototype.forEach.call(results, function(el) {
          el.tabIndex = 0;
        });
      } else {
        Array.prototype.forEach.call(results, function(el) {
          el.tabIndex = -1;
        });
      }
    }
  }, false);

  /**
   * --------------------------------------------------------------------------
   * Open search on S and F keys on smaller screens
   * --------------------------------------------------------------------------
   */

  window.addEventListener('keydown', function(ev) {
    // can't use !document.activeElement.form and !searchToggle.checked here because in your code you open search on these keys
    if (/*!document.activeElement.form && !searchToggle.checked &&*/ (ev.keyCode === 70 || ev.keyCode === 83)) {
      if (window.matchMedia("(max-width: 1219px)").matches) {
        if(drawerToggle.checked) {
          drawerToggle.checked = false;
          drawerToggle.dispatchEvent(new Event('change'));
        }
        searchToggle.checked = true;
        searchToggle.dispatchEvent(new Event('change'));
      }
    }
  }, false);

  /**
   * --------------------------------------------------------------------------
   * Open search with space/enter/return keys when focusing on search
   * icon (match media is not required because on bigger screens search icon is
   * not focusable)
   * --------------------------------------------------------------------------
   */

  window.addEventListener('keydown', function(ev) {
    if (ev.keyCode === 32 || ev.keyCode === 13) {
      if (document.activeElement.classList.contains('md-icon--search') && document.activeElement.name !== 'query') {
        ev.preventDefault();
        searchToggle.checked = true;
        searchToggle.dispatchEvent(new Event('change'));
      }
    }
  }, false);



  /**
   * --------------------------------------------------------------------------
   * Toggle submenus with space/enter/return keys
   * --------------------------------------------------------------------------
   */

  window.addEventListener('keydown', function(ev) {
    if (ev.keyCode === 32 || ev.keyCode === 13) {
      var forAttr = document.activeElement.getAttribute('for');
      if (typeof forAttr !== typeof undefined && forAttr !== false && (document.activeElement.classList.contains('md-nav__link') || document.activeElement.classList.contains('md-nav__title'))) {
        ev.preventDefault();
        // need to fire click event because animation is done in JS
        document.activeElement.click();
      }
    }
  }, false);

  /**
   * --------------------------------------------------------------------------
   * Blur collapsible nav toggles on click (to remove focus color because now
   * labels have tabindex=0 and when you click to open collapsible nav it will
   * have a focus color)
   * --------------------------------------------------------------------------
   */

  var navToggleInputs = document.querySelectorAll('.md-nav__link[for]');
  Array.prototype.forEach.call(navToggleInputs, function(el) {
    el.addEventListener('mouseup', function() {
      this.blur();
    }, false);
  });



  /**
   * --------------------------------------------------------------------------
   * Reset tabindexes when closing drawer clicking on the overlay
   * --------------------------------------------------------------------------
   */

  document.getElementsByClassName('md-overlay')[0].addEventListener('click', resetTabindexes, false);

  /**
   * --------------------------------------------------------------------------
   * Open drawer with space/enter/return keys on smaller screens when
   * focusing on hamburger icon (match media is not required because on bigger
   * screens menu icon is not focusable)
   * --------------------------------------------------------------------------
   */

  window.addEventListener('keydown', function(ev) {
    if (ev.keyCode === 32 || ev.keyCode === 13) {
      var forAttr = document.activeElement.getAttribute('for');
      if (forAttr === 'drawer' && document.activeElement.classList.contains('md-icon--menu')) {
        // prevent scrolling when using space
        ev.preventDefault();
        drawerToggle.checked = true;
        drawerToggle.dispatchEvent(new Event('change'));
      }
    }
  }, false);

  /**
   * --------------------------------------------------------------------------
   * Toggle drawer with M key (opinionated)
   * --------------------------------------------------------------------------
   */

  window.addEventListener('keydown', function(ev) {
    if (ev.keyCode === 77 && !document.activeElement.form) {
      if (window.matchMedia("(max-width: 1219px)").matches) {
        if(drawerToggle.checked) {
          drawerToggle.checked = false;
          drawerToggle.dispatchEvent(new Event('change'));
        } else {
          if(searchToggle.checked) {
            searchToggle.checked = false;
            searchToggle.dispatchEvent(new Event('change'))
          }
          drawerToggle.checked = true;
          drawerToggle.dispatchEvent(new Event('change'));
        }
      }
    }
  }, false);

  /**
   * --------------------------------------------------------------------------
   * Close drawer on ESC key
   * --------------------------------------------------------------------------
   */

  window.addEventListener('keydown', function(ev) {
    if (ev.keyCode === 27 && drawerToggle.checked) {
      if (window.matchMedia("(max-width: 1219px)").matches) {
        drawerToggle.checked = false;
        drawerToggle.dispatchEvent(new Event('change'));
      }
    }
  }, false);

  /**
   * --------------------------------------------------------------------------
   * Focus only on drawer when navigating through links in drawer
   * --------------------------------------------------------------------------
   */

  // get and set scroll top position on key down
  var scrollTop = 0;
  window.addEventListener('keydown', function(ev) {
    if(ev.keyCode === 9) {
      if(window.scroll) {
        scrollTop = window.scrollY;
      }
    }
  }, false);

  function focusPrimary(ev) {
    // it prevents focusing on other elements that are NOT in drawer
    if (document !== ev.target && sidebarPrimary !== ev.target && !sidebarPrimary.contains(ev.target)) {
      sidebarPrimary.querySelector('[tabindex="0"]').focus();
      // when drawer is opened, you are in the middle of the page and you are tabbing through links in drawer - when sidebar primary gets focus it will jump to the top of the page so we can read top scroll position on each TAB key press and scroll to that position to prevent jumping
      if(window.scroll) {
        window.scroll(0, scrollTop);
      }
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Focus only on proper menu in drawer
   * --------------------------------------------------------------------------
   */

  function focusDrawer() {
    // make all links in drawer not focusable
    setTimeout(function() { // it doesn't work properly without setTimeout - don't know why
      Array.prototype.forEach.call(linksDrawer, function(el) {
        el.tabIndex = -1;
      });
      // get all inputs in drawer
      var inputs = document.querySelectorAll('.md-nav--primary input');
      // checked inputs in drawer counter
      var inputsChecked = 0;
      // last checked input in drawer
      var element;
      Array.prototype.forEach.call(inputs, function(el) {
        if (el.checked) {
          inputsChecked += 1;
          element = el;
        }
      });
      // this part is a little bit tricky, when inputsChecked = 0 it means that you are in the main menu, if 1/2 - you are in the submenu or TOC
      var focusableLinks;
      var nav;
      // main menu
      if (inputsChecked === 0) {
        siteTitle.tabIndex = 0;
        // get all links in main menu
        focusableLinks = document.querySelectorAll('.md-sidebar--primary .md-nav--primary > ul > li > .md-nav__link, .md-source');
        Array.prototype.forEach.call(focusableLinks, function(el) {
          el.tabIndex = 0;
        });
      } else if (inputsChecked >= 1) {
        // if second sibling is nav it means it is submenu
        if(element.nextElementSibling.nextElementSibling.classList.contains('md-nav')) {
          nav = element.nextElementSibling.nextElementSibling;
          // make "back" focusable
          nav.children[0].tabIndex = 0;
          // get submenu nav
          focusableLinks = nav.children[1].children;
          Array.prototype.forEach.call(focusableLinks, function(el) {
            // if active link is inside that submenu, check what can be focusable - "a" element or "label", it depends on screen width because sometimes secondary nav is visible and sometimes not
            if(el.querySelectorAll('.md-nav__link--active')[0] && window.getComputedStyle(el.querySelectorAll('.md-nav__link--active')[0]).display !== 'none') {
              el.querySelectorAll('.md-nav__link--active')[0].tabIndex = 0;
            }
            if(el.querySelectorAll('.md-nav__link--active')[1] && window.getComputedStyle(el.querySelectorAll('.md-nav__link--active')[1]).display !== 'none') {
              el.querySelectorAll('.md-nav__link--active')[1].tabIndex = 0;
            }
            el.querySelectorAll('li > .md-nav__link')[0].tabIndex = 0;
          });
        // if third sibling is nav it means it is toc menu
        } else {
          // get toc nav
          nav = element.nextElementSibling.nextElementSibling.nextElementSibling;
          // make "back" focusable
          nav.children[0].tabIndex = 0;
          // get all focusable links in TOC
          focusableLinks = nav.children[1].querySelectorAll('.md-nav__link');
          Array.prototype.forEach.call(focusableLinks, function(el) {
            el.tabIndex = 0;
          });
        }
      }
    }, 0);
    // focus only on primary sidebar when drawer is opened
    sidebarPrimary.focus();
    document.removeEventListener('focus', focusPrimary, true);
    document.addEventListener('focus', focusPrimary, true);
  }

  /**
   * --------------------------------------------------------------------------
   * Focus on drawer clicking on links inside drawer and or reset tabindexes
   * when changing drawer state
   * --------------------------------------------------------------------------
   */

  var drawerTriggers = document.querySelectorAll('.md-nav__title, .md-nav__item--nested > label, .md-nav__item--active > label, .md-nav__item > .md-nav--secondary .md-nav__link');

  // Change tabindexes when changing drawer state
  drawerToggle.addEventListener('change', function() {
    if(this.checked) {
      focusDrawer();
    } else {
      resetTabindexes();
    }
  }, false);

  // Change tabindexes when navigating in drawer
  Array.prototype.forEach.call(drawerTriggers, function(el) {
    el.addEventListener('click', function() {
      if (window.matchMedia("(max-width: 1219px)").matches) {
        if (drawerToggle.checked) {
          // change tabindexes
          focusDrawer();
        } else {
          // reset tabindexes
          resetTabindexes();
        }
      }
    }, false);
  });


})(window, document);
