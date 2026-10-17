# eSchool — Production Grade Build Plan

## What eSchool Is

A Skool.com clone built for Africa. Community + Courses + Gamification in one platform.
Built with Next.js 16+, Prisma, PostgreSQL, Clerk auth, Flutterwave + Stripe payments, Material UI (MUI).

---

## Current State Analysis

### What Exists (Good Foundation)
| Area | Status |
|------|--------|
| **Schema** | 11 models: User, Group, Post, Comment, Like, Course, Module, Section, Channel, Message, Affiliate, Subscription |
| **Auth** | Clerk integration (sign-in, sign-up, middleware) |
| **Payments** | Stripe (subscriptions, connect for affiliates) |
| **Group Pages** | Create, explore, about, join |
| **Channels & Posts** | Feed, post detail, comments, likes |
| **Courses** | Course list, module list, section content |
| **Messages** | Basic chat between users |
| **Leaderboard** | Points-based gamification |
| **Settings** | Group settings, domains, integrations, subscriptions, affiliates |
| **Components** | 60+ reusable components (rich text editor, forms, sidebar, search, etc.) |
| **Landing** | Landing page with pricing, CTA, navbar |

### What's Missing (Production Gaps)

| Priority | Gap | Impact |
|----------|-----|--------|
| CRITICAL | No tests (unit, integration, E2E) | Can't refactor safely |
| CRITICAL | No CI/CD pipeline | Manual deploys, no quality gate |
| CRITICAL | No error monitoring (Sentry) | Users break, you don't know |
| CRITICAL | No rate limiting | API abuse, spam |
| HIGH | No real-time messaging | Messages are not live (no websockets/Socket.io) |
| HIGH | No notifications | Users don't get alerts for likes, comments, replies |
| HIGH | No file/image upload | Uploadcare is integrated but not used consistently |
| HIGH | No search (posts, courses, members) | Basic group search only |
| HIGH | No mobile responsive design | Desktop-first, mobile broken |
| HIGH | No gamification logic | Leaderboard exists but no point system wired |
| MEDIUM | No onboarding flow | New users lost |
| MEDIUM | No email notifications | No welcome, reset, or engagement emails |
| MEDIUM | No analytics | Can't track engagement or revenue |
| MEDIUM | No content moderation | No report, block, or admin tools |
| MEDIUM | No i18n | English only |
| LOW | No dark mode | Not implemented |
| LOW | No PWA | No offline or install-to-home-screen |
| Low | No SEO | No meta tags, sitemap, or structured data |

---

## Skool.com Reverse Engineering Results

### Tech Stack (from live HTML source)
- **Framework:** Next.js (App Router, `/_next/static/chunks/`)
- **UI Library:** Material UI (MUI) — confirmed by styled-components + MUI class names
- **Fonts:** Roboto (300, 400, 500, 700) + IBM Plex Sans (500, 600)
- **API:** `api.skool.com` and `api2.skool.com` (two API endpoints)
- **Assets:** `assets.skool.com` (CDN)
- **Security:** AWS WAF (Web Application Firewall)

### Discovery Page Structure
- **Categories:** Trending, Hobbies, Music, Money, Spirituality, Tech, Health, Sports, Self-improvement, Relationships, More...
- **Pagination:** 34 pages of communities
- **Community cards show:** Name, description, member count, rating (stars + review count), price/month
- **Filter button** available
- **"Create your own"** CTA at top

### Community/About Page Structure
- **Header:** Community name, rating, review count, video intro
- **Privacy:** Private/Public badge
- **Stats:** Member count, price/month, admin name
- **Description:** Rich text with emoji, bullet points, links
- **Reviews section:** Member testimonials with "Still a paying member after X months"
- **Sidebar:** Member count, online count, admin count, "START FREE TRIAL" CTA
- **Footer:** Privacy and terms, community URL

### Signup Page
- **Headline:** "Build a community around your passion"
- **Social proof:** "Get discovered by 30 million users, Join 200k communities earning $1 billion per year"
- **Example earnings:** "Calligraphy School Earns $6,237/month"
- **CTA:** "CREATE YOUR COMMUNITY" (single button, no form visible — likely modal or multi-step)
- **Minimal fields:** No visible email/password on first screen

### Footer Links
- Community → `skool.com/community`
- Affiliates → `skool.com/affiliate-program`
- Support → `help.skool.com`
- Careers → `skool.com/careers`

### Pricing (from community cards)
- Range: $9/month to $249/month
- Common: $69/month, $97/month, $99/month
- All communities have free trial (7 days)

