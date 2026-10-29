import type { Metadata } from "next";

import {
  LegalPage,
  PolicySection,
  LEGAL_COMPANY,
  LEGAL_PRODUCT,
  LEGAL_CONTACT_EMAIL,
  LEGAL_WEBSITE,
  type LegalSection,
} from "@/components/legal/legal-page";

const EFFECTIVE_DATE = "September 17, 2026";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${LEGAL_PRODUCT} collects, uses, shares, and protects personal data across its NFC digital business card platform.`,
  alternates: {
    canonical: "https://identitree.geoplanph.com/privacy",
  },
};

const SECTIONS: LegalSection[] = [
  { id: "overview", title: "Overview" },
  { id: "who-we-are", title: "Who we are" },
  { id: "scope", title: "Who this policy covers" },
  { id: "information-we-collect", title: "Information we collect" },
  { id: "how-we-use", title: "How we use information" },
  { id: "cookies", title: "Cookies & tracking" },
  { id: "how-we-share", title: "How we share information" },
  { id: "processors", title: "Service providers" },
  { id: "roles", title: "Organizations as controllers" },
  { id: "retention", title: "Data retention" },
  { id: "security", title: "Data security" },
  { id: "transfers", title: "International transfers" },
  { id: "your-rights", title: "Your rights" },
  { id: "children", title: "Children's privacy" },
  { id: "third-party-links", title: "Third-party links" },
  { id: "governing-law", title: "Governing law" },
  { id: "changes", title: "Changes to this policy" },
  { id: "contact", title: "Contact us" },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description={`This policy explains how ${LEGAL_PRODUCT} handles personal data across our NFC digital business card platform — for the people who run workspaces, the professionals whose cards we host, and the visitors who tap, scan, or save those cards.`}
      updated={EFFECTIVE_DATE}
      sections={SECTIONS}
    >
      <PolicySection id="overview" title="Overview">
        <p>
          {LEGAL_PRODUCT} is a platform for creating, distributing, and managing
          NFC-enabled digital business cards and professional profiles. This
          Privacy Policy describes the personal data we collect, why we collect
          it, how we use and share it, and the choices and rights you have. It
          applies to our website, dashboard, public profile pages, and related
          services (together, the &ldquo;Service&rdquo;).
        </p>
        <p>
          By using the Service, you acknowledge the practices described here. If
          you do not agree with this policy, please do not use the Service.
        </p>
      </PolicySection>

      <PolicySection id="who-we-are" title="Who we are">
        <p>
          The Service is operated by <strong>{LEGAL_COMPANY}</strong>{" "}
          (&ldquo;Geoplan,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
          &ldquo;our&rdquo;). Personal data processed through the Service is held
          by Geoplan, which acts as the data controller — except where we act as
          a processor on behalf of an organization (see{" "}
          <a href="#roles">Organizations as controllers</a>).
        </p>
        <p>
          Our full corporate details, including our registered office, are
          available on our website at{" "}
          <a href={LEGAL_WEBSITE} target="_blank" rel="noreferrer">
            {LEGAL_WEBSITE.replace("https://", "")}
          </a>
          . For any privacy question, or to exercise your rights, contact us at{" "}
          <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a>.
        </p>
      </PolicySection>

      <PolicySection id="scope" title="Who this policy covers">
        <p>This policy covers three groups of people:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Account holders and team members</strong> — people who sign
            up, join a workspace, and manage cards and profiles.
          </li>
          <li>
            <strong>Cardholders</strong> — professionals whose contact details
            are published on a digital business card or profile.
          </li>
          <li>
            <strong>Visitors</strong> — people who tap an NFC card, scan a QR
            code, open a profile link, or save a cardholder&rsquo;s contact
            details.
          </li>
        </ul>
      </PolicySection>

      <PolicySection id="information-we-collect" title="Information we collect">
        <p>
          <strong>Information you provide.</strong>
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Account data</strong> — your name, email address, password
            (stored only in hashed form), profile image, and email-verification
            status.
          </li>
          <li>
            <strong>Organization data</strong> — workspace name, logo, website,
            brochures, member roles, and related settings.
          </li>
          <li>
            <strong>Profile / card content</strong> — the details you publish on
            a card, such as first and last name, position title, work email,
            contact number, avatar, LinkedIn, WhatsApp and Viber handles, and
            booking links.
          </li>
          <li>
            <strong>Uploaded media</strong> — images, logos, brochures, and
            other files you upload, hosted through our media provider
            (Cloudinary).
          </li>
          <li>
            <strong>Communications</strong> — messages you send us for support
            or other requests.
          </li>
        </ul>
        <p>
          <strong>Information collected automatically.</strong>
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Session and device data</strong> — IP address, browser
            user-agent, and session identifiers used to keep you signed in and
            secure your account.
          </li>
          <li>
            <strong>Interaction analytics</strong> — when a card is tapped, a QR
            code is scanned, a profile is viewed, or a contact is saved, we
            record the event type, the channel (NFC tap, QR scan, or direct
            link), a timestamp, the visitor&rsquo;s IP address, and an
            approximate location (country and city) derived from that IP address.
            This data is attributed to the relevant profile, organization, and
            card.
          </li>
          <li>
            <strong>Product usage data</strong> — page views and feature usage
            collected through our product-analytics provider (PostHog) to
            understand and improve the Service.
          </li>
        </ul>
        <p>
          <strong>Information from third parties.</strong> If you sign in through
          a third-party identity provider, we receive basic account information
          from that provider. We also use a third-party IP-geolocation service to
          estimate the approximate location of interaction events.
        </p>
      </PolicySection>

      <PolicySection id="how-we-use" title="How we use information">
        <p>We use personal data to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>create and manage accounts, workspaces, and authentication;</li>
          <li>host and display digital business cards and public profiles;</li>
          <li>
            deliver interaction analytics and lead notifications to cardholders
            and organizations;
          </li>
          <li>operate, maintain, secure, and improve the Service;</li>
          <li>
            communicate with you about the Service, including verification,
            password resets, and support;
          </li>
          <li>
            detect, prevent, and respond to fraud, abuse, and security incidents;
            and
          </li>
          <li>comply with legal obligations and enforce our terms.</li>
        </ul>
        <p>
          Under the Philippine Data Privacy Act of 2012 and other applicable law,
          we rely on one or more legal bases for this processing: performance of
          a contract with you, your consent, our legitimate interests in
          operating and improving the Service, and compliance with legal
          obligations.
        </p>
      </PolicySection>

      <PolicySection id="cookies" title="Cookies & tracking">
        <p>
          We use strictly necessary cookies to keep you signed in and to protect
          the Service. With your consent where required, we also use analytics
          cookies and similar technologies (through PostHog) to measure usage and
          improve features. You can control cookies through your browser
          settings; disabling necessary cookies may prevent parts of the Service
          from working.
        </p>
      </PolicySection>

      <PolicySection id="how-we-share" title="How we share information">
        <p>We do not sell personal data. We share it only as described below:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Within a workspace</strong> — profile content and interaction
            analytics are visible to the organization that owns the card and its
            authorized administrators.
          </li>
          <li>
            <strong>Publicly, by design</strong> — details published on a card or
            profile are, by their nature, visible to anyone who opens that
            profile.
          </li>
          <li>
            <strong>Service providers</strong> — vendors who process data on our
            behalf under contract (see <a href="#processors">Service providers</a>
            ).
          </li>
          <li>
            <strong>Legal and safety</strong> — where required by law, legal
            process, or to protect the rights, property, or safety of {LEGAL_PRODUCT},
            our users, or the public.
          </li>
          <li>
            <strong>Business transfers</strong> — in connection with a merger,
            acquisition, or sale of assets, subject to this policy.
          </li>
        </ul>
      </PolicySection>

      <PolicySection id="processors" title="Service providers">
        <p>
          We rely on the following categories of third-party providers, who
          process personal data only on our instructions and under appropriate
          safeguards:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Media hosting</strong> (Cloudinary) — storage and delivery of
            uploaded images, logos, and brochures.
          </li>
          <li>
            <strong>Product analytics</strong> (PostHog) — usage measurement and
            product improvement.
          </li>
          <li>
            <strong>IP geolocation</strong> — deriving an approximate location
            (country and city) from a visitor&rsquo;s IP address for interaction
            analytics.
          </li>
          <li>
            <strong>Email delivery</strong> — sending verification, password
            reset, and transactional messages.
          </li>
          <li>
            <strong>Cloud hosting and database</strong> — infrastructure that
            runs the Service and stores its data.
          </li>
        </ul>
      </PolicySection>

      <PolicySection id="roles" title="Organizations as controllers">
        <p>
          When an organization uses {LEGAL_PRODUCT} to publish cards and collect
          interaction analytics, that organization determines how the data is
          used and is a controller of that data, with Geoplan acting as its
          processor. If you are a visitor or cardholder and want to exercise
          rights over data held by an organization, please contact that
          organization directly; we will support them in responding to your
          request.
        </p>
      </PolicySection>

      <PolicySection id="retention" title="Data retention">
        <p>
          We keep personal data for as long as needed to provide the Service and
          for the purposes described in this policy — for example, while your
          account or workspace is active. We retain interaction analytics for as
          long as the associated profile or organization exists, unless a shorter
          period is required. When data is no longer needed, we delete or
          anonymize it, subject to legal retention requirements.
        </p>
      </PolicySection>

      <PolicySection id="security" title="Data security">
        <p>
          We use technical and organizational measures to protect personal data,
          including encryption in transit, hashed password storage, access
          controls, and session management. No system is perfectly secure, so we
          cannot guarantee absolute security; please use a strong, unique
          password and keep your credentials confidential.
        </p>
      </PolicySection>

      <PolicySection id="transfers" title="International transfers">
        <p>
          Some of our service providers may process personal data in countries
          other than the Philippines. Where data is transferred across borders,
          we take steps to ensure it remains protected consistent with this
          policy and the Data Privacy Act of 2012.
        </p>
      </PolicySection>

      <PolicySection id="your-rights" title="Your rights">
        <p>
          Subject to applicable law, you have the right to be informed and to
          access, correct, update, or delete your personal data; to object to or
          restrict certain processing; to withdraw consent; to data portability;
          and to be indemnified for damages. To exercise these rights, email us
          at <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a>.
          We will respond within the timeframe required by applicable law and may
          need to verify your identity first.
        </p>
        <p>
          If you believe your rights have been violated, you may lodge a complaint
          with the National Privacy Commission of the Philippines (NPC).
        </p>
      </PolicySection>

      <PolicySection id="children" title="Children's privacy">
        <p>
          The Service is intended for professional use and is not directed to
          children. We do not knowingly collect personal data from children. If
          you believe a child has provided us personal data, contact us and we
          will take appropriate steps to delete it.
        </p>
      </PolicySection>

      <PolicySection id="third-party-links" title="Third-party links">
        <p>
          Cards and profiles may link to third-party sites and services (for
          example, LinkedIn, WhatsApp, Viber, or booking tools). We are not
          responsible for the privacy practices of those third parties; please
          review their policies.
        </p>
      </PolicySection>

      <PolicySection id="governing-law" title="Governing law">
        <p>
          This policy and our processing of personal data are governed by the
          laws of the Republic of the Philippines, including the Data Privacy Act
          of 2012 (Republic Act No. 10173), its Implementing Rules and
          Regulations, and the issuances of the National Privacy Commission.
        </p>
      </PolicySection>

      <PolicySection id="changes" title="Changes to this policy">
        <p>
          We may update this policy from time to time. When we make material
          changes, we will update the &ldquo;Last updated&rdquo; date above and,
          where appropriate, provide additional notice. Your continued use of the
          Service after changes take effect constitutes acceptance of the updated
          policy.
        </p>
      </PolicySection>

      <PolicySection id="contact" title="Contact us">
        <p>
          If you have questions about this policy or how we handle personal data,
          contact <strong>{LEGAL_COMPANY}</strong> at{" "}
          <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a>.
        </p>
      </PolicySection>
    </LegalPage>
  );
}
