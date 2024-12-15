# VMHub Web Application

## Overview
VMHub is a marketing automation platform designed for laundromat businesses. It manages WhatsApp messaging campaigns and customer engagement through an intuitive web interface.

## Features
- Campaign Management
  - Birthday campaigns
  - Welcome messages
  - Reactivation campaigns
  - Loyalty programs

- Configuration Management
  - VMHub API integration
  - WhatsApp business API setup
  - Client configuration

## Project Structure
```
vmhub-web/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   └── layout.tsx
│   │   ├── (authenticated)/
│   │   │   └── layout.tsx
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── campaigns/
│   │   │   ├── config/
│   │   │   └── user/
│   │   ├── campaigns/
│   │   │   ├── birthday/
│   │   │   ├── loyalty/
│   │   │   ├── reactivation/
│   │   │   └── welcome/
│   │   ├── config/
│   │   └── layout.tsx
│   ├── components/
│   │   ├── layout/
│   │   ├── ui/
│   │   └── forms/
│   ├── hooks/
│   │   ├── use-auth.ts
│   │   ├── use-campaign.ts
│   │   └── use-config.ts
│   ├── lib/
│   │   ├── context/
│   │   ├── firebase/
│   │   └── utils/
│   ├── styles/
│   └── types/
├── public/
├── .env.local
└── package.json
```

## Technology Stack
- Next.js 13+ with App Router
- Firebase Authentication
- Firestore Database
- Tailwind CSS
- TypeScript

## Prerequisites
- Node.js 18+
- npm/yarn
- Firebase project
- Google Cloud project

## Getting Started

### Installation
1. Clone the repository:
```bash
git clone https://github.com/your-org/vmhub-web.git
cd vmhub-web
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# API
NEXT_PUBLIC_API_URL=

# Environment
NEXT_PUBLIC_ENVIRONMENT=development
```

### Development
Run the development server:
```bash
npm run dev
```

### Build
Create a production build:
```bash
npm run build
npm start
```

## Features in Detail

### Campaign Management
1. **Birthday Campaigns**
   - Automated birthday messages
   - Customizable templates
   - Scheduling options

2. **Welcome Messages**
   - First-time customer greetings
   - Onboarding information
   - Special offers

3. **Reactivation Campaigns**
   - Target inactive customers
   - Customizable triggers
   - Performance tracking

4. **Loyalty Programs**
   - Points system
   - VIP customer management
   - Rewards automation

### Configuration
- VMHub API integration setup
- WhatsApp Business API configuration
- Client settings management

## Authentication
- Email/Password authentication
- Session management
- Protected routes
- Role-based access control

## State Management
- React Context for global state
- Custom hooks for data fetching
- Firebase real-time updates

## API Integration
The application integrates with several backend services:
- Firebase Authentication
- Firestore Database
- VMHub API
- WhatsApp Business API

## Components
The UI is built using reusable components:
- Form controls
- Navigation elements
- Campaign cards
- Configuration panels

## Testing
```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Run lint
npm run lint
```

## Deployment
The application can be deployed to Vercel:
```bash
vercel
```

## Development Workflow
1. Create feature branch
2. Implement changes
3. Write tests
4. Submit PR
5. Code review
6. Merge to main

## Error Handling
- Global error boundary
- Form validation
- API error handling
- User feedback

## Performance Optimization
- Static page generation
- Image optimization
- Code splitting
- Lazy loading

## Security
- Authentication middleware
- Input validation
- CORS configuration
- Environment variable protection

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License
This project is proprietary and confidential.

## Support
For support, please contact: