# Design Guidelines: INCANTO Tea Store

_Generated: 2025-12-04_

## Design Philosophy

**Apple Store-Inspired Premium E-commerce** với focus:
- Mobile-first responsive design
- Smooth, purposeful animations
- Clean typography, generous whitespace
- Premium product presentation

## Color Palette

### Primary Colors
- **Primary**: `#8B4513` (Saddle Brown) - CTAs, links, brand elements
- **Secondary**: `#A0522D` (Sienna) - Hover states, secondary actions
- **Dark**: `#5D3A1A` - Text emphasis, headers

### Accent Colors
- **Accent**: `#D2691E` (Chocolate) - Highlights, badges
- **Gold**: `#B8860B` (Dark Goldenrod) - Premium indicators
- **Light**: `#FDF5E6` (Old Lace) - Backgrounds, cards

### Semantic Colors
- **Success**: `#22C55E` - Confirmations, stock available
- **Warning**: `#F59E0B` - Low stock, alerts
- **Error**: `#EF4444` - Errors, out of stock

### Neutral Colors
- **Background**: `#FFFFFF`
- **Surface**: `#F9FAFB`
- **Border**: `#E5E7EB`
- **Text**: `#111827`
- **Muted**: `#6B7280`

## Typography System

### Font Family
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Font Scale (Mobile → Desktop)
| Level | Mobile | Desktop | Weight | Usage |
|-------|--------|---------|--------|-------|
| Display | 36px | 56px | 700 | Hero headlines |
| H1 | 28px | 40px | 700 | Page titles |
| H2 | 24px | 32px | 600 | Section headers |
| H3 | 20px | 24px | 600 | Card titles |
| Body | 16px | 16px | 400 | Paragraphs |
| Small | 14px | 14px | 400 | Captions, labels |
| XS | 12px | 12px | 500 | Badges, metadata |

### Typography Guidelines
- Line height: 1.5 (body), 1.2 (headings)
- Max line length: 65-75 characters
- Letter spacing: -0.02em (headings), normal (body)

## Layout & Spacing

### Container
- Max width: `1280px`
- Padding: `16px` (mobile), `24px` (tablet), `32px` (desktop)

### Spacing Scale (8px base)
| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Tight elements |
| `space-2` | 8px | Inline spacing |
| `space-3` | 12px | Card padding |
| `space-4` | 16px | Section gaps |
| `space-6` | 24px | Component gaps |
| `space-8` | 32px | Section padding |
| `space-12` | 48px | Large gaps |
| `space-16` | 64px | Section margins |

### Responsive Breakpoints
```css
--mobile: 0px       /* Mobile first */
--sm: 640px         /* Large phones */
--md: 768px         /* Tablets */
--lg: 1024px        /* Laptops */
--xl: 1280px        /* Desktops */
```

## Component Styling

### Buttons
| Variant | Style |
|---------|-------|
| Primary | Filled, amber bg, white text, rounded-full |
| Secondary | Outlined, amber border, amber text |
| Ghost | Text only, subtle hover bg |

**Sizes:**
- `sm`: 36px height, 14px text
- `md`: 44px height, 16px text (default)
- `lg`: 52px height, 18px text

**States:**
- Hover: `scale(1.02)`, slight color shift
- Active: `scale(0.98)`
- Disabled: `opacity: 0.5`

### Cards
- Border radius: `16px` (mobile), `20px` (desktop)
- Shadow: `0 4px 20px rgba(0,0,0,0.08)`
- Hover shadow: `0 12px 40px rgba(0,0,0,0.12)`
- Background: White
- Padding: `16px` (mobile), `24px` (desktop)

### Touch Targets
- Minimum size: `44x44px` (Apple HIG)
- Recommended: `48x48px` for primary actions
- Spacing between targets: `8px` minimum

## Animation Guidelines

### Timing Functions
```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);     /* Apple-style exit */
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1); /* Smooth transitions */
--spring: spring(1, 80, 10);                    /* Bouncy interactions */
```

### Duration Scale
| Speed | Duration | Usage |
|-------|----------|-------|
| Instant | 100ms | Micro-feedback |
| Fast | 200ms | Button presses, toggles |
| Normal | 300ms | Page transitions, modals |
| Slow | 500ms | Complex animations |

### Framer Motion Patterns
```tsx
// Hover scale
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}

// Fade in
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}

// Stagger children
transition={{ staggerChildren: 0.1 }}
```

## Mobile-First Patterns

### Navigation
- Fixed header with blur backdrop
- Bottom sheet for mobile menu
- Sticky cart icon with badge

### Product Grid
- 1 column on mobile (< 640px)
- 2 columns on tablet (640px+)
- 3-4 columns on desktop (1024px+)

### Images
- Lazy loading with blur placeholder
- Aspect ratio: 1:1 (products), 16:9 (banners)
- WebP format with fallbacks

## Accessibility

### Contrast Ratios
- Normal text: 7:1 minimum (AAA)
- Large text: 4.5:1 minimum
- Interactive elements: 3:1 minimum

### Focus States
- Visible focus ring: `2px solid #8B4513`
- Focus offset: `2px`
- Skip to content link

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

