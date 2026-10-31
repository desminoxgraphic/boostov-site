import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { FAQ } from "@/lib/site";
import { Card, PageHead, Section, WaButton } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Questions fréquentes",
  description: "Livraison, commande, personnalisation, NFC et QR code, revendeurs : les réponses courtes sur Boostov.",
  alternates: { canonical: "/faq" },
  openGraph: { title: "FAQ Boostov", url: "/faq" },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.flatMap((g) => g.items).map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

export default function FaqPage() {
  return <>
    <PageHead eyebrow="FAQ" title="Questions fréquentes." intro="Des réponses courtes et honnêtes." />
    <Section>
      <div className="faq-layout">
        <aside className="faq-aside">
          <Card raised>
            <h2 className="h3">Une autre question&nbsp;?</h2>
            <p className="small">Écrivez-nous, on vous répond sur WhatsApp.</p>
            <WaButton msg="info" block>Écrire sur WhatsApp</WaButton>
          </Card>
        </aside>
        <div>
          {FAQ.map((g) => <div key={g.group} className="faq-group">
            <h2>{g.group}</h2>
            {g.items.map(([q, a]) => <details key={q} className="qa"><summary>{q}<Plus aria-hidden="true" /></summary><p>{a}</p></details>)}
          </div>)}
        </div>
      </div>
    </Section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
  </>;
}
