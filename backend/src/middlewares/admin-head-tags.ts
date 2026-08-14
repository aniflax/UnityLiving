export default (config: any, { strapi }: { strapi: any }) => {
  return async (ctx: any, next: any) => {
    await next();
    if (typeof ctx.body === 'string' && ctx.body.includes('</head>')) {
      ctx.body = ctx.body.replace(
        '</head>',
        '<link rel="icon" href="/favicon.png" type="image/png">' +
          '<link rel="apple-touch-icon" href="/favicon.png">' +
          '</head>'
      );
    }
  };
};
