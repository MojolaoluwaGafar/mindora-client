import React, { useEffect, useRef, useState } from 'react'
import Logo from "../assets/Logo.png"
import { Link, useNavigate } from 'react-router'
import { ArrowUp, Brain, LifeBuoy } from 'lucide-react'
import { useChat } from '../Hook/useChat'
import AIMessage from '../Components/ChatComponents/AIMessage'
import CrisisResources from '../Components/CrisisResources'

const MAX_LENGTH = 2000;
const SUGGESTIONS = ["I feel anxious", "I need support", "I can’t sleep", "I’m overwhelmed with work"];

function AIAvatar() {
  return (
    <div className="shrink-0 w-9 h-9 rounded-full bg-[#0D9488] text-white flex items-center justify-center shadow" aria-hidden>
      <Brain size={18} />
    </div>
  )
}

export default function ChatPage() {
  const [input, setInput] = useState<string>("");
  const { sendMessage, endChat, messages, loading, slow, restoring, error } = useChat()
  const navigate = useNavigate()
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Keep the latest message (or the typing indicator) in view.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [messages, loading])

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return;
    sendMessage(text)
    setInput("")
  }

  const handleEndChat = async () => {
    await endChat()
    navigate("/")
  }

  const pickSuggestion = (text: string) => {
    setInput(text)
    inputRef.current?.focus()
  }

  const showCrisisCard = messages.some((m) => m.risk === "crisis")
  const showSupportLink = !showCrisisCard && messages.some((m) => m.risk === "concern")
  const isEmpty = messages.length === 0 && !restoring

  return (
    <div className="w-full h-dvh flex flex-col">
      <header className='shrink-0 flex items-center justify-between w-full border-b border-[#F3F2F2] py-4 lg:py-6 px-5 lg:px-10'>
        <Link to="/"><img className="w-[120px] lg:w-[149px]" src={Logo} alt="Mindora home" /></Link>
        <button
          onClick={handleEndChat}
          type="button" className="bg-[#FFE9E9] rounded-[48px] px-6 h-[44px] font-semibold text-[#C00909] hover:bg-[#FFD9D9]">
          End Chat
        </button>
      </header>

      <main className="flex-1 min-h-0 bg-[#EDF8F7] overflow-y-auto" aria-live="polite">
        <div className="container mx-auto px-4 lg:px-10 py-6 lg:py-10 space-y-6 min-h-full flex flex-col">
          {isEmpty && (
            <div className="m-auto flex flex-col items-center gap-8">
              <div className="bg-white border border-[#C8CCCC] rounded-[28px] px-6 py-8 max-w-[747px] flex flex-col items-center justify-center text-center">
                <h1 className="fontCreateRound text-2xl lg:text-[32px] text-[#000000]">Hi, I'm Mindora.</h1>
                <p className="text-[#747272] fontDMSans lg:text-[18px] py-1">
                  Tell me how you're feeling. I'm here, and this is private.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3 lg:gap-5">
                {SUGGESTIONS.map((text) => (
                  <button
                    type='button'
                    key={text}
                    onClick={() => pickSuggestion(text)}
                    className="bg-[#FAFAFA] border border-[#C8CCCC] rounded-full px-4 lg:px-6 py-2 text-[#0A1916] text-[15px] lg:text-[17px] hover:bg-gray-100 fontDMSans font-semibold">
                    {text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, idx) => (
            msg.sender === "user" ? (
              <div key={msg.id ?? idx} className="w-fit max-w-[85%] lg:max-w-[70%] ml-auto bg-[#0D9488] text-white px-5 py-3 rounded-t-[28px] rounded-bl-[28px] rounded-br-[7px] shadow fontDMSans whitespace-pre-wrap break-words">
                <span className="sr-only">You said: </span>{msg.text}
              </div>
            ) : (
              <div key={msg.id ?? idx} className="flex items-start gap-3 max-w-[95%] lg:max-w-[80%]">
                <AIAvatar />
                <div className="min-w-0 bg-white border border-[#C8CCCC] px-5 py-4 rounded-t-[28px] rounded-br-[28px] rounded-bl-[7px] shadow-sm fontDMSans">
                  <span className="sr-only">Mindora said: </span>
                  <AIMessage text={msg.text} />
                </div>
              </div>
            )
          ))}

          {showCrisisCard && <div className="max-w-[720px]"><CrisisResources compact /></div>}

          {loading && messages[messages.length - 1]?.sender === "user" && (
            <div className="flex items-start gap-3" role="status">
              <AIAvatar />
              <div className="bg-white border border-[#C8CCCC] px-5 py-4 rounded-t-[28px] rounded-br-[28px] rounded-bl-[7px]">
                <div className="flex gap-1.5" aria-hidden>
                  <span className="w-2 h-2 rounded-full bg-[#0D9488] animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 rounded-full bg-[#0D9488] animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-[#0D9488] animate-bounce" />
                </div>
                <span className="sr-only">Mindora is typing</span>
                {slow && <p className="text-sm text-[#747272] mt-2 fontDMSans">Waking Mindora up — this can take up to a minute the first time…</p>}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </main>

      <footer className="shrink-0 bg-white border-t border-[#F3F2F2] px-4 pt-4 pb-3">
        <div className="container mx-auto lg:px-10">
          {error && <p role="alert" className="text-center text-red-600 text-sm mb-2 fontDMSans">{error}</p>}
          {showSupportLink && (
            <p className="text-center text-sm mb-2 fontDMSans">
              <Link to="/resources" className="inline-flex items-center gap-1 text-[#C00909] underline underline-offset-2">
                <LifeBuoy size={14} aria-hidden /> Need to talk to someone now? See support lines
              </Link>
            </p>
          )}
          <form onSubmit={handleSend} className="relative">
            <label htmlFor="chat-input" className="sr-only">Message Mindora</label>
            <input
              id="chat-input"
              ref={inputRef}
              type="text"
              value={input}
              maxLength={MAX_LENGTH}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Share what’s on your mind..."
              autoComplete="off"
              className="border border-[#C8CCCC] rounded-[50px] h-[52px] lg:h-[68px] w-full px-6 pr-16 lg:pr-20 fontDMSans focus:outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/20" />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="absolute right-2 lg:right-3 top-1/2 -translate-y-1/2 bg-[#0D9488] text-white rounded-full w-[38px] h-[38px] lg:w-[50px] lg:h-[50px] flex items-center justify-center disabled:opacity-50 hover:bg-[#0b7f75]">
              <ArrowUp className="w-5 h-5 lg:w-7 lg:h-7" />
            </button>
          </form>
          <p className='text-center text-[#747272] text-xs lg:text-[14px] mt-2 fontDMSans'>
            Mindora is an AI companion, not a substitute for professional care. <Link to="/privacy" className="underline underline-offset-2">Privacy</Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
