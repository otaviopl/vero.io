---
name: Vero.io
description: Operating system for B2B outbound — hunting, enrichment, and CRM sync in a single data pipeline
colors:
  signal-purple: "#8A5CF5"
  signal-purple-light: "#A78BFA"
  signal-purple-dim: "#4C1D95"
  void-bg: "#0B0E14"
  void-surface: "#0F1318"
  void-card: "#141920"
  void-card-hover: "#1A2030"
  void-border: "#1E2535"
  void-border-subtle: "#252D3D"
  pipeline-green: "#10B981"
  pipeline-green-dim: "#064E3B"
  alert-amber: "#F59E0B"
  alert-amber-dim: "#451A03"
  alert-red: "#EF4444"
  alert-red-dim: "#450A0A"
  text-primary: "#E2E8F0"
  text-muted: "#8892A4"
  text-subtle: "#4A5568"
typography:
  display:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(3rem, 7vw, 3.875rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2rem, 4vw, 2.375rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    letterSpacing: "0.15em"
  data:
    fontFamily: "ui-monospace, 'SF Mono', monospace"
    fontSize: "0.625rem"
    fontWeight: 600
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.signal-purple}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: "14px 24px"
  button-primary-hover:
    backgroundColor: "{colors.signal-purple-light}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.md}"
    padding: "14px 24px"
  button-ghost-hover:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
  card-default:
    backgroundColor: "{colors.void-card}"
    rounded: "{rounded.md}"
  card-featured:
    backgroundColor: "{colors.void-card}"
    rounded: "{rounded.md}"
  nav-item:
    backgroundColor: "transparent"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.sm}"
    padding: "10px 12px"
  nav-item-active:
    backgroundColor: "#8A5CF510"
    textColor: "{colors.signal-purple-light}"
    rounded: "{rounded.sm}"
    padding: "10px 12px"
  chip:
    backgroundColor: "#FFFFFF08"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.full}"
    padding: "6px 12px"
---

# Design System: Vero.io

## 1. Overview

**Creative North Star: "The Operations Center"**

Vero.io is built for commercial operators who move fast and need the full picture at a glance. The interface does not explain itself; it performs. Every screen is a live readout: data that moves, statuses that update, pipeline that runs. The visual language comes from command-and-control environments — deep-void backgrounds that make colored signals impossible to miss, a single violet accent that marks every actionable moment, and a typographic system that sorts information by urgency rather than by aesthetics.

The system is dark because the work happens in sessions, not glances. An SDR opening the Contact Manager at 9am expects a surface that reduces eye strain across a full workday, not a light canvas that shouts. The darkness is purposeful: it makes `#10B981` pipeline-green and `#8A5CF5` signal-purple land with precision. Neither color would carry the same weight on a light background.

This system explicitly rejects generic SaaS neutrality — Notion-cream backgrounds, Linear-style minimalism that is indistinguishable from 200 other B2B tools, and the overdesigned startup aesthetic (neon glow, decorative glassmorphism, gradient text everywhere). It also rejects enterprise-gray weightiness. Vero should be immediately identifiable: a screenshot of any screen reads as Vero, not as "a B2B SaaS."

**Key Characteristics:**
- Deep-void dark theme: `#0B0E14` base, tonal surface layers rising to `#141920`
- Signal Purple (`#8A5CF5`) as the single accent: active states, primary CTAs, the brand mark itself
- Status colors carry semantic weight: pipeline-green for valid/enriched, amber for threshold warnings, red for critical
- Inter at extreme weights (800 extrabold for headings, 400 for body, 600 for labels)
- Monospace data values: numbers and codes always `ui-monospace` — they are data, not prose
- Glow shadows on accent elements only; surfaces are flat at rest
- Label text in uppercase with wide tracking (0.15em) as the wayfinding layer

## 2. Colors: The Void-and-Signal Palette

Three functional families: Void (background and structure), Signal (brand and interactivity), Pipeline (status and data validity). Each family has a primary, a lighter hover/highlight variant, and a dim dark variant for tinted backgrounds.

### Primary

