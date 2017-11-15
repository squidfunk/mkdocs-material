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

  // Get all elements that should be focusable (labels) which they are not 'a', 'button', 'input' or something like that because they are focusable by default
  var focusableElements = document.querySelectorAll('.md-icon--menu, .md-nav__title, label.md-nav__link, .md-icon--search');

  // Get search input
  var searchInput = document.querySelectorAll('.md-search__input')[0];

  // Get search toggle input
  var searchToggle = document.getElementById('search');

  // Get drawer toggle input
  var drawerToggle = document.getElementById('drawer');

  // Get primary sidebar
  var sidebarPrimary = document.getElementsByClassName('md-sidebar--primary')[0];

  // Get tabs
  var tabs = document.getElementsByClassName('md-tabs');

  // Get nav titles
  var navTitles = document.getElementsByClassName('md-nav__title');

  // Get site title
  var siteTitle = document.getElementsByClassName('md-nav__title--site')[0];

  // Get all links from primary and seconrady nav in drawer
  var linksDrawer = document.querySelectorAll('.md-sidebar--primary .md-nav__link, .md-sidebar--primary .md-nav__title, .md-nav__item > .md-nav--secondary .md-nav__link, .md-source');



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
   * // Make TOC label (Table of contents) not focusable
   * --------------------------------------------------------------------------
   */

  navTitles[navTitles.length - 1].tabIndex = -1;



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
    navTitles[navTitles.length - 1].tabIndex = -1;
    mediaLarge(matchMediaLarge);
    mediaMedium(matchMediaMedium);
    document.removeEventListener('focus', focusPrimary, true);
  }



  /**
   * --------------------------------------------------------------------------
   * Change things (<=>1220px)
   * --------------------------------------------------------------------------
   */

  function mediaLarge(mql) {
    if (mql.matches) {
      // Make site title not focusable on bigger screens
      siteTitle.tabIndex = -1;
      // When screen is big and you click on the site title (Material for MkDocs in primary nav - it opens the drawer because of for attribute)
      siteTitle.setAttribute('for', '');
      Array.prototype.forEach.call(linksDrawer, function(el) {
        el.removeAttribute('tabindex');
      });
      Array.prototype.forEach.call(focusableElements, function(el) {
        el.tabIndex = 0;
      });
      document.removeEventListener('focus', focusPrimary, true);
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
      if (drawerToggle.checked) {
        // if drawer is opened and you are in toc menu on small screen and you increase screen width toc disappears so we have to reset tabindexes in drawer for proper focus
        document.querySelectorAll('label.md-nav__link--active')[0].previousElementSibling.checked = false;
        focusDrawer();
      }
    } else {
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
   * --------------------------------------------------------------------------
   */

  document.getElementsByClassName('md-search__overlay')[0].addEventListener('click', function() {
    if(document.getElementsByClassName('md-source').length) {
      // focus on repo source
      document.getElementsByClassName('md-source')[0].focus();
    // else if tabs
    } else if(tabs.length) {
      // focus on tabs
      tabs[0].focus();
    // if no repo and tabs
    } else {
      // focus on primary nav
      sidebarPrimary.focus();
    }
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
        // if only TAB key
        // if repo
        if(document.getElementsByClassName('md-source').length) {
          // focus on repo source
          document.getElementsByClassName('md-source')[0].focus();
        // else if tabs
        } else if(tabs.length) {
          // focus on tabs
          tabs[0].focus();
        // if no repo and tabs
        } else {
          // focus on primary nav
          sidebarPrimary.focus();
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
   * Open/close search on S and F keys on smaller screens
   * --------------------------------------------------------------------------
   */

  window.addEventListener('keydown', function(ev) {
    if (!searchToggle.checked && (ev.keyCode === 70 || ev.keyCode === 83)) {
      // You can integrate this with your code when you are checking if you are not inside a form, with this code it opens even when you are inside a form
      if (window.matchMedia("(max-width: 1219px)").matches) {
        drawerToggle.checked = false;
        resetTabindexes();
        searchToggle.checked = true;
        searchInput.focus();
      }
    }
  }, false);

  /**
   * --------------------------------------------------------------------------
   * Open/close search with space/enter/return keys when focusing on search
   * icon (match media is not required because on bigger screens search icon is
   * not focusable)
   * --------------------------------------------------------------------------
   */

  window.addEventListener('keydown', function(ev) {
    if (ev.keyCode === 32 || ev.keyCode === 13) {
      if (document.activeElement.classList.contains('md-icon--search') && document.activeElement.name !== 'query') {
        ev.preventDefault();
        searchToggle.checked = true;
        searchInput.focus();
      }
    }
  }, false);



  /**
   * --------------------------------------------------------------------------
   * Open/close submenus with space/enter/return keys
   * --------------------------------------------------------------------------
   */

  window.addEventListener('keydown', function(ev) {
    if (ev.keyCode === 32 || ev.keyCode === 13) {
      var forAttr = document.activeElement.getAttribute('for');
      if (typeof forAttr !== typeof undefined && forAttr !== false && (document.activeElement.classList.contains('md-nav__link') || document.activeElement.classList.contains('md-nav__title'))) {
        ev.preventDefault();
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
    }, false)
  });



  /**
   * --------------------------------------------------------------------------
   * Reset tabindexes when closing drawer clicking on the overlay
   * --------------------------------------------------------------------------
   */

  document.getElementsByClassName('md-overlay')[0].addEventListener('click', resetTabindexes, false);

  /**
   * --------------------------------------------------------------------------
   * Open/close drawer with space/enter/return keys on smaller screens when
   * focusing on hamburger icon (match media is not required because on bigger
   * screens menu icon is not focusable)
   * --------------------------------------------------------------------------
   */

  window.addEventListener('keydown', function(ev) {
    if (ev.keyCode === 32 || ev.keyCode === 13) {
      var forAttr = document.activeElement.getAttribute('for');
      if (forAttr === 'drawer' && document.activeElement.classList.contains('md-icon--menu')) {
        ev.preventDefault();
        drawerToggle.checked = true;
        focusDrawer();
      }
    }
  }, false);

  /**
   * --------------------------------------------------------------------------
   * Open drawer with M key (opinionated)
   * --------------------------------------------------------------------------
   */

  window.addEventListener('keydown', function(ev) {
    if (ev.keyCode === 77) {
      if (window.matchMedia("(max-width: 1219px)").matches) {
        drawerToggle.checked = true;
        focusDrawer();
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
      drawerToggle.checked = false;
      resetTabindexes();
    }
  }, false);

  /**
   * --------------------------------------------------------------------------
   * Focus only on drawer when navigating through links in drawer
   * --------------------------------------------------------------------------
   */

  // set tabindex to primary sidebar to make possible to focus on it using JS
  sidebarPrimary.tabIndex = -1;

  // get and set scroll top position on key down
  var scrollTop = 0;
  window.addEventListener('keydown', function(ev) {
    if(window.scroll) {
      scrollTop = window.scrollY;
    }
  }, false);

  function focusPrimary(ev) {
    // it prevents focusing on other elements that are NOT in drawer
    if (document !== ev.target && sidebarPrimary !== ev.target && !sidebarPrimary.contains(ev.target)) {
      sidebarPrimary.focus();
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
    // this part is a little bit tricky, when inputsChecked = 0 it means that you are in the main menu, if 1 - you are in the submenu or TOC
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
    } else if (inputsChecked === 1) {
      // if second sibling is nav it means it is submenu
      if(element.nextElementSibling.nextElementSibling.classList.contains('md-nav')) {
        nav = element.nextElementSibling.nextElementSibling;
        // make "back" focusable
        nav.children[0].tabIndex = 0;
        // get submenu nav
        focusableLinks = nav.children[1].children;
        Array.prototype.forEach.call(focusableLinks, function(el) {
          // if active link is inside that submenu, check what can be focusable - "a" element or "label", it depends on screen width because sometimes secondary nav is visible and sometimes not
          if(el.querySelectorAll('.md-nav__link--active')[0] && el.querySelectorAll('.md-nav__link--active')[0].style.display !== 'none') {
            el.querySelectorAll('.md-nav__link--active')[0].tabIndex = 0;
          }
          if(el.querySelectorAll('.md-nav__link--active')[1] && el.querySelectorAll('.md-nav__link--active')[1].style.display !== 'none') {
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
    // focus only on primary sidebar when drawer is opened
    sidebarPrimary.focus();
    document.removeEventListener('focus', focusPrimary, true);
    document.addEventListener('focus', focusPrimary, true);
  }

  /**
   * --------------------------------------------------------------------------
   * Get all elements in drawer that changes menus + hamburger menu icon
   * --------------------------------------------------------------------------
   */

  var drawerTriggers = document.querySelectorAll('.md-icon--menu, .md-nav__title, .md-nav__item--nested > label, .md-nav__item--active > label, .md-nav__item > .md-nav--secondary .md-nav__link');

  // Change tabindexes when navigating in drawer
  Array.prototype.forEach.call(drawerTriggers, function(el) {
    el.addEventListener('click', function() {
      if (window.matchMedia("(max-width: 1219px)").matches) {
        setTimeout(function() { // I don't know why but when I'm not using setTimeout drawerToggle.checked return false in that moment
          if (drawerToggle.checked) {
            // change tabindexes
            focusDrawer();
          } else {
            // reset tabindexes
            resetTabindexes();
          }
        }, 0);
      }
    }, false);
  });


})(window, document);
