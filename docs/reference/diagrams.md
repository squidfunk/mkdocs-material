---
template: overrides/main.html
---

# Diagrams

Diagrams help to communicate complex relationships and interconnections between
different technical components, and are a great addition to project
documentation. Material for MkDocs integrates with [Mermaid.js][1], a very
popular and flexible solution for drawing diagrams.

  [1]: https://mermaid-js.github.io/mermaid/

## Configuration

### SuperFences

[:octicons-file-code-24: Source][2] ·
:octicons-beaker-24: Experimental ·
[:octicons-heart-fill-24:{ .mdx-heart } Insiders only][2]{ .mdx-insiders }

The [SuperFences][3] extension, which is part of [Python Markdown
Extensions][4], allows for adding __custom fences__, which can be used to
render [Mermaid.js][1] diagrams with zero effort:

``` yaml
markdown_extensions:
  - pymdownx.superfences:
      custom_fences:
        - name: mermaid
          class: mermaid
          format: !!python/name:pymdownx.superfences.fence_code_format
```

No further configuration is necessary. Material for MkDocs will automatically
load and initialize the [Mermaid.js][1] runtime when a page includes a [fenced
`mermaid` block][5]. Furthermore:

- [x] Works with [instant loading][6] without any additional effort
- [x] Diagrams automatically use fonts and colors defined in `mkdocs.yml`[^1]
- [x] Fonts and colors can be customized with [additional stylesheets][7]
- [x] Support for both, light and dark color schemes

_While it's also possible to integrate [Mermaid.js][1] using existing
third-party plugins[^2], the new native integration is recommended as it
ensures interoperability with all Material for MkDocs features._

  [^1]:
    While all [Mermaid.js][1] features should work out-of-the-box, Material for
    MkDocs will currently adjust the fonts and colors for flow charts, sequence
    diagrams, class diagams, state diagrams and entity relationship diagrams.

  [^2]:
    If you don't want to use the native integration, [mkdocs-mermaid2-plugin][8]
    might be a good alternative. However, note that this plugin cannot be used
    in conjunction with the [mkdocs-minify-plugin][9] and doesn't adapt to
    dark mode.

  [2]: ../insiders/index.md
  [3]: https://facelessuser.github.io/pymdown-extensions/extensions/superfences/
  [4]: https://facelessuser.github.io/pymdown-extensions/
  [5]: #usage
  [6]: ../setup/setting-up-navigation.md#instant-loading
  [7]: ../customization.md#additional-css
  [8]: https://github.com/fralau/mkdocs-mermaid2-plugin
  [9]: https://github.com/byrnereese/mkdocs-minify-plugin

## Usage

Mermaid diagrams are written as [code blocks][10] with the help of the
[SuperFences][11] extension. They must be enclosed with two separate lines
containing three backticks.

  [10]: code-blocks.md
  [11]: #superfences

### Using flowcharts

[Flowcharts][12] are diagrams that represent workflows or processes. The steps
are rendered as nodes of various kinds and are connected by edges, describing
the necessary order of steps.

_Example_:

```` markdown
``` mermaid
graph LR
  A[Start] --> B{Error?};
  B -->|Yes| C[Hmm...];
  C --> D[Debug];
  D --> B;
  B ---->|No| E[Yay!];
```
````

_Result_:

``` mermaid
graph LR
  A[Start] --> B{Error?};
  B -->|Yes| C[Hmm...];
  C --> D[Debug];
  D --> B;
  B ---->|No| E[Yay!];
```

  [12]: https://mermaid-js.github.io/mermaid/#/flowchart

### Using sequence diagrams

[Sequence diagrams][13] describe a specific scenario as sequential interactions 
between multiple objects or actors, including the messages that are exchanged
between those actors.

_Example_:

```` markdown
``` mermaid
sequenceDiagram
  Alice->>John: Hello John, how are you?
  loop Healthcheck
      John->>John: Fight against hypochondria
  end
  Note right of John: Rational thoughts!
  John-->>Alice: Great!
  John->>Bob: How about you?
  Bob-->>John: Jolly good!
```
````

