import { useState, useEffect } from 'react'
import ModelSelector from './components/ModelSelector'
import PromptEditor from './components/PromptEditor'
import ParametersPanel from './components/ParametersPanel'
import ChatOutput from './components/ChatOutput'
import ThemeToggle from './components/ThemeToggle'
import ComponentDocumentation from './components/ComponentDocumentation'
import { ThemeProvider } from './contexts/ThemeContext'
import { mockApi } from './api/mockApi'

function App() {
  const [models, setModels] = useState([])
  const [templates, setTemplates] = useState([])
  const [selectedModel, setSelectedModel] = useState('')
  const [prompt, setPrompt] = useState('')
  const [parameters, setParameters] = useState({
    temperature: 0.7,
    maxTokens: 1000,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0
  })
  const [conversation, setConversation] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)
  const [showDocumentation, setShowDocumentation] = useState(false)

  // Fetch models and templates from mock API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsInitializing(true)
        const [modelsData, templatesData] = await Promise.all([
          mockApi.getModels(),
          mockApi.getTemplates()
        ])
        
        setModels(modelsData)
        setTemplates(templatesData)
        setSelectedModel(modelsData[0]?.id || '')
      } catch (error) {
        console.error('Error fetching data:', error)
        // Fallback to local mock data if API fails
        const localModels = [
          { id: 'gpt-3.5', name: 'GPT-3.5 Turbo', description: 'Fast and cost-effective for most tasks' },
          { id: 'gpt-4', name: 'GPT-4', description: 'More capable than GPT-3.5, better for complex tasks' },
          { id: 'claude-2', name: 'Claude 2', description: 'Excellent for long-form content and dialogue' },
          { id: 'llama-2', name: 'Llama 2', description: 'Open source model good for research and experimentation' }
        ]
        
        const localTemplates = [
          { 
            id: 'creative', 
            name: 'Creative Writing', 
            content: 'Write a creative story about a character who discovers a mysterious object that changes their life. Include elements of adventure and personal growth.' 
          },
          { 
            id: 'technical', 
            name: 'Technical Explanation', 
            content: 'Explain the technical concept of [topic] in simple terms. Provide examples and analogies to help a beginner understand.' 
          },
          { 
            id: 'summary', 
            name: 'Text Summary', 
            content: 'Summarize the following text, highlighting the key points and main ideas:\n\n[TEXT]' 
          },
          { 
            id: 'code-help', 
            name: 'Code Assistance', 
            content: 'Help me write a function in [language] that accomplishes the following task: [describe task]. Include comments and error handling.' 
          }
        ]
        
        setModels(localModels)
        setTemplates(localTemplates)
        setSelectedModel(localModels[0]?.id || '')
      } finally {
        setIsInitializing(false)
      }
    }

    fetchData()
  }, [])

  const handleSendPrompt = async () => {
    if (!prompt.trim() || !selectedModel) return
    
    const userMessage = { role: 'user', content: prompt }
    setConversation(prev => [...prev, userMessage])
    
    // Generate AI response using mock API
    setIsLoading(true)
    try {
      const aiResponse = await mockApi.generateResponse(prompt, parameters, selectedModel)
      const aiMessage = { 
        role: 'assistant', 
        content: aiResponse,
        model: selectedModel,
        parameters: { ...parameters },
        timestamp: new Date().toISOString()
      }
      setConversation(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error generating response:', error)
      const errorMessage = { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error generating a response. Please try again.',
        isError: true,
        timestamp: new Date().toISOString()
      }
      setConversation(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
    
    setPrompt('')
  }

  const clearConversation = () => {
    setConversation([])
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen" style={{ background: 'hsl(var(--background))', color: 'hsl(var(--foreground))' }}>
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Interface Prototype</h1>
            <div className="flex items-center space-x-4">
              {conversation.length > 0 && !showDocumentation && (
                <button
                  onClick={clearConversation}
                  className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 px-3 py-1 rounded border border-gray-300 dark:border-gray-600"
                >
                  Clear Chat
                </button>
              )}
              <button 
                onClick={() => setShowDocumentation(!showDocumentation)}
                className="text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-3 py-1 rounded font-medium transition-colors"
              >
                {showDocumentation ? 'Back to Chat' : 'View Components'}
              </button>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {showDocumentation ? (
            <ComponentDocumentation />
          ) : isInitializing ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading AI models and templates...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left sidebar */}
              <div className="lg:col-span-1 space-y-6">
                <ModelSelector 
                  models={models} 
                  selectedModel={selectedModel}
                  onModelChange={setSelectedModel}
                  isLoading={isLoading}
                />
                
                <ParametersPanel 
                  parameters={parameters}
                  onParametersChange={setParameters}
                />
              </div>

              {/* Main content */}
              <div className="lg:col-span-2 space-y-6">
                <PromptEditor 
                  prompt={prompt}
                  onPromptChange={setPrompt}
                  templates={templates}
                  onSendPrompt={handleSendPrompt}
                  isLoading={isLoading}
                />
                
                <ChatOutput 
                  conversation={conversation}
                  isLoading={isLoading}
                />
              </div>
            </div>
          )}
        </main>

        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
              AI Interface Prototype • Built with React, Vite, and Tailwind CSS
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}

export default App