### Key Observations
1. **Simple auth** — no visible email/password fields on signup, likely phone or social auth
2. **MUI everywhere** — Skool uses Material UI, which aligns with eSchool requirement
3. **Two APIs** — `api.skool.com` and `api2.skool.com` suggest microservices or geographic distribution
4. **AWS WAF** — proper security infrastructure
5. **No complex onboarding** — single CTA, minimal friction
6. **Social proof driven** — earnings, member count, ratings prominently displayed
7. **34 pages of communities** — massive directory, SEO-critical

---

## Skool.com Feature Mapping

| Skool Feature | eSchool Equivalent | Status |
|---------------|-------------------|--------|
| Community feed | Channel + Posts | EXISTS |
| Classroom courses | Courses + Modules + Sections | EXISTS |
| Calendar events | Nothing | MISSING |
| Live calls (Skool Call) | Nothing | MISSING |
| DMs | Messages | BASIC |
| Gamification (points, levels) | Leaderboard | SCHEMA ONLY |
| Discovery (explore) | Explore page | EXISTS |
| Mobile apps | Responsive web only | PARTIAL |
| Affiliate program | Affiliate model | SCHEMA ONLY |
| Custom domains | Settings > Domains | UI EXISTS |
| Native video hosting | Nothing | MISSING |
| Unlimited members | No limits | OK |

---

## Production Build Plan — 6 Phases

### Phase 1: Foundation Hardening (Week 1)
**Goal:** Make the codebase production-safe

1. **Testing setup**
   - Vitest for unit tests
   - Playwright for E2E tests
   - React Testing Library for component tests
   - Target: 80% coverage on critical paths (auth, payments, posts)

2. **CI/CD pipeline**
   - GitHub Actions: lint → typecheck → test → build → deploy
   - Preview deployments for PRs
   - Production deploy on main merge

3. **Error monitoring**
   - Sentry integration (Sentry.js for Next.js)
   - Source map upload in CI
   - Alerting for critical errors

4. **API rate limiting**
   - Upstash Redis rate limiting
   - Middleware protection on all mutations
   - Per-user and per-IP limits

5. **Environment & secrets**
   - .env.example with all required vars
   - Secret scanning in CI (gitleaks)
   - Separate dev/staging/prod environments

### Phase 2: Core UX Completion (Week 2-3)
**Goal:** Match Skool's core experience

1. **Real-time messaging**
   - Socket.io or Ably for live chat
   - Online presence indicators
   - Unread message counts
   - Typing indicators

2. **Notifications system**
   - Notification model in Prisma
   - Bell icon with unread count
   - Notify on: like, comment, reply, mention, course complete
   - Email digest (daily/weekly)

3. **File & image upload**
   - Uploadcare integration for all uploads
   - Course thumbnails
   - Group gallery
   - Post attachments
   - User avatars

4. **Gamification engine**
   - Point rules: post=5, comment=3, like received=1, course complete=10
   - Level thresholds (10, 50, 150, 300, 500, 1000)
   - Leaderboard by group
   - Level badges on profile
   - Course unlock by level

5. **Search**
   - PostgreSQL full-text search on posts, courses, members
   - Search bar in navbar
   - Recent searches
   - No-results state

### Phase 3: Mobile & Responsive (Week 3-4)
**Goal:** Mobile-first experience (60%+ of African users are mobile)

1. **Responsive redesign**
   - Mobile navigation (bottom tab bar)
   - Swipeable cards
   - Touch-friendly targets (44px minimum)
   - Pull-to-refresh on feeds
   - Infinite scroll on mobile

2. **Performance**
   - Image optimization (next/image)
   - Bundle splitting
   - Lazy loading
   - Target: <3s LCP on 3G

3. **PWA**
   - Service worker for offline shell
   - Install prompt
   - Push notifications

### Phase 4: Engagement & Retention (Week 4-5)
**Goal:** Keep users coming back

1. **Email system**
   - Resend or SendGrid integration
   - Welcome email
   - Weekly digest (new posts, courses, activity)
   - Password reset
   - Email verification

2. **Onboarding flow**
   - 3-step wizard: profile → interests → first group
   - Tooltips on key features
   - Sample content for new groups

3. **Calendar & events**
   - Event model in Prisma
   - Group calendar view
   - RSVP system
   - Event reminders

4. **Content moderation**
   - Report button on posts/comments
   - Admin moderation queue
   - Auto-flag inappropriate content
   - Block/mute users

### Phase 5: Monetization & Scale (Week 5-6)
**Goal:** Revenue-ready

1. **Payment hardening**
   - Flutterwave webhook handling (idempotent) — primary for Africa
   - Stripe webhook handling — international fallback
   - Failed payment retry logic
   - Proration for plan changes
   - African payment methods via Flutterwave: MTN MoMo, Airtel Money, M-Pesa, Paystack

