const readStream = (stream: any): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on('data', (chunk: Buffer) => chunks.push(Buffer.from(chunk)));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });

export default (config: any, { strapi }: { strapi: any }) => {
  return async (ctx: any, next: any) => {
    await next();

    if (!ctx.response.get('Content-Type').includes('text/html')) return;

    const inject = (html: string): string =>
      html.replace(
        '</head>',
        '<link rel="icon" href="/favicon.png" type="image/png">' +
          '<link rel="apple-touch-icon" href="/favicon.png">' +
          '</head>'
      );

    if (typeof ctx.body === 'string' && ctx.body.includes('</head>')) {
      ctx.body = inject(ctx.body);
      return;
    }

    if (ctx.body && typeof ctx.body.pipe === 'function') {
      try {
        const buffer = await readStream(ctx.body);
        const html = buffer.toString('utf8');
        if (html.includes('</head>')) {
          ctx.body = inject(html);
        } else {
          ctx.body = buffer;
        }
      } catch (err) {
        strapi.log.warn(`[admin-head-tags] Failed to inject favicon: ${err}`);
      }
    }
  };
};
