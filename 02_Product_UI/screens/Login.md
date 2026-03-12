# Screen: Login

> Route: `/login`
> Audience: All unauthenticated users
> Ref: `Design_System_Guide.md` §1.1, `UI_Copy.md` §6–7

> [!NOTE]
> Login was not in the original MVP screen inventory. This screen is added based on the auth middleware requirement in `Product_UI_Specification.md` §6.1. The login method (SSO vs. local credentials) should be confirmed with the backend team.

---

## Section Hierarchy

```
Page
├── Navbar (minimal)
│   ├── Logo + product name
│   └── Language switcher
├── Login card (centered)
│   ├── Logo / brand mark
│   ├── Welcome heading
│   ├── Subtext
│   ├── SSO button (primary path)
│   ├── Divider ("atau" / "or")
│   ├── Email field
│   ├── Password field
│   ├── Remember me checkbox
│   ├── Forgot password link
│   ├── Submit button
│   └── Error alert area
└── Footer strip
    └── Legal / copyright
```

---

## Component Hierarchy

```
<Page background="subtle-gradient">
  <NavbarMinimal>
    <Logo />
    <LanguageSwitcher locales={["id","en"]} />
  </NavbarMinimal>

  <LoginCard maxWidth="420px" centered>
    <BrandMark />                         ← Logo mark or icon, not full logo
    <h1>"Masuk ke AI Sandbox"</h1>
    <p>"Gunakan akun Telkom Anda atau masuk secara manual."</p>

    <Button
      variant="outline"
      icon="SSO-provider-icon"
      label="Masuk dengan SSO Telkom"
      fullWidth
    />

    <Divider label="atau" />

    <form>
      <Input
        id="login-email"
        label="form.email"
        type="email"
        placeholder="nama@telkom.co.id"
        required
      />
      <Input
        id="login-password"
        label="form.password"
        type="password"
        required
        showToggle                        ← eye / eye-off icon
      />
      <Row justify="space-between">
        <Checkbox id="login-remember" label="Ingat saya" />
        <Link href="/forgot-password">"Lupa kata sandi?"</Link>
      </Row>
      <ErrorAlert id="login-error" />     ← hidden by default, shown on failure
      <Button
        id="login-submit"
        variant="primary"
        label="Masuk"
        fullWidth
        type="submit"
      />
    </form>
  </LoginCard>

  <FooterStrip>
    <p>© 2026 AI Sandbox · Telkom Indonesia</p>
  </FooterStrip>
</Page>
```

---

## Interaction Notes

| Element | Behavior |
|---------|----------|
| SSO button | Redirect to corporate SSO provider (OAuth/SAML). On return: if success → role-based redirect (see below). If fail → show error alert. |
| Form submit | Client-side validate → `POST /api/auth/login` with `{ email, password }` → on success: set session cookie/JWT → redirect. On fail: show error alert. |
| Remember me | Extends session / refresh token TTL. |
| Forgot password | Navigate to `/forgot-password` (future screen, out of MVP scope — can be a mailto link for MVP). |
| Password toggle | Toggle input `type` between `password` and `text`. |
| Language switcher | Toggle ID/EN, re-render all strings on this page. |

### Post-Login Role-Based Redirect

| Role | Redirect To |
|------|-------------|
| Model Owner | `/models` |
| Admin / Reviewer | `/dashboard` |
| Builder | `/ranking` |
| Public Viewer | `/` |

---

## Content Notes

| Element | ID Copy | EN Copy |
|---------|---------|---------|
| Heading | Masuk ke AI Sandbox | Sign in to AI Sandbox |
| Subtext | Gunakan akun Telkom Anda atau masuk secara manual. | Use your Telkom account or sign in manually. |
| SSO button | Masuk dengan SSO Telkom | Sign in with Telkom SSO |
| Divider | atau | or |
| Email label | Email | Email |
| Email placeholder | nama@telkom.co.id | name@telkom.co.id |
| Password label | Kata Sandi | Password |
| Remember me | Ingat saya | Remember me |
| Forgot password | Lupa kata sandi? | Forgot password? |
| Submit | Masuk | Sign In |
| Error: invalid creds | Email atau kata sandi salah. | Invalid email or password. |
| Error: SSO failed | Autentikasi SSO gagal. Coba lagi. | SSO authentication failed. Try again. |
| Error: account locked | Akun Anda dikunci. Hubungi admin. | Your account is locked. Contact admin. |
| Error: network | Gagal terhubung ke server. Coba lagi nanti. | Could not connect to server. Try again later. |
| Footer | © 2026 AI Sandbox · Telkom Indonesia | © 2026 AI Sandbox · Telkom Indonesia |

---

## Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| **Desktop (> 1024px)** | Centered login card (420px wide) on gradient or illustration background. Card has subtle shadow + rounded corners. |
| **Tablet (768–1024px)** | Same centered card, slightly wider (max 480px). |
| **Mobile (< 768px)** | Card becomes full-width with page padding (16px). No background illustration. |

| Element | Mobile Adaptation |
|---------|-------------------|
| Navbar | Logo left, language switcher right. No other links. |
| Login card | Full-width, no shadow. Top-aligned with slight top margin. |
| SSO button | Full-width. |
| Form fields | Full-width stacked. |
| Remember me / Forgot | Stack vertically if wrapping. |

---

## Assumptions

1. **SSO is the primary login method** for Telkom internal users. Manual email/password is a fallback.
2. **Forgot password** can be a `mailto:admin@...` link for MVP. A proper reset flow is Phase 2.
3. **Registration is admin-managed** — no self-signup form on this screen.
4. **Session management** uses HttpOnly cookies with JWT. The frontend does not store tokens in localStorage.
