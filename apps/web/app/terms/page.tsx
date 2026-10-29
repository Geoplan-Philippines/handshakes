import type { Metadata } from "next";
import Link from "next/link";

import {
  LegalPage,
  PolicySection,
  LEGAL_COMPANY,
  LEGAL_PRODUCT,
  LEGAL_CONTACT_EMAIL,
  type LegalSection,
} from "@/components/legal/legal-page";

const EFFECTIVE_DATE = "September 17, 2026";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that govern your use of ${LEGAL_PRODUCT}, the NFC digital business card platform operated by ${LEGAL_COMPANY}.`,
  alternates: {
    canonical: "https://identitree.geoplanph.com/terms",
  },
};

const SECTIONS: LegalSection[] = [
  { id: "acceptance", title: "Acceptance of terms" },
  { id: "eligibility", title: "Eligibility" },
  { id: "accounts", title: "Accounts & workspaces" },
  { id: "the-service", title: "The Service" },
  { id: "acceptable-use", title: "Acceptable use" },
  { id: "your-content", title: "Your content" },
  { id: "cards-hardware", title: "Cards & hardware" },
  { id: "privacy", title: "Privacy" },
  { id: "third-party", title: "Third-party services" },
  { id: "intellectual-property", title: "Intellectual property" },
  { id: "fees", title: "Fees & plans" },
  { id: "termination", title: "Termination" },
  { id: "disclaimers", title: "Disclaimers" },
  { id: "liability", title: "Limitation of liability" },
  { id: "indemnification", title: "Indemnification" },
  { id: "changes", title: "Changes to these terms" },
  { id: "governing-law", title: "Governing law" },
  { id: "contact", title: "Contact us" },
];

export default function TermsOfServicePage() {
  return (
    <LegalPage
      title="Terms of Service"
      description={`These terms govern your access to and use of ${LEGAL_PRODUCT}, the NFC digital business card platform operated by ${LEGAL_COMPANY}. Please read them carefully.`}
      updated={EFFECTIVE_DATE}
      sections={SECTIONS}
    >
      <PolicySection id="acceptance" title="Acceptance of terms">
        <p>
          These Terms of Service (&ldquo;Terms&rdquo;) form a binding agreement
          between you and <strong>{LEGAL_COMPANY}</strong> (&ldquo;Geoplan,&rdquo;
          &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) governing your
          use of the {LEGAL_PRODUCT} website, dashboard, public profile pages, NFC
          cards, and related services (together, the &ldquo;Service&rdquo;). By
          creating an account or using the Service, you agree to these Terms and
          to our <Link href="/privacy">Privacy Policy</Link>. If you do not
          agree, do not use the Service.
        </p>
      </PolicySection>

      <PolicySection id="eligibility" title="Eligibility">
        <p>
          You must be at least 18 years old and able to form a binding contract to
          use the Service. If you use the Service on behalf of an organization,
          you represent that you have authority to bind that organization to these
          Terms, and &ldquo;you&rdquo; refers to that organization.
        </p>
      </PolicySection>

      <PolicySection id="accounts" title="Accounts & workspaces">
        <p>
          You are responsible for the information you provide when registering,
          for keeping your credentials confidential, and for all activity under
          your account. Workspace administrators are responsible for managing
          their team members&rsquo; access and for the cards, profiles, and data
          within their workspace. Notify us promptly of any unauthorized use of
          your account at{" "}
          <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a>.
        </p>
      </PolicySection>

      <PolicySection id="the-service" title="The Service">
        <p>
          {LEGAL_PRODUCT} lets you create, distribute, and manage NFC-enabled
          digital business cards and professional profiles, and view interaction
          analytics such as taps, scans, profile views, and saved contacts. We may
          add, change, or remove features over time. We aim to keep the Service
          available but do not guarantee it will be uninterrupted or error-free.
        </p>
      </PolicySection>

      <PolicySection id="acceptable-use" title="Acceptable use">
        <p>You agree not to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>use the Service for any unlawful, harmful, or fraudulent purpose;</li>
          <li>
            impersonate any person or organization, or misrepresent your
            affiliation;
          </li>
          <li>
            publish another person&rsquo;s personal data without a lawful basis or
            their consent;
          </li>
          <li>
            upload malware, or attempt to disrupt, probe, or gain unauthorized
            access to the Service or its infrastructure;
          </li>
          <li>
            scrape, harvest, or collect data from the Service except as expressly
            permitted;
          </li>
          <li>
            infringe intellectual property, privacy, or other rights of others; or
          </li>
          <li>
            resell or provide the Service to third parties except as permitted by
            your plan.
          </li>
        </ul>
      </PolicySection>

      <PolicySection id="your-content" title="Your content">
        <p>
          You retain ownership of the content you upload or publish through the
          Service, including profile details, images, logos, and brochures
          (&ldquo;Your Content&rdquo;). You grant us a worldwide, non-exclusive
          license to host, store, process, and display Your Content solely to
          operate and provide the Service.
        </p>
        <p>
          You are responsible for Your Content and represent that you have the
          rights and any necessary consents to publish it — including the consent
          of any individual whose personal data appears on a card or profile. We
          may remove content that violates these Terms or applicable law.
        </p>
      </PolicySection>

      <PolicySection id="cards-hardware" title="Cards & hardware">
        <p>
          NFC cards and related hardware provided through the Service are intended
          for legitimate networking use. You are responsible for keeping cards
          secure and for the profiles they are linked to. If a card is lost,
          stolen, or reassigned, you can update or unlink it through your
          workspace. Physical cards may be subject to separate purchase terms
          disclosed at the time of order.
        </p>
      </PolicySection>

      <PolicySection id="privacy" title="Privacy">
        <p>
          Our handling of personal data is described in our{" "}
          <Link href="/privacy">Privacy Policy</Link>, which is incorporated into
          these Terms by reference. By using the Service, you acknowledge that
          collection and use of information as described there.
        </p>
      </PolicySection>

      <PolicySection id="third-party" title="Third-party services">
        <p>
          The Service integrates with and may link to third-party services (for
          example, LinkedIn, WhatsApp, Viber, booking tools, and our media and
          analytics providers). Your use of those services is governed by their
          own terms and policies, and we are not responsible for them.
        </p>
      </PolicySection>

      <PolicySection id="intellectual-property" title="Intellectual property">
        <p>
          The Service, including its software, design, and the {LEGAL_PRODUCT}{" "}
          name, logo, and brand, is owned by Geoplan or its licensors and is
          protected by intellectual property laws. Except for the rights expressly
          granted to you, these Terms do not transfer any rights in the Service to
          you. You may not copy, modify, or create derivative works of the Service
          without our permission.
        </p>
      </PolicySection>

      <PolicySection id="fees" title="Fees & plans">
        <p>
          Some features are offered free of charge; others may require a paid
          plan. Where fees apply, the price, billing cycle, and any taxes will be
          disclosed at the time of purchase. Unless required by law or stated
          otherwise, fees are non-refundable. We may change our fees on
          reasonable notice.
        </p>
      </PolicySection>

      <PolicySection id="termination" title="Termination">
        <p>
          You may stop using the Service and close your account at any time. We
          may suspend or terminate your access if you breach these Terms, if
          required by law, or to protect the Service or other users. On
          termination, your right to use the Service ends; we may delete your data
          in accordance with our <Link href="/privacy">Privacy Policy</Link>,
          subject to legal retention requirements. Provisions that by their nature
          should
          survive termination will survive.
        </p>
      </PolicySection>

      <PolicySection id="disclaimers" title="Disclaimers">
        <p>
          The Service is provided &ldquo;as is&rdquo; and &ldquo;as
          available,&rdquo; without warranties of any kind, whether express or
          implied, including warranties of merchantability, fitness for a
          particular purpose, and non-infringement, to the fullest extent
          permitted by law. We do not warrant that the Service will be
          uninterrupted, secure, or error-free.
        </p>
      </PolicySection>

      <PolicySection id="liability" title="Limitation of liability">
        <p>
          To the fullest extent permitted by law, Geoplan and its affiliates will
          not be liable for any indirect, incidental, special, consequential, or
          punitive damages, or for any loss of profits, revenue, data, or
          goodwill, arising from or related to your use of the Service. Our total
          liability for any claim relating to the Service will not exceed the
          amount you paid us for the Service in the twelve months before the event
          giving rise to the claim, or, if you paid nothing, a reasonable amount
          as determined under applicable law.
        </p>
      </PolicySection>

      <PolicySection id="indemnification" title="Indemnification">
        <p>
          You agree to indemnify and hold harmless Geoplan and its affiliates from
          any claims, damages, liabilities, and expenses arising from your content,
          your use of the Service, or your breach of these Terms or applicable
          law.
        </p>
      </PolicySection>

      <PolicySection id="changes" title="Changes to these terms">
        <p>
          We may update these Terms from time to time. When we make material
          changes, we will update the &ldquo;Last updated&rdquo; date above and,
          where appropriate, provide additional notice. Your continued use of the
          Service after changes take effect constitutes acceptance of the updated
          Terms.
        </p>
      </PolicySection>

      <PolicySection id="governing-law" title="Governing law">
        <p>
          These Terms are governed by the laws of the Republic of the Philippines,
          without regard to its conflict-of-laws rules. You agree to the exclusive
          jurisdiction of the courts of the Philippines for any dispute arising
          from or relating to these Terms or the Service, subject to any mandatory
          consumer-protection rights you may have.
        </p>
      </PolicySection>

      <PolicySection id="contact" title="Contact us">
        <p>
          Questions about these Terms? Contact <strong>{LEGAL_COMPANY}</strong> at{" "}
          <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a>.
        </p>
      </PolicySection>
    </LegalPage>
  );
}
