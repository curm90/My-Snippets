# My Snippets

A modern, full-stack code snippet management application built with Next.js, TypeScript, and Prisma. Organize, search, and manage your code snippets with an intuitive interface featuring folders, tags, and syntax highlighting.

## ✨ Features

### 📝 Snippet Management

- **Create, Read, Update, Delete** snippets with a clean interface
- **Syntax highlighting** with CodeMirror integration
- **Copy to clipboard** functionality with toast notifications
- **Language selection** with color-coded badges
- **Tag system** for better organization and categorization

### 📁 Organization

- **Folder system** to organize snippets by project or category
- **Hierarchical navigation** with sidebar folder tree
- **Inline folder renaming** with keyboard shortcuts (Enter/Escape)
- **Smart deletion** - folders can be deleted without affecting contained snippets

### 🔍 Search & Discovery

- **Real-time search** across snippet titles, content, and languages
- **Search within folders** to find specific snippets quickly
- **Tag-based filtering** for advanced organization

### 🎨 User Experience

- **Dark/Light theme** support with system preference detection
- **Responsive design** optimized for desktop and mobile
- **Loading states** and **optimistic updates** for smooth interactions
- **Toast notifications** for user feedback on all actions
- **Smart navigation** that preserves context during operations

### 🔐 Authentication & Security

- **Secure authentication** with NextAuth.js
- **User isolation** - each user only sees their own snippets
- **Protected routes** with middleware-based access control
- **Session management** with secure token handling

### 🗄️ Database & Performance

- **PostgreSQL** database with Prisma ORM
- **Optimized queries** with proper indexing and relationships
- **Database migrations** for schema evolution
- **Seed data** for quick setup and testing

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Backend**: Next.js API routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **Code Editor**: CodeMirror 6
- **Form Handling**: React Hook Form with Zod validation
- **Notifications**: Sonner (toast library)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd my-snippets
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Configure your database URL and NextAuth secret in `.env.local`

4. **Set up the database**

   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open in browser**

   Navigate to `http://localhost:3000`

## 📁 Project Structure

```text
src/
├── app/                    # Next.js app router
│   ├── (dashboard)/       # Protected dashboard routes
│   ├── api/               # API routes
│   └── auth/              # Authentication pages
├── components/            # Reusable UI components
├── data-access/          # Database queries and mutations
├── lib/                  # Utility functions and configurations
├── types/                # TypeScript type definitions
└── contexts/             # React context providers

prisma/
├── schema.prisma         # Database schema
├── migrations/           # Database migrations
└── seed.ts              # Seed data script
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio for database management
- `npx prisma migrate dev` - Run database migrations
- `npx prisma db seed` - Seed the database with sample data

## 🌟 Key Features in Detail

### Folder Management

- Create folders to organize your snippets
- Rename folders inline with intuitive UI
- Delete folders while preserving snippets
- Navigate folder hierarchy with breadcrumbs

### Advanced Search

- Search across all snippet content, titles, and metadata
- Real-time results as you type
- Search within specific folders
- Clear visual feedback for search results

### Smart UI Interactions

- Optimistic updates for instant feedback
- Loading states prevent double-clicks and race conditions
- Context-aware navigation (stay in folder vs. go to home)
- Keyboard shortcuts for common actions

### Code Editor Features

- Syntax highlighting for 20+ programming languages
- Dark/light theme integration
- Responsive code blocks
- Copy snippet content with one click

## 🚧 Future Enhancements

- [ ] Mobile app responsiveness improvements
- [ ] Advanced search filters (by language, tags, date)
- [ ] Snippet sharing capabilities
- [ ] Export/import functionality
- [ ] Collaboration features
- [ ] API for external integrations

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using Next.js and modern web technologies.
