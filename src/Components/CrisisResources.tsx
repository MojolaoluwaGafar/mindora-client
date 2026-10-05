import { Phone, Globe, LifeBuoy } from "lucide-react"

const HELPLINES = [
  { region: "In immediate danger", detail: "Call your local emergency number: 112 (Nigeria & Europe), 911 (US/Canada), 999 (UK)", href: "tel:112", icon: Phone },
  { region: "US & Canada", detail: "Call or text 988 (Suicide & Crisis Lifeline)", href: "tel:988", icon: Phone },
  { region: "UK & Ireland", detail: "Call Samaritans on 116 123 (free, 24/7)", href: "tel:116123", icon: Phone },
  { region: "Anywhere else", detail: "Find a free, confidential helpline in your country", href: "https://findahelpline.com", icon: Globe },
]

/** Prominent card shown in the chat when a message is flagged, and on the Resources page. */
export default function CrisisResources({ compact = false }: { compact?: boolean }) {
  return (
    <section
      aria-label="Crisis support resources"
      className="rounded-[20px] border border-[#F5C2C2] bg-[#FFF5F5] p-5 fontDMSans text-[#0A1916]"
    >
      <div className="flex items-center gap-2 mb-3">
        <LifeBuoy size={20} className="text-[#C00909]" aria-hidden />
        <h2 className="font-semibold text-[#C00909]">
          {compact ? "You don't have to go through this alone" : "If you're in crisis, get help now"}
        </h2>
      </div>
      <ul className="space-y-2.5">
        {HELPLINES.map(({ region, detail, href, icon: Icon }) => (
          <li key={region}>
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex items-start gap-3 rounded-xl bg-white border border-[#F3D6D6] px-4 py-3 hover:border-[#C00909] transition-colors"
            >
              <Icon size={18} className="mt-0.5 shrink-0 text-[#C00909]" aria-hidden />
              <span>
                <span className="block font-semibold">{region}</span>
                <span className="block text-[#5C5C5C] text-sm">{detail}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