_Result_:

``` mermaid
sequenceDiagram
  Alice->>John: Hello John, how are you?
  loop Healthcheck
      John->>John: Fight against hypochondria
  end
  Note right of John: Rational thoughts!
  John-->>Alice: Great!
  John->>Bob: How about you?
  Bob-->>John: Jolly good!
```

  [13]: https://mermaid-js.github.io/mermaid/#/sequenceDiagram

### Using state diagrams

[State diagrams][14] are a great tool to describe the behavior of a system,
decomposing it into a finite number of states, and transitions between those
states.

_Example_:

```` markdown
``` mermaid
stateDiagram-v2
  [*] --> Active

  state Active {
    [*] --> NumLockOff
    NumLockOff --> NumLockOn : EvNumLockPressed
    NumLockOn --> NumLockOff : EvNumLockPressed
    --
    [*] --> CapsLockOff
    CapsLockOff --> CapsLockOn : EvCapsLockPressed
    CapsLockOn --> CapsLockOff : EvCapsLockPressed
    --
    [*] --> ScrollLockOff
    ScrollLockOff --> ScrollLockOn : EvScrollLockPressed
    ScrollLockOn --> ScrollLockOff : EvScrollLockPressed
  }
```
````

_Result_:

``` mermaid
stateDiagram-v2
  [*] --> Active

  state Active {
    [*] --> NumLockOff
    NumLockOff --> NumLockOn : EvNumLockPressed
    NumLockOn --> NumLockOff : EvNumLockPressed
    --
    [*] --> CapsLockOff
    CapsLockOff --> CapsLockOn : EvCapsLockPressed
    CapsLockOn --> CapsLockOff : EvCapsLockPressed
    --
    [*] --> ScrollLockOff
    ScrollLockOff --> ScrollLockOn : EvScrollLockPressed
    ScrollLockOn --> ScrollLockOff : EvScrollLockPressed
  }
```

  [14]: https://mermaid-js.github.io/mermaid/#/stateDiagram

### Using class diagrams

[Class diagrams][15] are central to object oriented programing, describing the
structure of a system by modelling entities as classes and relationships between
them.

_Example_:

```` markdown
``` mermaid
classDiagram
  Person <|-- Student
  Person <|-- Professor
  Person : +String name
  Person : +String phoneNumber
  Person : +String emailAddress
  Person: +purchaseParkingPass()
  Address "1" <-- "0..1" Person:lives at
  class Student{
    +int studentNumber
    +int averageMark
    +isEligibleToEnrol()
    +getSeminarsTaken()
  }
  class Professor{
    +int salary
  }
  class Address{
    +String street
    +String city
    +String state
    +int postalCode
    +String country
    -validate()
    +outputAsLabel()  
  }
```
````

_Result_:

``` mermaid
classDiagram
  Person <|-- Student
  Person <|-- Professor
  Person : +String name
  Person : +String phoneNumber
  Person : +String emailAddress
  Person: +purchaseParkingPass()
  Address "1" <-- "0..1" Person:lives at
  class Student{
    +int studentNumber
    +int averageMark
    +isEligibleToEnrol()
    +getSeminarsTaken()
  }
  class Professor{
    +int salary
  }
  class Address{
    +String street
    +String city
    +String state
    +int postalCode
    +String country
    -validate()
    +outputAsLabel()  
  }
```

  [15]: https://mermaid-js.github.io/mermaid/#/classDiagram

### Using entity-relationship diagrams

An [entity-relationship diagram][16] is composed of entity types and specifies
relationships that exist between entities. It describes inter-related things in
a specific domain of knowledge.

_Example_:

```` markdown
``` mermaid
erDiagram
  CUSTOMER ||--o{ ORDER : places
  ORDER ||--|{ LINE-ITEM : contains
  CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
```
````

_Result_:

``` mermaid
erDiagram
  CUSTOMER ||--o{ ORDER : places
  ORDER ||--|{ LINE-ITEM : contains
  CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
```

  [16]: https://mermaid-js.github.io/mermaid/#/entityRelationshipDiagram
