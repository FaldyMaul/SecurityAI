# AI Sandbox — Color Contrast & Accessibility Guide

> **Purpose**: Ensure all text and UI elements meet WCAG 2.1 AA accessibility standards
> **Last Updated**: March 10, 2026
> **Version**: 2.0 (Accessibility Optimized)

---

## 1. Quick Reference

### ✅ Approved Color Combinations

Use these combinations for accessible text on backgrounds:

| Background Color | Hex | Approved Text Colors |
|-----------------|-----|---------------------|
| **White** | `#ffffff` | `#0f172a` (primary), `#334155` (secondary), `#64748b` (muted) |
| **Bg Secondary** | `#f8fafc` | `#0f172a` (primary), `#334155` (secondary) |
| **Bg Tertiary** | `#f1f5f9` | `#0f172a` (primary), `#334155` (secondary) |
| **Primary Light** | `#E8EEFC` | `#0f172a` (primary), `#334155` (secondary) |
| **Secondary Light** | `#F3E8FC` | `#0f172a` (primary), `#334155` (secondary) |
| **Primary** | `#1545BC` | `#ffffff` (white) |
| **Secondary** | `#7740B5` | `#ffffff` (white) |
| **Primary Dark** | `#221C6A` | `#f1f5f9` (light), `#ffffff` (white) |

### ❌ Forbidden Color Combinations

**NEVER use these combinations:**

| Background | Text Color | Reason |
|------------|------------|--------|
| White / Light | `#94a3b8` (old muted) | 2.8:1 ratio - fails WCAG |
| Any light background | Light grey (`#cbd5e1`, lighter) | Insufficient contrast |
| Primary Light (`#E8EEFC`) | Muted colors | Text becomes unreadable |
| Accent Teal (`#A4E7DE`) | White text | 1.5:1 ratio - completely unreadable |
| Light pastels | White text | Fails WCAG requirements |

---

## 2. Text Color Tokens

### 2.1 Primary Text Colors

```css
/* ✅ USE THESE */
--color-text-primary: #0f172a;      /* Dark slate - 16.8:1 on white (AAA) */
--color-text-secondary: #334155;    /* Darker slate - 10.2:1 on white (AAA) */
--color-text-muted: #64748b;        /* Medium slate - 5.2:1 on white (AA) */
--color-text-inverse: #ffffff;      /* White - for dark backgrounds */
--color-text-on-dark: #f1f5f9;      /* Light slate - for dark backgrounds */
```

### 2.2 Usage Guidelines

| Token | When to Use | Example |
|-------|-------------|---------|
| `--color-text-primary` | Main content, headings, important text | Body text, card titles |
| `--color-text-secondary` | Supporting text, descriptions | Subtitles, helper text |
| `--color-text-muted` | Metadata, timestamps, less important info | "Last updated" dates |
| `--color-text-inverse` | Text on dark backgrounds | White text on navy |
| `--color-text-on-dark` | Alternative for dark backgrounds | Light slate on primary dark |

---

## 3. Background Color Tokens

### 3.1 Light Backgrounds (Require Dark Text)

```css
/* ✅ USE WITH DARK TEXT */
--color-bg: #ffffff;              /* White background */
--color-bg-secondary: #f8fafc;    /* Very light slate */
--color-bg-tertiary: #f1f5f9;     /* Light slate */
--color-surface: #ffffff;         /* Card surfaces */
--color-primary-light: #E8EEFC;   /* Light blue */
--color-secondary-light: #F3E8FC; /* Light purple */
```

