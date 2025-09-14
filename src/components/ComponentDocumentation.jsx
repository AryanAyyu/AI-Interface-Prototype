import { useState } from 'react';
import Button from './Button';
import Slider from './Slider';
import Modal from './Modal';
import ChatBubble from './ChatBubble';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';

const ComponentDocumentation = () => {
  const { isDark } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  const [activeTab, setActiveTab] = useState('button');
  const [showTheme, setShowTheme] = useState(false);

  const components = {
    button: {
      name: 'Button',
      description: 'A customizable button component with multiple variants and sizes.',
      props: [
        { name: 'variant', type: "'primary' | 'secondary'", default: "'primary'", description: 'Button style variant' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Button size' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the button is disabled' },
        { name: 'onClick', type: 'function', default: 'undefined', description: 'Click handler function' },
        { name: 'children', type: 'ReactNode', default: 'undefined', description: 'Button content' },
      ]
    },
    slider: {
      name: 'Slider',
      description: 'A range input slider with label support for parameter controls.',
      props: [
        { name: 'label', type: 'string', default: 'undefined', description: 'Slider label text' },
        { name: 'min', type: 'number', default: '0', description: 'Minimum value' },
        { name: 'max', type: 'number', default: '100', description: 'Maximum value' },
        { name: 'step', type: 'number', default: '1', description: 'Step value' },
        { name: 'value', type: 'number', default: 'min', description: 'Current value' },
        { name: 'onChange', type: 'function', default: 'undefined', description: 'Change handler function' },
      ]
    },
    modal: {
      name: 'Modal',
      description: 'A modal dialog component with overlay for displaying additional content.',
      props: [
        { name: 'isOpen', type: 'boolean', default: 'false', description: 'Whether the modal is open' },
        { name: 'onClose', type: 'function', default: 'undefined', description: 'Close handler function' },
        { name: 'title', type: 'string', default: 'undefined', description: 'Modal title' },
        { name: 'children', type: 'ReactNode', default: 'undefined', description: 'Modal content' },
      ]
    },
    chatbubble: {
      name: 'ChatBubble',
      description: 'A chat message bubble with copy functionality for conversation UI.',
      props: [
        { name: 'role', type: "'user' | 'assistant'", default: "'user'", description: 'Message sender role' },
        { name: 'content', type: 'string', default: 'undefined', description: 'Message content' },
        { name: 'onCopy', type: 'function', default: 'undefined', description: 'Copy handler function' },
      ]
    },
    themetoggle: {
      name: 'ThemeToggle',
      description: 'A toggle switch for changing between light and dark themes.',
      props: [
        { name: 'isDark', type: 'boolean', default: 'false', description: 'Whether dark theme is enabled' },
        { name: 'onToggle', type: 'function', default: 'undefined', description: 'Toggle handler function' },
      ]
    }
  };

  const activeComponent = components[activeTab];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Component Documentation
        </h1>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {Object.entries(components).map(([key, component]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === key
                  ? 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {component.name}
            </button>
          ))}
          <button
            onClick={() => setShowTheme(!showTheme)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              showTheme
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Theme Demo
          </button>
        </div>

        {/* Theme Demo Section */}
        {showTheme && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Theme Demonstration</h2>
            <div className="flex items-center justify-between">
              <p className="text-gray-600 dark:text-gray-300">
                Current theme: <span className="font-medium">{isDark ? 'Dark' : 'Light'}</span>
              </p>
              <ThemeToggle />
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 dark:text-white">Light Theme Elements</h3>
                <p className="text-gray-600">This is how text appears in light mode</p>
                <button className="btn-primary mt-2">Example Button</button>
              </div>
              <div className="bg-gray-800 dark:bg-gray-600 p-4 rounded-lg">
                <h3 className="font-medium text-white">Dark Theme Elements</h3>
                <p className="text-gray-300">This is how text appears in dark mode</p>
                <button className="btn-primary mt-2">Example Button</button>
              </div>
            </div>
          </div>
        )}

        {/* Component Documentation */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            {activeComponent.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {activeComponent.description}
          </p>

          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Props
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="px-4 py-2 text-left font-medium text-gray-900 dark:text-white">Name</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-900 dark:text-white">Type</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-900 dark:text-white">Default</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-900 dark:text-white">Description</th>
                </tr>
              </thead>
              <tbody>
                {activeComponent.props.map((prop, index) => (
                  <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="px-4 py-2 font-mono text-sm text-primary-600 dark:text-primary-400">{prop.name}</td>
                    <td className="px-4 py-2 font-mono text-sm text-gray-600 dark:text-gray-400">{prop.type}</td>
                    <td className="px-4 py-2 font-mono text-sm text-gray-600 dark:text-gray-400">{prop.default}</td>
                    <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Examples */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Live Examples
          </h3>

          {activeTab === 'button' && (
            <div className="space-y-4">
              <div className="flex gap-4 flex-wrap">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button size="sm">Small Button</Button>
                <Button size="lg">Large Button</Button>
                <Button disabled>Disabled Button</Button>
              </div>
            </div>
          )}

          {activeTab === 'slider' && (
            <div className="max-w-md">
              <Slider 
                label="Example Slider" 
                value={sliderValue} 
                onChange={setSliderValue} 
              />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Current value: {sliderValue}
              </p>
            </div>
          )}

          {activeTab === 'modal' && (
            <div>
              <Button onClick={() => setIsModalOpen(true)}>
                Open Modal Example
              </Button>
              <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                title="Example Modal"
              >
                <p className="mb-4">This is an example of the Modal component in action.</p>
                <div className="flex justify-end">
                  <Button onClick={() => setIsModalOpen(false)}>Close</Button>
                </div>
              </Modal>
            </div>
          )}

          {activeTab === 'chatbubble' && (
            <div className="space-y-4 max-w-md">
              <ChatBubble 
                role="user" 
                content="Hello, how are you today?" 
              />
              <ChatBubble 
                role="assistant" 
                content="I'm doing well, thank you for asking! How can I assist you today?" 
              />
            </div>
          )}

          {activeTab === 'themetoggle' && (
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <span className="text-gray-600 dark:text-gray-300">
                Click to toggle between light and dark themes
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComponentDocumentation;