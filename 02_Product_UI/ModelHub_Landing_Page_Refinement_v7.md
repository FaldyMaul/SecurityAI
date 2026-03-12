# ModelHub Landing Page Refinement - Separation from AI Sandbox

> **Purpose**: Separate ModelHub (discovery platform) from AI Sandbox (testing workspace)
> **Version**: 7.0 (ModelHub Separation)
> **Last Updated**: March 11, 2026
> **Priority**: **CRITICAL** - Product architecture refinement

---

## 🎯 Product Separation

### Two Distinct Applications

| Application | Purpose | Audience | Entry Point |
|-------------|---------|----------|-------------|
| **ModelHub** | Discover & compare models | Developer, Use Case Owner, Product Owner | `/` (Landing page) |
| **AI Sandbox** | Test & assess models | Model Owner, Model Vendor, Admin/Reviewer | `/models` (after login) |

### Key Concept

**ModelHub** = Main application (like "GitHub" or "Docker Hub")
- Public landing page at `/`
- Leaderboard inside at `/ranking`
- Model profiles at `/models/[id]/public`
- Comparison at `/ranking/compare`

**AI Sandbox** = Internal workspace (like "GitHub Actions" or "Docker Build")
- Accessed via "For Model Publishers" CTA
- Requires login
- Redirects to `/models` (AI Sandbox internal)

---

## 1. ModelHub Landing Page (`/`)

### Required Structure

```tsx
// Landing page structure
<Page>
  {/* Navigation */}
  <PublicNavbar>
    <NavLink href="/">Beranda</NavLink>
    <NavLink href="/ranking">Peringkat</NavLink>
    <NavLink href="/login">Masuk</NavLink>
  </PublicNavbar>

  {/* Hero Section */}
  <HeroSection>
    <h1>Temukan Model AI Terpercaya</h1>
    <p>Platform evaluasi dan discovery model AI untuk Indonesia</p>
    <div className="cta-group">
      <Link href="/ranking" className="btn-primary">
        Lihat Peringkat
      </Link>
      <Link href="#for-publishers" className="btn-secondary">
        Untuk Publisher Model
      </Link>
    </div>
  </HeroSection>

  {/* Top Models Section */}
  <TopModelsSection>
    <SectionHeading>Model Teratas</SectionHeading>
    <ModelGrid models={topModels} />
    <Link href="/ranking" className="view-all">
      Lihat Semua Peringkat →
    </Link>
  </TopModelsSection>

  {/* How It Works Section */}
  <HowItWorksSection>
    <SectionHeading>Bagaimana Cara Kerjanya</SectionHeading>
    <StepGrid>
      <Step
        icon={Search}
        title="1. Temukan Model"
        description="Jelajahi peringkat model AI yang telah dievaluasi"
      />
      <Step
        icon={Compare}
        title="2. Bandingkan"
        description="Bandingkan skor dan fitur model yang berbeda"
      />
      <Step
        icon={Check}
        title="3. Pilih & Gunakan"
        description="Pilih model terbaik untuk use case Anda"
      />
    </StepGrid>
  </HowItWorksSection>

  {/* For Model Publishers Section (NEW) */}
  <ForPublishersSection id="for-publishers">
    <SectionHeading>Untuk Publisher Model</SectionHeading>
    <div className="content-grid">
      <div className="info">
        <h3>Apakah Anda pemilik model AI?</h3>
        <p>
          AI Sandbox adalah platform internal untuk melakukan assessment,
          testing, dan evaluasi model AI Anda sebelum dipublikasikan ke ModelHub.
        </p>
        <ul className="benefits">
          <li>✅ Benchmark otomatis dengan standar industri</li>
          <li>✅ Laporan detail dengan rekomendasi</li>
          <li>✅ Eligibility untuk promosi ke ModelHub</li>
          <li>✅ Version tracking & comparison</li>
        </ul>
        <div className="cta-group">
          <Link href="/login?redirect=/models" className="btn-primary">
            Login ke AI Sandbox
          </Link>
          <Link href="#learn-more" className="btn-secondary">
            Pelajari Lebih Lanjut
          </Link>
        </div>
      </div>
      <div className="visual">
        {/* Illustration showing AI Sandbox workspace */}
        <SandboxPreviewIllustration />
      </div>
    </div>
  </ForPublishersSection>

  {/* Trust Statement */}
  <TrustStatement>
    <p>
      Penilaian dilakukan oleh AI Sandbox menggunakan benchmark yang disesuaikan
      untuk konteks Indonesia, termasuk kepatuhan terhadap UU PDP dan evaluasi
      konten SARA.
    </p>
  </TrustStatement>

  {/* Footer */}
  <Footer>
    <div className="footer-links">
      <div className="footer-section">
        <h4>ModelHub</h4>
        <NavLink href="/">Beranda</NavLink>
        <NavLink href="/ranking">Peringkat</NavLink>
        <NavLink href="/about">Tentang</NavLink>
      </div>
      <div className="footer-section">
        <h4>Untuk Publishers</h4>
        <ExternalLink href="/login?redirect=/models">
          AI Sandbox
        </ExternalLink>
        <ExternalLink href="/docs">Dokumentasi</ExternalLink>
      </div>
      <div className="footer-section">
        <h4>Legal</h4>
        <NavLink href="/privacy">Privasi</NavLink>
        <NavLink href="/terms">Syarat & Ketentuan</NavLink>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© 2026 ModelHub. Powered by AI Sandbox.</p>
    </div>
  </Footer>
</Page>
```

