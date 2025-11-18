'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/Navigation'
import { Send, Bot, User, Sparkles } from 'lucide-react'
import { ChatMessage } from '@/lib/types'

export default function SupportPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      message: 'Hello! I\'m your AI assistant. How can I help you today?',
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate AI response - replace with actual AI API
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        message: getAIResponse(inputMessage),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes('upload') || input.includes('how to')) {
      return 'To upload artwork, click on the "Upload" button in the navigation menu. Fill in the required information including title, description, AI model used, and select your image file. Make sure your file is under 10MB and in JPG, PNG, or GIF format.'
    }

    if (input.includes('download')) {
      return 'You can download any artwork by clicking on the artwork card to open the detail view, then clicking the "Download" button. The image will be saved to your downloads folder.'
    }

    if (input.includes('dashboard') || input.includes('analytics')) {
      return 'The Dashboard provides real-time analytics including views, downloads, uploads, and user engagement metrics. You can also see AI-powered recommendations for optimizing your platform performance.'
    }

    if (input.includes('api')) {
      return 'We provide a comprehensive REST API for integrating with external systems. You can access endpoints for artwork management, analytics, user data, and more. Visit our API documentation for detailed information about authentication and available endpoints.'
    }

    return 'Thank you for your question! Our team is here to help. For specific technical issues, please provide more details about what you\'re trying to accomplish, and I\'ll do my best to assist you.'
  }

  return (
    <main>
      <Navigation />
      <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl font-bold mb-4">
              <span className="gradient-text">Support Center</span>
            </h1>
            <p className="text-xl text-gray-400">
              Get help from our AI assistant or connect with our team
            </p>
          </motion.div>

          {/* Chat Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect rounded-2xl neon-border overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 border-b border-gray-700 p-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-neon-green rounded-full border-2 border-dark-900" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">AI Support Assistant</h3>
                  <p className="text-sm text-gray-400">Online • Avg response time: 1s</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-[500px] overflow-y-auto p-6 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`flex gap-3 ${
                      message.sender === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === 'ai'
                          ? 'bg-gradient-to-br from-neon-purple to-neon-pink'
                          : 'bg-gradient-to-br from-neon-blue to-neon-green'
                      }`}
                    >
                      {message.sender === 'ai' ? (
                        <Bot className="w-5 h-5" />
                      ) : (
                        <User className="w-5 h-5" />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`max-w-[70%] rounded-2xl p-4 ${
                        message.sender === 'ai'
                          ? 'bg-dark-800 border border-neon-purple/20'
                          : 'bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 border border-neon-blue/20'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.message}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="bg-dark-800 border border-neon-purple/20 rounded-2xl p-4">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-neon-purple rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-neon-purple rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-neon-purple rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSendMessage}
              className="border-t border-gray-700 p-4 bg-dark-800/50"
            >
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 bg-dark-900 border border-gray-700 rounded-lg focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple hover:shadow-lg hover:shadow-neon-purple/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </motion.div>

          {/* Quick Help */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="glass-effect rounded-xl p-6 border border-neon-blue/20">
              <Sparkles className="w-8 h-8 text-neon-blue mb-3" />
              <h3 className="font-semibold text-lg mb-2">Quick Start Guide</h3>
              <p className="text-sm text-gray-400">
                Learn how to upload, browse, and download AI-generated artwork in minutes.
              </p>
            </div>
            <div className="glass-effect rounded-xl p-6 border border-neon-purple/20">
              <Bot className="w-8 h-8 text-neon-purple mb-3" />
              <h3 className="font-semibold text-lg mb-2">API Documentation</h3>
              <p className="text-sm text-gray-400">
                Integrate our platform with your applications using our REST API.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
