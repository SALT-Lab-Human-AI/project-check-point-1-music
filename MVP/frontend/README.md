
# HarmonyForge

A modern web application for forging chamber music harmonies from MIDI/XML files with intelligent instrument selection and customization options.

![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)
![Vite](https://img.shields.io/badge/Vite-6.3-646cff)

## ✨ Features

### 🎵 File Upload & Processing
- **Drag & Drop Interface** - Intuitive upload experience with visual feedback and animated gradient
- **File Validation** - Supports MIDI (.mid, .midi) and MusicXML (.xml, .musicxml) files up to 50MB
- **Animated Processing** - Multi-step validation with musical staff visualization and smooth transitions

### 🎹 Smart Instrument Selection
- **Interactive Cards** - Select up to 4 instruments from a curated library (Violin, Viola, Cello, Double Bass)
- **Responsive Grid Layout** - 2-column mobile, 4-column desktop
- **Customization Options**:
  - Musical Style (Classical, Jazz, Pop, Rock, Blues, Folk)
  - Difficulty Level (Beginner, Intermediate, Advanced, Expert)
- **Real-time Feedback** - Toast notifications and visual indicators

### 📊 Results Dashboard
- **Harmony Preview** - Expandable sheet music viewer with pagination
- **Project Management**:
  - Inline project name editing
  - Regenerate harmony with same settings
  - Start new project functionality
  - Quick action buttons (Save, Share, Export)
- **Metadata Display** - View selected instruments, style, and difficulty with icon badges

### 🧭 Navigation & Pages
- **Draggable Sidebar** - Repositionable sidebar with 6 snap positions (corners and center-top/bottom)
- **Home Page** - Main upload interface with animated title and circular gradient
- **Projects Page** - View and manage saved harmony projects
- **Profile Page** - User account information and statistics

### 🎨 Design & UX
- **Fully Responsive** - Mobile-first design (375px to 1440px+) with Tailwind breakpoints
- **Expandable Sidebar** - Hover-to-expand navigation with smooth animations
- **Custom Branding** - Musical note themed logo and warm color palette
- **Ripple Animations** - Subtle breathing effect on circular elements
- **Gradient Pulse** - Dynamic animated gradient on upload area

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/spatel54/Is492musicapp.git
   cd Is492musicapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173`

### Production Build

```bash
npm run build
```

The built files will be in the `build/` directory.

## 📁 Project Structure

```
harmonyforge/
├── docs/                          # Documentation
│   ├── DESIGN_SYSTEM.md          # Design system guidelines
│   ├── EXPORT_GUIDE.md           # Export and deployment guide
│   ├── Attributions.md           # Asset credits
│   ├── Guidelines.md             # Development guidelines
│   └── Prompting Guidelines.prompt.md  # AI interaction protocol
├── public/                        # Static assets
│   ├── assets/                   # Public images and files
│   └── fonts/                    # Custom web fonts
├── src/
│   ├── components/               # React components
│   │   ├── ui/                   # Shadcn/ui components (20+ components)
│   │   ├── home/                 # Home page components
│   │   │   ├── AnimatedTitle.tsx
│   │   │   ├── UploadZone.tsx
│   │   │   ├── UploadContent.tsx
│   │   │   └── UploadMessage.tsx
│   │   ├── icons/                # Custom icon components
│   │   ├── figma/                # Figma-specific components
│   │   ├── HomePage.tsx          # Landing/upload screen
│   │   ├── InstrumentSelectionScreen.tsx
│   │   ├── ProcessingScreen.tsx
│   │   ├── ResultsScreen.tsx
│   │   ├── ProjectsPage.tsx      # Projects management page
│   │   ├── ProfilePage.tsx       # User profile page
│   │   ├── Sidebar.tsx           # Draggable navigation
│   │   ├── AppHeader.tsx
│   │   ├── PageHeader.tsx
│   │   └── Breadcrumbs.tsx
│   ├── config/                   # Configuration files
│   │   └── typography.ts
│   ├── styles/                   # Global styles
│   │   └── globals.css
│   ├── imports/                  # SVG and asset imports
│   ├── assets/                   # Component assets (images)
│   ├── App.tsx                   # Main application component with routing
│   ├── main.tsx                  # React entry point
│   └── index.css                 # Global CSS with animations
├── build/                        # Production build output
├── package.json                  # Dependencies and scripts
├── vite.config.ts                # Vite configuration
├── tailwind.config.js            # Tailwind v4 configuration
└── README.md                     # This file
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3 with TypeScript
- **Build Tool**: Vite 6.3
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **State Management**: React hooks
- **Form Handling**: React Hook Form

## 📖 Documentation

- [Design System](docs/DESIGN_SYSTEM.md) - Typography, buttons, and design tokens
- [Export Guide](docs/EXPORT_GUIDE.md) - Deployment and production setup
- [Development Guidelines](docs/Guidelines.md) - Coding standards and best practices

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Key Dependencies

- **UI Components**: 20+ Radix UI components
- **Charts**: Recharts for data visualization
- **Forms**: React Hook Form with validation
- **Themes**: next-themes for dark/light mode support
- **Animations**: CSS transitions and transforms

## 🎯 Usage

1. **Upload File** - Drag and drop or click the circular gradient area to browse for MIDI/XML files
2. **Processing** - Watch automated validation steps with musical staff visualization
3. **Select Instruments** - Choose up to 4 instruments with style/difficulty preferences
4. **View Results** - Explore generated harmony with expandable sheet music viewer
5. **Navigate** - Use the draggable sidebar to access Projects and Profile pages

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 License

MIT License - see [Attributions](docs/Attributions.md) for asset credits.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues or questions:
1. Check the [Export Guide](docs/EXPORT_GUIDE.md) for common solutions
2. Review browser console for errors
3. Ensure Node.js version compatibility
4. Check that all dependencies are installed

## 🚀 Future Enhancements

- [ ] Real MIDI/XML file processing integration
- [ ] Interactive sheet music rendering with music notation library
- [ ] Audio playback of generated harmonies
- [ ] User authentication and cloud project saving
- [ ] Export harmonies as MIDI/PDF/MusicXML formats
- [ ] Project collaboration features
- [ ] Dark mode implementation
- [ ] Advanced harmony algorithms and AI-powered suggestions
- [ ] Performance optimizations for larger files

## 📋 Recent Updates (v1.0.0)

### November 2025
- ✅ Fully responsive design across all screens (mobile to desktop)
- ✅ Reduced and optimized circular gradient upload area
- ✅ Added ripple animations to gray circles
- ✅ Implemented Projects and Profile pages
- ✅ Added sidebar navigation with home button functionality
- ✅ Draggable sidebar with 6 snap positions
- ✅ Enhanced ProcessingScreen with musical staff visualization
- ✅ Improved InstrumentSelectionScreen with grid layout
- ✅ Added quick action buttons to ResultsScreen

---

**Built with ❤️ using React, TypeScript, and modern web technologies**