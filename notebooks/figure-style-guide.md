# rigter.ink — Figure Style Guide

Conventions for every chart that appears on the blog. The machine-readable
source of truth is [`blogstyle.py`](./blogstyle.py); this document is the
human-readable companion. The palette and typography mirror
`src/app/globals.css`, so figures sit naturally inside the site.

When the two ever disagree, **`blogstyle.py` wins** — update it first, then sync
this guide.

---

## Quick start

Drop this bootstrap at the top of every analysis notebook (Colab, GitHub, or
local). It pulls the latest style module and applies the theme, so editing one
file restyles every notebook on its next run:

```python
# --- rigter.ink shared figure style -----------------------------------
import importlib, urllib.request
try:
    urllib.request.urlretrieve(
        "https://raw.githubusercontent.com/fabianrigterink/rigter-ink/"
        "main/notebooks/blogstyle.py",
        "blogstyle.py",
    )
except Exception:
    pass  # offline — fall back to an existing local copy
import blogstyle
importlib.reload(blogstyle)
blogstyle.use()
# ----------------------------------------------------------------------
```

`blogstyle.use(font=True, dpi=300, grid=True)` applies the whole theme. Call it
once, near the top, before plotting.

---

## Colors

All values are kept in sync with the CSS custom properties in
`src/app/globals.css`.

### Neutrals / ink

| Token | Hex | CSS variable | Used for |
|---|---|---|---|
| `INK` | `#1a1a1a` | `--color-ink` | Titles, primary text |
| `INK_LIGHT` | `#484848` | `--color-ink-light` | Axis labels |
| `INK_MUTED` | `#767676` | `--color-ink-muted` | Ticks, subtitles, captions |
| `SURFACE` | `#ffffff` | `--color-surface` | Figure & axes background |
| `SURFACE_ALT` | `#f0ece6` | `--color-surface-alt` | Warm fill |
| `BORDER` | `#e6e1d9` | `--color-border` | Gridlines, spines |

### Accents

| Token | Hex | CSS variable | Notes |
|---|---|---|---|
| `TEAL` | `#2A6F7E` | `--color-link` | Primary accent / default single series |
| `TEAL_BRIGHT` | `#00BAAC` | `--color-teal` | Brighter teal (end of sequential ramp) |
| `MAGENTA` | `#FF3F86` | `--color-magenta` | Comparison series, highlights, era bands |
| `INDIGO` | `#7281C2` | `--color-indigo` | Third series |
| `PEACH` | `#FFA175` | `--color-peach` | Fourth series |

> Note the naming bridge: `blogstyle.TEAL` is the site's **link** color
> (`#2A6F7E`), while `blogstyle.TEAL_BRIGHT` is the site's **teal**
> (`#00BAAC`).

### Categorical cycle

Multi-series charts cycle through this order automatically (it is set as
matplotlib's `axes.prop_cycle`):

```
PALETTE = [TEAL, MAGENTA, INDIGO, PEACH, TEAL_BRIGHT, INK_LIGHT]
```

Use `blogstyle.palette(n)` to grab the first `n` colors explicitly.

### Semantic roles

Prefer these names over raw colors so intent stays consistent across notebooks:

| Role | Color | Use for |
|---|---|---|
| `PRIMARY` | `TEAL` | The main / default series |
| `SECONDARY` | `MAGENTA` | The comparison series |
| `TERTIARY` | `INDIGO` | A third series |
| `HIGHLIGHT` | `MAGENTA` | Reference lines, medians, annotations — "the point" of the chart |
| `GRID` | `BORDER` | Gridlines |

Magenta is the blog's "look here" color — it marks the LOWESS trend line, era
bands, and any annotation the reader's eye should land on.

---

## Colormaps

Two brand colormaps replace matplotlib/seaborn defaults. `SEQ` is registered as
the default `image.cmap`.

| Name | Ramp | Use for | Replaces |
|---|---|---|---|
| `SEQ` (`rink_seq`) | warm surface → bright teal → deep teal → near-black | Magnitudes / probabilities (heatmaps, density) | `rocket_r`, `Blues` |
| `DIVERGING` (`rink_div`) | magenta → light → teal | Values around a meaningful midpoint (e.g. above/below average) | `RdYlGn` |

```python
ax.imshow(matrix, cmap=blogstyle.SEQ)      # probabilities, counts
ax.imshow(matrix, cmap=blogstyle.DIVERGING, vmin=-1, vmax=1)  # signed / centered
```

---

## Typography

- **Font:** Inter (downloaded on demand to match the site), with **DejaVu Sans**
  as a per-glyph fallback. The family is set as a *list* (`["Inter", "DejaVu
  Sans"]`) on purpose — Inter's web subset lacks some glyphs (Greek α, arrows →,
  ≥, macron/dotted Latin like *al-Ṭūsī*), and the list lets matplotlib fall back
  glyph-by-glyph instead of dropping to tofu boxes. If the font can't be fetched
  (offline), it falls back to the default sans-serif gracefully.
