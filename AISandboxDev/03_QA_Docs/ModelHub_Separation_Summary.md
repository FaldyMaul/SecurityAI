# ModelHub Landing Page - Separation Summary

> **Created**: March 11, 2026
> **Priority**: **CRITICAL** - Product separation

---

## 🎯 Key Change

**ModelHub** is now a separate application from **AI Sandbox**.

| Application | Purpose | Entry Point |
|-------------|---------|-------------|
| **ModelHub** | Discover & compare models | `/` (Landing page) |
| **AI Sandbox** | Test & assess models | `/models` (after login) |

---

## 📋 What Changed

### Before
- Landing page = AI Sandbox
- One unified app
- No clear separation

### After
- **ModelHub** = Main discovery platform (like "GitHub")
- **AI Sandbox** = Internal testing workspace (like "GitHub Actions")
- Clear separation with "For Model Publishers" section

---

## 🔧 Implementation Required

### 1. Landing Page Structure

```tsx
// New sections on landing page
<HeroSection>
  <h1>Temukan Model AI Terpercaya</h1>
  <div className="cta-group">
    <Link href="/ranking">Lihat Peringkat</Link>
    <Link href="#for-publishers">Untuk Publisher Model</Link>
  </div>
</HeroSection>

<ForPublishersSection>  {/* ✅ NEW SECTION */}
  <h2>Untuk Publisher Model</h2>
  <p>Apakah Anda pemilik model AI?</p>
  <ul>
    <li>✅ Benchmark otomatis</li>
    <li>✅ Laporan detail</li>
    <li>✅ Promosi ke ModelHub</li>
    <li>✅ Version tracking</li>
  </ul>
  <div className="cta-group">
    <Link href="/login?redirect=/models">Login ke AI Sandbox</Link>
    <Link href="#learn-more">Pelajari Lebih Lanjut</Link>
  </div>
</ForPublishersSection>
```

### 2. Navigation Update

```tsx
// PublicNavbar - ModelHub
<PublicNavbar>
  <div className="navbar-brand">
    <Logo />
    <span>ModelHub</span>  {/* ✅ Use "ModelHub" */}
  </div>
  
  <div className="navbar-links">
    <NavLink href="/">Beranda</NavLink>
    <NavLink href="/ranking">Peringkat</NavLink>
  </div>
  
  <div className="navbar-actions">
    <Link href="/login?redirect=/models" className="btn-outline">
      Untuk Publishers  {/* ✅ NEW CTA */}
    </Link>
    <Link href="/login" className="btn-primary">Masuk</Link>
  </div>
</PublicNavbar>
```

### 3. Login Redirect Logic

```typescript
// After login, redirect based on role
if (user.role === 'model_owner' || user.role === 'admin') {
  router.push('/models');  // AI Sandbox
} else {
  router.push('/ranking'); // ModelHub
}
```

---

## 🗣️ Language & Terminology

### Correct Terms

| Use This | Not This |
|----------|----------|
| **ModelHub** | Leaderboard, Ranking |
| **AI Sandbox** | Dashboard, Admin Panel |
| **Publisher Model** | User, Customer |
| **Promosikan ke ModelHub** | Publish, Toggle |
| **Login ke AI Sandbox** | Sign in |

---

## 📁 Files to Create/Modify

### Create New
1. `03_Frontend/src/components/landing/ForPublishersSection.tsx`

### Modify
1. `03_Frontend/src/app/[locale]/(public)/page.tsx` - Add section
2. `03_Frontend/src/components/layout/PublicNavbar.tsx` - Add CTA
3. `03_Frontend/src/app/[locale]/(public)/layout.tsx` - Update footer
4. `03_Frontend/src/messages/id.json` - Add translations

---

## ✅ QA Checklist

- [ ] "Untuk Publisher Model" section visible on landing
- [ ] "Untuk Publishers" CTA in navbar
- [ ] Click redirects to `/login?redirect=/models`
- [ ] Navbar shows "ModelHub" not "AI Sandbox"
- [ ] Footer has separate sections for ModelHub & AI Sandbox
- [ ] Login redirects correctly based on role
- [ ] Mobile responsive

---

## 📖 Full Documentation

For complete specifications with code examples:
- **Read**: `ModelHub_Landing_Page_Refinement_v7.md` in `02_Product_UI/`

---

**For Frontend Agent**: 
1. Create "For Publishers" section component
2. Add to landing page
3. Update navbar with CTA
4. Test login redirect flow

**Location**: `D:\Work\PAM\SecurityAI\AISandboxDev\02_Product_UI\`
