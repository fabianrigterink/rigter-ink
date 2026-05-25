"""rigter.ink — shared figure styling for the blog-post notebooks.

This is the single source of truth for the look-and-feel of every figure on
the rigter.ink blog. It lives in the (public) blog repo and is pulled into each
analysis notebook — wherever it runs (Google Colab, GitHub, local) — via a
short bootstrap placed at the top of the notebook:

    # --- rigter.ink shared figure style -----------------------------------
    import os, urllib.request
    if not os.path.exists("blogstyle.py"):
        urllib.request.urlretrieve(
            "https://raw.githubusercontent.com/fabianrigterink/rigter-ink/"
            "main/notebooks/blogstyle.py",
            "blogstyle.py",
        )
    import blogstyle
    blogstyle.use()
    # ----------------------------------------------------------------------

Edit this one file and every notebook restyles on its next run. The palette and
typography mirror ``src/app/globals.css`` so figures sit naturally inside the
site.

Quick reference
---------------
    blogstyle.use()                         # apply the whole theme
    blogstyle.TEAL / .MAGENTA / .INDIGO …   # brand colors
    blogstyle.PALETTE                       # the categorical cycle
    blogstyle.SEQ / .DIVERGING              # brand colormaps (heatmaps)
    blogstyle.title(ax, "Title", "subtitle")
    blogstyle.era_band(ax, 1939, 1945, "WWII")
    blogstyle.pct(ax); blogstyle.thousands(ax, "x")
    blogstyle.save(fig, "my_figure")        # -> figures/my_figure.png @ 200 dpi

Author: Fabian Rigterink (style module generated for figure standardization)
"""
from __future__ import annotations

import tempfile
import urllib.request
from pathlib import Path

import matplotlib as mpl
import matplotlib.pyplot as plt
import matplotlib.ticker as mticker
from cycler import cycler
from matplotlib.colors import LinearSegmentedColormap

# ---------------------------------------------------------------------------
# Brand tokens — kept in sync with rigter-ink/src/app/globals.css
# ---------------------------------------------------------------------------

# Ink / neutrals
INK = "#1a1a1a"          # --color-ink (titles, primary text)
INK_LIGHT = "#484848"    # --color-ink-light (axis labels)
INK_MUTED = "#767676"    # --color-ink-muted (ticks, subtitles, captions)
SURFACE = "#ffffff"      # --color-surface (figure / axes background)
SURFACE_ALT = "#f0ece6"  # --color-surface-alt (warm fill)
BORDER = "#e6e1d9"       # --color-border (gridlines, spines)

# Accent palette (the discoverlosangeles gradient + the muted-teal link color)
TEAL = "#2A6F7E"         # --color-link — primary accent / default single series
TEAL_BRIGHT = "#00BAAC"  # --color-teal
MAGENTA = "#FF3F86"      # --color-magenta
INDIGO = "#7281C2"       # --color-indigo
PEACH = "#FFA175"        # --color-peach

# Ordered categorical cycle used for multi-series charts.
PALETTE = [TEAL, MAGENTA, INDIGO, PEACH, TEAL_BRIGHT, INK_LIGHT]

# Semantic roles — use these so intent stays consistent across notebooks.
PRIMARY = TEAL           # the main / default series
SECONDARY = MAGENTA      # the comparison series
TERTIARY = INDIGO
HIGHLIGHT = MAGENTA      # reference lines, medians, annotations, "the point"
GRID = BORDER

# ---------------------------------------------------------------------------
# Brand colormaps for heatmaps / shaded plots
# ---------------------------------------------------------------------------

# Sequential: light warm surface -> teal -> deep teal. Use for magnitudes /
# probabilities (replaces "rocket_r", "Blues", etc.).
SEQ = LinearSegmentedColormap.from_list(
    "rink_seq", [SURFACE_ALT, TEAL_BRIGHT, TEAL, "#123038"], N=256
)

# Diverging: magenta (low) -> light -> teal (high). Use where a midpoint is
# meaningful, e.g. ratings above/below average (replaces "RdYlGn").
DIVERGING = LinearSegmentedColormap.from_list(
    "rink_div", [MAGENTA, "#f3d9c6", SURFACE_ALT, "#bfe3df", TEAL], N=256
)

for _cm in (SEQ, DIVERGING):
    try:
        mpl.colormaps.register(_cm, force=True)
    except Exception:
        pass

