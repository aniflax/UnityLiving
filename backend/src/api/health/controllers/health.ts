/**
 * health check controller.
 */

export default {
  check: async (ctx: any) => {
    ctx.body = { status: 'ok', uptime: process.uptime() };
  },
};
