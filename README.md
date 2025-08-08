# AI Playground Frontend

A modern React-based frontend application for the AI Playground, providing an intuitive interface for multi-modal AI interactions including conversation analysis, image analysis, and document summarization.

![React](https://img.shields.io/badge/react-v18.2+-blue.svg)
![Vite](https://img.shields.io/badge/vite-v4.5+-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## Features

- **User Authentication** - JWT-based login system with automatic token management
- **Conversation Analysis** - Upload audio files for speech-to-text and speaker diarization
- **Image Analysis** - Upload images for AI-powered descriptions using Gemini Vision
- **Document Summarization** - Upload documents or provide URLs for content summarization
- **User History** - Track the last 10 interactions across all features
- **Responsive Design** - Mobile-friendly interface with clean, Linear-style UI
- **Real-time Updates** - Live feedback and loading states for better UX

## Tech Stack

- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing for SPA navigation
- **Axios** - HTTP client for API requests with interceptors
- **CSS3** - Custom styling without external frameworks for full control

## Prerequisites

- Node.js 16.0 or higher
- npm or yarn package manager
- Backend API running (see [Backend Repository](https://github.com/Balaji-kurakula/AIPlaygroundHub_Backend))

## Installation & Setup

### 1. Clone the Repository

git clone https://github.com/Balaji-kurakula/AIPlaygroundHub.git
cd AIPlaygroundHu

text

### 2. Install Dependencies

npm install

text

### 3. Environment Variables

Create a `.env` file in the root directory:

VITE_API_URL=http://localhost:8000

text

For production deployment, update with your backend URL:
VITE_API_URL=https://your-backend-url.railway.app

text

### 4. Project Structure

frontend/
├── src/
│ ├── components/
│ │ ├── Login.jsx # Login component with JWT auth
│ │ ├── Dashboard.jsx # Main dashboard with skill selection
│ │ ├── ConversationAnalysis.jsx # Audio upload & analysis
│ │ ├── ImageAnalysis.jsx # Image upload & analysis
│ │ ├── DocumentSummarization.jsx # Document/URL processing
│ │ └── History.jsx # User interaction history
│ ├── styles/
│ │ ├── App.css # Main app styles
│ │ ├── Login.css # Login page styles
│ │ ├── Dashboard.css # Dashboard styles
│ │ └── components.css # Component-specific styles
│ ├── utils/
│ │ └── api.js # Axios configuration & interceptors
│ ├── App.jsx # Main app component with routing
│ ├── main.jsx # App entry point
│ └── index.css # Global styles and reset
├── public/
├── .env # Environment variables (create this)
├── package.json
├── vite.config.js
text

## Running the Application

### Development Mode

npm run dev

The application will be available at: `http://localhost:5173`

### Build for Production

npm run build

text

### Preview Production Build

npm run preview

text

## Features Overview

### Authentication
- **Demo Credentials**: 
  - Username: `demo`
  - Password: `demo123`
- JWT token management with automatic refresh
- Protected routes for authenticated users
- Automatic redirect to login on token expiry

### Conversation Analysis
- Upload audio files (MP3, WAV, M4A, OGG)
- Speech-to-text transcription display
- Speaker diarization (up to 2 speakers)
- Mock implementation ready for real audio processing integration

### Image Analysis
- Upload images (JPEG, PNG, GIF, WebP)
- AI-powered image description using Gemini Vision
- Image preview before analysis
- Detailed visual analysis results with contextual descriptions

### Document Summarization
- Upload documents (PDF, DOC, DOCX)
- URL content summarization
- Toggle between file upload and URL input
- AI-powered content summarization with key insights

### User Experience
- Clean, Linear-inspired UI design
- Responsive layout for mobile and desktop
- Loading states and error handling
- User interaction history tracking
- Smooth animations and transitions

## API Integration

The frontend communicates with the backend through these endpoints:

// Authentication
POST /auth/login // User login with credentials
GET /auth/me // Get current user information
POST /auth/refresh // Refresh JWT token

// AI Features (requires authentication)
POST /conversation/analyze // Audio file analysis
POST /image/analyze // Image analysis
POST /document/summarize // Document/URL summarization

text

### API Configuration

The `src/utils/api.js` file handles:
- Base URL configuration from environment variables
- Automatic JWT token attachment to requests
- Response/request interceptors for error handling
- Automatic token refresh on expiry
- CORS and network error management

## File Upload Specifications

| File Type | Max Size | Supported Formats | Purpose |
|-----------|----------|-------------------|---------|
| Audio | 25MB | MP3, WAV, M4A, OGG | Conversation Analysis |
| Images | 10MB | JPEG, PNG, GIF, WebP | Image Analysis |
| Documents | 15MB | PDF, DOC, DOCX | Document Summarization |

## Environment Variables by Stage

**Development (.env.local):**
VITE_API_URL=http://localhost:8000

text

**Production (.env.production):**
VITE_API_URL=https://your-backend.railway.app

text

**Staging (.env.staging):**
VITE_API_URL=https://staging-backend.railway.app

text

## Deployment

### Vercel Deployment

1. **Push to GitHub** (Already done for this repo)

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository: `https://github.com/Balaji-kurakula/AIPlaygroundHub`
   - Configure build settings

3. **Environment Variables in Vercel**
   Set in Vercel dashboard → Settings → Environment Variables:
VITE_API_URL=https://your-backend-url.railway.app

text

4. **Vercel Configuration**
Create `vercel.json` (optional):
{
"framework": "vite",
"buildCommand": "npm run build",
"outputDirectory": "dist",
"installCommand": "npm install"
}

text

### Manual Deployment

Build the project
npm run build

Deploy the dist folder to your hosting service
text

## Browser Compatibility Matrix

| Browser | Version | Status | Notes |
|---------|---------|--------|-------|
| Chrome | 90+ | ✅ Fully Supported | Recommended |
| Firefox | 88+ | ✅ Fully Supported | All features work |
| Safari | 14+ | ✅ Fully Supported | iOS compatible |
| Edge | 90+ | ✅ Fully Supported | Chromium-based |

## Performance Optimizations

- **Bundle Size**: Optimized build ~500KB gzipped
- **Code Splitting**: React.lazy for component loading
- **Image Optimization**: Client-side resizing before upload
- **API Caching**: Intelligent request caching
- **Lazy Loading**: Components loaded on demand

## Accessibility Features

- Keyboard navigation support throughout the app
- Screen reader compatible with ARIA labels
- High contrast color scheme for better visibility
- Focus indicators for all interactive elements
- Semantic HTML structure for better accessibility

## Testing

### Manual Testing Checklist

- [ ] Login with demo/demo123 works correctly
- [ ] Dashboard navigation between skills functions
- [ ] Audio file upload shows results (mock data)
- [ ] Image upload and analysis works with Gemini API
- [ ] Document upload processes correctly
- [ ] URL summarization functionality works
- [ ] User history displays recent interactions
- [ ] Logout functionality works and clears tokens
- [ ] Responsive design works on mobile devices
- [ ] Error handling displays appropriate messages

### API Connection Test

Check if backend is reachable
curl -X GET http://localhost:8000/health

Test login endpoint
curl -X POST http://localhost:8000/auth/login
-H "Content-Type: application/json"
-d '{"username": "demo", "password": "demo123"}'

text

## Troubleshooting

### Common Issues

**1. CORS Errors**
Solution: Ensure backend CORS settings include your frontend domain
Check: Backend main.py allow_origins configuration

text

**2. Login Issues**
Solution: Verify backend is running and accessible
Credentials: demo/demo123
Check: Network tab for API response details

text

**3. API Connection Issues**
Solution: Check VITE_API_URL in .env file
Verify: Backend is accessible at the specified URL
Test: Direct API calls using curl or Postman

text

**4. Build Errors**
Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev -- --force

text

**5. Environment Variables Not Loading**
Solution: Restart development server after .env changes
Ensure: Variables start with VITE_ prefix
Check: .env file is in project root

text

## Production Deployment Checklist

- [ ] Environment variables configured in Vercel/hosting platform
- [ ] Backend URL is HTTPS and accessible
- [ ] CORS properly configured on backend for production domain
- [ ] Error boundaries implemented for crash protection
- [ ] Loading states implemented for all async operations
- [ ] Responsive design tested on multiple devices
- [ ] SEO meta tags added (if needed for public app)
- [ ] Analytics tracking implemented (if needed)
- [ ] Performance optimizations applied

## Known Limitations

- **Audio Processing**: Currently displays mock data for conversation analysis
- **File Size**: Large files may cause timeout or memory issues
- **Offline Support**: Requires active internet connection
- **Browser Storage**: Uses localStorage for JWT tokens (cleared on logout)
- **Real-time Features**: No WebSocket support currently

## Future Enhancements

- [ ] Real-time audio processing with actual STT integration
- [ ] Drag & drop file upload interface
- [ ] Dark mode toggle for better user experience
- [ ] Multi-language support for international users
- [ ] Advanced user roles and permissions
- [ ] Batch file processing capabilities
- [ ] Export results to PDF/CSV formats
- [ ] Progressive Web App (PWA) support
- [ ] WebSocket integration for real-time updates

## Performance Monitoring

// Add to main.jsx for performance monitoring
if (import.meta.env.PROD) {
// Performance monitoring in production
console.log('AI Playground loaded successfully');
}

text

## FAQ

**Q: Why am I getting CORS errors?**
A: Ensure your backend CORS settings include your frontend domain. Check the backend repository for CORS configuration.

**Q: Login not working?**
A: Use credentials: demo/demo123. Ensure the backend is running and accessible.

**Q: Images not analyzing?**
A: Verify the Gemini API key is properly set in backend environment variables.

**Q: Files not uploading?**
A: Check file size limits and supported formats in the specifications above.

**Q: App not loading after build?**
A: Check that VITE_API_URL is correctly set for your environment.

## Demo Response Examples

### Image Analysis Response
{
"description": "This image shows a beautiful landscape with mountains in the background and a serene lake in the foreground. The scene is captured during golden hour, creating warm, inviting lighting across the natural elements."
}

text

### Document Summarization Response
{
"summary": "This document outlines key principles of artificial intelligence, covering machine learning algorithms, neural networks, and practical applications in modern technology sectors."
}

text

## Version History

- **v1.0.0** - Initial release with authentication and basic UI
- **v1.1.0** - Added image analysis with Gemini Vision integration
- **v1.2.0** - Implemented document summarization feature
- **v1.3.0** - Enhanced UX with better error handling and responsive design
- **v1.4.0** - Production optimization and deployment ready

## Demo & Live Preview

- **GitHub Repository**: [https://github.com/Balaji-kurakula/AIPlaygroundHub](https://github.com/Balaji-kurakula/AIPlaygroundHub)
- **Live Demo**: [Deploy on Vercel to get live URL]
- **Backend API**: [Backend Repository](https://github.com/Balaji-kurakula/AIPlaygroundHub_Backend)
- **Demo Credentials**: 
  - Username: `demo`
  - Password: `demo123`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact & Support

- **Developer**: Balaji Kurakula
- **GitHub**: [@Balaji-kurakula](https://github.com/Balaji-kurakula)
- **Frontend Repository**: [AIPlaygroundHub](https://github.com/Balaji-kurakula/AIPlaygroundHub)
- **Backend Repository**: [AIPlaygroundHub_Backend](https://github.com/Balaji-kurakula/AIPlaygroundHub_Backend)

**Made with ❤️ by Balaji Kurakula**

*AI Playground - Where Innovation Meets Intelligence*
