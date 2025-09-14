import { useState } from 'react'
import { PaperAirplaneIcon, DocumentPlusIcon, DocumentTextIcon } from '@heroicons/react/24/outline'

const PromptEditor = ({ prompt, onPromptChange, templates, onSendPrompt, isLoading }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [isTemplateOpen, setIsTemplateOpen] = useState(false)

  const handleTemplateSelect = (template) => {
    onPromptChange(template.content)
    setSelectedTemplate(template.id)
    setIsTemplateOpen(false)
  }

  const handleSaveTemplate = () => {
    if (!prompt.trim()) return
    
    // In a real app, this would save to your backend
    const newTemplate = {
      id: `custom-${Date.now()}`,
      name: `Custom Template ${Math.floor(Math.random() * 1000)}`,
      content: prompt
    }
    
    alert(`Template would be saved as: ${newTemplate.name}`)
    // You would typically update your templates state here
  }

  return (
    <div className="panel">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Prompt Editor</h2>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => setIsTemplateOpen(true)}
            className="btn-secondary flex items-center"
            disabled={isLoading}
          >
            <DocumentTextIcon className="h-4 w-4 mr-1" />
            Templates
          </button>
          
          <button 
            onClick={handleSaveTemplate}
            className="btn-secondary flex items-center"
            disabled={!prompt.trim() || isLoading}
          >
            <DocumentPlusIcon className="h-4 w-4 mr-1" />
            Save
          </button>
        </div>
      </div>

      <div className="mb-4 relative">
        <textarea
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          placeholder="Enter your prompt here..."
          className="input-field min-h-[120px]"
          disabled={isLoading}
        />
        <div className="absolute bottom-2 right-2 text-sm text-gray-500 dark:text-gray-400">
          {prompt.length} characters
        </div>
      </div>

      <button
        onClick={onSendPrompt}
        disabled={!prompt.trim() || isLoading}
        className="btn-primary w-full flex items-center justify-center"
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
        ) : (
          <PaperAirplaneIcon className="h-5 w-5 mr-2" />
        )}
        Send Prompt
      </button>

      {/* Templates Modal */}
      {isTemplateOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setIsTemplateOpen(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[80vh] overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Select a Template</h3>
            </div>
            
            <div className="overflow-y-auto max-h-[60vh] p-4">
              <div className="space-y-3">
                {templates.map(template => (
                  <div 
                    key={template.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedTemplate === template.id ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <h4 className="font-medium text-gray-900 dark:text-white">{template.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{template.content}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button onClick={() => setIsTemplateOpen(false)} className="btn-primary">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PromptEditor