"use client"

import { Suspense, useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ChevronRight, ExternalLink, Github, Globe, CheckCircle, ArrowLeft, Video } from "lucide-react"
import { projects } from "./projects"
import { getAssetPath } from "./utils/assets"

const commands = [
  { command: "/projects", description: "Gauntlet AI projects" },
  { command: "/about", description: "About me" },
  // { command: "/contact", description: "Get in touch" },
]

function PortfolioContent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Initialize state from URL
  const [activeSection, setActiveSection] = useState<"projects" | "about" | "contact">(
    (searchParams.get("section") || "projects") as "projects" | "about" | "contact"
  )
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    searchParams.get("project")
  )
  const [hoverText, setHoverText] = useState<string | null>(null)
  const [modalImage, setModalImage] = useState<string | null>(null)

  // Update URL without page refresh
  const updateURL = (params: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams.toString())
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key)
      } else {
        newParams.set(key, value)
      }
    })
    // Preserve the full path including base path
    const currentPath = window.location.pathname
    const newURL = `${currentPath}${newParams.toString() ? `?${newParams.toString()}` : ''}`
    window.history.pushState(null, '', newURL)
  }

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search)
      setActiveSection((params.get("section") || "projects") as "projects" | "about" | "contact")
      setSelectedProjectId(params.get("project"))
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Helper to update both state and URL
  const setView = (params: Record<string, string | null>) => {
    if (params.section !== undefined) {
      setActiveSection((params.section || "projects") as "projects" | "about" | "contact")
    }
    if (params.project !== undefined) {
      setSelectedProjectId(params.project)
    }
    updateURL(params)
  }

  // Derive input text from current state or hover
  const getInputText = () => {
    if (hoverText) return hoverText
    
    if (selectedProjectId) {
      const project = projects.find(p => p.id === selectedProjectId)
      return project ? `/projects ${project.name.toLowerCase().replace(/\s+/g, "-")}` : "/projects"
    }
    return `/${activeSection}`
  }

  const handleCommandClick = (command: string) => {
    const section = command.replace("/", "")
    setView({ section: section, project: null })
  }

  const handleProjectClick = (projectId: string) => {
    setView({ project: projectId })
  }

  const handleBackToProjects = () => {
    setView({ project: null })
  }

  const renderProjectsList = () => (
    <div className="space-y-4">
      <div className="text-gray-600">Projects from Gauntlet AI bootcamp:</div>

      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={project.id} className="space-y-2">
            <div
              className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors"
              onClick={() => handleProjectClick(project.id)}
              onMouseEnter={() => setHoverText(`/projects ${project.name.toLowerCase().replace(/\s+/g, "-")}`)}
              onMouseLeave={() => setHoverText(null)}
            >
              <ChevronRight className="w-4 h-4 text-blue-500" />
              <span className="text-blue-500">{index + 1}.</span>
              <span className="font-medium">{project.name}</span>
              <div className="flex items-center gap-2 ml-auto">
                {project.status === "completed" ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-green-600 text-sm">completed</span>
                  </>
                ) : (
                  <span className="text-yellow-600 text-sm">in progress</span>
                )}
                <span className="text-gray-400">·</span>
                <span className="text-blue-500 text-sm">Enter to view details</span>
              </div>
            </div>

            <div
              className="ml-8 p-4 bg-gray-50 rounded-lg space-y-4 hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => handleProjectClick(project.id)}
              onMouseEnter={() => setHoverText(`/projects ${project.name.toLowerCase().replace(/\s+/g, "-")}`)}
              onMouseLeave={() => setHoverText(null)}
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-3 order-2 md:order-1">
                  <p className="text-gray-700">{project.description}</p>

                  <div>
                    <span className="text-gray-600 font-medium">Technologies:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 flex-wrap">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="w-4 h-4" />
                        <span>View Code</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-green-600 hover:text-green-800 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Globe className="w-4 h-4" />
                        <span>Live Demo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {project.videoUrl && (
                      <a
                        href={project.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Video className="w-4 h-4" />
                        <span>Video Demo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                {project.image && (
                  <div className="w-full max-w-xs mx-auto md:w-64 md:max-w-none md:mx-0 flex-shrink-0 order-1 md:order-2">
                    <img
                      src={getAssetPath(project.image || "/placeholder.svg")}
                      alt={`${project.name} preview`}
                      className="w-full h-40 object-cover rounded border"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )

  const renderProjectDetail = () => {
    const project = projects.find((p) => p.id === selectedProjectId)
    if (!project) return null

    const projectIndex = projects.findIndex((p) => p.id === selectedProjectId)

    return (
      <div className="space-y-4">
        <div
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 cursor-pointer transition-colors"
          onClick={handleBackToProjects}
          onMouseEnter={() => setHoverText("/projects")}
          onMouseLeave={() => setHoverText(null)}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to projects</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-3 p-2 rounded">
            <ChevronRight className="w-4 h-4 text-blue-500 rotate-90" />
            <span className="text-blue-500">{projectIndex + 1}.</span>
            <span className="font-medium">{project.name}</span>
            <div className="flex items-center gap-2 ml-auto">
              {project.status === "completed" ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-green-600 text-sm">completed</span>
                </>
              ) : (
                <span className="text-yellow-600 text-sm">in progress</span>
              )}
            </div>
          </div>

          <div className="ml-8 p-4 bg-gray-50 rounded-lg space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-4 order-2 md:order-1">
                <div>
                  <h3 className="text-gray-900 font-medium mb-2">Project Overview</h3>
                  <p className="text-gray-700 leading-relaxed">{project.description}</p>
                  {project.extendedDescription && (
                    <p className="text-gray-700 leading-relaxed mt-3">{project.extendedDescription}</p>
                  )}
                </div>

                {project.keyFeatures && (
                  <div>
                    <h3 className="text-gray-900 font-medium mb-2">Key Features</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {project.keyFeatures.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.technicalDetails && (
                  <div>
                    <h3 className="text-gray-900 font-medium mb-2">Technical Implementation</h3>
                    <p className="text-gray-700 leading-relaxed">{project.technicalDetails}</p>
                  </div>
                )}

                {project.uniqueAspect && (
                  <div>
                    <h3 className="text-gray-900 font-medium mb-2">What Makes It Unique</h3>
                    <p className="text-gray-700 leading-relaxed">{project.uniqueAspect}</p>
                  </div>
                )}

                <div>
                  <span className="text-gray-600 font-medium">Technologies:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 flex-wrap">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>View Code</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-green-600 hover:text-green-800 transition-colors"
                    >
                      <Globe className="w-4 h-4" />
                      <span>Live Demo</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {project.videoUrl && (
                    <a
                      href={project.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors"
                    >
                      <Video className="w-4 h-4" />
                      <span>Video Demo</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              {project.image && (
                <div className="w-full max-w-xs mx-auto md:w-80 md:max-w-none md:mx-0 flex-shrink-0 order-1 md:order-2">
                  <img
                    src={getAssetPath(project.image || "/placeholder.svg")}
                    alt={`${project.name} preview`}
                    className="w-full h-60 object-cover rounded border cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setModalImage(project.image || null)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderProjects = () => {
    if (selectedProjectId) {
      return renderProjectDetail()
    }
    return renderProjectsList()
  }

  const renderAbout = () => (
    <div className="space-y-4">
      <div className="text-gray-600">Background and journey:</div>

      <div className="space-y-4 text-gray-700">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">🎓 Gauntlet AI Bootcamp Graduate</h3>
          <p>
            Completed an intensive AI and machine learning bootcamp focused on practical applications and real-world
            projects. Gained hands-on experience with modern AI frameworks, neural networks, and production deployment.
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">🚀 Skills & Expertise</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <span className="font-medium">AI/ML:</span>
              <div className="text-sm text-gray-600 mt-1">
                • Machine Learning
                <br />• Neural Networks
                <br />• Natural Language Processing
                <br />• Computer Vision
              </div>
            </div>
            <div>
              <span className="font-medium">Development:</span>
              <div className="text-sm text-gray-600 mt-1">
                • Python, JavaScript
                <br />• React, Node.js
                <br />• TensorFlow, PyTorch
                <br />• API Development
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">💡 Passion & Goals</h3>
          <p>
            Passionate about building AI solutions that solve real-world problems. Currently exploring opportunities in
            AI product development and looking to contribute to innovative projects that push the boundaries of what's
            possible with artificial intelligence.
          </p>
        </div>
      </div>
    </div>
  )

  const renderContact = () => (
    <div className="space-y-4">
      <div className="text-gray-600">Contact information and links:</div>

      <div className="space-y-3">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <span className="text-blue-500">📧</span>
          <span className="font-medium">Email:</span>
          <a href="mailto:your.email@example.com" className="text-blue-600 hover:text-blue-800">
            your.email@example.com
          </a>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <Github className="w-5 h-5 text-gray-700" />
          <span className="font-medium">GitHub:</span>
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            github.com/yourusername
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <span className="text-blue-500">💼</span>
          <span className="font-medium">LinkedIn:</span>
          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            linkedin.com/in/yourprofile
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">🤝 Open to Opportunities</h3>
        <p className="text-blue-800 text-sm">
          I'm actively seeking opportunities in AI/ML engineering, product development, and innovative tech projects.
          Feel free to reach out for collaborations, job opportunities, or just to connect!
        </p>
      </div>
    </div>
  )

  return (
    <div className="h-[100dvh] bg-white font-mono text-base flex flex-col">
      <div className="max-w-6xl mx-auto w-full flex flex-col h-full">
        {/* Scrollable Main Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {/* Gauntlet AI Portfolio Header - Always Visible */}
          <div className="border border-orange-300 rounded-lg p-4 bg-white">
            <div className="flex items-start gap-2 text-gray-900">
              <span className="text-orange-300 text-lg">✻</span>
              <div className="flex-1">
                <div className="font-medium">Benjamin Hitov's Gauntlet AI Portfolio</div>
                <div className="text-gray-600 text-sm mt-1">
                  <div>/projects for portfolio, /about for background</div>
                  <div className="mt-2">
                    <span className="text-gray-500">bootcamp:</span> /Users/developer/gauntlet-ai/portfolio
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section Content */}
          <div>
            {activeSection === "projects" && renderProjects()}
            {activeSection === "about" && renderAbout()}
            {activeSection === "contact" && renderContact()}
          </div>
        </div>

        {/* Fixed Bottom Section */}
        <div className="flex-shrink-0 p-6 pt-4 space-y-6 bg-white border-t border-gray-300 overflow-hidden max-h-[40vh]">
          {/* Input Bar */}
          <div className="border border-gray-300 rounded-lg p-3 bg-white">
            <div className="flex items-center gap-2">
              <span className="text-gray-700">&gt;</span>
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={getInputText()}
                  readOnly
                  className="w-full bg-transparent border-none outline-none font-mono text-base text-gray-700 cursor-default"
                  placeholder=""
                />
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-5 bg-gray-700 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Command Palette */}
          <div className="space-y-1">
            {commands.map((cmd) => (
              <div
                key={cmd.command}
                className={`flex items-start gap-4 p-2 rounded cursor-pointer transition-colors hover:bg-blue-50 ${
                  activeSection === cmd.command.replace("/", "") ? "bg-blue-100" : ""
                }`}
                onClick={() => handleCommandClick(cmd.command)}
                onMouseEnter={() => setHoverText(cmd.command)}
                onMouseLeave={() => setHoverText(null)}
              >
                <span className="text-blue-600 font-medium min-w-20">{cmd.command}</span>
                <span className="text-gray-600">{cmd.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {modalImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setModalImage(null)}
        >
          <div className="relative max-w-7xl max-h-[90vh]">
            <img
              src={getAssetPath(modalImage)}
              alt="Full size preview"
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-all"
              onClick={() => setModalImage(null)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ClaudePortfolio() {
  return (
    <Suspense fallback={
      <div className="h-[100dvh] bg-white font-mono text-base flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    }>
      <PortfolioContent />
    </Suspense>
  )
}