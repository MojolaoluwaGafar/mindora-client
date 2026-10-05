import Markdown, { type Components } from "react-markdown"
import remarkGfm from "remark-gfm"

// Tailwind preflight strips default element styles, so every markdown element
// gets explicit Mindora styling here.
const components: Components = {
  p: ({ children }) => <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>,
  h1: ({ children }) => <h3 className="fontCreateRound text-lg lg:text-xl text-[#054943] mt-4 mb-2 first:mt-0">{children}</h3>,
  h2: ({ children }) => <h3 className="fontCreateRound text-lg lg:text-xl text-[#054943] mt-4 mb-2 first:mt-0">{children}</h3>,
  h3: ({ children }) => <h4 className="font-semibold text-[#054943] mt-3 mb-1.5 first:mt-0">{children}</h4>,
  h4: ({ children }) => <h4 className="font-semibold text-[#054943] mt-3 mb-1.5 first:mt-0">{children}</h4>,
  strong: ({ children }) => <strong className="font-semibold text-[#0A1916]">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  ul: ({ children }) => <ul className="mb-3 last:mb-0 space-y-1.5 pl-5 list-disc marker:text-[#0D9488]">{children}</ul>,
  ol: ({ children }) => <ol className="mb-3 last:mb-0 space-y-1.5 pl-5 list-decimal marker:text-[#0D9488] marker:font-semibold">{children}</ol>,
  li: ({ children }) => <li className="pl-1 leading-relaxed">{children}</li>,
  a: ({ children, href }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#0D9488] underline underline-offset-2 hover:text-[#054943]">{children}</a>,
  blockquote: ({ children }) => <blockquote className="mb-3 border-l-4 border-[#0D9488] bg-[#EDF8F7] rounded-r-xl px-4 py-2 text-[#054943]">{children}</blockquote>,
  hr: () => <hr className="my-4 border-[#E3E6E6]" />,
  code: ({ children }) => <code className="rounded bg-[#F3F2F2] px-1.5 py-0.5 text-[0.9em]">{children}</code>,
  table: ({ children }) => (
    <div className="mb-3 last:mb-0 overflow-x-auto rounded-xl border border-[#E3E6E6]">
      <table className="w-full text-left text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-[#EDF8F7] text-[#054943]">{children}</thead>,
  th: ({ children }) => <th className="px-3 py-2 font-semibold whitespace-nowrap">{children}</th>,
  td: ({ children }) => <td className="px-3 py-2 align-top border-t border-[#E3E6E6]">{children}</td>,
}

export default function AIMessage({ text }: { text: string }) {
  return (
    <div className="text-[15px] lg:text-[17px] text-[#0A1916] break-words">
      <Markdown remarkPlugins={[remarkGfm]} components={components}>{text}</Markdown>
    </div>
  )
}
