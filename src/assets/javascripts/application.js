/*
 * Copyright (c) 2016 Martin Donath <martin.donath@squidfunk.com>
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

/* Hey, there's your missing semicolon, lunr.js! */
;

/* Truncate a string after the given number of characters */
String.prototype.truncate = function(n) {
  if (this.length > n) {
    while (this[n] != ' ' && --n > 0);
    return this.substring(0, n) + '&hellip;';
  }
  return this;
}

/* Wrap an HTMLElement around each element in an HTMLElement array */
HTMLElement.prototype.wrap = function (elms) {
  if (!elms.length) elms = [elms];
  for (var i = elms.length - 1; i >= 0; i--) {
    var child = (i > 0) ? this.cloneNode(true) : this;
    var el = elms[i];

    /* Cache current parent and sibling */
    var parent  = el.parentNode,
        sibling = el.nextSibling;

    /* Wrap the element and remove it from its current parent */
    child.appendChild(el);
    if (sibling) {
      parent.insertBefore(child, sibling);
    } else {
      parent.appendChild(child);
    }
  }
}

/* ----------------------------------------------------------------------------
 * Application logic
 * ------------------------------------------------------------------------- */

/* Initialize application upon DOM ready */
document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  /* Test for iOS */
  Modernizr.addTest('ios', function() {
    return !!navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
  });

  /* Test for web application context */
  Modernizr.addTest('standalone', function() {
    return !!navigator.standalone;
  });

  /* Attack FastClick to mitigate 300ms delay on touch devices */
  FastClick.attach(document.body);

  /* Grab relevant elements from the DOM */
  var toggle  = document.getElementById('toggle-search'),
      reset   = document.getElementById('reset-search'),
      drawer  = document.querySelector('.drawer'),
      anchors = document.querySelectorAll('.anchor'),
      search  = document.querySelector('.search .field'),
      query   = document.querySelector('.query'),
      meta    = document.querySelector('.results .meta');

/* ----------------------------------------------------------------------------
 * Initialize drawer
 * ------------------------------------------------------------------------- */

  /* Automatically close drawer when anchors are clicked */
  Array.prototype.forEach.call(anchors, function(item) {
    item.querySelector('a').addEventListener('click', function() {
      document.getElementById('toggle-drawer').checked = false;
      document.body.classList.remove('toggle-drawer');
    });
  });

  /* Align drawer to window offset */
  var pageYOffsetLast = window.pageYOffset;
  var align = function() {
    var boundary = window.pageYOffset + window.innerHeight;
    var clipping = Math.max(0, window.innerHeight - drawer.offsetHeight);

    /* Ensure alignment with footer if at end of document */
    if (boundary > document.body.clientHeight - (96 - clipping)) {
      if (drawer.style.position != 'absolute') {
        drawer.style.position = 'absolute';
        drawer.style.top      = null;
        drawer.style.bottom   = 0;
      }

    /* Pin drawer to top, if window is higher than drawer */
    } else if (drawer.offsetHeight < window.innerHeight) {
      if (drawer.style.position != 'fixed') {
        drawer.style.position = 'fixed';
        drawer.style.top = 0;
        drawer.style.bottom = null;
      }

    /* If the drawer is not pinned, check if we need to pin it */
    } else if (drawer.style.position != 'fixed') {

      /* Pin drawer to bottom of window */
      if (boundary > drawer.offsetTop + drawer.offsetHeight) {
        drawer.style.position = 'fixed';
        drawer.style.top = null;
        drawer.style.bottom = -96 + 'px';

      /* Pin drawer to top of window */
      } else if (window.pageYOffset < drawer.offsetTop) {
        drawer.style.position = 'fixed';
        drawer.style.top = 0;
        drawer.style.bottom = null;
      }

    /* If the drawer is pinned, check if we have to unpin it */
    } else {
      if (window.pageYOffset > pageYOffsetLast) {
        if (drawer.style.top) {
          drawer.style.position = 'absolute';
          drawer.style.top = Math.max(0, pageYOffsetLast) + 'px';
          drawer.style.bottom = null;
        }
      } else if (drawer.style.bottom) {
        drawer.style.position = 'absolute';
        drawer.style.top = (boundary - drawer.offsetHeight) + 'px';
        drawer.style.bottom = null;
      }
    }

    /* Update last offset (mitigiate negative offsets in Safari) */
    pageYOffsetLast = Math.max(0, window.pageYOffset);
  }

  /* Check for media query events */
  var check = function() {
    var main = document.querySelector('.main');
    window.removeEventListener('scroll', align);

    /* Reset drawer position when entering collapsed mode */
    if (matchMedia("only screen and (max-width: 959px)").matches) {
      drawer.style.position = null;
      drawer.style.top      = null;
      drawer.style.bottom   = null;

    /* Check if the scroll handler needs to be registered */
    } else if (drawer.offsetHeight + 96 < main.offsetHeight) {
      window.addEventListener('scroll', align);
      align();
    }
  }

  /* Register resize handler and fire once */
  if (!Modernizr.ios) {
    window.addEventListener('resize', check);
    check();
  }

