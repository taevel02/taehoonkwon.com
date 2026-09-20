# taehoonkwon.com

Personal archive and blog built with Astro 7.3.3 and Vite.

## Features

- **Static delivery**: Content Collections generate pages at build time for Vercel.
- **Performance**: Local fonts, image optimization, and minimal client JavaScript.
- **Modern Styling**: Tailwind CSS v4 with custom theme support.
- **Publishing**: RSS, Sitemap, metadata, and Google Analytics 4.

## Getting Started

### Prerequisites

- Node.js 22.x
- [pnpm](https://pnpm.io/)

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Preview

```bash
pnpm preview
```

## Vercel

- Framework Preset: `Astro`
- Build Command: `pnpm build`
- Install Command: `pnpm install --frozen-lockfile`
- Root Directory: repository root
- Environment Variable: `PUBLIC_GA_MEASUREMENT_ID` (선택, 미설정 시 기본 측정 ID 사용)
- 기존 `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY` 환경변수는 삭제

배포 후 `/`, `/archives`, `/scuba`, `/products`, `/rss.xml`, `/sitemap.xml`을 확인하고, 기존 `/en/*`, `/ko/*` 주소가 루트 경로로 이동하는지 확인합니다.
