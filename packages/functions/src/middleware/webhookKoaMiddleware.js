export default async function verifyWebhook(ctx, next) {
  try {
    const rawBody = ctx.req.rawBody
    const secret = await getSecret(ctx)
    const hmac = await getHmac(ctx)

    const generatedHash = crypto

  } catch (e) {

  }
}