/* ----------------------------------------------------------------------------
 * Initialize search index
 * ------------------------------------------------------------------------- */

  /* Initialize index */
  var initialize = function() {
    pegasus(base_url + '/mkdocs/search_index.json').then(

      /* Request successful, we got the index */
      function(data, xhr) {

        /* Create index */
        var index = lunr(function() {
          this.field('title', { boost: 10 });
          this.field('text');
          this.ref('location');
        });

        /* Index articles */
        var articles = {};
        data.docs.map(function(article) {
          article.location = base_url + article.location;
          articles[article.location] = article;
          index.add(article);
        });

        /* Register keyhandler to execute search on key up */
        query.addEventListener('keyup', function() {
          var container = document.querySelector('.results .list');
          while (container.firstChild)
            container.removeChild(container.firstChild);

          /* Abort, if the query is empty */
          var bar = document.querySelector('.bar.search');
          if (!query.value.length) {
            while (meta.firstChild)
              meta.removeChild(meta.firstChild);

            /* Restore state */
            bar.classList.remove('non-empty');
            return;
          }

          /* Show reset button */
          bar.classList.add('non-empty');

          /* Execute search */
          var results = index.search(query.value);
          results.map(function(result) {
            var article = articles[result.ref];

            /* Create article container */
            var teaser = document.createElement('article');
            teaser.classList.add('result');

            /* Create title element */
            var title = document.createElement('h1');
            title.innerHTML = article.title;
            teaser.appendChild(title);

            // /* Create text element */
            // var text = document.createElement('p');
            // text.innerHTML = article.text.truncate(140);
            // teaser.appendChild(text);

            /* Create a link referring to the article */
            var link = document.createElement('a');
            link.href = article.location;
            link.appendChild(teaser);

            /* Create url element */
            var url = document.createElement('span');
            url.innerHTML = link.href.split('#')[0];
            teaser.appendChild(url);

            /* Close search and jump to anchor when on same page */
            var parts = link.href.split('#');
            if (parts[0] == document.location.href.split('#')[0]) {
              link.addEventListener('click', function(e) {
                document.body.classList.remove('toggle-search');
                document.body.classList.remove('locked');
                toggle.checked = false;

                /* Don't catch anchors if the search doesn't cover the page */
                if (matchMedia('only screen and (min-width: 960px)').matches)
                  return;

                /* Prevent default to intercept scroll-to behaviour and
                   stop propagation, as this interferes with the link-lock in
                   the web application context, which opens all internal links
                   inside the same context */
                e.preventDefault();
                e.stopPropagation();

                /* Scroll to chapter, if given */
                if (parts.length != 1) {
                  var chapter = document.getElementById(parts[1]);
                  if (chapter) {

                    /* Scroll to chapter, but wait for 100ms to prevent flashes
                       on iOS. A short timeout seems to do the trick */
                    setTimeout(function() {
                      chapter.scrollIntoView && chapter.scrollIntoView() ||
                        window.scrollTo(0, chapter.offsetTop);
                    }, 100);
                  }
                }
              });
            }

            /* Add article to search results */
            container.appendChild(link);
          });

          /* Show number of search results */
          var number = document.createElement('strong');
          number.innerHTML = results.length + ' search result'
            + (results.length != 1 ? 's' : '');

          /* Update number */
          while (meta.firstChild)
            meta.removeChild(meta.firstChild);
          meta.appendChild(number);
        });
      },

      /* Handle error */
      function(data, xhr) {
        console.error(data, xhr.status);
      }
    );

    /* Remove listener, as we only have to initialize once */
    toggle.removeEventListener('click', initialize);
  };

  /* Initialize on first click */
  toggle.addEventListener('click', initialize);

/* ----------------------------------------------------------------------------
 * Initialize search modal
 * ------------------------------------------------------------------------- */

  /* Intercept click on search mode toggle */
  var offset = 0;
  toggle.addEventListener('click', function(e) {
    var list = document.body.classList;
    var lock = !matchMedia('only screen and (min-width: 960px)').matches;

    /* Exiting search mode */
    if (list.contains('locked')) {
      list.remove('locked');

      /* Scroll to former position, but wait for 100ms to prevent flashes
         on iOS. A short timeout seems to do the trick */
      if (lock)
        setTimeout(function() {
          window.scrollTo(0, offset);
        }, 100);

    /* Entering search mode */
    } else {
      offset = window.scrollY;

      /* First timeout: scroll to top after transition, to omit flickering */
      if (lock)
        setTimeout(function(){
          window.scrollTo(0, 0);
        }, 400);

      /* Second timeout: Lock body after finishing transition and scrolling to
         top and focus input field. Sadly, the focus event is not dispatched
         on iOS Safari and there's nothing we can do about it. */
      setTimeout(function() {

        /* This additional check is necessary to handle fast subsequent clicks
           on the toggle and the timeout to lock the body must be cancelled */
        if (this.checked) {
          if (lock)
            list.add('locked');
          setTimeout(function() {
            query.focus();
          }, 200);
        }
      }.bind(this), 450);
    }
  });

  /* Dispatch input focus on touch of search section */
  search.addEventListener('touchstart', function() {
    query.focus();
  });

  /* Exit search mode when pressing ESC */
  window.addEventListener('keyup', function(e) {
    var code = e.keyCode || e.which;
    if (code == 27) {
      query.blur();

      /* Exit locked state */
      document.body.classList.remove('toggle-search');
      document.body.classList.remove('locked');
      toggle.checked = false;
    }
  });

  /* Delete search results upon click on "x" */
  var empty = document.getElementById('reset-search');
  empty.addEventListener('click', function() {
    var container = document.querySelector('.results .list');
    while (container.firstChild)
      container.removeChild(container.firstChild);

    /* Hide search button */
    var bar = document.querySelector('.bar.search');
    bar.classList.remove('non-empty');

    /* Reset number of search results */
    meta.innerHTML = '';

    /* Empty search input */
    query.value = '';
    query.focus();
  });

