# Screen: Dashboard

> Route: `/dashboard`
> Audience: Admin / Reviewer
> Priority: P0
> Ref: `Screen_Specs.md` §01, `User_Flow.md` §2, `Design_System_Guide.md` §1–3

---

## Section Hierarchy

```
Page
├── Sidebar (persistent)
│   ├── Logo
│   ├── Nav group: Main
│   │   ├── Dashboard (active)
│   │   ├── Review Queue (with count badge)
│   │   └── All Models
│   ├── Nav group: Operations
│   │   ├── Runs
│   │   ├── Publication
│   │   └── System
│   └── User menu (bottom)
│       ├── Avatar + name
│       └── Logout
├── Main content
│   ├── Page header
│   │   ├── Title: "Dasbor"
│   │   └── Subtitle: date
│   ├── Summary tiles (4)
│   │   ├── Total Models
│   │   ├── Pending Reviews
│   │   ├── Active Runs
│   │   └── Published Models
│   ├── Review queue preview
│   │   ├── Section heading + "Lihat Semua →"
│   │   └── Queue table (top 5 rows)
│   ├── Recent runs
│   │   ├── Section heading + "Lihat Semua →"
│   │   └── Runs table (last 10 rows)
│   └── System health strip
│       ├── Job queue length
│       └── Last failure timestamp
└── (optional) Right panel
    └── Quick actions / notifications (Phase 2)
```

---

## Component Hierarchy

```
<AppShell>
  <Sidebar width={240} collapsedWidth={64}>
    <Logo clickable → /dashboard />
    <NavGroup label="Utama">
      <NavItem icon="LayoutDashboard" label="nav.dashboard" href="/dashboard" active />
      <NavItem icon="ClipboardList" label="nav.reviewqueue" href="/reviews" badge={pendingCount} />
      <NavItem icon="Layers" label="nav.allmodels" href="/models" />
    </NavGroup>
    <NavGroup label="Operasional">
      <NavItem icon="Play" label="nav.runs" href="/runs" />
      <NavItem icon="Globe" label="nav.publication" href="/publication" />
      <NavItem icon="Settings" label="nav.system" href="/system" />
    </NavGroup>
    <SidebarFooter>
      <UserMenu>
        <Avatar src={user.avatar} fallback={user.initials} />
        <span>{user.name}</span>
        <DropdownMenu>
          <MenuItem icon="Settings" label="Pengaturan" href="/settings" />
          <MenuItem icon="LogOut"   label="Keluar"     onClick={logout} />
        </DropdownMenu>
      </UserMenu>
    </SidebarFooter>
  </Sidebar>

  <MainContent>
    <PageHeader>
      <h1>"Dasbor"</h1>
      <p>{formattedDate}</p>
    </PageHeader>

    <TileGrid cols={4}>
      <SummaryTile
        id="tile-total-models"
        icon="Layers"
        value={stats.totalModels}
        label="Total Model"
        color="--color-status-active"
      />
      <SummaryTile
        id="tile-pending-reviews"
        icon="ClipboardList"
        value={stats.pendingReviews}
        label="Menunggu Review"
        color="--color-status-pending"
        clickable → /reviews
      />
      <SummaryTile
        id="tile-active-runs"
        icon="Play"
        value={stats.activeRuns}
        label="Eksekusi Aktif"
        color="--color-status-active"
        clickable → /runs
      />
      <SummaryTile
        id="tile-published"
        icon="Globe"
        value={stats.published}
        label="Dipublikasikan"
        color="--color-status-success"
        clickable → /ranking
      />
    </TileGrid>

    <Section>
      <SectionHeader>
        <h2>"Antrean Review"</h2>
        <Link href="/reviews">"Lihat Semua →"</Link>
      </SectionHeader>
      <Table id="dashboard-review-queue">
        <TableHead>
          <Th>Model</Th>
          <Th>Skor</Th>
          <Th>Kritis</Th>
          <Th>Status</Th>
          <Th>Aksi</Th>
        </TableHead>
        <TableBody>
          <TableRow clickable → /reviews/[id]>           ← repeated × 5
            <Td>{model.name}</Td>
            <Td><ScoreBlock mini value={score} /></Td>
            <Td><SeverityIndicator count={criticalCount} /></Td>
            <Td><StatusBadge status={status} /></Td>
            <Td><Button variant="ghost" label="Review →" /></Td>
          </TableRow>
        </TableBody>
      </Table>
    </Section>

    <Section>
      <SectionHeader>
        <h2>"Eksekusi Terbaru"</h2>
        <Link href="/runs">"Lihat Semua →"</Link>
      </SectionHeader>
      <Table id="dashboard-recent-runs">
        <TableHead>
          <Th>Run ID</Th>
          <Th>Model</Th>
          <Th>Status</Th>
          <Th>Skor</Th>
        </TableHead>
        <TableBody>
          <TableRow clickable → /models/[id]/runs/[runId]>    ← repeated × 10
            <Td>{run.id}</Td>
            <Td>{run.modelName}</Td>
            <Td><StatusBadge status={run.status} /></Td>
            <Td>{run.score ?? "—"}</Td>
          </TableRow>
        </TableBody>
      </Table>
    </Section>

    <SystemHealthStrip>
      <Metric icon="ListOrdered" label="Antrean Job" value={health.queueLength} />
      <Metric icon="AlertTriangle" label="Kegagalan Terakhir" value={health.lastFailure ?? "Tidak ada"} />
    </SystemHealthStrip>
  </MainContent>
</AppShell>
```

