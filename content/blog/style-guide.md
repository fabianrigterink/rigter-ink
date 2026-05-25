# rigter.ink — Blog Style Guide

Writing and formatting conventions for blog posts. The working examples are the
existing `.mdx` posts in this folder; this document distills the patterns they
share so future posts match without re-deriving them.

Companion doc: [`notebooks/figure-style-guide.md`](../../notebooks/figure-style-guide.md)
covers the charts. (This file is plain `.md`, so the blog loader — which only
picks up `*.mdx` — ignores it.)

---

## Frontmatter

Every post opens with YAML frontmatter:

```yaml
---
title: "How few clues does a Sudoku need? Searching for minimum-clue puzzles"
date: "2026-04-12"
description: "We use the Sudoku solver from the previous post to hunt for minimum-clue puzzles across different grid sizes — and bump into an open problem in mathematics."
tags: ["Optimization", "Sudoku", "Combinatorics"]
image: "https://res.cloudinary.com/dwp6mzleh/image/upload/v1779729005/blog-2_myv8oy.jpg"
---
```

| Field | Convention |
|---|---|
| `title` | Sentence case. See title patterns below. |
| `date` | ISO `YYYY-MM-DD`, quoted. |
| `description` | One to three sentences. **Must not be a verbatim copy of the opening paragraph** — it shows in listings and social cards, so make it stand on its own. |
| `tags` | Array of Title-Case topic strings. ~2–3 per post. |
| `image` | Cloudinary hero image (versioned URL, e.g. `.../upload/v17797.../blog-2_*.jpg`). |

### Title patterns

Titles use **sentence case** (capitalize only the first word and proper nouns)
and come in two shapes:

- **Rhetorical question + answer line** — capitalize the word after the `?`:
  *"Are employees happier at small companies? I checked 10 million Glassdoor
  reviews to find out"*
- **Main title: subtitle** — a colon, lowercase after it:
  *"Validating and solving Sudoku puzzles: using mathematical optimization"*

Use a colon (not an em-dash) for the subtitle form. Editing the title text does
not change the post's URL — the slug is the filename.

---

## Spelling & grammar

- **American English**, always: *favorite, modeling, generalize, optimization,
  center, analyze* (not *favourite, modelling, optimisation, centre, analyse*).
- **Oxford comma**: *rows, columns, and values.*
- *Math* (singular), not *maths*.

---

## Punctuation & typography

| Element | Convention | Example |
|---|---|---|
| Em-dash | Spaced, for asides and breaks | `properties — at times surprising — that…` |
| En-dash | Numeric ranges | `1–5 stars`, `1900–1930`, `digits 1–9` |
| Minus sign | Unicode `−` (U+2212) for negative numbers | `rho = −0.19`, `10⁻³²` |
| Multiplier | `×` (U+00D7), never the letter *x* | `10×`, `11.7×` |
| Quotes | Straight ASCII `"`/`'` (no curly quotes) | `"well-posed"` |
| Emphasis | Italics for key terms and stress | `a *feasibility problem*` |
| Percentages | `%` sign, no space | `73.7%` |
| Large numbers | Thousands separators | `2,946,918`, `35,526` |

Hyphens stay for compound modifiers (`17-clue puzzle`, `mid-sized`,
`50,000-person`) and don't get upgraded to en-dashes.

### Math

Use LaTeX (`$…$` inline, `$$…$$` display) for all mathematical notation,
including grid sizes in prose:

```text
a standard $9 \times 9$ grid … divided into $n \times n$ subgrids
```

Exception: **image `alt`/`title` text uses Unicode** (`9×9`, `4×4`) because
LaTeX won't render inside an attribute string.

---

## Structure

1. **Open with a short hook** — one or two sentences before the first heading
   that frame the journey, not a restatement of the description.
2. **Sections are `##`; subsections are `###`.** No `#` (the title comes from
   frontmatter) and no `####`. Headings are sentence case.
