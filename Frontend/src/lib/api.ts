// Single integration seam for form submissions.
// To connect Strapi later, replace the body of each function with a fetch to
// e.g. `${import.meta.env.VITE_STRAPI_URL}/api/enquiries` with { data: payload }.

export type EnquiryPayload = {
  name: string;
  phone: string;
  email: string;
  enquiringAs?: string | undefined;
  subject?: string | undefined;
  message?: string | undefined;
  interestedIn?: string | undefined;
  consent?: boolean | undefined;
  source?: string | undefined;
};

export type ApplicationPayload = {
  name: string;
  email: string;
  position: string;
  message?: string | undefined;
  resumeName?: string | undefined;
};

export type ApiResult = { ok: true; id: string } | { ok: false; error: string };

async function mockRequest(label: string, payload: unknown): Promise<ApiResult> {
  // eslint-disable-next-line no-console
  console.log(`[${label}]`, payload);
  await new Promise((resolve) => setTimeout(resolve, 900));
  return { ok: true, id: `mock_${Date.now()}` };
}

export function submitEnquiry(data: EnquiryPayload) {
  return mockRequest("submitEnquiry", data);
}

export function submitApplication(data: ApplicationPayload) {
  return mockRequest("submitApplication", data);
}