---

## Interaction Notes

| Element | Behavior |
|---------|----------|
| Summary tile click | Navigate to the corresponding list page (reviews, runs, ranking) |
| Tile: Pending Reviews | Highlight with amber pulse if `pendingReviews > 0` |
| Review queue row click | Navigate to `/reviews/[id]` |
| Recent runs row click | Navigate to `/models/[id]/runs/[runId]` |
| "Lihat Semua →" link | Navigate to full list page |
| Sidebar collapse | Toggle between 240px (expanded with labels) and 64px (icons only). Persist preference in localStorage. |
| Review Queue badge | Polled every 30 s via `GET /api/reviews?status=pending&count_only=true` |
| High-risk queue row | Apply `--color-severity-critical` 4px left border when `criticalCount > 0` |
| User menu dropdown | Settings → `/settings` · Logout → clear session → redirect to `/login` |

---

## Content Notes

| Element | ID Copy | EN Copy |
|---------|---------|---------|
| Page title | Dasbor | Dashboard |
| Tile: Total Models | Total Model | Total Models |
| Tile: Pending Reviews | Menunggu Review | Pending Reviews |
| Tile: Active Runs | Eksekusi Aktif | Active Runs |
| Tile: Published | Dipublikasikan | Published |
| Section: Queue | Antrean Review | Review Queue |
| Section: Runs | Eksekusi Terbaru | Recent Runs |
| "View all" link | Lihat Semua → | View All → |
| Queue columns | Model · Skor · Kritis · Status · Aksi | Model · Score · Critical · Status · Action |
| Run columns | Run ID · Model · Status · Skor | Run ID · Model · Status · Score |
| Health: Queue | Antrean Job | Job Queue |
| Health: Last fail | Kegagalan Terakhir | Last Failure |
| Health: No fail | Tidak ada | None |
| **Empty: queue** | Tidak ada review yang tertunda | No pending reviews |
| **Empty: runs** | Belum ada eksekusi | No runs yet |
| **Error** | Gagal memuat dasbor. Coba lagi. | Failed to load dashboard. Try again. |

---

## Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| **Desktop (> 1024px)** | Fixed sidebar (240px) + main content. Tiles: 4-col grid. Queue and Runs side-by-side (2-col). Health strip full width. |
| **Tablet (768–1024px)** | Collapsed sidebar (64px, icons only). Tiles: 2×2 grid. Queue and Runs stack vertically. |
| **Mobile (< 768px)** | Sidebar becomes a hamburger-triggered drawer. Tiles: 2×2 grid. All sections stack. Tables switch to compact card list. |

| Element | Mobile Adaptation |
|---------|-------------------|
| Sidebar | Hidden by default. Hamburger icon in top-left opens as overlay drawer. |
| Summary tiles | 2-col grid (2 rows). Touch-friendly tap targets. |
| Queue table | Replace with card list: Model name + badge + severity + "Review →" link. |
| Runs table | Replace with card list: Run ID + model + badge. |
| Health strip | Stack metrics vertically. |
