// document.addEventListener('keydown', function (e) {
//     e.stopImmediatePropagation();
//   }, true);

document.addEventListener(
  "keydown",
  function (e) {
    e.stopImmediatePropagation(); // Prevent other listeners
    if (e.key === "h" || e.key === "H") {
      // Check if 'h' or 'H' is pressed
      console.log("Hello, World!");
    }
  },
  true // Capture in the capture phase
);

document.addEventListener("DOMContentLoaded", function () {
  // Re-apply styles when system preference changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", applyPinkHeader);
});
