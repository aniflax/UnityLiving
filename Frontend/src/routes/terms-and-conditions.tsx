import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Unityaliving" },
      {
        name: "description",
        content: "Terms governing the use of the Unityaliving website and the material published on it.",
      },
      { property: "og:title", content: "Terms & Conditions — Unityaliving" },
      { property: "og:description", content: "Website terms, disclaimers and content ownership." },
    ],
  }),
  component: () => (
    <LegalPage
      title="Terms & Conditions"
      updated="1 February 2026"
      sections={[
        {
          id: "use-of-site",
          heading: "Use of this site",
          paragraphs: [
            "By using this website you agree to these terms. The site is provided for information about Unityaliving projects in Madhya Pradesh and is not an offer or a contract.",
          ],
        },
        {
          id: "project-information",
          heading: "Project information and imagery",
          paragraphs: [
            "Plans, dimensions, specifications and imagery are indicative and subject to approvals and design refinement. Renders are artistic impressions.",
            "Nothing on this site should be relied upon in place of the agreement to sell and approved sanction plans, which prevail in all cases.",
          ],
        },
        {
          id: "intellectual-property",
          heading: "Intellectual property",
          paragraphs: [
            "All text, imagery, layouts and marks on this site belong to Unityaliving and may not be reproduced without written permission.",
          ],
        },
        {
          id: "governing-law",
          heading: "Governing law",
          paragraphs: [
            "These terms are governed by the laws of India, and disputes are subject to the exclusive jurisdiction of the courts at Indore, Madhya Pradesh.",
          ],
        },
      ]}
    />
  ),
});
