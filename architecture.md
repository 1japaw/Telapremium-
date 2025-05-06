# Architecture Documentation

## Overview

This application is a full-stack e-commerce platform for selling streaming service accounts, named "TelaPremium". It follows a client-server architecture with a React frontend and a Node.js Express backend. The application uses a PostgreSQL database through Drizzle ORM for data persistence.

The platform enables customers to browse streaming services, make purchases through PIX payments, and receive account credentials. It includes an admin panel for managing services, accounts, and orders.

## System Architecture

The application follows a modern web architecture with these key layers:

1. **Frontend**: React-based single-page application with client-side routing
2. **Backend**: Express.js API server providing RESTful endpoints
3. **Database**: PostgreSQL database accessed through Drizzle ORM
4. **Integrations**: Stripe payment processing

### High-Level Architecture Diagram

```
┌────────────────┐      ┌────────────────┐      ┌────────────────┐
│                │      │                │      │                │
│  React Client  │<────>│  Express API   │<────>│  PostgreSQL    │
│  (Client-side) │      │  (Server-side) │      │  Database      │
│                │      │                │      │                │
└────────────────┘      └────────────────┘      └────────────────┘
                               │
                               │
                               ▼
                        ┌────────────────┐
                        │                │
                        │  Stripe API    │
                        │  (Payments)    │
                        │                │
                        └────────────────┘
```

## Key Components

### Frontend Components

The frontend is built with React and follows a component-based architecture with these key elements:

1. **Routing**: Uses Wouter for lightweight client-side routing
2. **State Management**:
   - React Context API for managing global state (cart, authentication)
   - TanStack Query for server state management and data fetching
   
3. **UI Components**:
   - UI component library built with Radix UI primitives and styled with Tailwind CSS
   - Follows the "shadcn/ui" pattern for reusable components

4. **Key Pages**:
   - Homepage (`home.tsx`) - Main landing page with service listings
   - Service details (`service-details.tsx`) - Individual service page
   - Checkout flow (`cart.tsx`, `checkout.tsx`, `payment.tsx`, `success.tsx`)
   - Admin dashboard (`admin/index.tsx`, `admin/dashboard.tsx`, etc.)

### Backend Components

The backend uses Express.js with the following structure:

1. **API Routes**: Defined in `server/routes.ts`, providing endpoints for:
   - User authentication and registration
   - Service management (CRUD operations)
   - Shopping cart and checkout
   - Order processing
   - Admin operations

2. **Data Access Layer**: 
   - Database connection established in `server/db.ts`
   - `server/storage.ts` provides an abstraction layer for data operations
   - Type-safe data access using Drizzle ORM

3. **Middleware**:
   - Authentication middleware for protected routes
   - Request logging for API calls

### Database Schema

The database schema is defined in `shared/schema.ts` with the following key entities:

1. **Users**: Admin users who can manage the platform
2. **Services**: Streaming services available for purchase
3. **Accounts**: Actual streaming service account credentials (inventory)
4. **Orders**: Customer purchases
5. **Order Items**: Individual items within an order
6. **FAQs**: Frequently asked questions
7. **Testimonials**: Customer testimonials

## Data Flow

### Authentication Flow

1. User submits login credentials
2. Server validates credentials and issues a JWT token
3. Client stores token in localStorage
4. Token is included in subsequent API requests
5. Server validates token for protected routes

### Purchase Flow

1. User browses services and adds them to cart (stored in localStorage)
2. User proceeds to checkout and provides contact information
3. Payment is processed through Stripe integration
4. Upon successful payment, order is created in the database
5. Account credentials are marked as used and associated with the order
6. Customer receives account credentials via email

### Admin Operations Flow

1. Admin logs in with admin credentials
2. Admin can view and manage:
   - Service inventory
   - Account credentials
   - Customer orders
   - Site settings (FAQs, testimonials)
3. Changes are persisted to the database through API calls

## External Dependencies

### Frontend Dependencies

- **React**: Core UI library
- **Wouter**: Lightweight routing
- **TanStack Query**: Data fetching and caching
- **Radix UI**: Accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Build tool and development server
- **TypeScript**: Type safety

### Backend Dependencies

- **Express**: Web server framework
- **Drizzle ORM**: Type-safe database ORM
- **Neon Serverless**: PostgreSQL client for Neon database
- **Stripe**: Payment processing
- **Zod**: Schema validation
- **TypeScript**: Type safety

## Deployment Strategy

The application is configured to be deployed on Replit with these key considerations:

1. **Build Process**:
   - Frontend: Built with Vite (`npm run build`)
   - Backend: Bundled with esbuild

2. **Runtime Environment**:
   - Node.js 20
   - PostgreSQL 16 (via Neon Database)

3. **Deployment Configuration**:
   - `.replit` file configures the Replit environment
   - Automatic scaling configured via `deploymentTarget = "autoscale"`
   - Production deployment runs on port 80 (mapped from local port 5000)

4. **Environment Variables**:
   - Database connection string (`DATABASE_URL`)
   - Stripe API keys (`STRIPE_SECRET_KEY`)
   - Node environment (`NODE_ENV`)

5. **Database Management**:
   - Schema migrations handled via Drizzle Kit
   - Initial data seeding on application startup

## Development Workflow

1. **Local Development**:
   - `npm run dev`: Starts the development server
   - Vite provides HMR for the frontend
   - Server restarts automatically with code changes

2. **Database Migrations**:
   - `npm run db:push`: Applies schema changes to the database

3. **Production Build**:
   - `npm run build`: Creates production bundles
   - `npm run start`: Runs the production server