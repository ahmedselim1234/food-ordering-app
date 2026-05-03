# Aurum — Premium Food Ordering App

A full-featured food ordering web application built as a portfolio project, showcasing modern React architecture with a dark luxury aesthetic.

## Overview

Aurum is a single-page application that simulates a complete food ordering experience — from browsing a menu to placing and tracking orders. The entire data layer runs on mock data with no real backend, making it fully self-contained and deployable anywhere.

**Problem it solves:** Most React portfolio projects are either too simple (todo lists, weather apps) or too shallow (UI only with no real state management). Aurum demonstrates end-to-end feature ownership: auth flow, cart state, checkout with validation, order lifecycle, and route protection — all wired together with production-grade tooling.

## Features

- **Authentication** — Sign up / login with form validation via React Hook Form + Zod. Mock auth stores tokens in localStorage. Any email with a 6+ character password works.
- **Menu browsing** — Category tabs, food cards with detail modals, search/filter by category.
- **Cart** — Add/remove items, adjust quantities, persisted in Redux state. Slide-out cart sidebar available on all pages.
- **Checkout** — Multi-step flow: address form → payment form → order summary. Discount codes: `GOLD25`, `WELCOME30`, `NIGHT20`, `PREMIUM15`.
- **Order tracking** — Live status progression (Confirmed → Preparing → Out for Delivery → Delivered) with animated timeline.
- **Order history** — View all past orders with item details and totals.
- **Profile** — Edit personal details and saved addresses.
- **Protected routes** — Unauthenticated users are redirected to login for cart, checkout, orders, and profile pages.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS v3 — dark luxury theme (`#0a0a0a` bg, amber/gold accents) |
| Components | shadcn/ui (Radix UI primitives) |
| State management | Redux Toolkit |
| Data fetching | RTK Query (mock `queryFn` — no real API calls) |
| Routing | React Router v7 |
| Animations | Framer Motion |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |

## Project Structure

```
src/
├── components/
│   ├── auth/          # LoginForm, SignupForm
│   ├── cart/          # CartItem, CartSummary
│   ├── checkout/      # AddressForm, PaymentForm, OrderSummary
│   ├── layout/        # Navbar, Footer, CartSidebar
│   ├── menu/          # FoodCard, FoodModal, MenuGrid, CategoryTabs
│   ├── offers/        # HeroBanner, OfferCard
│   └── ui/            # shadcn/ui base components
├── data/              # Mock menu items, categories, offers
├── guards/            # ProtectedRoute auth guard
├── pages/             # Route-level page components
├── store/
│   ├── api/           # RTK Query APIs with mock queryFn
│   └── slices/        # cartSlice, authSlice, orderSlice
└── types/             # TypeScript interfaces
```

## Getting Started

```bash
npm install
npm run dev
```

The dev server starts on `http://localhost:5173`.

**Test credentials:** Use any email address and any password with 6 or more characters.

## Design Decisions

- **No real backend** — RTK Query's `queryFn` option lets every API call return mock data synchronously, keeping the app self-contained while still exercising the full RTK Query lifecycle (loading states, cache invalidation, optimistic updates).
- **Redux for cart state** — Cart items need to be accessible from the navbar, sidebar, cart page, and checkout simultaneously. Global Redux state is the right tool here rather than prop-drilling or Context.
- **Zod + React Hook Form** — Schema-first validation means the same Zod schema drives both runtime validation and TypeScript type inference, eliminating duplication between form types and validation logic.
- **shadcn/ui** — Components are copied into the repo rather than installed as a black-box dependency, making them fully customizable to fit the dark luxury theme without fighting a library's design decisions.

## Scripts

```bash
npm run dev       # Start development server
npm run build     # Type-check + production build
npm run lint      # ESLint
npm run preview   # Preview production build locally
```
