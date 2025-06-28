# Solo Improvement 🎯

**Level Up Your Life Through Gamification**

Solo Improvement is a gamified personal development application that transforms your daily habits and goals into an engaging RPG-like experience. Track your progress, unlock achievements, and become the best version of yourself.

🌐 **Live Demo:** [https://solo-improvement.netlify.app](https://solo-improvement.netlify.app)

![Solo Improvement Dashboard](https://images.pexels.com/photos/4709285/pexels-photo-4709285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)

## ✨ Features

### 🎮 Core Gameplay
- **Character System**: Create your hunter profile with customizable avatars and stats
- **Experience & Leveling**: Gain XP by completing quests and level up your character
- **Six Core Stats**: Strength, Intelligence, Discipline, Charisma, Vitality, and Agility
- **Rank System**: Progress from E-rank to S-rank hunter

### 📋 Quest Management
- **Daily Quests**: Recurring challenges that reset every 24 hours
- **Weekly Quests**: Longer-term objectives for sustained progress
- **Quest Difficulties**: Easy, Medium, Hard, and Extreme challenges
- **Automatic Reset**: Daily quests reset automatically at midnight UTC

### 🌟 Skills & Progression
- **Skill Tree**: Unlock abilities with prerequisite requirements
- **Skill Points**: Earned through leveling up
- **Passive Bonuses**: Each skill provides permanent stat improvements
- **Visual Skill Map**: Interactive node-based skill progression

### 👻 Shadow System
- **Shadow Extraction**: Extract shadows from completed quests
- **Stat Bonuses**: Shadows provide permanent attribute improvements
- **Collection Mechanics**: Build your army of shadows over time

### 🏰 Dungeon Challenges
- **Ranked Dungeons**: E through S-class difficulty dungeons
- **Entry Requirements**: Level and stat prerequisites for each dungeon
- **Progressive Unlocking**: Complete dungeons to unlock harder challenges
- **Substantial Rewards**: High XP rewards for dungeon completion

### 🏆 Achievement System
- **Multiple Categories**: Quests, Skills, Level, Shadows, Dungeons, Consistency
- **Rarity Tiers**: Common, Rare, Epic, and Legendary achievements
- **Hidden Achievements**: Secret accomplishments to discover
- **Progress Tracking**: Real-time progress updates and completion notifications

### 🎨 Customization & Personalization
- **Avatar Frames**: Unlock decorative frames through achievements
- **Titles**: Earn and display prestigious titles
- **Name Colors**: Customize your hunter name appearance
- **Theme Options**: Dark, Light, and Auto themes
- **Accent Colors**: Personalize the UI color scheme
- **Profile Editing**: Update hunter name and avatar

### 🔔 Smart Notifications
- **Achievement Unlocks**: Celebrate your accomplishments
- **Level Up Alerts**: Get notified when you reach new levels
- **Quest Completions**: Instant feedback on completed tasks
- **Attribute Points**: Reminders when you have points to spend
- **Notification Center**: Centralized notification management

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account (for database)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/solo-improvement.git
   cd solo-improvement
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up the database**
   - Create a new Supabase project
   - Run the migration files in `supabase/migrations/`
   - The database schema will be automatically created

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

## 🏗️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful, customizable icons
- **Zustand** - Lightweight state management
- **React Router** - Client-side routing

### Backend & Database
- **Supabase** - Backend-as-a-Service with PostgreSQL
- **Row Level Security (RLS)** - Secure data access
- **Real-time subscriptions** - Live data updates
- **Edge Functions** - Serverless functions for automation

### Development Tools
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 📁 Project Structure

```
solo-improvement/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── customization/   # Customization panel components
│   │   ├── layout/          # Layout components (Sidebar, TopBar)
│   │   ├── notifications/   # Notification system
│   │   └── ui/              # Generic UI components
│   ├── context/             # React Context providers
│   ├── data/                # Static data and initial configurations
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # External library configurations
│   ├── pages/               # Page components
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Utility functions
├── supabase/
│   ├── functions/           # Edge Functions
│   └── migrations/          # Database migrations
└── docs/                    # Documentation
```

## 🎯 Core Concepts

### Character Progression
Your hunter character grows stronger through:
- **Experience Points (XP)**: Gained by completing quests
- **Levels**: Unlock new content and earn attribute/skill points
- **Attributes**: Six core stats that define your character
- **Skills**: Unlockable abilities that provide permanent bonuses

### Quest System
- **Daily Quests**: Reset every 24 hours, focus on daily habits
- **Weekly Quests**: Longer-term goals for sustained progress
- **Difficulty Scaling**: Harder quests provide more XP and better rewards

### Shadow Mechanics
- Complete quests to unlock shadow extraction
- Each shadow provides permanent stat bonuses
- Build a collection of shadows to enhance your character

### Achievement Framework
- Track progress across multiple categories
- Unlock cosmetic rewards and titles
- Hidden achievements for dedicated players

## 🔧 Configuration

### Daily Quest Reset
The application includes an automated daily quest reset system:

1. **Edge Function**: `supabase/functions/reset-daily-quests/`
2. **Scheduling**: Set up external cron job to trigger daily at midnight UTC
3. **Manual Reset**: Available in the dashboard for testing

### Customization Options
Users can personalize their experience through:
- Theme selection (Dark/Light/Auto)
- Accent color customization
- Avatar frame unlocks
- Title and name color options

## 🚀 Deployment

### Netlify (Recommended)
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Manual Deployment
```bash
npm run build
# Upload the dist/ folder to your hosting provider
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Maintain component modularity
- Write descriptive commit messages
- Test your changes thoroughly

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Pexels** - High-quality stock photos for avatars and backgrounds
- **Lucide** - Beautiful icon library
- **Supabase** - Excellent backend-as-a-service platform
- **Tailwind CSS** - Amazing utility-first CSS framework

## 📞 Support

If you encounter any bugs or have questions, please:
- Open an issue on GitHub
- Contact the developer: [gokuljayakumar89@gmail.com](mailto:gokuljayakumar89@gmail.com)

## 🔮 Roadmap

### Upcoming Features
- **Social Features**: Friends list and leaderboards
- **Item System**: Collectible items and equipment
- **Quest Chains**: Multi-step narrative quests
- **Guild System**: Team-based challenges
- **Mobile App**: Native mobile application

---

**Start your journey today and level up your life!** 🚀

*Solo Improvement - Where personal development meets gaming.*