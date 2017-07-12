# Cards

## Intro

For a 60 second quick start on Markdown
[commonmark has a great tutorial](http://commonmark.org/help/){.foo 26rem target="\_blank"}

For more documentation about this doc engine visit [mkdocs material theme](http://squidfunk.github.io/mkdocs-material/).

## Overview

We use the the blockquote syntax below to make "cards" in the flavors of "admonitions", "sidebar bookmarks", "callouts" and "figures".
We try and stick with a simple combination of emojis and bold text for title.
Most markdown is supported in the blockquote format, editors support formatting
and syntax highlighting, has nice support for autocompletion (on emojis too in Atom at least)
Finally, it degrades nicely and will still look decent in markdown parsers that support the basics, such as github.
We have to hijack a few emojis to use as the first thing in the blockquotes but we think it worth it.
click the edit pencil above to see the source for this page.

Here is an example of what the markdown would degrade to and look when a parser doesn't support this extension

----------------------------------------

> :blue_book: **Note: Cool Feature**  
> Using an emoji and strong text we can specify what we need to build other types of blocks
>
>     > :blue_book: **Note: Cool Feature**
>     > Information here

--------------------------------------

## Quick Start

### Cheatsheet

<div markdown="1" class="row">

> :camera:  
>
|      Block       |           Syntax           |
| ---------------- | -------------------------- |
| Callout          | > 📣 or `> :mega:`       |
| Figure           | > 📷 or `> :camera:`     |
| Sidebar Bookmark | `> 🔖` or `> :bookmark:`   |
| Float Left align | '> 👈' or `> :point_left:` |
| Float Right align | '> 👉' or `> :point_right:` |
>
>
``` md  
example syntax
> 📝 **Some Title**
> The content

> :memo:{.tip} **The Tip Title**
The content

> :bulb: also a tip, just text

> :mega: :point_left:
a call out floated left

with sizing and float alignment
> :camera:{.float-left .pct33}
> **Figure Title**   
> ![](images/dingus/image.png)

```

| Admonitions |                      Syntax                       |
| ----------- | ------------------------------------------------- |
| Memo / Note | > 📝 or `> :memo:`                                 |
| Tip / Hint  | `> 💡` or `> :bulb:` or `> :memo:{.tip}`          |
| Success     | :thumbsup: `> :thumbsup:` or `> :memo:{.success}` |
| Summary     | :book: `> :book:` or `> :memo:{.summary}`         |
| Warning     | :warning: `> :warning:`                           |
| Fail        | :x: `> :x:` or `> :memo:{.fail}`                  |
| Danger      | :boom: `> :boom:` or `> :memo:{.danger}`          |
| Bug         | :bug: `> :beetle:`  or  `> :memo:{.bug}`          |

</div>

### Examples

<div markdown="1" class="row">

> :memo: **Note/Memo Admonition**  
`> :memo: **Title**`  

-----------------------------  

> :bulb: **Tip Admonition**  
`> :bulb: **Title**`

-----------------------------

> :thumbsup: **Success Admonition**  
`> :thumbsup: **Title**`

-----------------------------

</div>

<div markdown="1" class="row">

> :book: **Summary Admonition**
`> :book: content`

-----------------------------

> :warning: Warning/Important  
> `> :warning: content`

-----------------------------

> :x: Failure Admonition  
> `> :x: content`

-----------------------------

</div>

<div markdown="1" class="row">

> :boom: **Danger Admonition**   
`> :boom: content `
-----------------------------

> :bug: **Bug**
`> :bug: content `

-----------------------------

</div>

<div markdown="1" class="row">

> :bookmark: **Sidebar Bookmark**   
`> :bookmark: content `
-----------------------------

> :camera:{.center-content} **Fig Caption**
> ```
> > :camera: **Fig Caption**
> > content
> ```

-----------------------------

> :mega: **Callout**
`> :mega: text `

-----------------------------

</div>

---

> :bulb:{.center} we put the above examples in `<div class=row>` which we will cover later

## Sidebar Bookmarks

Sidebar bookmarks are an idea taken from ascidoc

> :bookmark: **Sidebars**
>
> - sidebar bookmarks shrink/expand to fit the content by default.
> - They have a centered title
> - They also have margins like other typeset content
> - they can be floated like all other cards

any valid markdown such as tables can also go into the blocks

> :bookmark:{.center-content} **Sidebar with lots of elements**
> added `{.center-content}` to center contents.  
> center-text centers the container elements as well as text
>
* lists get centered and expand
* `<li>` part is always left aligned
>
> ``` js
> var x = y
> foo != bar
> ```
>
> > nested blockquotes are still full width
>
> Images get centered  
> ![stormcat][]{.small}
>
> >:memo: nested admonitions
>
>
| Header One |     Header Two     | dollar amounts |
|:---------- |:------------------ | --------------:|
| Item One   | Item Two is longer |        $100.23 |
| bboo       | baz                |        $200.45 |

-------

[stormcat]: images/dingus/image.png "The Stormtroopcat"

## Figures

* figures are used for images, latex or anything really
* they have no styling or padding
* the title will be placed on the bottom, you can use _italic_
* use ids to link to them from elsewhere in your doc `:camera:{#your-id-name}`

<div markdown="1" class="row">

> :camera: **_Image Figure_**   
> <img src='../images/dingus/image.png'>

-----------------------------

> :camera:{#example-table-figure .center-content} **Table Figure**
> _Will work with diagrams too_
>
|   tables   | can be  |
| ---------- | ------- |
| in figures | as well |

-----------------------------

</div>

## Callouts

* callouts have larger text for emphasis
* will be centered by default
* useful when wanting to highlight key areas in article as can be seen in the
  article example below

**Example**

    > :mega: **This is a callout with big centered text like this**  
    > **Callouts are blockquotes with bigger text and special styling.**

will produce

> :mega: **This is a callout with big centered text like this**  
> **Callouts are blockquotes with bigger text and special styling.**

## Sizing & Alignment

Unless a size is specified, images will use the original dimensions of the image up to the size of its container..
Admonitions

|        block         |      where      |             size              |
| -------------------- | --------------- | ----------------------------- |
| **image**            | on its own line | img size up to container size |
|                      | floated         | .medium (210px)               |
| **figure**           | on its own line | shrink to fit its contents    |
|                      | floated         | .medium 210px                 |
| **admonition**       | on its own line | full container width          |
|                      | floated         | .pct50 50%                    |
| **sidebar/bookmark** | on its own line | shrink to fit its contents    |
|                      | floated         | .medium 210px                 |

**"Floated"**: meaning is that text will float around it and its usually positioned left or right.

### Sizing Classes

<div markdown='1' class='row'>

|  class  | size |
| ------- | ---- |
| .pct20  | 20%  |
| .pct33  | 33%  |
| .pct50  | 50%  |
| .pct66  | 66%  |
| .pct80  | 80%  |
| .pct100 | 100% |

|  class  | size  |
| ------- | ----- |
| .mini   | 35px  |
| .xsmall | 80px  |
| .small  | 150px |
| .medium | 210px |
| .large  | 300px |
| .xlarge | 450px |
| .big    | 600px |

</div>

### Alignment Classes

|              class              |                               Desc                               |
| ------------------------------- | ---------------------------------------------------------------- |
| .center                         | Center in relation to the container its sitting in               |
| .center-content                 | center the contents only                                         |
| .center-all                     | Center in relation to the container And center the content       |
|                                 |                                                                  |
| .float-left or `:point_left:`   | float the block/image LEFT letting other content flow around it  |
| .float-right or `:point_right:` | float the block/image RIGHT letting other content flow around it |

### Attributes Plugin

We rely on [the attributes plugin](https://pythonhosted.org/Markdown/extensions/attr_list.html) to use these classes.
Attach them to the emoji that is being used to setup the block. like so `> :memo:{.small} ...`.

### #id reference links

Using the attributes plugin you can assign reference id's to link back to. You can , for example, refer and link to figures such as linking to the [example table figure](#example-table-figure) at the start of this doc.
We do this with the attributes plugin by assigning a unique id to the figure above like this `> :camera:{#example-table-figure} ... ` and then reference that link like this `[example figure](#example-table-figure)`. The hash symbol `#` is short hand for `id=`.

## Floats

Floats can use emojis too.
add :point_left: `:point_left:` to float left and :point_right: `:point_right:` to float right

> :mega: :point_left:
floated left callout  
`> :mega: :point_left: floated left callout`

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. se cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

> :mega: :point_right:
floated left callout  
`> :mega: :point_right: floated left callout `

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

> :point_left:
>  ![](images/gandhi.jpg){align=left width=80}
>  The moment the slave resolves that he will no longer be a slave, his fetters fall.

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

----

### Using Attributes

> :memo:{.float-left .pct33} **Use Size**  
> This is a note floated left with a 33% width `.pct33` 33% size

Can use the the attributes plugin instead of the emoji's above as shown in more examples below
just tag append the class names from above inside the squiggly brackets `{ }`
next to the emoji. the example below will give you what you see on the left here

``` md
    > :memo:{.float-left .pct33} **Use Size**
    > This is a small note floated left

```

------------------------------------------------

## Material Icons

You can use the material icons by adding an `.icon` class to an italic using atiributes  
`_cloud_{.icon}` will produce _cloud_{.icon} for example

## Rows

Wrap one or more blocks in a `<div markdown="1" class="row"> </div>`
This will equal space those blocks in that row as can be seen in many examples in this doc.


## Examples

> :camera: :point_left: **_pi day rocks it at our house_**
<img src="../images/kids-pie-day.jpg" width='300'>

<!-- Excel src="../docs/fancyStuff.xlsx" range="A1:E50"-->

<!-- End-->

can be floated on both sides

> :camera:{.float-right .small} **Figure: Image Caption**  
> ![](images/mental-thumb.jpg)
> changes size uses attributes to set size
> `> :camera:{.float-right .medium} **Figure Title**`

-----------

> :camera:{.float-right .large} **.large**  
> ![](images/dingus/image.png)

**Size & Alignment Examples**
see chart above

> :camera:{.float-left .tiny} **.tiny**  
> ![](images/dingus/image.png){.pico}

&nbsp;

> :camera:{.float-left .xsmall} **.xsmall**  
> ![](images/dingus/image.png)

&nbsp;

> :camera:{.float-left .small} **.small**  
> ![](images/dingus/image.png)

---------------------------

> :camera:{.medium .center} **.medium .center**  
> ![](images/dingus/image.png)

-----------------------------

**stand-alone sidebar bookmarks & figure examples**

> :camera:{.center-all .pct80}  
> added `{.center-all .pct80}` to center in container and center contents and make size 66%
>
| Header One |     Header Two     | dollar amounts |
|:---------- |:------------------ | --------------:|
| Item One   | Item Two is longer |        $100.23 |
| bboo       | baz                |        $200.45 |

-------

**More Alignment Examples**


* more examples are below in the Lorem Ipsum

## Floating Examples

### What is Lorem Ipsum?

> :bookmark: :point_left: **sidebar-left :pushpin:**  
>
> * used since the 1500s
> * popularised in the 1960s

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.

> :bulb:{.float-right .small} **Example Tip**  
This is a tip admonition  

It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

### Where does it come from?

Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.

> :mega: :point_right: **roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old**

Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.
Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

### Why do we use it?

> :camera: :point_left: **_Sample Code_**
``` js
let x = 1
x++
for foo in some
```

It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

### Where can I get some?

> :camera: :point_left: **_foo_**
![foo](images/mental-thumb.jpg "pi day")

There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.

> :camera: :point_right: **Figure With a Table**
>
| Header One |         Header Two          |
|:---------- |:--------------------------- |
| Item One   | Lorem ipsum dolor sit amet, |
| bboo       | baz                         |


Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mollis purus sed tortor blandit posuere. Donec id volutpat neque, ac pellentesque orci. Sed iaculis congue ligula vitae vehicula. Vivamus ut orci molestie, euismod lorem sed, auctor mi. Nunc lobortis urna at ex accumsan mollis. Suspendisse mattis ullamcorper justo, in rhoncus est commodo vitae. Aenean efficitur risus a accumsan semper. Morbi molestie ex vitae convallis faucibus.mollis purus sed tortor blandit posuere. Donec id volutpat neque, ac pellentesque orci. Sed iaculis congue ligula vitae vehicula.

### Rows

<div markdown="1" class="row">

| Header One |     Header Two     | dollar amounts |
|:---------- |:------------------ | --------------:|
| Item One   | Item Two is longer |        $100.23 |
| bboo       | baz                |        $200.45 |

``` js
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
 el: '#app',
 router,
 template: '<App/>',
 components: { App }
})
```
</div>

---

<div markdown="1" class="row">

> :camera: **table fig**
>
| Header One |     Header Two     | dollar amounts |
|:---------- |:------------------ | --------------:|
| Item One   | Item Two is longer |        $100.23 |
| bboo       | baz                |        $200.45 |

-----

> :camera: **This is a figure with a code**
>
```javascript
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
 el: '#app',
 router,
 template: '<App/>',
 components: { App }
})
```

</div>

## Lucid Charts

<div style="width: 480px; height: 360px; margin: 10px; position: relative;">
<iframe allowfullscreen frameborder="0" style="width:480px; height:360px" src="https://www.lucidchart.com/documents/embeddedchart/3ceba856-605a-4ec6-b8a9-4ac87d49c9c1" id="sZOblqyjWsWu"></iframe>
</div>