2. **Affiliate system**
   - Unique referral links
   - Commission tracking (20% recurring)
   - Affiliate dashboard
   - Payout via Stripe Connect

3. **Analytics**
   - PostHog or Plausible (privacy-friendly)
   - Track: DAU, WAU, retention, engagement
   - Revenue metrics (MRR, churn, LTV)
   - Feature usage

4. **Admin dashboard**
   - Platform-wide stats
   - User management
   - Group management
   - Content moderation
   - Revenue analytics

### Phase 6: African Optimization (Week 6-7)
**Goal:** Built for African market conditions

1. **Offline-first**
   - Cache critical data in IndexedDB
   - Queue mutations when offline
   - Sync when back online

2. **Low-bandwidth mode**
   - Compressed images
   - Text-only mode
   - Disable auto-play videos
   - Data saver toggle

5. **Local payment methods via Flutterwave**
   - MTN MoMo (Zambia, Ghana, Uganda)
   - Airtel Money (Zambia, Tanzania, Uganda)
   - M-Pesa (Kenya, Tanzania)
   - Paystack (Nigeria, Ghana)
   - Mobile money integration — Flutterwave handles all African mobile money

4. **Multi-language**
   - i18n with next-intl
   - English, French, Portuguese, Swahili, Arabic
   - RTL support

5. **Local hosting**
   - Consider African data centers
   - CDN with African edge locations
   - Sub-100ms latency target

---

## Tech Stack (Upgraded)

| Layer | Current | Production |
|-------|---------|------------|
| Framework | Next.js 14 | Next.js 16+ (App Router, React 19) |
| UI Library | Tailwind + shadcn/ui | Material UI (MUI) v6 — end to end |
| Database | PostgreSQL (Prisma) | PostgreSQL + Redis (Upstash) |
| Auth | Clerk | Clerk + 2FA |
| Payments | Stripe | Flutterwave (primary) + Stripe (international) |
| Real-time | None | Socket.io or Ably |
| Search | None | PostgreSQL FTS + Meilisearch |
| Storage | Uploadcare | Uploadcare + S3 |
| Monitoring | None | Sentry + PostHog |
| Email | None | Resend |
| Deployment | Vercel | Vercel + Cloudflare |
| Testing | None | Vitest + Playwright |
| CI/CD | None | GitHub Actions |

---

## Immediate Next Steps (This Week)

1. **Set up Sentry** — 30 minutes, catches all errors
2. **Add ESLint + Prettier rules** — enforce code quality
3. **Write 10 critical tests** — auth, create post, join group, make payment
4. **Set up GitHub Actions** — lint, typecheck, test on every PR
5. **Fix mobile navigation** — bottom tab bar for mobile
6. **Add loading states** — MUI Skeleton everywhere
7. **Add error boundaries** — graceful failures
8. **Install MUI v6** — @mui/material, @mui/icons-material, @emotion/react, @emotion/styled
9. **Create MUI theme** — ZMP Tech palette (primary #3B82F6, secondary #F97316)
10. **Migrate all shadcn/ui → MUI** — Button, Card, Dialog, Input, Select, etc.
11. **Replace Tailwind → MUI sx prop** — end to end, no Tailwind classes remain
12. **Set up Flutterwave SDK** — @flutterwave/node, test API keys
13. **Upgrade to Next.js 16+** — React 19, latest App Router features

---

## Revenue Model (Skool-like)

| Plan | Price | Features |
|------|-------|----------|
| Free | $0 | 1 group, 10 members, basic features |
| Pro | $99/mo | Unlimited groups, unlimited members, all features |
| Annual | $999/yr | Save 16%, priority support |
| Transaction fee | 0% | Keep all your revenue |

African pricing:
| Plan | Price | Features |
|------|-------|----------|
| Free | $0 | 1 group, 50 members |
| Pro | $49/mo | Unlimited groups, all features |
| Annual | $499/yr | Save 16% |

---

## The Bottom Line

eSchool has a solid foundation — 60+ components, full schema, Clerk auth, Stripe payments. But it's a starter kit, not a production platform.

The gap between "works on my machine" and "thousands of users in Africa" is:
1. **Reliability** (testing, monitoring, CI/CD)
2. **Engagement** (real-time, notifications, gamification)
3. **Mobile** (responsive, offline, low-bandwidth)
4. **Scale** (payments, African market, local methods)

Close those gaps and eSchool becomes a real Skool competitor for Africa.

---

*Plan created: October 2026*
*Target production launch: December 2026*
*Team: 1-2 developers*
