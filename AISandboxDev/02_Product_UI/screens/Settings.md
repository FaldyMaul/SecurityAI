# Screen: Settings

> Route: `/settings`
> Audience: All authenticated roles
> Ref: `Product_UI_Specification.md` §6.1, `UI_Copy.md` §1, `Design_System_Guide.md` §1

> [!NOTE]
> Settings was not explicitly listed in the original MVP screen inventory. This screen is added to support profile management, locale preference, notification controls, and admin-only system configuration. Scope should be kept minimal for MVP.

---

## Section Hierarchy

```
Page
├── Sidebar (persistent, same as Dashboard)
├── Main content
│   ├── Page header
│   │   └── Title: "Pengaturan"
│   ├── Settings tabs
│   │   ├── Tab: Profile
│   │   ├── Tab: Preferences
│   │   ├── Tab: Notifications
│   │   └── Tab: System (admin only)
│   ├── Tab: Profile
│   │   ├── Avatar upload
│   │   ├── Display name
│   │   ├── Email (read-only)
│   │   ├── Role (read-only badge)
│   │   └── Save button
│   ├── Tab: Preferences
│   │   ├── Language selector
│   │   ├── Date format selector
│   │   ├── Theme toggle (light/dark/system)
│   │   └── Save button
│   ├── Tab: Notifications
│   │   ├── Review assigned toggle
│   │   ├── Run completed toggle
│   │   ├── Run failed toggle
│   │   ├── Model published toggle
│   │   └── Save button
│   └── Tab: System (admin only)
│       ├── Benchmark package management (table)
│       ├── User management link
│       ├── API health status
│       └── Danger zone: reset / maintenance toggle
└── (toast area for save feedback)
```

---

## Component Hierarchy

```
<AppShell>
  <Sidebar />                            ← same component as Dashboard

  <MainContent maxWidth="800px">
    <PageHeader>
      <h1>"Pengaturan"</h1>
    </PageHeader>

    <Tabs id="settings-tabs" defaultTab="profile">

      <!-- Tab: Profile -->
      <TabPanel id="settings-profile" label="Profil">
        <form>
          <AvatarUpload
            id="settings-avatar"
            current={user.avatar}
            onUpload={handleAvatarUpload}
          />
          <Input
            id="settings-displayname"
            label="Nama Tampilan"
            value={user.displayName}
            required
          />
          <Input
            id="settings-email"
            label="Email"
            value={user.email}
            disabled                      ← read-only, managed by SSO/admin
          />
          <ReadOnlyField label="Peran">
            <StatusBadge status={user.role} />
          </ReadOnlyField>
          <Button
            id="settings-profile-save"
            variant="primary"
            label="Simpan Profil"
            type="submit"
          />
        </form>
      </TabPanel>

      <!-- Tab: Preferences -->
      <TabPanel id="settings-preferences" label="Preferensi">
        <form>
          <Select
            id="settings-language"
            label="Bahasa"
            options={[
              { value: "id", label: "Bahasa Indonesia" },
              { value: "en", label: "English" }
            ]}
            value={prefs.locale}
          />
          <Select
            id="settings-dateformat"
            label="Format Tanggal"
            options={[
              { value: "dd/MM/yyyy", label: "31/12/2026" },
              { value: "MMM d, yyyy", label: "Dec 31, 2026" }
            ]}
            value={prefs.dateFormat}
          />
          <RadioGroup
            id="settings-theme"
            label="Tema"
            options={[
              { value: "light", label: "Terang" },
              { value: "dark",  label: "Gelap" },
              { value: "system", label: "Ikuti sistem" }
            ]}
            value={prefs.theme}
          />
          <Button
            id="settings-prefs-save"
            variant="primary"
            label="Simpan Preferensi"
            type="submit"
          />
        </form>
      </TabPanel>

      <!-- Tab: Notifications -->
      <TabPanel id="settings-notifications" label="Notifikasi">
        <form>
          <ToggleRow
            id="notif-review-assigned"
            label="Review ditetapkan kepada saya"
            desc="Terima notifikasi saat model baru masuk antrean review Anda."
            value={notif.reviewAssigned}
          />
          <ToggleRow
            id="notif-run-completed"
            label="Benchmark selesai"
            desc="Terima notifikasi saat benchmark model Anda selesai."
            value={notif.runCompleted}
          />
          <ToggleRow
            id="notif-run-failed"
            label="Benchmark gagal"
            desc="Terima notifikasi saat benchmark gagal."
            value={notif.runFailed}
          />
          <ToggleRow
            id="notif-model-published"
            label="Model dipublikasikan"
            desc="Terima notifikasi saat model Anda dipublikasikan ke peringkat."
            value={notif.modelPublished}
          />
          <Button
            id="settings-notif-save"
            variant="primary"
            label="Simpan Notifikasi"
            type="submit"
          />
        </form>
      </TabPanel>

      <!-- Tab: System (admin only) -->
      <TabPanel id="settings-system" label="Sistem" requiredRole="admin">
        <Section>
          <SectionHeading>"Paket Benchmark"</SectionHeading>
          <Table id="settings-packages">
            <Th>Nama Paket</Th>
            <Th>Status</Th>
            <Th>Terakhir Diperbarui</Th>
            <Th>Aksi</Th>
            <Tr>
              <Td>Indonesia Core Trust Package</Td>
              <Td><StatusBadge status="active" /></Td>
              <Td>{date}</Td>
              <Td><Button variant="ghost" label="Konfigurasi" /></Td>
            </Tr>
          </Table>
        </Section>

        <Section>
          <SectionHeading>"Manajemen Pengguna"</SectionHeading>
          <p>Kelola pengguna dan peran dari panel admin.</p>
          <Button variant="secondary" label="Buka Panel Admin" href="/admin/users" />
        </Section>

        <Section>
          <SectionHeading>"Kesehatan API"</SectionHeading>
          <MetricRow>
            <Metric label="FastAPI" status="healthy" />
            <Metric label="LiteLLM" status="healthy" />
            <Metric label="Moonshot" status="healthy" />
          </MetricRow>
        </Section>

        <DangerZone>
          <SectionHeading>"Zona Bahaya"</SectionHeading>
          <DangerAction
            label="Mode Pemeliharaan"
            desc="Aktifkan mode pemeliharaan untuk menonaktifkan benchmark baru."
            action="Toggle"
          />
        </DangerZone>
      </TabPanel>

    </Tabs>
  </MainContent>
</AppShell>
```