---

## 2. Navigation Separation

### ModelHub Navigation (Public)

```tsx
// PublicNavbar - Used in ModelHub
<PublicNavbar>
  <div className="navbar-brand">
    <Logo />
    <span className="product-name">ModelHub</span>  {/* ✅ Use "ModelHub" */}
  </div>
  
  <div className="navbar-links">
    <NavLink href="/">Beranda</NavLink>
    <NavLink href="/ranking">Peringkat</NavLink>
  </div>
  
  <div className="navbar-actions">
    <Link href="/login?redirect=/models" className="btn-outline">
      Untuk Publishers
    </Link>
    <Link href="/login" className="btn-primary">
      Masuk
    </Link>
  </div>
</PublicNavbar>
```

### AI Sandbox Navigation (Internal - After Login)

```tsx
// Sidebar - Used in AI Sandbox
<Sidebar>
  <div className="sidebar-header">
    <Logo />
    <span className="product-name">AI Sandbox</span>  {/* ✅ Use "AI Sandbox" */}
  </div>
  
  <NavGroup label="Utama">
    <NavItem icon="LayoutDashboard" label="Dashboard" href="/dashboard" />
    <NavItem icon="Layers" label="Model Saya" href="/models" />
    <NavItem icon="Play" label="Pengujian" href="/runs" />
  </NavGroup>
  
  <NavGroup label="Operasional">
    <NavItem icon="ClipboardList" label="Riwayat" href="/history" />
  </NavGroup>
  
  <div className="sidebar-footer">
    <Link href="/" className="external-link">
      <ExternalIcon /> Lihat ModelHub
    </Link>
    <NavItem icon="LogOut" label="Keluar" href="/logout" />
  </div>
</Sidebar>
```

---

## 3. Routing & Entry Points

### ModelHub Routes (Public)

```typescript
// ModelHub public routes
/                           // Landing page
/ranking                    // Leaderboard
/ranking/compare            // Comparison
/models/[id]/public         // Public model profile
/about                      // About page
/privacy                    // Privacy policy
/terms                      // Terms & conditions
```

### AI Sandbox Routes (Internal - Requires Login)

```typescript
// AI Sandbox internal routes
/dashboard                  // Admin dashboard
/models                     // Model list (owner workspace)
/models/new                 // Add model
/models/[id]                // Model detail
/models/[id]/runs/[runId]   // Run detail
/runs                       // Runs list
/history                    // History
```

### Login Flow

```typescript
// Login redirect logic
const handleLogin = async (credentials) => {
  const user = await authenticate(credentials);
  
  if (user.role === 'model_owner' || user.role === 'admin') {
    // Redirect to AI Sandbox
    router.push('/models');
  } else {
    // Redirect to ModelHub
    router.push('/ranking');
  }
};

// Login page with context
/login?redirect=/models     // Redirect to AI Sandbox after login
/login?redirect=/ranking    // Redirect to ModelHub after login
```

---

## 4. Language & Terminology

### Correct Terms

| Role | Use This | Not This |
|------|----------|----------|
| **Model Owner** | Publisher Model | User, Customer |
| **Model Vendor** | Vendor Model | Provider |
| **Developer** | Developer / Use Case Owner | Builder |
| **Admin/Reviewer** | Admin / Reviewer | Moderator |

### Application Names

| Application | Use This | Not This |
|-------------|----------|----------|
| **ModelHub** | ModelHub | Leaderboard, Ranking Page |
| **AI Sandbox** | AI Sandbox | Dashboard, Admin Panel |

### Action Labels

