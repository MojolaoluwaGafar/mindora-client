import Header from '../Components/HomePageComponents/Header'
import Footer from '../Components/HomePageComponents/Footer'

const sections = [
  {
    heading: "No account, no personal details",
    body: "You never give us your name, email or phone number. When you open the chat, your browser creates a random anonymous ID and keeps it in local storage so your conversation stays together.",
  },
  {
    heading: "How long your conversation is kept",
    body: "Your messages are stored on our server for up to 1 hour after your last message, then deleted automatically. Pressing “End Chat” deletes your conversation immediately.",
  },
  {
    heading: "Who processes your messages",
    body: "To write replies, your messages are sent to our AI providers: Groq, with Anthropic as a backup. They process the text only to generate a response, under their own data policies.",
  },
  {
    heading: "Safety reviews",
    body: "If a message suggests someone may be at risk of self-harm, a copy of that single message is kept for up to 30 days so we can improve our safety responses, then deleted automatically. It is linked only to your anonymous ID.",
  },
  {
    heading: "Technical logs",
    body: "Our server records basic technical information (time of request, anonymous session ID, errors) to keep Mindora running. We never log what you write. Your IP address is used briefly to prevent abuse and is not stored with your messages.",
  },
  {
    heading: "Not an emergency service",
    body: "Mindora is an AI companion, not a substitute for professional care. If you are in danger, call your local emergency number or visit the Resources page for crisis lines.",
  },
]

export default function PrivacyPage() {
  return (
    <div>
      <Header />
      <main className="container mx-auto max-w-3xl px-5 lg:px-10 py-14 lg:py-20 fontDMSans">
        <h1 className="fontCreateRound text-[32px] lg:text-[40px] text-[#0A1916]">Privacy</h1>
        <p className="text-[#747272] mt-2 mb-10">Last updated 5 October 2026</p>
        <div className="space-y-8">
          {sections.map(({ heading, body }) => (
            <section key={heading}>
              <h2 className="text-[20px] font-semibold text-[#054943] mb-2">{heading}</h2>
              <p className="text-[#3A3A3A] text-[17px] leading-relaxed">{body}</p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