- **Base size:** 12 pt.
- **Titles:** 15 pt, semibold, **left-aligned**, `INK`, with 12 pt of pad. This
  editorial left-aligned title is the signature of the style. Figure-level
  suptitles are 16 pt semibold.
- **Axis labels:** 12 pt, medium weight, `INK_LIGHT`.
- **Tick labels:** 10.5 pt — tick marks in `INK_MUTED`, tick *labels* in
  `INK_LIGHT`.
- **Legend:** 10.5 pt, **frameless**.

Use the `title()` helper for the title + optional muted subtitle pattern (see
below) rather than `ax.set_title()` directly.

---

## Canvas & axes

| Setting | Value |
|---|---|
| Figure size | `9 × 5.5` in |
| Screen DPI | 110 |
| Export DPI | 300 |
| Background | white (`SURFACE`) — figure and axes |
| Spines | **top & right hidden**; left & bottom in `INK_MUTED`, 1.0 pt |
| Grid | on by default, **horizontal (y-axis) only**, `BORDER`, 0.9 pt, drawn *below* data |
| Lines | 2.0 pt, round caps |
| Markers | 6 pt |
| Patches | thin (`0.6` pt) `SURFACE`-colored edge — gives bars/wedges a clean separating hairline |

---

## Helpers

All optional, all aimed at keeping figures consistent. Import-free — call them
as `blogstyle.<name>`.

| Helper | What it does |
|---|---|
| `use(font=True, dpi=300, grid=True)` | Apply the full theme. Call once per notebook. |
| `palette(n=None)` | The categorical palette, or its first `n` colors. |
| `title(ax, text, subtitle=None)` | Editorial left-aligned title with an optional muted subtitle just beneath. Also records the title for auto file-naming. |
| `despine(ax, left=False, bottom=False)` | Remove spines (top/right always; pass flags to drop left/bottom too). |
| `era_band(ax, start, end, label=None, color=MAGENTA, alpha=0.10)` | Shade a time span (a war, a disruption) with an optional centered label. |
| `pct(ax, axis="y", decimals=0, xmax=100)` | Format an axis as percentages. Use `xmax=1` for 0–1 data, `xmax=100` for 0–100. |
| `thousands(ax, axis="y")` | Thousands separators (`1,234`). |
| `save(fig, name, outdir="figures", formats=("png",))` | Save with consistent export settings (300 dpi, tight bbox, white background). |
| `show(fig=None, title=None, index=None, ...)` | Drop-in for `plt.show()` that *also* saves the figure with an auto-incrementing, title-derived filename. |

### Title + subtitle pattern

```python
fig, ax = plt.subplots()
# ... plot ...
blogstyle.title(ax, "Princeton overtakes Göttingen",
                "Math PhD output by decade, 1900–1960")
blogstyle.show(ax.figure)
```

---

## Exporting figures

- **Format:** PNG at **300 dpi**, white background, tight bounding box
  (`pad_inches=0.25`).
- **Location:** a `figures/` directory next to the notebook.
- **Naming:** `show()` writes `NN_<title-slug>.png`, where `NN` is an
  auto-incrementing two-digit index (reset each time `use()` runs, so a clean
  top-to-bottom run numbers figures `01, 02, 03, …`) and the slug is the title,
  ASCII-folded, lowercased, with non-alphanumerics collapsed to underscores
  (max 60 chars).

This is why the blog's image filenames look like
`02_average_employee_rating_by_company_size.png` and
`41_mathematical_broadness_over_time_coverage_of_moderns_by_sing.png` — pin a
figure's number with `index=` if you reorder a notebook and want the filenames
to stay put.

```python
blogstyle.show(fig, title="Average employee rating by company size")
# -> figures/02_average_employee_rating_by_company_size.png
```

---

## Principles (the short version)

- **Teal is the default; magenta is the highlight.** A single-series chart is
  teal. The thing you want noticed — a trend line, a median, a shaded era, an
  annotation — is magenta.
- **Editorial, left-aligned titles**, with the "what am I looking at" line as a
  muted subtitle rather than buried in a caption.
- **Less chrome.** No top/right spines, horizontal gridlines only, frameless
  legends, data drawn above the grid.
- **White background**, matching the site surface, so figures drop into a post
  seamlessly.
- **Name colors by role, not by hex.** Reach for `PRIMARY` / `HIGHLIGHT` /
  `SECONDARY` so a future palette tweak propagates everywhere.
- **300 dpi PNGs** with consistent, indexed, title-derived filenames.
- **One source of truth.** Change `blogstyle.py`; never hand-tune rcParams in a
  notebook.
