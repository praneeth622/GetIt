"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, User, Bot } from "lucide-react"

interface AiChatAssistantProps {
  studentId: string
}

export function AiChatAssistant({ studentId }: AiChatAssistantProps) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi there! I'm your AI career assistant. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I can help you with that! Let me analyze some options for you.",
        "That's a great question about your career path. Based on your skills and interests, I'd recommend exploring these areas...",
        "I've looked at your profile and the current job market. Here are some insights that might help you...",
        "Let me provide some resources that could help you improve in that area.",
      ]

      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setMessages((prev) => [...prev, { role: "assistant", content: randomResponse }])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-violet-900 dark:text-violet-300">AI Career Assistant</h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Chat with your AI assistant about any career questions or concerns.
        </p>
      </div>

      <Card className="border-violet-100 dark:border-violet-800/30">
        <CardContent className="p-4">
          <ScrollArea className="h-[400px] pr-4">
            <div className="flex flex-col gap-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex max-w-[80%] items-start gap-3 rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-violet-100 text-violet-900 dark:bg-violet-900/30 dark:text-violet-100"
                        : "bg-zinc-100 text-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-200"
                    }`}
                  >
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/80 dark:bg-zinc-700/80">
                      {message.role === "user" ? (
                        <User className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                      ) : (
                        <Bot className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                      )}
                    </div>
                    <div className="text-sm">{message.content}</div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex max-w-[80%] items-start gap-3 rounded-lg bg-zinc-100 p-3 text-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-200">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/80 dark:bg-zinc-700/80">
                      <Bot className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 dark:bg-zinc-500"></div>
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 dark:bg-zinc-500"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 dark:bg-zinc-500"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="mt-4 flex gap-2">
            <Input
              placeholder="Ask me anything about your career..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isLoading) {
                  handleSendMessage()
                }
              }}
              disabled={isLoading}
              className="border-violet-200 dark:border-violet-800/30"
            />
            <Button onClick={handleSendMessage} disabled={isLoading || !input.trim()} className="shrink-0">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

