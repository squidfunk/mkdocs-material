# Cappuccin Theme для MkDocs Material

## Опис

Cappuccin - це власна кольорова схема для MkDocs Material, яка базується на популярній темі [Catppuccin](https://catppuccin.com/). Тема містить дві варіанти:

- **Cappuccin Mocha** - темна схема з затишними, насиченими пастельними кольорами
- **Cappuccin Latte** - світла схема, яка гармонійно інвертує темну версію

## Використання

### Основна конфігурація

Додайте наступну конфігурацію до вашого `mkdocs.yml`:

```yaml
theme:
  name: material
  palette:
    # Темна тема Cappuccin Mocha
    - scheme: cappuccin-mocha
      toggle:
        icon: material/brightness-4
        name: Switch to light mode

    # Світла тема Cappuccin Latte
    - scheme: cappuccin-latte
      toggle:
        icon: material/brightness-7
        name: Switch to dark mode
```

### Тільки темна тема

```yaml
theme:
  name: material
  palette:
    scheme: cappuccin-mocha
```

### Тільки світла тема

```yaml
theme:
  name: material
  palette:
    scheme: cappuccin-latte
```

### З основним кольором

Ви також можете комбінувати схему Cappuccin з первинними та акцентними кольорами Material:

```yaml
theme:
  name: material
  palette:
    - scheme: cappuccin-mocha
      primary: indigo
      accent: blue
      toggle:
        icon: material/brightness-4
        name: Switch to light mode

    - scheme: cappuccin-latte
      primary: indigo
      accent: blue
      toggle:
        icon: material/brightness-7
        name: Switch to dark mode
```

## Кольорова палітра

### Cappuccin Mocha (Темна)

Базується на [Catppuccin Mocha](https://catppuccin.com/palette/) - найтемнішому варіанті Catppuccin:

- **Base (фон)**: `#1e1e2e`
- **Text (текст)**: `#cdd6f4`
- **Mantle**: `#181825`
- **Акцентні кольори**: Blue `#89b4fa`, Mauve `#cba6f7`, Pink `#f5c2e7`, Green `#a6e3a1`

### Cappuccin Latte (Світла)

Базується на [Catppuccin Latte](https://catppuccin.com/palette/) - світлому варіанті Catppuccin:

- **Base (фон)**: `#eff1f5`
- **Text (текст)**: `#4c4f69`
- **Mantle**: `#e6e9ef`
- **Акцентні кольори**: Blue `#1e66f5`, Mauve `#8839ef`, Pink `#ea76cb`, Green `#40a02b`

## Особливості

- Повна підтримка підсвічування синтаксису коду з кольорами Catppuccin
- Адаптовані кольори для всіх компонентів Material (таблиці, admonitions, кнопки тощо)
- Підтримка перемикання між світлою та темною темами
- Всі 26 кольорів Catppuccin доступні як CSS-змінні

## Доступні CSS-змінні

Всі кольори Catppuccin доступні як CSS-змінні:

```css
--catppuccin-rosewater
--catppuccin-flamingo
--catppuccin-pink
--catppuccin-mauve
--catppuccin-red
--catppuccin-maroon
--catppuccin-peach
--catppuccin-yellow
--catppuccin-green
--catppuccin-teal
--catppuccin-sky
--catppuccin-sapphire
--catppuccin-blue
--catppuccin-lavender
--catppuccin-text
--catppuccin-subtext1
--catppuccin-subtext0
--catppuccin-overlay2
--catppuccin-overlay1
--catppuccin-overlay0
--catppuccin-surface2
--catppuccin-surface1
--catppuccin-surface0
--catppuccin-base
--catppuccin-mantle
--catppuccin-crust
```

Ви можете використовувати ці змінні у власних CSS-файлах для кастомізації:

```css
.custom-element {
  background-color: var(--catppuccin-mauve);
  color: var(--catppuccin-text);
}
```

## Ліцензія

Ця тема використовує кольорову схему [Catppuccin](https://github.com/catppuccin/catppuccin), яка ліцензована під MIT License.

## Посилання

- [Catppuccin Official Website](https://catppuccin.com/)
- [Catppuccin Palette](https://catppuccin.com/palette/)
- [Catppuccin GitHub](https://github.com/catppuccin/catppuccin)
