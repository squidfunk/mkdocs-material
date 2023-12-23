# Tag listings

## Concept

Structure

<figure markdown style="min-width:80%">

``` mermaid
flowchart
    classDef scope rx:10, ry:10, stroke:none
    classDef tagged stroke:#D500F9, fill:#D500F920

    R(Root)

    R -.-> P_1("Page <sub>1</sub>")
    R -.-> P_2("Page <sub>2</sub>")
    R -.-> P_3[["Page <sub>3</sub>\nListing → T<sub>A</sub>T<sub>B</sub>"]]

    P_2 --> P_21("Page <sub>2.1</sub> ← T<sub>A</sub>"):::tagged
    P_2 --> P_22("Page <sub>2.2</sub> ← T<sub>B</sub>"):::tagged
    P_22 --> P_211("Page <sub>2.1.1</sub> ← T<sub>A</sub>T<sub>B</sub>"):::tagged
    P_22 --> P_212("Page <sub>2.1.2</sub>")

    P_1 --> P_11("Page <sub>1.1</sub> ← T<sub>B</sub>"):::tagged
    P_1 --> P_12("Page <sub>1.2</sub>")
    P_11 --> P_111("Page <sub>1.1.1</sub> ← T<sub>A</sub>"):::tagged
    P_11 --> P_112("Page <sub>1.1.2</sub> ← T<sub>A</sub>T<sub>B</sub>"):::tagged
```

<figcaption>Caption</figcaption>

</figure>

Listing

<figure markdown style="min-width:80%">

``` mermaid
flowchart
    classDef tag stroke:#F50057, fill:#F5005720
    classDef tagged stroke:#D500F9, fill:#D500F920
    classDef hidden display: none;

    R(Root)

    R -.-> P_1("Page <sub>1</sub>")
    R -.-> P_2("Page <sub>2</sub>")
    R -.-> P_3[["Page <sub>3</sub>\nListing → T<sub>A</sub>T<sub>B</sub>"]]

    P_1-.->H_1:::hidden
    P_2-.->H_2:::hidden

    P_3 --> T_A(["Tag → T<sub>A</sub>"]):::tag
    P_3 --> T_B(["Tag → T<sub>B</sub>"]):::tag

    T_A -...-> P_111("Page <sub>1.1.1</sub> ← T<sub>A</sub>"):::tagged
    T_A -...-> P_112("Page <sub>1.1.2</sub> ← T<sub>A</sub>T<sub>B</sub>"):::tagged
    T_A -..-> P_21("Page <sub>2.1</sub> ← T<sub>A</sub>"):::tagged
    T_A -...-> P_211("Page <sub>2.1.1</sub> ← T<sub>A</sub>T<sub>B</sub>"):::tagged

    T_B -..-> P_11("Page <sub>1.1</sub> ← T<sub>B</sub>"):::tagged
    T_B -...-> P_112
    T_B -..-> P_22("Page <sub>2.2</sub> ← T<sub>B</sub>"):::tagged
    T_B -...-> P_211
```

<figcaption>Caption</figcaption>

</figure>
