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

/* ----------------------------------------------------------------------------
 * Taken and adapted from https://gist.github.com/kylebarrow/1042026
 * ------------------------------------------------------------------------- */

/* Detect standalone mode */
if (('standalone' in window.navigator) && window.navigator.standalone) {

	/* If you want to prevent remote links in standalone web apps opening
	   Mobile Safari, change 'remotes' to true */
	var node, remotes = false;

	/* Bind to document */
	document.addEventListener('click', function(event) {
		node = event.target;

		/* Bubble up until we hit link or top HTML element. Warning: BODY element
		   is not compulsory so better to stop on HTML */
		while (node.nodeName !== 'A' && node.nodeName !== 'HTML') {
			node = node.parentNode;
	  }
		if ('href' in node && node.href.indexOf('http') !== -1 && (
				node.href.indexOf(document.location.host) !== -1 || remotes)) {
			event.preventDefault();
			document.location.href = node.href;
		}
	}, false);
}