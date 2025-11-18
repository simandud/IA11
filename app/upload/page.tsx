'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import { Upload as UploadIcon, Image as ImageIcon, Sparkles, CheckCircle } from 'lucide-react'

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    aiModel: 'DALL-E 3',
    prompt: '',
    tags: '',
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)

    // Simulate upload - replace with actual API call
    setTimeout(() => {
      setUploading(false)
      setUploaded(true)
      setTimeout(() => {
        setUploaded(false)
        setSelectedFile(null)
        setPreview(null)
        setFormData({
          title: '',
          description: '',
          aiModel: 'DALL-E 3',
          prompt: '',
          tags: '',
        })
      }, 2000)
    }, 2000)
  }

  return (
    <main>
      <Navigation />
      <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold mb-4">
              <span className="gradient-text">Upload Your AI Art</span>
            </h1>
            <p className="text-xl text-gray-400">
              Share your AI-generated masterpieces with the world
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="glass-effect rounded-2xl p-8 neon-border"
          >
            {/* File Upload Area */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-neon-blue mb-3">
                Artwork Image *
              </label>
              <div
                className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                  preview
                    ? 'border-neon-purple bg-neon-purple/5'
                    : 'border-gray-700 hover:border-neon-blue hover:bg-neon-blue/5'
                }`}
              >
                {preview ? (
                  <div className="relative aspect-video max-h-96 mx-auto">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-contain rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(null)
                        setPreview(null)
                      }}
                      className="absolute top-2 right-2 p-2 bg-dark-900 rounded-full hover:bg-neon-pink/20 hover:text-neon-pink"
                    >
                      <UploadIcon className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      required
                    />
                    <ImageIcon className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                    <p className="text-lg font-semibold mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-neon-blue mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-dark-800 border border-gray-700 rounded-lg focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/20"
                  placeholder="My AI Masterpiece"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neon-purple mb-2">
                  AI Model *
                </label>
                <select
                  value={formData.aiModel}
                  onChange={(e) =>
                    setFormData({ ...formData, aiModel: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-dark-800 border border-gray-700 rounded-lg focus:border-neon-purple focus:outline-none focus:ring-2 focus:ring-neon-purple/20 cursor-pointer"
                  required
                >
                  <option value="DALL-E 3">DALL-E 3</option>
                  <option value="Midjourney">Midjourney</option>
                  <option value="Stable Diffusion">Stable Diffusion</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-neon-green mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-3 bg-dark-800 border border-gray-700 rounded-lg focus:border-neon-green focus:outline-none focus:ring-2 focus:ring-neon-green/20 resize-none"
                rows={4}
                placeholder="Describe your artwork..."
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-neon-yellow mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                AI Prompt (Optional)
              </label>
              <textarea
                value={formData.prompt}
                onChange={(e) =>
                  setFormData({ ...formData, prompt: e.target.value })
                }
                className="w-full px-4 py-3 bg-dark-800 border border-gray-700 rounded-lg focus:border-neon-yellow focus:outline-none focus:ring-2 focus:ring-neon-yellow/20 resize-none"
                rows={3}
                placeholder="The prompt you used to generate this artwork..."
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-neon-pink mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                className="w-full px-4 py-3 bg-dark-800 border border-gray-700 rounded-lg focus:border-neon-pink focus:outline-none focus:ring-2 focus:ring-neon-pink/20"
                placeholder="digital art, abstract, colorful"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={uploading || uploaded}
              className={`w-full py-4 rounded-lg font-semibold text-lg transition-all ${
                uploaded
                  ? 'bg-neon-green/20 text-neon-green cursor-not-allowed'
                  : uploading
                  ? 'bg-neon-blue/20 text-neon-blue cursor-wait'
                  : 'bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink hover:shadow-lg hover:shadow-neon-purple/50'
              }`}
            >
              {uploaded ? (
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-6 h-6" />
                  Uploaded Successfully!
                </span>
              ) : uploading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-6 h-6 border-2 border-neon-blue border-t-transparent rounded-full animate-spin" />
                  Uploading...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <UploadIcon className="w-6 h-6" />
                  Upload Artwork
                </span>
              )}
            </button>
          </motion.form>

          {/* Guidelines */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 p-6 glass-effect rounded-xl border border-neon-blue/20"
          >
            <h3 className="text-lg font-semibold text-neon-blue mb-3">
              Upload Guidelines
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Only upload AI-generated artwork</li>
              <li>• Ensure you have the rights to share the image</li>
              <li>• Maximum file size: 10MB</li>
              <li>• Supported formats: JPG, PNG, GIF</li>
              <li>• Provide accurate information about the AI model used</li>
              <li>• Add relevant tags to help others discover your work</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
