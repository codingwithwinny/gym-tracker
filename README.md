# 🏋️‍♂️ LiftLog - Gym Progress Tracker

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-10.0-orange?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
[![PWA](https://img.shields.io/badge/PWA-Ready-green?style=for-the-badge&logo=pwa)](https://web.dev/progressive-web-apps/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

A modern, responsive Progressive Web App (PWA) for tracking gym workouts with real-time synchronization, analytics, and comprehensive workout management. Built with Next.js, TypeScript, and Firebase for a seamless cross-platform experience.

## ✨ Features

### 🎯 Core Functionality
- **Workout Logging**: Track exercises, sets, reps, and weights with timestamps
- **Exercise Library**: Comprehensive database of exercises with categories
- **Progress Analytics**: Visual charts and insights for tracking improvements
- **Workout Plans**: Create and follow structured workout routines
- **Real-time Sync**: Cloud synchronization across all devices
- **Offline Support**: PWA functionality for offline workout tracking

### 🔐 Authentication & Security
- **Google Sign-In**: Secure authentication via Firebase Auth
- **Data Privacy**: User-specific data isolation
- **Secure Storage**: Encrypted data storage in Firebase

### 📊 Analytics & Insights
- **Progress Charts**: Visual representation of strength gains
- **Workout History**: Complete exercise and session history
- **Performance Metrics**: Track personal records and improvements
- **Trend Analysis**: Identify patterns and plateaus

### 💾 Data Management
- **Backup & Restore**: Export/import workout data
- **Data Export**: Download workout history in various formats
- **Cloud Sync**: Automatic synchronization across devices

### 🎨 User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Mode**: Customizable theme preferences
- **Intuitive UI**: Clean, modern interface with smooth animations
- **PWA Features**: Install as native app on mobile devices

## 🚀 Live Demo

**[Try LiftLog Live](https://your-deployment-url.com)** *(Coming Soon)*

## 📱 Screenshots

*Screenshots will be added here once the app is deployed*

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, CSS Modules
- **Backend**: Firebase (Authentication, Firestore, Hosting)
- **PWA**: Service Workers, Web App Manifest
- **Charts**: Custom analytics with D3.js
- **State Management**: React Hooks, Context API
- **Build Tool**: Vite (via Next.js)
- **Package Manager**: npm

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)
- [Firebase CLI](https://firebase.google.com/docs/cli) (optional, for deployment)

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/codingwithwinny/gym-tracker.git
cd gym-tracker
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Firebase Setup

1. **Create a Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project" and follow the setup wizard
   - Enable Google Sign-In in Authentication → Sign-in methods

2. **Add Web App**:
   - In your Firebase project, click the web icon (</>) to add a web app
   - Register your app and copy the configuration

3. **Environment Variables**:
   Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🏗️ Project Structure

```
gym-tracker/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   └── globals.css     # Global styles
│   ├── components/         # React components
│   │   ├── tracker/        # Main app components
│   │   │   ├── AuthGate.tsx
│   │   │   ├── LogTab.tsx
│   │   │   ├── ExercisesTab.tsx
│   │   │   ├── AnalyticsTab.tsx
│   │   │   ├── PlanTab.tsx
│   │   │   ├── SettingsTab.tsx
│   │   │   └── BackupRestore.tsx
│   │   └── ui/            # Reusable UI components
│   └── lib/               # Utilities and configurations
│       ├── firebase.ts    # Firebase configuration
│       ├── types.ts       # TypeScript type definitions
│       └── utils.ts       # Helper functions
├── public/                # Static assets
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## 🚀 Deployment

### Firebase Hosting (Recommended)

1. **Install Firebase CLI**:
```bash
npm install -g firebase-tools
```

2. **Login to Firebase**:
```bash
firebase login
```

3. **Initialize Firebase**:
```bash
firebase init hosting
```

4. **Build and Deploy**:
```bash
npm run build
firebase deploy --only hosting
```

### Vercel Deployment

1. **Connect to Vercel**:
   - Push your code to GitHub
   - Import the repository in [Vercel](https://vercel.com)
   - Vercel will automatically detect Next.js and deploy

2. **Environment Variables**:
   - Add your Firebase configuration in Vercel's environment variables

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Follow the existing code style

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Firebase](https://firebase.google.com/) for backend services
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vercel](https://vercel.com/) for deployment platform

## 📞 Support

If you have any questions or need help:

- **Issues**: [GitHub Issues](https://github.com/codingwithwinny/gym-tracker/issues)
- **Discussions**: [GitHub Discussions](https://github.com/codingwithwinny/gym-tracker/discussions)
- **Email**: [Your Email]

## 🔮 Roadmap

- [ ] **Social Features**: Share workouts and achievements
- [ ] **Advanced Analytics**: Machine learning insights
- [ ] **Workout Templates**: Pre-built workout plans
- [ ] **Nutrition Tracking**: Integrated meal planning
- [ ] **Wearable Integration**: Connect with fitness devices
- [ ] **Multi-language Support**: Internationalization
- [ ] **Advanced Charts**: More detailed progress visualizations

---

<div align="center">

**Made with ❤️ by [Winny]**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/codingwithwinny)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ancywinstondsilva/)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/your-handle)

</div>
