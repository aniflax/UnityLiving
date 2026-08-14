const readStream = (stream: any): Promise<string> =>
  new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on('data', (chunk: Buffer) => chunks.push(Buffer.from(chunk)));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    stream.on('error', reject);
  });

export default (config: any, { strapi }: { strapi: any }) => {
  return async (ctx: any, next: any) => {
    await next();

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
        const html = await readStream(ctx.body);
        if (html.includes('</head>')) {
          ctx.body = inject(html);
        }
      } catch (err) {
        strapi.log.warn(`[admin-head-tags] Failed to inject favicon: ${err}`);
      }
    }
  };
};