| Action | Use This | Not This |
|--------|----------|----------|
| **Discovery** | Temukan Model, Jelajahi Peringkat | Browse, Search |
| **Testing** | Assessment, Testing, Evaluasi | Benchmark only |
| **Promotion** | Promosikan ke ModelHub | Publish, Toggle |
| **Login** | Login ke AI Sandbox, Masuk | Sign in |

---

## 5. Visual Separation

### ModelHub Branding

```css
/* ModelHub visual identity */
:root {
  --modelhub-primary: #1545BC;      /* Blue */
  --modelhub-secondary: #7740B5;   /* Purple */
  --modelhub-accent: #A4E7DE;      /* Teal */
}

/* Clean, discovery-focused */
.modelhub-hero {
  background: linear-gradient(135deg, #1545BC 0%, #7740B5 100%);
  color: white;
}

.modelhub-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
```

### AI Sandbox Branding

```css
/* AI Sandbox visual identity */
:root {
  --sandbox-primary: #221C6A;      /* Deep Navy */
  --sandbox-secondary: #1545BC;    /* Blue */
  --sandbox-accent: #10b981;       /* Green */
}

/* Professional, workspace-focused */
.sandbox-sidebar {
  background: #221C6A;
  color: white;
}

.sandbox-card {
  background: white;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
```

---

## 6. "For Model Publishers" Section

### Detailed Implementation

```tsx
// ForPublishersSection component
export function ForPublishersSection() {
  return (
    <section id="for-publishers" className="publishers-section">
      <div className="container">
        <SectionHeading>Untuk Publisher Model</SectionHeading>
        <SectionSubtitle>
          Miliki model AI? Lakukan assessment dan promosi ke ModelHub
        </SectionSubtitle>
        
        <div className="content-grid">
          {/* Left: Information */}
          <div className="info">
            <h3>Apakah Anda pemilik model AI?</h3>
            <p>
              AI Sandbox adalah platform internal untuk melakukan assessment,
              testing, dan evaluasi model AI Anda sebelum dipublikasikan ke ModelHub.
            </p>
            
            <ul className="benefits">
              <li>
                <CheckCircle className="icon" />
                <div>
                  <strong>Benchmark Otomatis</strong>
                  <p>Testing dengan standar industri (Moonshot, OWASP LLM Top 10)</p>
                </div>
              </li>
              <li>
                <CheckCircle className="icon" />
                <div>
                  <strong>Laporan Detail</strong>
                  <p>Skor per kategori dengan rekomendasi actionable</p>
                </div>
              </li>
              <li>
                <CheckCircle className="icon" />
                <div>
                  <strong>Promosi ke ModelHub</strong>
                  <p>Eligibility untuk tampil di leaderboard ModelHub</p>
                </div>
              </li>
              <li>
                <CheckCircle className="icon" />
                <div>
                  <strong>Version Tracking</strong>
                  <p>Lacak perubahan skor antar versi model</p>
                </div>
              </li>
            </ul>
            
            <div className="cta-group">
              <Link 
                href="/login?redirect=/models" 
                className="btn-primary btn-lg"
              >
                <LoginIcon />
                Login ke AI Sandbox
              </Link>
              <Link 
                href="#learn-more" 
                className="btn-outline btn-lg"
              >
                Pelajari Lebih Lanjut
              </Link>
            </div>
            
            <p className="small-text">
              Requires account dengan role Model Owner atau Admin
            </p>
          </div>
          
          {/* Right: Visual */}
          <div className="visual">
            <div className="sandbox-preview">
              <div className="preview-header">
                <div className="preview-title">AI Sandbox Workspace</div>
                <div className="preview-dots">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </div>
              </div>
              <div className="preview-content">
                {/* Mock UI showing AI Sandbox interface */}
                <div className="mock-sidebar">
                  <div className="mock-nav-item active">Model Saya</div>
                  <div className="mock-nav-item">Pengujian</div>
                  <div className="mock-nav-item">Riwayat</div>
                </div>
                <div className="mock-main">
                  <div className="mock-card">
                    <div className="mock-status-badge">Selesai</div>
                    <div className="mock-score">A (85)</div>
                    <div className="mock-button">Promosikan ke ModelHub</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### CSS Styling

```css
.publishers-section {
  padding: 80px 24px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
}

.benefits {
  list-style: none;
  padding: 0;
  margin: 32px 0;
}

