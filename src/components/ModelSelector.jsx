import { useState } from 'react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

const ModelSelector = ({ models, selectedModel, onModelChange, isLoading }) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [infoModel, setInfoModel] = useState(null)

  const handleInfoClick = (model, e) => {
    e.stopPropagation()
    setInfoModel(model)
    setIsInfoOpen(true)
  }

  const closeInfo = () => {
    setIsInfoOpen(false)
    setInfoModel(null)
  }

  return (
    <div className="panel">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        Model Selection
        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">(required)</span>
      </h2>
      
      <div className="space-y-3">
        {models.map(model => (
          <div 
            key={model.id}
            className={`model-option flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${selectedModel === model.id ? 'selected border-primary-500' : 'border-gray-200 hover:bg-gray-50'}`}
            onClick={() => onModelChange(model.id)}
          >
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-3 ${selectedModel === model.id ? 'border-primary-500 bg-primary-500' : 'border-gray-300'}`}>
                {selectedModel === model.id && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                )}
              </div>
              <span className="text-black">{model.name}</span>
            </div>
            <button 
              onClick={(e) => handleInfoClick(model, e)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label="Model information"
            >
              <InformationCircleIcon className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>

      {/* Model Info Modal */}
      {isInfoOpen && infoModel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={closeInfo}>
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{infoModel.name}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{infoModel.description}</p>
            <div className="flex justify-end">
              <button onClick={closeInfo} className="btn-primary">Close</button>
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="mt-4 flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading models...</span>
        </div>
      )}
    </div>
  )
}

export default ModelSelector