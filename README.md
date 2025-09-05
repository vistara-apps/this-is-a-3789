# RightsGuard - Know Your Rights, Anytime, Anywhere

A mobile-first web application providing citizens with clear, state-specific legal rights information and real-time interaction support when interacting with law enforcement.

## 🚀 Features Implemented

### ✅ Core Features (Complete PRD Implementation)

#### 1. State-Specific Rights Guides
- **Status**: ✅ Complete
- Mobile-first, comprehensive summaries of legal rights during police encounters
- Tailored to user's current state with detailed information for CA, NY, TX, FL
- Essential 'do's and 'don'ts' with state-specific considerations
- Fallback support for all 50 US states

#### 2. Scripted Responses (Bilingual)
- **Status**: ✅ Complete
- Pre-written, actionable phrases in English and Spanish
- Organized by common scenarios: Traffic Stop, Street Encounter, Home Visit
- State-specific scripts where available
- Copy-to-clipboard and text-to-speech functionality

#### 3. One-Tap Incident Recording
- **Status**: ✅ Complete
- Quick-access recording button for audio/video capture
- Automatic logging of date, time, and GPS location
- Real-time recording timer and status indicators
- Secure storage integration with Pinata IPFS

#### 4. Location-Based Alerts & Sharing
- **Status**: ✅ Complete
- Secure sharing of live incident details with trusted contacts
- Multiple sharing methods: SMS, Email, WhatsApp, Telegram
- Auto-generated shareable links with incident data
- Emergency contact management system

#### 5. Auto-Generated Shareable Card
- **Status**: ✅ Complete
- AI-powered incident summaries using OpenAI GPT
- Professional, factual summaries suitable for legal counsel
- Customizable sharing formats and platforms
- Integration with all major sharing platforms

## 🛠 Technical Implementation

### Architecture
- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React Context API with useReducer
- **Routing**: React Router DOM
- **Storage**: LocalStorage with encryption-ready structure

### API Integrations
- **OpenAI API**: AI-powered summaries and rights explanations
- **Pinata IPFS**: Decentralized storage for recordings and data
- **Stripe API**: Subscription payment processing
- **Geolocation API**: Location tracking for incidents

### Data Model (Implemented)
```javascript
// User Entity
{
  userId: string,
  createdAt: timestamp,
  updatedAt: timestamp,
  state: string,
  premiumStatus: boolean,
  trustedContacts: array
}

// IncidentLog Entity
{
  logId: string,
  userId: string,
  timestamp: timestamp,
  latitude: number,
  longitude: number,
  recordingUrl: string,
  notes: string,
  status: string
}

// StateRightsGuide Entity
{
  stateCode: string,
  guideContent: object,
  scriptContent: object
}
```

### Design System Implementation
- **Colors**: Custom HSL color palette with accent colors
- **Typography**: Inter font family with responsive scaling
- **Spacing**: Consistent 8px grid system
- **Components**: Modular, reusable components with variants
- **Motion**: Smooth transitions with cubic-bezier easing

## 📱 User Flows (Implemented)

### 1. Onboarding and State Selection
1. User lands on the app
2. Auto-detection via IP with manual override
3. State-specific rights overview display
4. Guided tour of features

### 2. Interaction Documentation
1. One-tap record button activation
2. Automatic incident log creation with GPS
3. Real-time recording with status indicators
4. Optional live sharing with trusted contacts
5. Secure upload to Pinata IPFS
6. AI-generated summary creation

### 3. Accessing Scripts
1. Navigate to Scripts section
2. Select language (English/Spanish)
3. Choose scenario (Traffic Stop, Street Encounter, etc.)
4. View, copy, or speak pre-written responses

## 🔧 Setup and Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- API keys for services (optional for basic functionality)

### Installation
```bash
# Clone the repository
git clone https://github.com/vistara-apps/this-is-a-3789.git
cd this-is-a-3789

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### API Configuration
Configure API keys in the Settings page:

1. **OpenAI API** (for AI summaries)
   - Get key from: https://platform.openai.com/api-keys
   - Required for: AI-powered incident summaries and rights explanations

2. **Pinata IPFS** (for secure storage)
   - Get keys from: https://pinata.cloud/
   - Required for: Decentralized storage of recordings and data

3. **Stripe** (for payments)
   - Get keys from: https://dashboard.stripe.com/apikeys
   - Required for: Premium subscription processing

## 💰 Business Model Implementation

### Subscription Tiers
- **Basic Plan**: Free
  - Basic state rights information
  - Standard scripts in English
  - Basic recording functionality
  - Limited incident logs (5 per month)

- **Premium Plan**: $2.99/month
  - Comprehensive state-specific rights guides
  - Bilingual scripts (English & Spanish)
  - Unlimited secure recording storage
  - Unlimited incident logs
  - AI-powered incident summaries
  - Priority support
  - Advanced sharing features

- **Annual Premium**: $29.99/year
  - All Premium features
  - 16% savings with annual billing
  - Priority feature updates
  - Extended storage retention

## 🔒 Security & Privacy

### Data Protection
- Local storage with encryption-ready structure
- Secure API key management with masked inputs
- IPFS decentralized storage for recordings
- No sensitive data stored on central servers

### Privacy Features
- Optional location sharing
- User-controlled data retention
- Secure sharing with trusted contacts only
- No tracking or analytics without consent

## 📊 State Coverage

### Detailed Rights Data Available
- ✅ California
- ✅ New York  
- ✅ Texas
- ✅ Florida

### Basic Rights Coverage
- ✅ All 50 US States (constitutional rights)
- 🔄 Expanding detailed state-specific data

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Docker Deployment
```bash
# Build Docker image
docker build -t rightsguard .

# Run container
docker run -p 3000:3000 rightsguard
```

### Environment Variables
```env
VITE_OPENAI_API_KEY=your_openai_key
VITE_PINATA_API_KEY=your_pinata_key
VITE_PINATA_SECRET=your_pinata_secret
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] State selection and rights display
- [ ] Script copying and language switching
- [ ] Recording functionality with location
- [ ] Sharing via multiple platforms
- [ ] API integrations (with valid keys)
- [ ] Premium subscription flow
- [ ] Mobile responsiveness
- [ ] Offline functionality

## 📈 Future Enhancements

### Planned Features
- [ ] Offline mode with service workers
- [ ] Push notifications for alerts
- [ ] Integration with legal aid services
- [ ] Multi-language support (beyond English/Spanish)
- [ ] Advanced analytics dashboard
- [ ] Community-driven rights updates

### Technical Improvements
- [ ] End-to-end encryption
- [ ] Progressive Web App (PWA) features
- [ ] Advanced caching strategies
- [ ] Performance optimizations
- [ ] Accessibility improvements

## 🤝 Contributing

### Development Guidelines
1. Follow the existing code structure
2. Maintain responsive design principles
3. Test on mobile devices
4. Update documentation for new features
5. Ensure accessibility compliance

### Code Style
- Use TypeScript for new features
- Follow React best practices
- Maintain consistent naming conventions
- Add proper error handling
- Include helpful comments

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, please contact:
- Email: support@rightsguard.app
- Documentation: [Link to docs]
- Issues: [GitHub Issues]

## 🙏 Acknowledgments

- Legal rights information sourced from public legal resources
- Icons provided by Lucide React
- UI components inspired by modern design systems
- Community feedback and testing

---

**RightsGuard** - Empowering citizens with knowledge and tools to protect their rights during police interactions. Know your rights, stay protected.
