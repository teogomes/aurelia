import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { site, services } from "@/site.config";

/* LocalBusiness schema — this is a clinic people search for on maps,
   so the structured data earns its keep. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["MedicalBusiness", "HealthAndBeautyBusiness"],
  name: `${site.name} — ${site.subname.el}`,
  description: site.subname.el,
  telephone: site.phones.map((p) => `+30${p}`),
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    postalCode: site.address.postal,
    addressLocality: site.address.area.el,
    addressCountry: "GR",
  },
  sameAs: [site.social.instagram.url, site.social.facebook.url],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Υπηρεσίες",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title.el },
    })),
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main>
        <Hero />
        <Services />
        <About />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