- **Signal Purple** (`#8A5CF5`): The brand's one voice. Used on primary CTAs, active navigation states, the logo mark, progress fill on Vero tokens, and any interactive element the user should act on next. Its rarity is deliberate — it points.
- **Signal Purple Light** (`#A78BFA`): Hover state for Signal Purple surfaces. Also the text color for active nav items and secondary labels under accent context.
- **Signal Purple Dim** (`#4C1D95`): Tinted background for gradient banners and ambient glow layers. Never a surface color on its own.

### Secondary

- **Pipeline Green** (`#10B981`): Valid data, successful enrichment, positive sync status, live feed indicators. It means "this data is good and it moved."
- **Pipeline Green Dim** (`#064E3B`): Background tint for success states (banners, dim badges). Pairs with Pipeline Green text.
- **Alert Amber** (`#F59E0B`): Threshold warnings, webhook-pending indicators, mid-range credit consumption. It means "pay attention."
- **Alert Amber Dim** (`#451A03`): Background tint for warning banners.

### Tertiary

- **Alert Red** (`#EF4444`): Critical credit exhaustion, failed sync, destructive action confirmation.
- **Alert Red Dim** (`#450A0A`): Background tint for error states.

### Neutral

- **Void BG** (`#0B0E14`): The absolute base. Page background, scrollbar track.
- **Void Surface** (`#0F1318`): Sidebar and persistent navigation layer. One step lighter than the base.
- **Void Card** (`#141920`): Cards, panels, and contained UI regions. The primary "above ground" surface.
- **Void Card Hover** (`#1A2030`): Hover state for interactive card surfaces.
- **Void Border** (`#1E2535`): Primary structural borders between surfaces.
- **Void Border Subtle** (`#252D3D`): Lighter dividers within the same surface layer.
- **Text Primary** (`#E2E8F0`): Body text, headings, labels that need full legibility.
- **Text Muted** (`#8892A4`): Secondary labels, nav items at rest, field hints.
- **Text Subtle** (`#4A5568`): Tertiary text — timestamps, metadata, placeholder captions.

### Named Rules

**The One Signal Rule.** Signal Purple (`#8A5CF5`) appears on at most one primary action per screen. If everything is purple, nothing signals. Use it on the single most important interactive element in any given view; let everything else recede.

**The Semantic Triad Rule.** Green means valid or enriched. Amber means threshold or pending. Red means critical or failed. These three colors carry data meaning, not decoration. Never use them for visual interest alone.

## 3. Typography

**Display Font:** Inter (system-ui, -apple-system, sans-serif)
**Body Font:** Inter (same stack)
**Data/Mono Font:** ui-monospace, SF Mono, monospace

**Character:** A single-family system with authority at the extremes. Inter at 800 extrabold creates display headlines that feel structural rather than stylistic. At 400, the same font disappears into prose. The type system is not about elegance — it is about hierarchy. Numbers break out of prose into monospace because they are a different kind of content.

### Hierarchy

- **Display** (800, clamp(3rem → 3.875rem), line-height 1.05, letter-spacing -0.02em): Landing page hero and section anchors only. Tight and compressed — this type takes up space because it has earned it.
- **Headline** (800, clamp(2rem → 2.375rem), line-height 1.1, letter-spacing -0.015em): Section headings, pricing tier names, modal titles.
- **Title** (600, 0.9375rem / 15px, line-height 1.4): Card headings, panel section labels, sidebar section titles.
- **Body** (400, 1rem / 16px, line-height 1.8): Descriptive text, feature explanations, plan descriptions. Max line length: 65ch.
- **Label** (600, 0.6875rem / 11px, letter-spacing 0.15em, uppercase): Category labels, section identifiers, "Créditos Apollo.io" in the sidebar. The wayfinding layer — these are signs, not sentences.
- **Data** (mono, 600, 0.625–0.8125rem): All numeric values in data contexts: credit counts, percentages, contact counts, HubSpot IDs. Monospace ensures vertical alignment in lists and tables.

### Named Rules

**The Weight-or-Size Rule.** Hierarchy is expressed through either weight or size — not both simultaneously and not color alone. A label does not need to be bold AND large AND purple. Pick one axis per level and commit.

**The Mono Data Rule.** Any value that is a count, identifier, percentage, or timestamp is monospace. Body text that contains an inline number is the one exception; inline numbers flow with prose. Numbers in cells, badges, progress labels: always mono.

