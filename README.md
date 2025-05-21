# Japanese Restaurants - Full Stack Application

A modern, full-stack application for browsing and favoriting Japanese restaurants. Built with Next.js, tRPC, Prisma, PostgreSQL, and Shadcn UI.

![image](https://github.com/user-attachments/assets/c972332a-6972-49e7-961c-c20af1ca400b)
![image](https://github.com/user-attachments/assets/ae28330e-0bff-4fcd-ad83-adc588210cc8)
![image](https://github.com/user-attachments/assets/98e26d52-f442-40c3-88dc-73690dab846e)


## Features

- **Browse Restaurants**: View and filter restaurants by category, city, and favorites
- **Detailed Restaurant Pages**: View comprehensive information about each restaurant
- **Favorites System**: Mark and manage your favorite restaurants
- **Responsive Design**: Optimized for all devices from mobile to desktop
- **Type-Safe API**: End-to-end type safety with tRPC
- **Modern UI**: Beautiful UI components from Shadcn UI
- **Dark Mode**: Full support for light and dark themes
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support

## Tech Stack

### Frontend
- **Next.js 13+ (App Router)**: React framework with server components
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn UI**: High-quality UI components built with Radix UI and Tailwind
- **React Query**: Data fetching and caching

### Backend
- **tRPC**: End-to-end typesafe APIs
- **Prisma**: Type-safe database client
- **PostgreSQL**: Relational database

## Getting Started

### Prerequisites

- Node.js (v16+)
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/japanese-restaurants.git
   cd japanese-restaurants
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your database connection string and other settings.

4. Set up the database:
   ```bash
   # Generate Prisma client
   npm run db:generate
   # or
   yarn db:generate
   
   # Push schema to database
   npm run db:push
   # or
   yarn db:push
   
   # Seed the database with sample data
   npm run db:seed
   # or
   yarn db:seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
japanese-restaurants/
├── app/                  # Next.js app router pages
│   ├── _trpc/            # tRPC client setup
│   ├── api/              # API routes
│   ├── restaurants/      # Restaurant pages
│   ├── favorites/        # Favorites page
│   └── ...               # Other pages
├── components/           # React components
│   ├── home/             # Homepage components
│   ├── layout/           # Layout components
│   ├── restaurants/      # Restaurant components
│   └── ui/               # UI components (Shadcn)
├── lib/                  # Utility functions
├── prisma/               # Prisma schema and migrations
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Seed script
├── public/               # Static assets
├── server/               # Server-side code
│   ├── api/              # tRPC API
│   │   ├── routers/      # API routes
│   │   └── trpc.ts       # tRPC setup
│   └── db.ts             # Database client
├── styles/               # Global styles
└── ...                   # Config files
```

## Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm run start`: Start the production server
- `npm run lint`: Run ESLint
- `npm run db:generate`: Generate Prisma client
- `npm run db:push`: Push Prisma schema to database
- `npm run db:studio`: Open Prisma Studio
- `npm run db:seed`: Seed the database with sample data

## Deployment

This application can be deployed to any platform that supports Next.js applications, such as Vercel, Netlify, or your own server.

### Deploy to Vercel

The easiest way to deploy is using Vercel:

1. Push your code to a GitHub repository
2. Import the project to Vercel
3. Add your environment variables
4. Deploy!

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Restaurant data and images from Unsplash
- UI components from Shadcn UI
- Icons from Lucide Icons
