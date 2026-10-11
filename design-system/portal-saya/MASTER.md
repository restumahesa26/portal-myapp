# Design System - Personal Apps Portal (Anti-AI Slop)

**Project:** Personal Apps Portal (My App Hub)  
**Style Direction:** Modern High-Contrast Geometric Minimalism ("Ojob" Reference Style)  
**Tone:** Editorial, high-contrast, professional, focused, clean Swiss-inspired.

---

## 1. Typography Tokens

- **Font Family Display (Headings):** `'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
  - Font weights: `700` (Bold), `800` (Extra Bold)
  - Letter spacing: `-0.025em` (tight tracking for punchy headings)
- **Font Family Body & UI:** `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
  - Font weights: `400` (Regular), `500` (Medium), `600` (Semi-bold)
  - Line height: `1.5` to `1.6` for optimal readability

---

## 2. Color Palette & Semantic Tokens

| Role | Color Hex | CSS Variable / Tailwind | Description |
| :--- | :--- | :--- | :--- |
| **Canvas Background** | `#FFFFFF` | `bg-white` | Pristine pure white background |
| **Surface Alt / Warm Wash** | `#F8F9FA` | `bg-[#F8F9FA]` / `bg-neutral-50` | Subtle backdrop for section rhythm |
| **Deep Contrast / Obsidian** | `#09090B` | `bg-neutral-900` / `bg-black` | Solid black pill buttons, search buttons, stats ribbons |
| **Primary Text** | `#0F172A` | `text-slate-900` | High-contrast body & heading text (12:1+ ratio) |
| **Muted Text** | `#64748B` | `text-slate-500` | Secondary labels, descriptions, subheadings |
| **Primary Accent (Warm Sun)** | `#F59E0B` / `#FBBF24` | `bg-amber-400` / `text-amber-600` | Featured badges, graphic backdrops from reference |
| **Accent Wash (Soft Yellow)** | `#FEF3C7` | `bg-amber-50` | Pill badge background for WIP/in-progress items |
| **Accent Coral / Red** | `#EF4444` | `bg-red-500` / `text-red-500` | Destructive actions, urgent status tags |
| **Accent Emerald** | `#10B981` | `bg-emerald-500` / `text-emerald-700` | Live "Production" status indicator |
| **Hairline Border** | `#E2E8F0` / `#E5E7EB` | `border-slate-200` | Sharp 1px card and container outlines |

---

## 3. UI Component Anatomy & Anti-AI Slop Rules

1. **No Slop Clutter**:
   - Strictly NO purple-cyan-magenta saturated gradient blobs.
   - Strictly NO fake 3D glossy metallic spheres or generic AI-generated clipart.
   - Use vector SVG icons (`lucide-react`) and real screenshot/brand icon support.
2. **Signature Element from Reference**:
   - Inline pill badges inside typography: `Find Your [ ➔ ] Apps Here In One Place`.
   - Floating bento preview cards with soft shadows: `shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)]`.
   - Rounded pill search bar with partitioned fields and circular black action button.
   - High-contrast stats ribbon at the bottom of the hero.
3. **Card Micro-interactions**:
   - `transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 200ms ease;`
   - Hover elevates slightly (`-translate-y-1`), borders crisp up (`border-neutral-800`), corner arrow icon glides diagonally (`translate-x-0.5 -translate-y-0.5`).