---

## Interaction Notes

| Element | Behavior |
|---------|----------|
| Tab switch | Load corresponding tab panel. Persist active tab in URL hash `#profile`, `#preferences`, `#notifications`, `#system`. |
| Avatar upload | Click opens file picker (accept: `.jpg`, `.png`, max 2 MB). Preview before save. |
| Profile save | `PATCH /api/users/me` → Toast: "Profil berhasil disimpan" |
| Preferences save | `PATCH /api/users/me/preferences` → apply locale/theme immediately → Toast |
| Language change | Apply immediately as preview. Persist on save. |
| Theme change | Apply immediately as preview. Persist on save. |
| Notification toggles | Toggle on/off. Persist on save via `PATCH /api/users/me/notifications`. |
| System tab | Only visible and accessible to Admin role. If non-admin navigates to `#system`, redirect to `#profile`. |
| Package configure | Opens config modal (MVP: read-only view of package contents). |
| Admin users link | Navigate to `/admin/users` (separate admin page, may be Phase 2). |
| Maintenance toggle | Confirmation dialog: "Aktifkan mode pemeliharaan?" → affects system-wide benchmark queue. |
| Danger zone styling | Red border section at bottom. Distinct from normal sections. |

---

## Content Notes

| Element | ID Copy | EN Copy |
|---------|---------|---------|
| Page title | Pengaturan | Settings |
| Tab: Profile | Profil | Profile |
| Tab: Preferences | Preferensi | Preferences |
| Tab: Notifications | Notifikasi | Notifications |
| Tab: System | Sistem | System |
| Avatar label | Foto Profil | Profile Photo |
| Display name | Nama Tampilan | Display Name |
| Email | Email | Email |
| Role | Peran | Role |
| Language | Bahasa | Language |
| Date format | Format Tanggal | Date Format |
| Theme | Tema | Theme |
| Theme: light | Terang | Light |
| Theme: dark | Gelap | Dark |
| Theme: system | Ikuti sistem | Follow system |
| Save profile | Simpan Profil | Save Profile |
| Save preferences | Simpan Preferensi | Save Preferences |
| Save notifications | Simpan Notifikasi | Save Notifications |
| Notif: review | Review ditetapkan kepada saya | Review assigned to me |
| Notif: completed | Benchmark selesai | Benchmark completed |
| Notif: failed | Benchmark gagal | Benchmark failed |
| Notif: published | Model dipublikasikan | Model published |
| Section: Packages | Paket Benchmark | Benchmark Packages |
| Section: Users | Manajemen Pengguna | User Management |
| Section: Health | Kesehatan API | API Health |
| Section: Danger | Zona Bahaya | Danger Zone |
| Maintenance | Mode Pemeliharaan | Maintenance Mode |
| **Success toast** | Pengaturan berhasil disimpan | Settings saved successfully |
| **Error toast** | Gagal menyimpan pengaturan. Coba lagi. | Failed to save settings. Try again. |
| **Avatar error** | File terlalu besar (maks 2 MB) | File too large (max 2 MB) |

---

## Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| **Desktop (> 1024px)** | Sidebar (240px) + centered settings content (max 800px). Tabs horizontal. |
| **Tablet (768–1024px)** | Collapsed sidebar (64px). Content takes remaining width. Tabs horizontal. |
| **Mobile (< 768px)** | Sidebar as drawer. Tabs become vertical list or scrollable horizontal pills. Full-width forms. |

| Element | Mobile Adaptation |
|---------|-------------------|
| Tabs | Horizontal scroll pill bar. Active tab underlined. |
| Avatar upload | Full-width tap target. |
| Toggle rows | Full-width. Toggle switch on the right edge. Description below label. |
| System tab table | Replace with card list (package name + status + configure link). |
| Danger zone | Full-width red-bordered section at bottom. |
| Save buttons | Sticky bottom bar per tab with Save CTA. |

---

## Assumptions

1. **Profile email is read-only** — managed by SSO or admin provisioning.
2. **Role is read-only** — only admins can change roles (via a separate admin panel).
3. **Notification delivery method** (email, in-app, push) is TBD. MVP uses in-app toggle + email as default.
4. **System tab** is admin-only. Non-admin users never see the tab. Direct URL access is guarded.
5. **Theme toggle is cosmetic for MVP** — light mode is default. Dark mode support depends on design system readiness.
6. **Benchmark package configuration** is read-only for MVP. Full CRUD is Phase 2.