.benefits li {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.benefits .icon {
  color: #10b981;
  flex-shrink: 0;
}

.cta-group {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.btn-primary {
  background: #1545BC;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}

.btn-outline {
  background: transparent;
  color: #1545BC;
  border: 2px solid #1545BC;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}

.sandbox-preview {
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.preview-header {
  background: #221C6A;
  color: white;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.preview-content {
  display: grid;
  grid-template-columns: 160px 1fr;
  min-height: 320px;
}

.mock-sidebar {
  background: #f8fafc;
  padding: 16px;
  border-right: 1px solid #e2e8f0;
}

.mock-nav-item {
  padding: 8px 12px;
  margin-bottom: 8px;
  border-radius: 6px;
  font-size: 14px;
  color: #475569;
}

.mock-nav-item.active {
  background: #1545BC;
  color: white;
}

.mock-main {
  padding: 24px;
}

.mock-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.mock-status-badge {
  background: #10b981;
  color: white;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  width: fit-content;
}

.mock-score {
  font-size: 32px;
  font-weight: 700;
  color: #221C6A;
}

.mock-button {
  background: #1545BC;
  color: white;
  padding: 10px 16px;
  border-radius: 6px;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
}

@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  
  .cta-group {
    flex-direction: column;
  }
  
  .btn-primary,
  .btn-outline {
    width: 100%;
    justify-content: center;
  }
}
```

---

## 7. Footer Separation

### ModelHub Footer

```tsx
// ModelHub Footer
<Footer>
  <div className="footer-content">
    <div className="footer-section">
      <h4>ModelHub</h4>
      <NavLink href="/">Beranda</NavLink>
      <NavLink href="/ranking">Peringkat</NavLink>
      <NavLink href="/about">Tentang</NavLink>
      <NavLink href="/contact">Kontak</NavLink>
    </div>
    
    <div className="footer-section">
      <h4>Untuk Publishers</h4>
      <ExternalLink href="/login?redirect=/models">
        AI Sandbox
      </ExternalLink>
      <ExternalLink href="/docs">Dokumentasi</ExternalLink>
      <ExternalLink href="/pricing">Pricing</ExternalLink>
    </div>
    
    <div className="footer-section">
      <h4>Legal</h4>
      <NavLink href="/privacy">Privasi</NavLink>
      <NavLink href="/terms">Syarat & Ketentuan</NavLink>
      <NavLink href="/security">Keamanan</NavLink>
    </div>
  </div>
  
  <div className="footer-bottom">
    <p>© 2026 ModelHub. Powered by AI Sandbox.</p>
    <div className="footer-social">
      <SocialLink href="#" platform="github" />
      <SocialLink href="#" platform="linkedin" />
      <SocialLink href="#" platform="twitter" />
    </div>
  </div>
</Footer>
```

---

## 8. Files to Modify

### Critical Files

| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/app/[locale]/(public)/page.tsx` | Add "For Publishers" section | **CRITICAL** |
| `03_Frontend/src/components/layout/PublicNavbar.tsx` | Add "Untuk Publishers" CTA | **CRITICAL** |
| `03_Frontend/src/components/landing/ForPublishersSection.tsx` | CREATE NEW | **CRITICAL** |
| `03_Frontend/src/app/[locale]/(public)/layout.tsx` | Update footer | **HIGH** |

### Supporting Files

| File | Change | Priority |
|------|--------|----------|
| `03_Frontend/src/messages/id.json` | Add translations | **HIGH** |
| `03_Frontend/src/styles/globals.css` | Add section styles | **HIGH** |
| `03_Frontend/src/components/landing/HeroSection.tsx` | Update CTA buttons | **MEDIUM** |

---

## 9. Implementation Checklist

### Phase 1: Critical (Week 1)
- [ ] Create "For Publishers" section
- [ ] Add "Untuk Publishers" CTA to navbar
- [ ] Update landing page structure
- [ ] Add login redirect logic

### Phase 2: High (Week 2)
- [ ] Update footer with separation
- [ ] Add translations
- [ ] Style "For Publishers" section
- [ ] Add sandbox preview illustration

### Phase 3: Medium (Week 3)
- [ ] Polish mobile responsiveness
- [ ] Add animations
- [ ] Test login flow
- [ ] QA all CTAs

---

## ✅ QA Checklist

Before marking complete:
- [ ] "Untuk Publishers" CTA visible on landing page
- [ ] Click redirects to `/login?redirect=/models`
- [ ] ModelHub branding distinct from AI Sandbox
- [ ] Navbar shows "ModelHub" not "AI Sandbox"
- [ ] Footer has separate sections
- [ ] Login redirects correctly based on role
- [ ] Mobile responsive
- [ ] All links work

---

**For Frontend Agent**: Start with creating the "For Publishers" section. This is the key differentiator between ModelHub (discovery) and AI Sandbox (testing).

All specifications are provided with implementation examples.

**Location**: `D:\Work\PAM\SecurityAI\AISandboxDev\02_Product_UI\`
