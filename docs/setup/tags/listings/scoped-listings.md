
## Scoped listings

``` mermaid
flowchart

    classDef scope rx:10, ry:10, stroke:none
    classDef tagged stroke:#D500F9, fill:#D500F920

    S1:::scope
    S2:::scope

    R(Root)

    R -.-> P_1[["Page <sub>1</sub>\nListing → T<sub>A</sub>T<sub>B</sub>"]]
    R -.-> P_2[["Page <sub>2</sub>\nListing → T<sub>A</sub>T<sub>B</sub>"]]

    subgraph S2[" "]
        P_2 --> P_21("Page <sub>2.1</sub> ← T<sub>A</sub>"):::tagged
        P_2 --> P_22("Page <sub>2.2</sub> ← T<sub>B</sub>"):::tagged
        P_22 --> P_211("Page <sub>2.1.1</sub> ← T<sub>A</sub>T<sub>B</sub>"):::tagged
        P_22 --> P_212("Page <sub>2.1.2</sub>")
    end

    subgraph S1[" "]
        P_1 --> P_11("Page <sub>1.1</sub> ← T<sub>B</sub>"):::tagged
        P_1 --> P_12("Page <sub>1.2</sub>")
        P_11 --> P_111("Page <sub>1.1.1</sub> ← T<sub>A</sub>"):::tagged
        P_11 --> P_112("Page <sub>1.1.2</sub> ← T<sub>A</sub>T<sub>B</sub>"):::tagged
    end
```

``` mermaid
flowchart

    classDef scope rx:10, ry:10, stroke:none
    classDef tag stroke:#F50057, fill:#F5005720
    classDef tagged stroke:#D500F9, fill:#D500F920

    S1:::scope
    S2:::scope

    R(Root)

    R -.-> P_1
    R -.-> P_2

    subgraph S2[" "]
        direction TB

        P_2[["Page <sub>2</sub>\nListing → T<sub>A</sub>T<sub>B</sub>"]]

        P_2 --> T_2_A(["Tag → T<sub>A</sub>"]):::tag
        P_2 --> T_2_B(["Tag → T<sub>B</sub>"]):::tag

        T_2_A -..-> P_21("Page <sub>2.1</sub> ← T<sub>A</sub>"):::tagged
        T_2_A -...-> P_211("Page <sub>2.1.1</sub> ← T<sub>A</sub>T<sub>B</sub>"):::tagged

        T_2_B -..-> P_22("Page <sub>2.2</sub> ← T<sub>B</sub>"):::tagged
        T_2_B -...-> P_211
    end

    subgraph S1[" "]
        direction TB

        P_1[["Page <sub>1</sub>\nListing → T<sub>A</sub>T<sub>B</sub>"]]

        P_1 --> T_1_A(["Tag → T<sub>A</sub>"]):::tag
        P_1 --> T_1_B(["Tag → T<sub>B</sub>"]):::tag

        T_1_A -...-> P_111("Page <sub>1.1.1</sub> ← T<sub>A</sub>"):::tagged
        T_1_A -...-> P_112("Page <sub>1.1.2</sub> ← T<sub>A</sub>T<sub>B</sub>"):::tagged

        T_1_B -..-> P_11("Page <sub>1.1</sub> ← T<sub>B</sub>"):::tagged
        T_1_B -...-> P_112
    end
```

``` mermaid
flowchart

    classDef scope rx:10, ry:10, stroke:none
    classDef tagged stroke:#D500F9, fill:#D500F920

    S1:::scope
    S2:::scope

    R(Root)

    R -.-> P_1[["Page <sub>1</sub>\nListing → T<sub>A</sub>T<sub>B</sub>"]]

    subgraph S1[" "]
        P_1 --> P_11("Page <sub>1.1</sub> ← T<sub>B</sub>"):::tagged
        P_1 -..-> P_2[["Page <sub>2</sub>\nListing → T<sub>A</sub>T<sub>B</sub>"]]
        P_11 --> P_111("Page <sub>1.1.1</sub> ← T<sub>A</sub>"):::tagged
        P_11 --> P_112("Page <sub>1.1.2</sub> ← T<sub>A</sub>T<sub>B</sub>"):::tagged

        subgraph S2[" "]
            P_2 --> P_21("Page <sub>2.1</sub> ← T<sub>A</sub>"):::tagged
            P_2 --> P_22("Page <sub>2.2</sub> ← T<sub>B</sub>"):::tagged
            P_22 --> P_211("Page <sub>2.1.1</sub> ← T<sub>A</sub>T<sub>B</sub>"):::tagged
            P_22 --> P_212("Page <sub>2.1.2</sub>")
        end
    end
```

``` mermaid

```
