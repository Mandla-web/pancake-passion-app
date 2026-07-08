export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();
    const amountInCents = body.amountInCents;

    // Dynamically grab your website's URL (e.g., https://pancake-passion-app.pages.dev)
    const origin = new URL(request.url).origin;

    // Request a secure checkout session from Yoco's official backend API
    const yocoResponse = await fetch('https://api.yoco.com/v1/checkout/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.YOCO_SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: amountInCents,
        currency: 'ZAR',
        successUrl: `${origin}?status=success`, 
        cancelUrl: `${origin}?status=cancel`    
      })
    });

    const yocoData = await yocoResponse.json();

    // Pass the secure redirect link back to the React frontend
    if (yocoData.redirectUrl) {
      return new Response(JSON.stringify({ redirectUrl: yocoData.redirectUrl }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({ error: yocoData.message || 'Yoco session failed' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