3. **Close with a footer**: a `---` rule, then a single *italicized* line
   linking to the code/notebook/data.

```markdown
---

*The full code is available as a [Colab notebook](https://colab.research.google.com/…).*
```

**Source formatting:** one paragraph per line (let it soft-wrap); don't break a
paragraph across multiple source lines. Leave a blank line before lists and
after headings.

---

## Voice & tone

- **First person.** Personal narrative and data investigations use *I* ("I
  grabbed the dataset"); step-by-step technical derivations use the inclusive
  *we* ("we'll model Sudoku as…", "we built a solver"). Pick the mode that fits
  the post and stay in it.
- **Conversational and curious.** Show the journey and the reasoning, not just
  the result.
- **Honest about limitations.** Name the caveats — the "catch," the noise, the
  gap between a heuristic and a proof. Don't oversell.
- **Evenhanded** on contested claims: give the data its due, then say what it
  *doesn't* support.
- Light, occasional emphasis (*italics*) for the one idea that matters in a
  sentence — not scattered bold.

---

## Links & citations

- Inline markdown links, pointing to **primary sources** — papers, Wikipedia,
  the actual dataset, the repo.
- **arXiv:** link the abstract page (`arxiv.org/abs/1201.0749`), not the PDF.
- **Academic papers:** spell out authors on first mention —
  *McGuire, Tugemann, and Civario (2012)* — then *McGuire et al.* afterward.
  Keep the year consistent across posts (use the arXiv/preprint year).
- Close every post by linking the code that produced it (Colab notebook or
  GitHub repo) in the italic footer.

---

## Numbers & units

- Spell out small counts in running prose (*three components, two puzzles*); use
  numerals for data, measurements, and anything ≥ 10 or technical (*17 clues,
  35,526 firms*).
- Statistics keep their sign and precision as reported (`Spearman rho = −0.19,
  p < 0.001`).

---

## Code blocks

Fence with an explicit language so highlighting is correct:

- ` ```python ` for code, ` ```json ` for data, ` ```yaml ` for frontmatter.
- ` ```text ` for solver output and ASCII grids (Sudoku boards, console dumps).

---

## Images & figures

- **Inline figures:** markdown images with **identical `alt` and `title`** text
  (a concise descriptive caption), served from Cloudinary with `q_auto/f_auto`
  transforms for automatic quality/format:

  ```markdown
  ![Princeton overtakes Göttingen, 1940s](https://res.cloudinary.com/…/q_auto/f_auto/…/40_….png "Princeton overtakes Göttingen, 1940s")
  ```

- **Large or interactive figures:** use an HTML `<figure>` with a
  `<figcaption>` and Tailwind classes (full-bleed width, lazy loading, a "open
  in a new window" link for embeds), as in the genealogy post's ancestry graph.
- Figure filenames follow the `NN_title-slug.png` scheme from the figure style
  guide — let `blogstyle.show()` generate them.

---

## Series & cross-linking

- When posts form a series, **say so** in the hook ("This is the second post in
  a short series on…") and link the sibling posts inline ("in the
  [previous post](…)" / "in the [next post](…)").
- Reuse consistent terminology across the series so a returning reader isn't
  re-taught the same concept under a new name.

---

## Pre-publish checklist

- [ ] Frontmatter complete; `description` ≠ the opening paragraph.
- [ ] Title in sentence case; colon (not em-dash) for any subtitle.
- [ ] American spelling throughout.
- [ ] Ranges use en-dashes; negatives use `−`; multipliers use `×`.
- [ ] Grid sizes / math in LaTeX (Unicode only inside image alt/title).
- [ ] Opens with a hook; sections are `##` / `###`.
- [ ] Ends with `---` + an italic link to the code/notebook/data.
- [ ] Primary-source links; arXiv `/abs/`; papers cited consistently.
- [ ] Inline images have matching `alt`/`title`; figures named `NN_slug.png`.
- [ ] Series posts are framed and cross-linked.
