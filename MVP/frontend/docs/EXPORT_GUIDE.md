# Export Guide - HarmonyForge

## 📦 What's Included

This export contains a complete, production-ready React application with:
- ✅ All source code files
- ✅ Configuration files (Vite, TypeScript, PostCSS)
- ✅ Package.json with all dependencies
- ✅ Tailwind v4 setup
- ✅ Documentation

## 🚀 Quick Start

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Replace Figma Assets ⚠️ IMPORTANT

The following files contain `figma:asset/*` imports that **must be replaced**:

#### `components/InstrumentSelectionScreen.tsx`
Replace lines 4-7:
```tsx
// BEFORE (won't work outside Figma Make)
import imgRectangle from "figma:asset/7eae5bd45ddc37064c66617f933c5534a0a11ca5.png";
import imgImage56 from "figma:asset/303b445e54c5b8ae72351f6d3ab1499cfbe2007e.png";
import imgImage46 from "figma:asset/7b2a6ed9ab62676184118c0018d5d4674baa9d6f.png";
import imgImage58 from "figma:asset/2933498005c8e61eceb7c89c324146c36ed5b7a6.png";

// AFTER (use real images)
import imgRectangle from "./assets/violin.png";
import imgImage56 from "./assets/saxophone.png";
import imgImage46 from "./assets/piano.png";
import imgImage58 from "./assets/trumpet.png";
```

**Create the assets folder:**
```bash
mkdir -p public/assets
```

**Add instrument images:**
- `public/assets/violin.png` (or .jpg)
- `public/assets/saxophone.png`
- `public/assets/piano.png`
- `public/assets/trumpet.png`

Recommended image size: 300x300px minimum

**Then update the imports in `InstrumentSelectionScreen.tsx`:**
```tsx
// Change the import paths to:
import imgRectangle from "../public/assets/violin.png";
import imgImage56 from "../public/assets/saxophone.png";
import imgImage46 from "../public/assets/piano.png";
import imgImage58 from "../public/assets/trumpet.png";
```

### Step 3: (Optional) Add Custom Fonts

The app uses two custom fonts. To add them:

1. **Create fonts directory:**
   ```bash
   mkdir -p public/fonts
   ```

2. **Add font files:**
   - Figtree (Bold, SemiBold, Regular)
   - SF Pro Rounded (Regular)

3. **Update `styles/globals.css`** - Add before the existing CSS:
   ```css
   @font-face {
     font-family: 'Figtree';
     src: url('/fonts/Figtree-Regular.woff2') format('woff2');
     font-weight: 400;
     font-style: normal;
   }

   @font-face {
     font-family: 'Figtree';
     src: url('/fonts/Figtree-SemiBold.woff2') format('woff2');
     font-weight: 600;
     font-style: normal;
   }

   @font-face {
     font-family: 'Figtree';
     src: url('/fonts/Figtree-Bold.woff2') format('woff2');
     font-weight: 700;
     font-style: normal;
   }

   @font-face {
     font-family: 'SF Pro Rounded';
     src: url('/fonts/SFProRounded-Regular.woff2') format('woff2');
     font-weight: 400;
     font-style: normal;
   }
   ```

### Step 4: Run Development Server
```bash
npm run dev
```

Open http://localhost:5173 in your browser

### Step 5: Build for Production
```bash
npm run build
```

The `dist` folder will contain your production-ready files.

## 📁 Complete File List

### Essential Files
- `package.json` - Dependencies and scripts
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `postcss.config.js` - PostCSS/Tailwind setup
- `index.html` - HTML entry point
- `main.tsx` - React entry point
- `App.tsx` - Main app component

### Application Files
- `components/Logo.tsx` - Custom logo
- `components/Sidebar.tsx` - Navigation sidebar
- `components/ProcessingScreen.tsx` - File processing view
- `components/InstrumentSelectionScreen.tsx` - Instrument picker
- `components/ResultsScreen.tsx` - Results dashboard
- `components/figma/ImageWithFallback.tsx` - Helper component
- `components/ui/*` - Shadcn/ui components (40+ files)

### Assets & Styles
- `styles/globals.css` - Tailwind v4 config
- `imports/svg-*.ts` - SVG path definitions
- `Attributions.md` - Asset credits

## 🔧 Configuration Details

### Vite Configuration
- React plugin enabled
- Path alias: `@/` → root directory
- PostCSS integration for Tailwind

### TypeScript
- Strict mode enabled
- ES2020 target
- React JSX transform
- Path mapping configured

### Tailwind CSS v4
- Using new `@theme inline` syntax
- Custom design tokens in `globals.css`
- No separate config file needed
- PostCSS plugin: `@tailwindcss/postcss`

## ⚠️ Common Issues & Solutions