## 4. Elevation

This system uses tonal layering as its primary depth mechanism, not shadows. Three opaque surface steps create the spatial hierarchy: Void BG (`#0B0E14`) as ground, Void Surface (`#0F1318`) as the persistent navigation plane, and Void Card (`#141920`) as interactive content regions. The steps are close in value — the separation is readable but not dramatic.

Glow shadows appear exclusively on accent-colored elements and interactive states. They are not structural; they are signals. A button that glows is asking to be clicked. A card that glows at rest is confused about its purpose.

### Shadow Vocabulary

- **Accent Glow** (`box-shadow: 0 0 20px rgba(138,92,245,0.35), 0 0 60px rgba(138,92,245,0.15)`): Primary CTA buttons and the logo mark. The outer ring diffuses to near-invisible; only the inner 20px reads clearly.
- **Accent Glow SM** (`box-shadow: 0 0 12px rgba(138,92,245,0.4)`): Icon containers in the sidebar, small accent badges.
- **Pipeline Glow** (`box-shadow: 0 0 12px rgba(16,185,129,0.35)`): Live status indicators, valid-data markers.
- **Featured Ambient** (`box-shadow: 0 0 40px rgba(138,92,245,0.15)`): The featured pricing card's outer ambient. Barely perceptible — it distinguishes without announcing.

### Named Rules

**The Flat-at-Rest Rule.** Surfaces are flat. Glow appears only in response to interaction state (hover, active) or semantic emphasis (live indicator, primary CTA). A card that glows at rest has lost its signal value. Glow is scarce because it is meaningful.

## 5. Components

### Buttons

Tactile and immediate: state changes are instant, hover feedback is visible without being theatrical.

- **Shape:** Gently curved (12px radius). Not pill-shaped, not squared. Medium rounding reads as purposeful rather than friendly or harsh.
- **Primary:** Signal Purple (`#8A5CF5`) fill, white text, 14px 24px padding, 14px font-weight 600. Accent Glow on rest and hover. On hover: background shifts to Signal Purple Light (`#A78BFA`), glow intensity unchanged.
- **Secondary / Ghost:** Transparent background, 1px border at `rgba(255,255,255,0.10)`, Text Muted (`#8892A4`). On hover: border lifts to `rgba(255,255,255,0.20)`, text shifts to Text Primary.
- **Focus:** System focus ring (`:focus-visible`). No custom focus treatment overrides browser defaults.

### Chips / Pills

Used for feature tags in the hero and filter states in data tables.

- **Style:** Rounded-full, `rgba(255,255,255,0.03)` background, 1px border `rgba(255,255,255,0.10)`, Text Muted text, 12px size.
- **Hover:** Border lifts to `rgba(138,92,245,0.40)`, text lifts to 80% white. The border color borrows from Signal Purple — even at rest the chip is "in system."
- **Dot accent:** A 4px Signal Purple dot precedes the chip text in the hero feature list. The dot is the only color; the text stays muted.

### Cards / Containers

- **Corner Style:** Gently curved (12px radius, `rounded-xl`). Landing hero layers use 16px (`rounded-2xl`) for the stacked card aesthetic.
- **Background:** Void Card (`#141920`) as default. Featured/highlighted cards use a very subtle gradient: `from-[signal-purple/8%] to-[signal-purple-dim/8%]`.
- **Shadow Strategy:** Flat at rest (no shadow). Featured cards use Featured Ambient glow. Hover state: border color transitions to Signal Purple at 20% opacity.
- **Border:** 1px Void Border (`#1E2535`) at rest. Interactive cards show `hover:border-signal-purple/20` transition.
- **Internal Padding:** 16px (md) for data cards in the dashboard. 28px for pricing cards. 16–20px for panel sections.

### Inputs / Fields

- **Style:** Rounded (8px), transparent or Void Card background, 1px Void Border, Text Primary text.
- **Focus:** Border shifts to Signal Purple at 40% opacity. No glow on inputs — glow is reserved for CTAs.
- **Disabled:** Text drops to Text Subtle, border to Void Border Subtle, cursor not-allowed.

### Navigation