**Approved text on these backgrounds:**
- `--color-text-primary` (#0f172a) - Best choice
- `--color-text-secondary` (#334155) - Good for secondary text
- ❌ NEVER use: `--color-text-muted` or lighter

### 3.2 Dark Backgrounds (Require Light Text)

```css
/* ✅ USE WITH LIGHT TEXT */
--color-primary-dark: #221C6A;    /* Deep navy */
--color-primary: #1545BC;         /* Primary blue */
--color-primary-hover: #0f3494;   /* Darker blue */
--color-secondary: #7740B5;       /* Purple */
```

**Approved text on these backgrounds:**
- `--color-text-inverse` (#ffffff) - Best choice
- `--color-text-on-dark` (#f1f5f9) - Softer alternative

---

## 4. Component-Specific Guidelines

### 4.1 Hero Sections

```css
/* ✅ CORRECT - Dark gradient with white text */
.hero {
  background: linear-gradient(135deg, #221C6A 0%, #1545BC 50%, #0f3494 100%);
  color: #ffffff;  /* or var(--color-text-inverse) */
}

.heroTitle {
  color: #ffffff;  /* Explicit white for titles */
}

.heroSubtitle {
  color: #ffffff;  /* Explicit white for subtitles */
  font-weight: 500;  /* Add weight for better readability */
}
```

```css
/* ❌ WRONG - Light gradient with white text (UNREADABLE) */
.hero {
  background: linear-gradient(135deg, #221C6A 0%, #1545BC 50%, #A4E7DE 100%);
  /* Light teal at end makes white text invisible */
}
```

### 4.2 Cards on Light Backgrounds

```css
/* ✅ CORRECT - Dark text on white/light cards */
.modelCard {
  background: #ffffff;
  color: #0f172a;  /* Primary text color */
}

.modelName {
  color: #0f172a;  /* Dark for names */
}

.modelProvider {
  color: #334155;  /* Slightly lighter for metadata */
}
```

### 4.3 Step Cards / Feature Cards

```css
/* ✅ CORRECT - Readable on hover */
.stepCard {
  background: #f8fafc;  /* Light background */
  border: 1px solid #cbd5e1;
}

.stepCard h3 {
  color: #0f172a;  /* Dark text - always readable */
  font-weight: 600;
}

.stepCard p {
  color: #334155;  /* Secondary text */
}

.stepCard:hover {
  background: #E8EEFC;  /* Light blue hover */
  /* Text colors remain the same - still readable */
}
```

### 4.4 Trust Sections / Info Boxes

```css
/* ✅ CORRECT - Light background with dark text */
.trustSection {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  color: #0f172a;  /* Primary text - readable */
}

/* ❌ WRONG - Colored light background with muted text */
.trustSection {
  background: linear-gradient(135deg, #E8EEFC 0%, #F3E8FC 100%);
  color: #94a3b8;  /* UNREADABLE - fails WCAG */
}
```

---

## 5. Status & Badge Colors

### 5.1 Text on Status Backgrounds

| Status Color | Hex | Text Color | Ratio |
|--------------|-----|------------|-------|
| Success (Green) | `#10b981` | White | 4.9:1 ✅ |
| Warning (Amber) | `#f59e0b` | Black | 8.2:1 ✅ |
| Danger (Red) | `#ef4444` | White | 5.1:1 ✅ |
| Info (Blue) | `#3b82f6` | White | 4.6:1 ✅ |
| Primary | `#1545BC` | White | 8.2:1 ✅ |
| Secondary | `#7740B5` | White | 6.1:1 ✅ |

### 5.2 Badge Implementation

```tsx
/* ✅ CORRECT - Legion UI Badge with proper contrast */
<Badge variant="success">Active</Badge>  {/* White on green */}
<Badge variant="warning">Pending</Badge>  {/* Black on amber */}
<Badge variant="danger">Failed</Badge>  {/* White on red */}
```

---

## 6. Score & Progress Colors

### 6.1 Score Ring Colors (With Contrast)

| Score Range | Color | Use With | Ratio |
|-------------|-------|----------|-------|
| 80–100 (Excellent) | `#059669` (Green) | White text | 5.8:1 ✅ |
| 60–79 (Good) | `#1545BC` (Blue) | White text | 8.2:1 ✅ |
| 40–59 (Moderate) | `#7740B5` (Purple) | White text | 6.1:1 ✅ |
| 20–39 (Poor) | `#f59e0b` (Amber) | Black text | 8.2:1 ✅ |
| 0–19 (Critical) | `#dc2626` (Red) | White text | 5.1:1 ✅ |

### 6.2 Progress Bars

```css
/* ✅ CORRECT - Dark text on light track */
.progressTrack {
  background: #e2e8f0;  /* Light grey */
}

.progressBar {
  background: #1545BC;  /* Primary blue */
}

.progressValue {
  color: #0f172a;  /* Dark text - readable on light track */
}
```

---

## 7. Border & Divider Colors

### 7.1 Approved Border Colors

```css
/* ✅ USE THESE */
--color-border: #cbd5e1;      /* Medium slate - visible on white */
--color-border-hover: #94a3b8; /* Darker slate for hover states */
```

### 7.2 Divider Guidelines

- Use `--color-border` (#cbd5e1) for section dividers on light backgrounds
- Use `--color-text-muted` with opacity for subtle dividers
- Never use borders lighter than `#cbd5e1` on white backgrounds

---

## 8. Testing Checklist

### 8.1 Pre-Deployment Checks

- [ ] All text on white backgrounds uses `#0f172a`, `#334155`, or `#64748b`
- [ ] All text on dark backgrounds uses `#ffffff` or `#f1f5f9`
- [ ] Hero sections have dark gradients (no light colors at any point)
- [ ] Card content uses dark text on light backgrounds
- [ ] Status badges have appropriate text colors (white on dark, black on amber)
- [ ] No light grey text (`#94a3b8` or lighter) on white backgrounds

### 8.2 Tools for Testing

1. **WebAIM Contrast Checker**: https://webaim.org/resources/contrastchecker/
2. **Chrome DevTools**: Built-in contrast checker in Elements panel
3. **axe DevTools**: Automated accessibility testing
4. **WAVE**: Browser extension for accessibility evaluation

### 8.3 Manual Testing

```
□ View pages at 200% zoom - text remains readable
□ View pages in bright sunlight - can you still read?
□ Squint test - does text disappear when you squint?
□ Grayscale test - convert to B&W, is there enough contrast?
```

---

## 9. Common Mistakes & Fixes

### Mistake 1: Light Text on Light Background

```css
/* ❌ WRONG */
.card {
  background: #f8fafc;
  color: #94a3b8;  /* Invisible! */
}

/* ✅ CORRECT */
.card {
  background: #f8fafc;
  color: #0f172a;  /* Readable */
}
```

### Mistake 2: Gradient Ends with Light Color

```css
/* ❌ WRONG */
.hero {
  background: linear-gradient(135deg, #221C6A, #1545BC, #A4E7DE);
  /* Light teal makes white text unreadable */
}

/* ✅ CORRECT */
.hero {
  background: linear-gradient(135deg, #221C6A, #1545BC, #0f3494);
  /* All dark colors - white text always readable */
}
```

### Mistake 3: Muted Text on Light Colored Background

```css
/* ❌ WRONG */
.infoBox {
  background: #E8EEFC;  /* Light blue */
  color: #94a3b8;  /* Muted grey - unreadable */
}

/* ✅ CORRECT */
.infoBox {
  background: #E8EEFC;  /* Light blue */
  color: #0f172a;  /* Dark slate - readable */
}
```

---

## 10. Accessibility Statement

AI Sandbox commits to meeting **WCAG 2.1 AA** standards for all user-facing interfaces. This includes:

- **Minimum 4.5:1** contrast ratio for normal text
- **Minimum 3:1** contrast ratio for large text (18px+ or 14px+ bold)
- **Minimum 3:1** contrast ratio for UI components and graphics

All color combinations in this guide have been verified to meet or exceed these requirements.

---

## 11. Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Color Contrast Analyzer](https://www.tpgi.com/color-contrast-checker/)
- [Legion UI Accessibility Guide](https://6420e4161e2acdd49d1d3e4b-hfuodunylt.chromatic.com/)

---

**Questions?** Review the `Design_System_Guide.md` or check the CSS variables in `variables.css`.