# ---------------------------------------------------------------------------
# Inter font — fetched on demand so figures match the site typography
# ---------------------------------------------------------------------------

_FONT_URLS = {
    400: "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.ttf",
    500: "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-500-normal.ttf",
    600: "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-600-normal.ttf",
    700: "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.ttf",
}

_FONT_FAMILY = "DejaVu Sans"  # safe default; upgraded to "Inter" if available


def _install_inter() -> bool:
    """Download + register Inter (several weights). Returns True on success.

    Silent + best-effort: if there's no network (or the CDN is down) we simply
    fall back to the default sans-serif so a figure still renders.
    """
    import matplotlib.font_manager as fm

    cache = Path(tempfile.gettempdir()) / "rink_fonts"
    cache.mkdir(exist_ok=True)
    installed = 0
    for weight, url in _FONT_URLS.items():
        dest = cache / f"Inter-{weight}.ttf"
        if not dest.exists():
            try:
                urllib.request.urlretrieve(url, dest)
            except Exception:
                continue
        try:
            fm.fontManager.addfont(str(dest))
            installed += 1
        except Exception:
            pass
    return installed > 0


# ---------------------------------------------------------------------------
# The theme
# ---------------------------------------------------------------------------

def use(font: bool = True, dpi: int = 200, grid: bool = True) -> None:
    """Apply the rigter.ink figure theme. Call once near the top of a notebook.

    Parameters
    ----------
    font : download + use Inter (matches the site). Falls back gracefully.
    dpi  : export resolution. 200 stays crisp in the blog's click-to-zoom view.
    grid : draw a light horizontal grid (good for bar/line charts).
    """
    global _FONT_FAMILY
    if font and _install_inter():
        _FONT_FAMILY = "Inter"

    # font.family must be a *list of real family names* for matplotlib's
    # per-glyph fallback to engage: Inter for the body text, DejaVu Sans for the
    # glyphs Inter's web subset lacks (Greek α, arrows →, ≥, macron/dotted
    # Latin like al-Ṭūsī). Setting family to the generic "sans-serif" picks a
    # single font and silently drops to tofu boxes for those glyphs.
    family = [_FONT_FAMILY]
    if "DejaVu Sans" not in family:
        family.append("DejaVu Sans")

    rc = {
        # canvas — white to match the site surface
        "figure.figsize": (9, 5.5),
        "figure.dpi": 110,
        "figure.facecolor": SURFACE,
        "axes.facecolor": SURFACE,
        "savefig.dpi": dpi,
        "savefig.facecolor": SURFACE,
        "savefig.bbox": "tight",
        "savefig.pad_inches": 0.25,
        # typography
        "font.family": family,
        "font.sans-serif": ["Inter", "Helvetica Neue", "Arial", "DejaVu Sans"],
        "font.size": 12,
        "text.color": INK,
        # title — editorial, left-aligned, semibold
        "axes.titlesize": 15,
        "axes.titleweight": "semibold",
        "axes.titlecolor": INK,
        "axes.titlelocation": "left",
        "axes.titlepad": 12,
        "figure.titlesize": 16,
        "figure.titleweight": "semibold",
        # axis labels + ticks
        "axes.labelsize": 12,
        "axes.labelcolor": INK_LIGHT,
        "axes.labelweight": "medium",
        "xtick.labelsize": 10.5,
        "ytick.labelsize": 10.5,
        "xtick.color": INK_MUTED,
        "ytick.color": INK_MUTED,
        "xtick.labelcolor": INK_LIGHT,
        "ytick.labelcolor": INK_LIGHT,
        # spines — keep only left + bottom, in a soft border tone
        "axes.edgecolor": INK_MUTED,
        "axes.linewidth": 1.0,
        "axes.spines.top": False,
        "axes.spines.right": False,
        # grid — light, horizontal by default
        "axes.grid": grid,
        "axes.grid.axis": "y",
        "axes.axisbelow": True,
        "grid.color": BORDER,
        "grid.linewidth": 0.9,
        "grid.alpha": 1.0,
        # color cycle
        "axes.prop_cycle": cycler(color=PALETTE),
        "image.cmap": SEQ.name,
        # legend — frameless, unobtrusive
        "legend.frameon": False,
        "legend.fontsize": 10.5,
        "legend.title_fontsize": 11,
        # lines / markers
        "lines.linewidth": 2.0,
        "lines.markersize": 6,
        "lines.solid_capstyle": "round",
        "patch.edgecolor": SURFACE,
        "patch.linewidth": 0.6,
    }
    mpl.rcParams.update(rc)

    # Keep seaborn (used by the notebooks) in lock-step with the cycle.
    try:
        import seaborn as sns

        sns.set_palette(PALETTE)
    except Exception:
        pass


