// Talks to the EduBot AI chatbot backend (FastAPI, runs separately on port 8000).
// Does not touch or depend on any existing Eduzyra service/backend.

const CHATBOT_API_URL = import.meta.env.VITE_CHATBOT_API_URL || 'http://localhost:8000'

/**
 * Sends a chat message and streams the response token-by-token via SSE.
 * @param {string} message - The user's message
 * @param {string|null} conversationId - Existing conversation id, or null to start a new one
 * @param {(chunk: { token?: string, done?: boolean, mode?: string, sources?: any[], conversationId?: string }) => void} onChunk
 * @param {(error: Error) => void} onError
 */
export async function sendChatMessage(message, conversationId, onChunk, onError) {
  try {
    const response = await fetch(`${CHATBOT_API_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        conversation_id: conversationId ?? undefined,
      }),
    })

    if (!response.ok || !response.body) {
      throw new Error(`Chatbot request failed (${response.status})`)
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const events = buffer.split('\n\n')
      buffer = events.pop() ?? ''

      for (const rawEvent of events) {
        const dataLine = rawEvent
          .split('\n')
          .find((line) => line.startsWith('data:'))
        if (!dataLine) continue

        const jsonStr = dataLine.replace(/^data:\s*/, '')
        try {
          const parsed = JSON.parse(jsonStr)
          onChunk(parsed)
        } catch {
          // Ignore malformed SSE fragments
        }
      }
    }
  } catch (error) {
    onError instanceof Function ? onError(error) : console.error('Chatbot error:', error)
  }
}

export function isChatbotConfigured() {
  return Boolean(CHATBOT_API_URL)
}
