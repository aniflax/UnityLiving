/**
 * health check controller.
 */

export default {
  check: async (ctx: any) => {
    ctx.body = 'Ok';
  },
};
