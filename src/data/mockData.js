export const mockModels = [
  { id: 'gpt-3.5', name: 'GPT-3.5 Turbo', description: 'Fast and cost-effective for most tasks' },
  { id: 'gpt-4', name: 'GPT-4', description: 'More capable than GPT-3.5, better for complex tasks' },
  { id: 'claude-2', name: 'Claude 2', description: 'Excellent for long-form content and dialogue' },
  { id: 'llama-2', name: 'Llama 2', description: 'Open source model good for research and experimentation' }
]

export const mockTemplates = [
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

export const mockConversations = [
  {
    id: 1,
    messages: [
      { role: 'user', content: 'Hello, can you help me with creative writing?' },
      { role: 'assistant', content: 'Of course! I\'d be happy to help with creative writing. What kind of story would you like to create? Are you thinking about a specific genre, characters, or setting?' }
    ]
  }
]