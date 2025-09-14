# AI Interface Prototype

A modern AI interface prototype built with React, Vite, and Tailwind CSS, featuring model selection, prompt editing, parameter controls, and conversation history.

## Research

### Platforms Reviewed

1. **OpenAI Playground**: Clean interface with comprehensive parameter controls and model selection. Standout features include sliders for temperature, max tokens, and presence penalty.

2. **Hugging Face Spaces**: Community-driven platform with diverse model options and template sharing. Excellent for discovering new AI models and prompt templates.

3. **Anthropic Claude UI**: Conversational interface with excellent document handling and context management. Strong focus on dialogue continuity.

4. **Microsoft Copilot Lab**: Integration with Microsoft ecosystem and enterprise features. Good example of contextual AI assistance.

### Chosen Features

Based on the research, I selected these 6 core features:

1. **Model Selector**: Dropdown to choose between different AI models (GPT-3.5, GPT-4, Claude, Llama)
2. **Prompt Editor**: Text area with template support and save/load functionality
3. **Parameters Panel**: Interactive sliders for temperature, max tokens, top-p, frequency penalty, and presence penalty
4. **Chat/Output Area**: Conversation display with copy and JSON download actions
5. **Theme Toggle**: Light/dark mode switch with localStorage persistence
6. **Responsive Layout**: Mobile-first design that works on all screen sizes

## Design

### Design Mockup

[Figma Design]()

### Tailwind CSS Mapping

The design uses a consistent Tailwind CSS system:

#### Colors
- **Primary**: Blue scale (Tailwind's default blue-50 to blue-900)
- **Background**: `gray-50` (light) / `gray-900` (dark)
- **Surface**: `white` (light) / `gray-800` (dark)
- **Text**: `gray-900` (light) / `gray-100` (dark)
- **Borders**: `gray-200` (light) / `gray-700` (dark)

#### Spacing
- Using Tailwind's default spacing scale: `p-2`, `p-4`, `p-6`, etc.
- Consistent `gap-6` and `space-y-6` for component spacing

#### Typography
- **Headers**: `font-bold text-2xl`
- **Body**: `text-gray-600 dark:text-gray-300`
- **Labels**: `font-medium text-sm`

#### Components
- **Buttons**: `.btn-primary` and `.btn-secondary` utility classes
- **Inputs**: `.input-field` utility class with focus states
- **Panels**: `.panel` utility class with shadows and rounded corners

## Development

### Implementation Notes

#### Tech Stack
- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with custom configuration
- **Icons**: Heroicons React
- **State Management**: React Context for theme management
- **Build Tool**: Vite for fast development and building

#### Architecture
- Component-based architecture with separation of concerns
- Custom hooks for localStorage management
- Context API for theme state management
- Mock API service for simulating AI responses

#### Key Features Implemented
1. **Theme System**: Full light/dark mode with system preference detection
2. **Responsive Design**: Mobile-first approach with breakpoints for desktop
3. **Component Library**: Reusable Button, Slider, Modal, and ChatBubble components
4. **Mock API**: Simulated API calls with loading states and error handling
5. **Local Storage**: Theme preference persistence
6. **Accessibility**: Keyboard navigation, focus states, and ARIA labels

#### Component Documentation
Instead of Storybook (due to version compatibility issues), the project includes:
- **Integrated Component Documentation**: Accessible via "View Components" button
- **Live Examples**: Interactive demonstrations of all components
- **Prop Documentation**: Complete API documentation for each component
- **Theme Demonstration**: Showcase of light/dark mode functionality

### Known Limitations

1. **Mock Data**: Uses simulated API responses instead of real AI integration
2. **No Authentication**: User accounts and persistence between sessions not implemented
3. **No Real AI**: Responses are generated locally rather than from actual AI models
4. **Browser Storage Only**: Conversations are not persisted beyond the current session
5. **Basic Error Handling**: Limited error recovery and user feedback

### Getting Started

1. Install Dependencies:
   npm install
2. Start Development Server:
   npm run dev
3. Build for Production:
   npm run build

### Project Structure
src/
├── components/          # React components
│   ├── ModelSelector.jsx
│   ├── PromptEditor.jsx
│   ├── ParametersPanel.jsx
│   ├── ChatOutput.jsx
│   ├── ThemeToggle.jsx
│   └── ComponentDocumentation.jsx
├── contexts/           # React contexts
│   └── ThemeContext.jsx
├── hooks/              # Custom hooks
│   └── useLocalStorage.js
├── api/                # API utilities
│   └── mockApi.js
├── App.jsx             # Main application component
└── index.css           # Global styles

### License
Copyright (c) 2025 Aryan Srivastava
