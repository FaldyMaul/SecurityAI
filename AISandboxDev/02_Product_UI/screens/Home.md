# Screen: Home

> Route: `/`
> Audience: Public Viewer (unauthenticated), all roles (authenticated)
> Ref: `Screen_Specs.md` §11, `User_Flow.md` §4, `UI_Copy.md` §1

---

## Section Hierarchy

```
Page
├── Navbar
│   ├── Logo + product name
│   ├── Nav links (role-aware)
│   └── Auth button (Login / Avatar)
├── Hero
│   ├── Tagline
│   ├── Subtext
│   └── Primary CTA
├── Top Models
│   ├── Section heading
│   └── Model card grid (top 5)
├── How It Works
│   ├── Section heading
│   └── 3-step visual
├── Trust Statement
│   └── Paragraph
└── Footer
    ├── Brand info
    ├── Legal links
    └── Language switcher
```

---

## Component Hierarchy

```
<Page>
  <Navbar>
    <Logo />
    <NavLinks>                    ← role-aware: public sees Home/Rankings/Profiles
      <NavLink label="nav.home" />
      <NavLink label="nav.ranking" />
      <NavLink label="nav.profiles" />
    </NavLinks>
    <AuthButton />                ← unauthenticated: "Masuk" / authenticated: Avatar + dropdown
  </Navbar>

  <HeroSection>
    <h1>"Temukan Model AI Terpercaya"</h1>
    <p>subtext — 1 sentence about methodology</p>
    <Button variant="primary" label="action.viewranking" → /ranking />
  </HeroSection>

  <TopModelsSection>
    <SectionHeading>"Model Teratas"</SectionHeading>
    <CardGrid cols={5}>              ← desktop: 5-col · tablet: 3-col · mobile: horizontal scroll
      <ModelCard key={model.id}>     ← repeated × 5
        <RankBadge rank={n} />
        <h3>{model.name}</h3>
        <p>{model.provider}</p>
        <ScoreBlock value={model.score} />
        <StatusBadge status={model.approval} />
      </ModelCard>
    </CardGrid>
  </TopModelsSection>

  <HowItWorksSection>
    <SectionHeading>"Cara Kerja"</SectionHeading>
    <StepRow>
      <Step icon="Upload"    label="Submit"  desc="Daftarkan model AI Anda" />
      <StepArrow />
      <Step icon="ShieldCheck" label="Assess" desc="Benchmark otomatis dijalankan" />
      <StepArrow />
      <Step icon="Globe"     label="Publish"  desc="Hasil dipublikasikan ke peringkat" />
    </StepRow>
  </HowItWorksSection>

  <TrustStatement>
    <p>methodology paragraph</p>
  </TrustStatement>

  <Footer>
    <BrandInfo />
    <LegalLinks />
    <LanguageSwitcher locales={["id","en"]} />
  </Footer>
</Page>
```

---

## Interaction Notes

| Element | Behavior |
|---------|----------|
| Hero CTA | Navigate to `/ranking` |
| Model card click | Navigate to `/models/[id]/public` |
| Auth button (unauthenticated) | Navigate to `/login` |
| Auth button (authenticated) | Open dropdown: My Models / Dashboard / Logout (role-dependent) |
| Language switcher | Toggle locale, re-render all strings |
| Navbar links | Highlight active link based on current route |

---

## Content Notes

| Element | ID Copy | EN Copy |
|---------|---------|---------|
| Hero tagline | Temukan Model AI Terpercaya | Discover Trusted AI Models |
| Hero subtext | Platform penilaian model AI untuk keamanan, privasi, dan kepatuhan di Indonesia | AI model assessment platform for security, privacy, and compliance in Indonesia |
| Hero CTA | Lihat Peringkat → | View Rankings → |
| Section: Top Models | Model Teratas | Top Models |
| Section: How It Works | Cara Kerja | How It Works |
| Step 1 | Daftarkan model AI Anda | Register your AI model |
| Step 2 | Benchmark otomatis dijalankan | Automated benchmark runs |
| Step 3 | Hasil dipublikasikan ke peringkat | Results published to ranking |
| Trust text | Methodology paragraph (TBD — product team to finalize) | Same |
| Empty: no published models | Top Models section hidden entirely | Same behavior |

---

## Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| **Desktop (> 1024px)** | Full-width hero · 5-col model card grid · horizontal 3-step How It Works |
| **Tablet (768–1024px)** | Full-width hero · 3-col card grid + pagination dots · 3-step stays horizontal |
| **Mobile (< 768px)** | Stacked hero · horizontal-scroll card carousel (snap) · vertical 3-step stack · hamburger nav |

| Element | Mobile Adaptation |
|---------|-------------------|
| Navbar | Collapse to hamburger menu. Logo + Auth button remain visible. |
| Model cards | Horizontal scroll carousel with snap. Card width: ~280px. |
| How It Works | Stack vertically. Arrows become downward arrows. |
| Footer | Stack links vertically. Language switcher below. |
