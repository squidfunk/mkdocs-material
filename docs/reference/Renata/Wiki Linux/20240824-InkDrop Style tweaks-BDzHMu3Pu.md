# InkDrop Style tweaks

color styles in your Inkdrop editor:

1. Open your Inkdrop data directory.
2. Create or open the `styles.less` file.
3. Copy and paste the content from the artifact above into your `styles.less` file.

Here's how this works:

1. We define color variables using Less syntax. This makes it easy to reuse colors throughout your styles.
2. We create a `.colorize()` mixin (function) that applies a color to an element.
3. We define classes for different types of text (success, error, warning, info) and apply appropriate colors.
4. We style specific Inkdrop elements, like the active item in the note list.
5. We apply colors to HTML elements like `<strong>` and `<em>`.
6. We include print-specific styles using the `@media print` selector.

To use these styles in your notes:

- For colored text, you can wrap your text in spans with the appropriate class. For example:

```html

  <span class="success">This is a success message</span>
  <span class="error">This is an error message</span>

- The styles for `<strong>` and `<em>` will automatically apply to any bold or italic text in your notes.

# Color variables
  
@red: #FF0000;
@green: #00FF00;
@yellow: #FFFF00;
@blue: #0000FF;
@magenta: #FF00FF;
@cyan: #00FFFF;

/* Function to apply color */
.colorize(@color) {
  color: @color !important;
}

/* Applying colors to specific elements */
.success {
  .colorize(@green);
}

.error {
  .colorize(@red);
}

.warning {
  .colorize(@yellow);
}

.info {
  .colorize(@blue);
  

/* Example usage on Inkdrop-specific elements */
.note-list-bar-item .note-list-item-view.active {
  background-color: @blue;
  color: white;
}

/* Styling for specific HTML elements */
strong {
  .colorize(@magenta);
}

em {
  .colorize(@cyan);
}

/* Print styles */
@media print {
  .success {
    .colorize(@green);
  }

  .error {
    .colorize(@red);
  }

  /* Add more print-specific styles as needed */
}
```