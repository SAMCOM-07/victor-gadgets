Create a comprehensive `AGENTS.md` file at the root of this project to serve as the primary development guide and source of truth for the Victor Gadgets website.

## 1. Project Overview

Victor Gadgets is a gadget and electronics business dealing in laptops, iPhones, accessories, and related services, including laptop repairs.

The goal is to build a professional, modern, responsive website that allows customers to:

- Discover available products.
- Browse products by category.
- View detailed product information.
- Add products to a shopping cart.
- Review their cart.
- Send their selected products as an order enquiry directly through WhatsApp.
- Learn about the business and its services.
- Find contact information and business location.

This is initially a frontend-focused demonstration of the proposed website. It will be presented to the business owner for approval and may later become the production website.

## 2. Existing Designs — IMPORTANT

I already have designs and visual references for this project.

**Do not independently redesign the website or introduce a completely different visual direction.**

Your responsibility is to implement the existing designs as faithfully as possible while making necessary improvements where appropriate.

Before implementing any page or component:

1. Inspect the available design references, screenshots, assets, and existing project files.
2. Understand the intended layout, spacing, typography, colours, component hierarchy, and interactions.
3. Reuse existing assets and design patterns wherever possible.
4. Identify inconsistencies, usability problems, and responsiveness issues.
5. Make only necessary adjustments to improve the implementation.

Where the existing designs leave room for interpretation, make professional design decisions that complement the established visual direction.

Do not replace existing designs with generic AI-generated layouts or templates.

## 3. Technology Stack

Use the following technologies:

- Next.js (latest installed version) with App Router.
- TypeScript with strict type checking.
- Tailwind CSS v4.
- shadcn/ui for reusable UI components.
- Zustand for shopping cart state management.
- Motion for animations.
- Lucide React for icons.
- React Hook Form for form management where appropriate.
- Zod for validation where appropriate.
- pnpm as the package manager.

Do not introduce additional libraries without a clear technical reason.

## 4. Project Scope

### Customer-facing website

Implement the following:

- Homepage.
- Product catalogue.
- Product category filtering.
- Product search and sorting where appropriate to the design.
- Individual product details pages.
- Shopping cart.
- WhatsApp ordering functionality.
- Services page.
- Contact page.
- Responsive navigation and footer.

### Product data

Use locally defined mock product data.

Products should contain appropriate fields such as:

- ID.
- Name.
- Slug.
- Description.
- Price.
- Category.
- Images.
- Specifications.
- Availability.
- Featured status.

Create reusable TypeScript types for product data.

Use realistic sample products covering laptops, smartphones, and accessories.

Keep product data separate from presentation components so it can later be replaced with a database or API.

### Shopping cart

Implement a functional shopping cart using Zustand.

Requirements:

- Add products.
- Remove products.
- Increase and decrease quantities.
- Calculate subtotal.
- Display cart item count.
- Persist cart contents using Zustand persist middleware and localStorage.
- Handle empty cart states.
- Prevent invalid quantities.

### WhatsApp ordering

Customers should be able to submit their cart as a WhatsApp enquiry.

Generate a properly formatted message containing:

- Product names.
- Quantities.
- Individual prices.
- Total amount.

Use WhatsApp click-to-chat functionality.

Keep the business WhatsApp number in a central configuration file rather than hardcoding it in multiple components.

### Services and contact

Include the relevant business services, contact information, social media links, business location, and customer review sections where supported by the designs.

## 5. Explicitly Excluded Features

Do not implement the following in this demonstration:

- Admin dashboard.
- Authentication or login.
- Database integration.
- Supabase or Firebase.
- Backend API.
- Online payment processing.
- Formal order management.
- Customer accounts.
- Wishlist.
- Inventory quantity tracking.

Do not create fake implementations of these features.

The product catalogue should work entirely with mock data.

Keep the architecture clean enough to accommodate these features in a future production version.

## 6. Architecture and Code Organisation

Use a clean, maintainable, feature-oriented structure.

Suggested structure:

src/
├── app/
│   ├── page.tsx
│   ├── products/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── cart/
│   │   └── page.tsx
│   ├── services/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── ui/
│   ├── layout/
│   └── shared/
│
├── features/
│   ├── products/
│   │   ├── components/
│   │   ├── data/
│   │   ├── types/
│   │   └── utils/
│   └── cart/
│       ├── components/
│       ├── store/
│       └── utils/
│
├── config/
├── lib/
└── types/

This is a suggested structure. Adjust it where necessary without introducing unnecessary abstraction.

Keep components modular and reusable. Avoid excessively large page components.

## 7. Design and UI Guidelines

- Follow the supplied designs.
- Prioritise visual consistency.
- Use responsive layouts across mobile, tablet, and desktop.
- Maintain consistent spacing, typography, colours, and border radii.
- Use appropriate loading, empty, and error states.
- Ensure buttons and interactive elements have clear hover, focus, and active states.
- Use semantic HTML and accessible components.
- Avoid unnecessary animations.
- Avoid excessive gradients, shadows, and decorative elements unless present in the designs.
- Use Next.js Image for optimised image rendering where appropriate.

Do not use emojis as substitutes for icons.

## 8. Next.js Development Guidelines

- Prefer Server Components by default.
- Use Client Components only when interactivity or browser APIs require them.
- Keep client-side state limited to genuinely interactive features.
- Use appropriate metadata for SEO.
- Create meaningful page titles and descriptions.
- Use dynamic routes for product details.
- Avoid unnecessary client-side fetching.
- Avoid unnecessary use of useEffect.
- Follow current Next.js conventions for the installed version.

## 9. Performance and Quality

- Optimise images.
- Avoid unnecessary dependencies.
- Avoid excessive component re-rendering.
- Ensure the website performs well on mobile devices.
- Use TypeScript properly rather than relying on `any`.
- Maintain consistent naming conventions.
- Remove unused code and dependencies.
- Ensure there are no console errors or TypeScript errors.

## 10. Development Workflow

Work incrementally.

Before making major changes:

1. Inspect the existing project structure.
2. Inspect the supplied designs and assets.
3. Understand the existing implementation.
4. Identify the components and pages required.
5. Propose the implementation approach.

Implement one major section at a time.

After each stage:

- Check for TypeScript errors.
- Check for linting errors.
- Verify responsiveness.
- Check that existing functionality has not broken.

Do not make unrelated changes to working components.

Do not install additional dependencies without explaining why they are necessary.

Do not overwrite or remove existing assets without checking their purpose.

## 11. Important Development Rules

- Do not invent business information, contact details, addresses, reviews, or product specifications.
- Use clearly identified placeholders where actual business information is unavailable.
- Do not claim that mock product data represents Victor Gadgets' actual inventory.
- Do not implement features outside the agreed demonstration scope without approval.
- Do not sacrifice design fidelity for unnecessary abstraction.
- Prioritise a polished, functional customer-facing experience.

## Final Instruction

Treat this document as the project's development guideline.

The existing designs are the primary visual reference. Your responsibility is to translate them into clean, responsive, maintainable code while making only necessary improvements.

Always inspect before implementing. Do not rush into generating the entire application in one step.