/* ----------------------------------------------------------------------------
 * Initialize scroll spy
 * ------------------------------------------------------------------------- */

  /* Retrieve vertical offset of article chapters */
  var chapters = document.querySelectorAll('h2');
  chapters = Array.prototype.map.call(chapters, function(item) {
    return item.offsetTop;
  });

  /* Update currently active chapter, if the new chapter is two thirds
     into the viewport - account for iOS web application context */
  var visible = null;
  document.addEventListener('scroll', function() {
    var offset = window.scrollY + (window.innerHeight / 3),
        active = chapters.length - 1;
    for (var c = 0; c < active; c++)
      if (offset < chapters[c + 1])
        active = c;

    /* Update anchors, if a new chapter became visible */
    if (active != visible) {
      visible = active;
      Array.prototype.forEach.call(anchors, function(item, index) {
        var link = item.querySelector('a');
        if (index != visible || link.classList.add('current'))
          link.classList.remove('current');
      });
    }
  });

/* ----------------------------------------------------------------------------
 * Fix syntax highlighting
 * ------------------------------------------------------------------------- */

  /* Fix highlighting for function calls */
  var functions = document.querySelectorAll('.n + .p');
  Array.prototype.forEach.call(functions, function(item) {
    var text = item.innerText || item.textContent;
    if (text && text[0] == '(')
      item.previousSibling.classList.add('f');
  });

/* ----------------------------------------------------------------------------
 * Progressive structure enhancement
 * ------------------------------------------------------------------------- */

  /* Wrap all data tables */
  var tables = document.querySelectorAll('table');
  Array.prototype.forEach.call(tables, function(item) {
    var wrapper = document.createElement('div');
    wrapper.classList.add('data');
    wrapper.wrap(item);
  });

/* ----------------------------------------------------------------------------
 * Fix overflow scrolling on iOS
 * ------------------------------------------------------------------------- */

  /* Force 1px scroll offset to trigger overflow scrolling */
  if (Modernizr.ios) {
    var scrollable = document.querySelectorAll(
      '.scrollable, .standalone .article');
    Array.prototype.forEach.call(scrollable, function(item) {
      item.addEventListener('touchstart', function() {
        var top = this.scrollTop;

        /* We're at the top of the container */
        if (top == 0) {
          this.scrollTop = 1;

        /* We're at the bottom of the container */
        } else if (top + this.offsetHeight == this.scrollHeight) {
          this.scrollTop = top - 1;
        }
      });
    });
  }

  /* Prevent scrolling on project, overlay and header */
  var prevented = document.querySelectorAll('.project, .overlay, .header');
  Array.prototype.forEach.call(prevented, function(item) {
    item.addEventListener('touchmove', function(e) {
      e.preventDefault();
    });
  });

/* ----------------------------------------------------------------------------
 * Fallback for browsers that don't support :checked
 * ------------------------------------------------------------------------- */

  /* Set representative class on body for active toggle */
  var toggles = document.querySelectorAll('.toggle');
  Array.prototype.forEach.call(toggles, function(item) {
    item.addEventListener('click', function() {
      document.body.classList.toggle(this.id);
    });
  });

/* ----------------------------------------------------------------------------
 * Initialize GitHub star button
 * ------------------------------------------------------------------------- */

  /* Get Stars for current repository */
  if (repo_id) {
    pegasus('https://api.github.com/repos/' + repo_id).then(

      /* Request successful, we got the stars */
      function(data, xhr) {
        var count = data.stargazers_count;
        if (count > 10000)
          count = (count / 1000).toFixed(0) + 'k';
        else if (count > 1000)
          count = (count / 1000).toFixed(1) + 'k';

        /* Set number of stars */
        var stars = document.querySelector('.repo-stars .count');
        stars.innerHTML = count;
      },

      /* Handle error */
      function(data, xhr) {
        console.error(data, xhr.status);
      }
    );
  }
});