- **Sidebar structure:** Fixed 224px width, Void Surface background, Void Border right edge. Logo at top, nav items in the center zone, credit monitors and user identity at the bottom.
- **Nav items:** 14px, Text Muted at rest. On hover: background shifts to Void Card, text lifts to Text Primary. Active state: Signal Purple at 10% opacity background, Signal Purple Light text, 1px Signal Purple at 20% border, `ChevronRight` icon in Signal Purple.
- **Section labels inside the sidebar:** Label style (11px, 600, uppercase, 0.15em tracking, Text Subtle) above credit monitors.

### Progress Bars

Signature component: used for Apollo credit consumption and Vero token allocation.

- **Track:** 4px height, Void Border fill, rounded-full.
- **Fill:** Solid color matching the semantic state: Pipeline Green for healthy, Alert Amber for mid, Alert Red for critical. The fill's color is computed at runtime from percentage thresholds (green below 50%, amber 50–80%, red above 80%).
- **Labels:** Data mono for the fraction (`used/total`), same color as the fill. The label color changes with the bar.

### Live Indicators

Used in the hero LayeredStack, sidebar webhook pending count, and live feed rows.

- **Pulse dot:** 6–8px circle in Pipeline Green (`#10B981`) with a `glow-pulse` animation (opacity 1→0.35, glow 6px→2px, 1.8s ease-in-out infinite).
- **Status dot in feed rows:** 6px dot in the semantic color (green / purple / amber) with no animation — animation reserved for true live states.

## 6. Do's and Don'ts

### Do:

- **Do** use Signal Purple (`#8A5CF5`) for one primary action per screen. Its singularity is its power; dilute it and it becomes decoration.
- **Do** use monospace (`ui-monospace`) for all numeric data: credit counts, enrichment percentages, contact IDs, timestamps. Numbers are data, not prose.
- **Do** express hierarchy through weight or size contrast of at least 1.25x between levels. A flat type scale is a broken wayfinding system.
- **Do** tint hover states with Signal Purple at low opacity (5–20%) for interactive elements, not with white overlays. The accent color should be everywhere you can interact, even at a whisper.
- **Do** use uppercase labels with `0.15em` letter-spacing for category and section identifiers. This is the wayfinding layer; treat it consistently.
- **Do** let the status semantic triad (green / amber / red) carry its full meaning: green is valid/enriched, amber is threshold, red is critical. Use them only in those contexts.
- **Do** keep the dark theme's surface stack strict: `#0B0E14` → `#0F1318` → `#141920`. Introducing an off-ramp surface color breaks the tonal depth system.
- **Do** use glow shadows on primary CTAs and live indicators only. Glow is signal, not style.

### Don't:

- **Don't** make the interface look like a generic SaaS tool: no Notion-cream backgrounds, no Linear-style blank minimalism, no palette that could belong to any other B2B product. A screenshot of any Vero screen must be immediately identifiable as Vero.
- **Don't** use overdesigned decoration: glassmorphism as default styling, neon-on-black aesthetics, or glassmorphic cards applied broadly without purpose. These alienate commercial users who expect a professional tool.
- **Don't** use gradient text (`background-clip: text` with a gradient `background`) going forward. Existing instances in the codebase are legacy; new components use solid Signal Purple Light (`#A78BFA`) for emphasis in purple contexts, and Text Primary (`#E2E8F0`) elsewhere. Gradient text sacrifices legibility for decoration.
- **Don't** render identical cards in a uniform grid: icon + heading + text, repeated without variation in size, weight, or structure. When cards must repeat, vary their internal hierarchy.
- **Don't** apply glow shadows to surfaces at rest. A resting card surface with a glow has lost its ability to communicate state. Reserve all glow for interactive, live, or CTA contexts.
- **Don't** use Signal Purple for more than one primary element per screen. Secondary interactive elements use the ghost button treatment (border only, no fill) or rely on hover transitions.
- **Don't** use `border-left` or `border-right` as a colored accent stripe on cards, alerts, or list items. Use full borders, background tints, or leading icons instead.
- **Don't** drop data labels below Text Subtle (`#4A5568`) — at 4A5568 on a dark background you are at the contrast floor. Anything lower is invisible.
- **Don't** enterprise-gray this interface with heavy visual weight, excessive table chrome, or the Salesforce aesthetic of dense forms and small secondary text. Vero is an operational tool that is also a brand.
