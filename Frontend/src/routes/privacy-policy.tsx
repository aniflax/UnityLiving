import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Unityaliving" },
      {
        name: "description",
        content: "How Unityaliving collects, uses and protects the information you share with us.",
      },
      { property: "og:title", content: "Privacy Policy — Unityaliving" },
      { property: "og:description", content: "Our approach to your data and enquiry details." },
    ],
  }),
  component: () => (
    <LegalPage
      title="Privacy Policy"
      updated="1 February 2026"
      sections={[
        {
          id: "information-we-collect",
          heading: "Information we collect",
          paragraphs: [
            "We collect only what an enquiry needs: your name, phone number, email address, the project you are interested in and anything you choose to tell us in the message field.",
            "If you apply for a role, we also hold the details and documents you submit for that application.",
          ],
        },
        {
          id: "how-we-use-it",
          heading: "How we use it",
          paragraphs: [
            "Your details are used to respond to your enquiry, arrange site visits and share project material you have asked for. We do not sell or rent your information to anyone.",
            "We may contact you about a project you enquired about. You can ask us to stop at any time and we will.",
          ],
        },
        {
          id: "retention-and-security",
          heading: "Retention and security",
          paragraphs: [
            "Enquiry records are retained for as long as needed to serve you and to meet legal obligations, then deleted. Access is limited to the sales and management team.",
          ],
        },
        {
          id: "your-rights",
          heading: "Your rights",
          paragraphs: [
            "Write to unityaliving@gmail.com to see, correct or delete the information we hold about you. We respond within thirty days.",
          ],
        },
      ]}
    />
  ),
});
