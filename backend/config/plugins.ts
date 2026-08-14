import type { Core } from '@strapi/strapi';

const allowedMediaTypes = [
  'image/*',
  'video/*',
  'audio/*',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.*',
  'text/plain',
  'text/csv',
];

const deniedExecutableTypes = [
  'application/vnd.microsoft.portable-executable',
  'application/x-msdownload',
  'application/x-msdos-program',
  'application/x-executable',
  'application/x-dosexec',
  'application/x-sh',
  'text/x-shellscript',
  'application/x-mach-binary',
];

const normalizeCdnUrl = (url?: string): string | undefined => {
  if (!url) return undefined;
  const trimmed = url.trim().replace(/\/+$/, '');
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
};

const uploadConfig = (env: Core.Config.Shared.ConfigParams['env']) => {
  const cdnUrl = normalizeCdnUrl(env('CDN_URL'));

  if (env('R2_ACCESS_KEY_ID')) {
    return {
      provider: 'aws-s3',
      providerOptions: {
        s3Options: {
          credentials: {
            accessKeyId: env('R2_ACCESS_KEY_ID'),
            secretAccessKey: env('R2_SECRET_ACCESS_KEY'),
          },
          region: env('S3_REGION', 'auto'),
          endpoint: env('R2_ENDPOINT'),
          forcePathStyle: true,
          params: {
            Bucket: env('R2_BUCKET_NAME'),
          },
        },
        baseUrl: cdnUrl,
      },
      security: {
        allowedTypes: allowedMediaTypes,
        deniedTypes: deniedExecutableTypes,
      },
    };
  }

  return {
    security: {
      allowedTypes: allowedMediaTypes,
      deniedTypes: deniedExecutableTypes,
    },
  };
};

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  'users-permissions': {
    config: {
      jwtManagement: 'refresh',
      sessions: {
        httpOnly: true,
      },
    },
  },
  upload: {
    config: uploadConfig(env),
  },
});

export default config;