# ---------------------------------------------------------------------------
# Helpers — small, optional conveniences that keep figures consistent
# ---------------------------------------------------------------------------

def palette(n: int | None = None):
    """Return the categorical palette (optionally the first ``n`` colors)."""
    return PALETTE if n is None else [PALETTE[i % len(PALETTE)] for i in range(n)]


def title(ax, text: str, subtitle: str | None = None) -> None:
    """Set an editorial left-aligned title, with an optional muted subtitle.

    The subtitle sits in a lighter ink just under the title — handy for the
    "what am I looking at" line that often ends up in a blog caption.
    """
    if not subtitle:
        ax.set_title(text)
        return
    ax.set_title("")  # clear any default title
    ax.annotate(text, xy=(0, 1), xytext=(0, 22), xycoords="axes fraction",
                textcoords="offset points", ha="left", va="bottom",
                fontsize=15, fontweight="semibold", color=INK,
                annotation_clip=False)
    ax.annotate(subtitle, xy=(0, 1), xytext=(0, 6), xycoords="axes fraction",
                textcoords="offset points", ha="left", va="bottom",
                fontsize=11, color=INK_MUTED, annotation_clip=False)


def despine(ax, left: bool = False, bottom: bool = False) -> None:
    """Remove spines. Top/right go by default; pass left/bottom to drop those."""
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    if left:
        ax.spines["left"].set_visible(False)
    if bottom:
        ax.spines["bottom"].set_visible(False)


def era_band(ax, start, end, label: str | None = None, color: str = MAGENTA,
             alpha: float = 0.10) -> None:
    """Shade a time span (e.g. a war / disruption) with an optional label."""
    ax.axvspan(start, end, color=color, alpha=alpha, linewidth=0, zorder=0)
    if label:
        ax.annotate(label, xy=((start + end) / 2, 1), xycoords=("data", "axes fraction"),
                    xytext=(0, 2), textcoords="offset points", ha="center", va="bottom",
                    fontsize=8, color=INK_MUTED, annotation_clip=False)


def pct(ax, axis: str = "y", decimals: int = 0, xmax: float = 100) -> None:
    """Format an axis as percentages. ``xmax=100`` for 0-100 data, ``1`` for 0-1."""
    fmt = mticker.PercentFormatter(xmax=xmax, decimals=decimals)
    (ax.yaxis if axis == "y" else ax.xaxis).set_major_formatter(fmt)


def thousands(ax, axis: str = "y") -> None:
    """Format an axis with thousands separators (1,234)."""
    fmt = mticker.FuncFormatter(lambda v, _: f"{v:,.0f}")
    (ax.yaxis if axis == "y" else ax.xaxis).set_major_formatter(fmt)


def save(fig, name: str, outdir: str = "figures", formats=("png",),
         dpi: int | None = None, transparent: bool = False):
    """Save ``fig`` as ``outdir/name.<fmt>`` with consistent export settings."""
    out = Path(outdir)
    out.mkdir(parents=True, exist_ok=True)
    paths = []
    for fmt in formats:
        p = out / f"{name}.{fmt}"
        fig.savefig(
            p,
            dpi=dpi or mpl.rcParams["savefig.dpi"],
            bbox_inches="tight",
            facecolor="none" if transparent else SURFACE,
            transparent=transparent,
        )
        paths.append(p)
        print(f"  wrote {p}")
    return paths


__all__ = [
    "use", "palette", "title", "despine", "era_band", "pct", "thousands", "save",
    "PALETTE", "SEQ", "DIVERGING",
    "INK", "INK_LIGHT", "INK_MUTED", "SURFACE", "SURFACE_ALT", "BORDER",
    "TEAL", "TEAL_BRIGHT", "MAGENTA", "INDIGO", "PEACH",
    "PRIMARY", "SECONDARY", "TERTIARY", "HIGHLIGHT", "GRID",
]
