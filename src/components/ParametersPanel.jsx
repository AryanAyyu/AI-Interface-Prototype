import { useState } from 'react'

const ParametersPanel = ({ parameters, onParametersChange }) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)

  const handleChange = (key, value) => {
    onParametersChange({
      ...parameters,
      [key]: value
    })
  }

  const resetToDefaults = () => {
    onParametersChange({
      temperature: 0.7,
      maxTokens: 1000,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0
    })
  }

  return (
    <div className="panel">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Parameters</h2>
        <button 
          onClick={resetToDefaults}
          className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
        >
          Reset Defaults
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Temperature: {parameters.temperature}</label>
            <span className="text-xs text-gray-500 dark:text-gray-400">Randomness</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={parameters.temperature}
            onChange={(e) => handleChange('temperature', parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>Precise</span>
            <span>Creative</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Max Tokens: {parameters.maxTokens}</label>
          </div>
          <input
            type="range"
            min="100"
            max="4000"
            step="100"
            value={parameters.maxTokens}
            onChange={(e) => handleChange('maxTokens', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>Short</span>
            <span>Long</span>
          </div>
        </div>

        <button 
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          className="w-full text-left text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 flex items-center justify-between"
        >
          <span>Advanced Parameters</span>
          <svg 
            className={`w-4 h-4 transition-transform ${isAdvancedOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isAdvancedOpen && (
          <div className="space-y-4 pt-2 border-t border-gray-200 dark:border-gray-700">
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Top-P: {parameters.topP}</label>
                <span className="text-xs text-gray-500 dark:text-gray-400">Diversity</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={parameters.topP}
                onChange={(e) => handleChange('topP', parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Frequency Penalty: {parameters.frequencyPenalty}</label>
              </div>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={parameters.frequencyPenalty}
                onChange={(e) => handleChange('frequencyPenalty', parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Presence Penalty: {parameters.presencePenalty}</label>
              </div>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={parameters.presencePenalty}
                onChange={(e) => handleChange('presencePenalty', parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ParametersPanel