# Markdown Table Editor CheatSheet

## Quick guide
1. Input a pipe `|` and some content (cursor position is indicated by `_`).

    | foo_

2. Hit Tab to move to the next cell.

    | foo | _
    | --- |

3. Continue typing.

    | foo | bar | _
    | --- | --- |

4. Hit Enter to move to the next row.

    | foo | bar |
    | --- | --- |
    | _   |     |

5. Continue typing...

    | foo | bar |
    | --- | --- |
    | baz | _   |

6. Hit Ctrl(Cmd)-Enter to finish editing the table.

    | foo | bar |
    | --- | --- |
    | baz |     |
    _


## Commands
If you are using Mac, use Cmd instead of Ctrl.

### Basic commands
| Command       | Description               | Keymap     |
| ------------- | ------------------------- | ---------- |
| Next Cell     | Move to the next cell     | Tab        |
| Previous Cell | Move to the previous cell | Shift-Tab  |
| Next Row      | Move to the next row      | Enter      |
| Escape        | Escape from the table     | Ctrl-enter |

### Move focus
| Command    | Description      | Keymap     |
| ---------- | ---------------- | ---------- |
| Move Left  | Move focus left  | Ctrl-Left  |
| Move Right | Move focus right | Ctrl-Right |
| Move Up    | Move focus up    | Ctrl-Up    |
| Move Down  | Move focus down  | Ctrl-Down  |

### Alignment
| Command      | Description           | Keymap           |
| ------------ | --------------------- | ---------------- |
| Align Left   | Align a column left   | Shift-Ctrl-Left  |
| Align Right  | Align a column right  | Shift-Ctrl-Right |
| Align Center | Align a column center | Shift-Ctrl-Up    |
| Align None   | Unset alignment       | Shift-Ctrl-Down  |

### Row/column operations
| Command           | Description            | Keymap               |
| ----------------- | ---------------------- | -------------------- |
| Insert Row        | Insert an empty row    | Ctrl-K Ctrl-I        |
| Delete Row        | Delete a row           | Ctrl-L Ctrl-I        |
| Insert Column     | Insert an empty column | Ctrl-K Ctrl-J        |
| Delete Column     | Delete a column        | Ctrl-L Ctrl-J        |
| Move Row Up       | Move a row up          | Alt-Shift-Ctrl-Up    |
| Move Row Down     | Move a row down        | Alt-Shift-Ctrl-Down  |
| Move Column Left  | Move a column left     | Alt-Shift-Ctrl-Left  |
| Move Column Right | Move a column right    | Alt-Shift-Ctrl-Right |