### Issue: "Cannot find module 'figma:asset/*'"
**Solution**: Replace all Figma asset imports with real images (see Step 2)

### Issue: Fonts not loading
**Solution**: Add font files to `/public/fonts/` and add @font-face rules (see Step 3)

### Issue: "Failed to resolve import"
**Solution**: Run `npm install` to ensure all dependencies are installed

### Issue: Tailwind styles not applying
**Solution**: Check that `postcss.config.js` exists and `globals.css` is imported in `main.tsx`

### Issue: Build fails with TypeScript errors
**Solution**: Run `npm install -D typescript @types/react @types/react-dom`

### Issue: Images not loading in development
**Solution**: 
- Make sure images are in the `public/` folder
- Use paths relative to public: `/assets/image.png`
- Or import them directly from components folder
- Restart dev server after adding new files to `public/`

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub/GitLab
2. Connect to Vercel
3. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Deploy

Or use Vercel CLI:
```bash
npm install -g vercel
vercel
```

### Netlify
1. Run build: `npm run build`
2. Drag and drop the `dist` folder to Netlify
3. Or connect your Git repository

### Manual Deployment
1. Run `npm run build`
2. Upload contents of `dist/` folder to your hosting provider
3. Configure server to serve `index.html` for all routes

## 📊 Production Checklist

- [ ] Replace all Figma asset imports with real images
- [ ] Add custom fonts (or remove font-family references)
- [ ] Test file upload with real MIDI/XML files
- [ ] Verify all screens transition correctly
- [ ] Test on multiple browsers (Chrome, Firefox, Safari)
- [ ] Run production build (`npm run build`)
- [ ] Test production build locally (`npm run preview`)
- [ ] Optimize images (compress to reduce bundle size)
- [ ] Add analytics (Google Analytics, Plausible, etc.)
- [ ] Set up error tracking (Sentry, LogRocket, etc.)
- [ ] Configure domain and SSL certificate
- [ ] Add meta tags for SEO (in `index.html`)
- [ ] Test responsive design on mobile devices
- [ ] Add favicon to `public/` folder

## 🔄 Future Integration Ideas

### MIDI/XML Processing
Integrate libraries like:
- `@tonejs/midi` - Parse and manipulate MIDI files
- `musicxml-parser` - Parse MusicXML files
- `abcjs` - Render sheet music

### Sheet Music Rendering
- `VexFlow` - Music notation rendering
- `OpenSheetMusicDisplay` - Display MusicXML
- `alphaTab` - Guitar tablature and sheet music

### Audio Playback
- `Tone.js` - Web Audio framework
- `howler.js` - Audio library
- `Web MIDI API` - Browser MIDI support

### Backend Integration
- Add Express.js/Fastify server for file processing
- Use Supabase for authentication and storage
- Implement WebSocket for real-time updates

## 📝 Additional Notes

### File Structure Best Practices
Your current structure is well-organized:
```
harmonyforge/
├── App.tsx                    # Main component
├── components/                # React components
│   ├── InstrumentSelectionScreen.tsx
│   ├── ProcessingScreen.tsx
│   ├── ResultsScreen.tsx
│   ├── Sidebar.tsx
│   ├── Logo.tsx
│   └── ui/                    # Shadcn components
├── imports/                   # SVG definitions
├── styles/                    # Global styles
└── public/                    # Static assets (create this)
    ├── assets/                # Images
    └── fonts/                 # Font files
```

### Environment Variables
If you need to add environment variables (API keys, etc.):

1. Create `.env` file in root:
   ```
   VITE_API_KEY=your_key_here
   VITE_API_URL=https://api.example.com
   ```

2. Access in code:
   ```tsx
   const apiKey = import.meta.env.VITE_API_KEY;
   ```

3. Add `.env` to `.gitignore` (already included)

### Performance Optimization
- Use lazy loading for components:
  ```tsx
  const ResultsScreen = lazy(() => import('./components/ResultsScreen'));
  ```
- Compress images before adding to `public/assets/`
- Use WebP format for better compression
- Consider code splitting for large components

### Security Notes
- Never commit sensitive data (API keys, credentials)
- Use environment variables for configuration
- Validate file uploads on backend (not just frontend)
- Set appropriate CORS headers if using external APIs
- Sanitize user input before displaying

## 📞 Support

If you encounter issues:
1. Check this guide first
2. Review the README.md
3. Inspect browser console for errors
4. Verify all dependencies are installed
5. Ensure Node.js version is 18+

## 🎉 You're All Set!

Your HarmonyForge app is ready to deploy. Just remember to:
1. ✅ Replace Figma assets with real images
2. ✅ Install dependencies
3. ✅ Test thoroughly
4. ✅ Build for production

Happy coding! 🎵

---

**Last Updated**: 2025-10-26  
**Figma Make Version**: 1.0
