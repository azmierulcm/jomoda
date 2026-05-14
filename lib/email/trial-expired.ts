import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendTrialExpiredEmail({
  to,
  vendorName,
  slug,
}: {
  to: string
  vendorName: string
  slug: string
}) {
  const storeUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jomoda.my'}/${slug}`

  const { error } = await resend.emails.send({
    from: 'Jomoda <hello@jomoda.my>',
    to,
    subject: `Your Jomoda trial has ended — keep ${vendorName} live`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#F7F7F7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F7F7;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <span style="font-size:24px;font-weight:900;color:#FF385C;letter-spacing:-1px;">jomoda</span>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#fff;border-radius:16px;border:1px solid #DDDDDD;overflow:hidden;">

              <!-- Red header -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:linear-gradient(135deg,#E31C5F,#FF385C);padding:32px 40px;text-align:center;">
                    <p style="margin:0 0 8px;font-size:32px;">⏰</p>
                    <h1 style="margin:0;font-size:22px;font-weight:800;color:#fff;line-height:1.3;">
                      Your free trial has ended
                    </h1>
                    <p style="margin:8px 0 0;font-size:14px;color:rgba(255,255,255,0.8);">
                      Your store is currently unpublished
                    </p>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:36px 40px;">
                    <p style="margin:0 0 16px;font-size:16px;color:#222222;line-height:1.6;">
                      Hi there,
                    </p>
                    <p style="margin:0 0 16px;font-size:16px;color:#222222;line-height:1.6;">
                      Your 30-day free trial for <strong>${vendorName}</strong> on Jomoda has ended.
                      Your store is now unpublished and customers can no longer place orders.
                    </p>

                    <!-- What they get box -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F7F7;border-radius:12px;margin:24px 0;">
                      <tr>
                        <td style="padding:20px 24px;">
                          <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#717171;text-transform:uppercase;letter-spacing:0.5px;">
                            What you get with a subscription
                          </p>
                          <table cellpadding="0" cellspacing="0">
                            ${[
                              '0% commission on every sale',
                              'Unlimited menu items & products',
                              'WhatsApp order integration',
                              'Real-time order dashboard',
                              'Your custom storefront link',
                            ].map(f => `
                            <tr>
                              <td style="padding:4px 0;font-size:14px;color:#222222;">
                                <span style="color:#FF385C;margin-right:8px;">✓</span>${f}
                              </td>
                            </tr>`).join('')}
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Price callout -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="border:2px solid #FF385C;border-radius:12px;margin-bottom:24px;">
                      <tr>
                        <td style="padding:20px 24px;text-align:center;">
                          <p style="margin:0;font-size:13px;color:#717171;text-transform:uppercase;letter-spacing:0.5px;">Monthly plan</p>
                          <p style="margin:8px 0 4px;font-size:40px;font-weight:900;color:#222222;line-height:1;">
                            <span style="font-size:20px;font-weight:700;color:#717171;vertical-align:super;">RM</span>150
                            <span style="font-size:16px;font-weight:600;color:#717171;">/mo</span>
                          </p>
                          <p style="margin:0;font-size:13px;color:#717171;">No contracts · Cancel anytime</p>
                        </td>
                      </tr>
                    </table>

                    <!-- CTA -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center">
                          <a href="mailto:hello@jomoda.my?subject=Subscribe - ${vendorName}"
                            style="display:inline-block;background:linear-gradient(135deg,#E31C5F,#FF385C);color:#fff;font-size:16px;font-weight:700;text-decoration:none;padding:16px 40px;border-radius:12px;">
                            Subscribe Now →
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p style="margin:24px 0 0;font-size:13px;color:#717171;text-align:center;line-height:1.6;">
                      To reactivate your store, reply to this email or contact us at
                      <a href="mailto:hello@jomoda.my" style="color:#FF385C;">hello@jomoda.my</a>.<br/>
                      Your store data is safe — nothing is deleted.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 0;text-align:center;">
              <p style="margin:0;font-size:12px;color:#717171;">
                © ${new Date().getFullYear()} Jomoda · Built for Malaysian sellers<br/>
                <a href="${storeUrl}" style="color:#FF385C;">View your store page</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim(),
  })

  if (error) {
    console.error('[sendTrialExpiredEmail] Resend error:', error)
    throw error
  }
}
