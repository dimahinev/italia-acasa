import { NextResponse } from 'next/server';
import { Resend } from 'resend';

function validateOrder(body: any) {
    const { name, phone, address, items } = body;

    if (!name?.trim()) {
        return 'Numele este obligatoriu';
    }
    if (!phone?.trim()) {
        return 'Telefonul este obligatoriu';
    }

    const cleanPhone = phone.replace(/[\s\-()]/g, '');
    const phoneRegex = /^\+?\d{8,15}$/;

    if (!phoneRegex.test(cleanPhone)) {
        return 'Numărul de telefon nu este valid';
    }

    if (!address?.trim()) {
        return 'Adresa este obligatorie';
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
        return 'Coșul este gol';
    }

    return null;
}

function createHtml(body: any) {
    const { name, phone, address, items, total, currency = 'MDL' } = body;

    const itemsHtml = items
        .map(
            (item: any) => `
            <tr>
                <td style="padding: 12px 8px; border-bottom: 1px solid #e2e8f0; font-family: sans-serif; font-size: 14px; color: #1a202c;">
                    ${item.name}
                </td>
                <td style="padding: 12px 8px; border-bottom: 1px solid #e2e8f0; font-family: sans-serif; font-size: 14px; color: #4a5568; text-align: center;">
                    ${item.quantity}
                </td>
                <td style="padding: 12px 8px; border-bottom: 1px solid #e2e8f0; font-family: sans-serif; font-size: 14px; color: #4a5568; text-align: right;">
                    ${item.price} ${currency}
                </td>
                <td style="padding: 12px 8px; border-bottom: 1px solid #e2e8f0; font-family: sans-serif; font-size: 14px; color: #1a202c; text-align: right; font-weight: 600;">
                    ${item.price * item.quantity} ${currency}
                </td>
            </tr>
        `,
        )
        .join('');

    const emailHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>Comandă Nouă</title>
            </head>
            <body style="font-family: sans-serif; background-color: #f7fafc; padding: 24px; margin: 0;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); padding: 32px; border: 1px solid #e2e8f0;">
                    <h2 style="font-size: 24px; font-weight: 700; color: #1a202c; margin-top: 0; margin-bottom: 24px; border-bottom: 2px solid #edf2f7; padding-bottom: 16px;">
                        🛒 Comandă Nouă!
                    </h2>
                    
                    <div style="margin-bottom: 24px;">
                        <h3 style="font-size: 16px; font-weight: 600; color: #4a5568; margin-top: 0; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.05em;">
                            Date Client
                        </h3>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 6px 0; font-weight: 600; width: 120px; color: #718096; font-size: 14px;">Nume:</td>
                                <td style="padding: 6px 0; color: #1a202c; font-size: 14px;">${name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 6px 0; font-weight: 600; color: #718096; font-size: 14px;">Telefon:</td>
                                <td style="padding: 6px 0; color: #1a202c; font-size: 14px;">${phone}</td>
                            </tr>

                            <tr>
                                <td style="padding: 6px 0; font-weight: 600; color: #718096; font-size: 14px;">Adresă:</td>
                                <td style="padding: 6px 0; color: #1a202c; font-size: 14px;">${address}</td>
                            </tr>
                        </table>
                    </div>

                    <div style="margin-bottom: 24px;">
                        <h3 style="font-size: 16px; font-weight: 600; color: #4a5568; margin-top: 0; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.05em;">
                            Produse Comandate
                        </h3>
                        <table style="width: 100%; border-collapse: collapse; text-align: left;">
                            <thead>
                                <tr style="background-color: #f7fafc;">
                                    <th style="padding: 10px 8px; border-bottom: 2px solid #edf2f7; font-weight: 600; color: #718096; font-size: 12px; text-transform: uppercase;">Denumire</th>
                                    <th style="padding: 10px 8px; border-bottom: 2px solid #edf2f7; font-weight: 600; color: #718096; font-size: 12px; text-transform: uppercase; text-align: center;">Cantitate</th>
                                    <th style="padding: 10px 8px; border-bottom: 2px solid #edf2f7; font-weight: 600; color: #718096; font-size: 12px; text-transform: uppercase; text-align: right;">Preț unitar</th>
                                    <th style="padding: 10px 8px; border-bottom: 2px solid #edf2f7; font-weight: 600; color: #718096; font-size: 12px; text-transform: uppercase; text-align: right;">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${itemsHtml}
                            </tbody>
                        </table>
                    </div>

                    <div style="text-align: right; border-top: 2px solid #edf2f7; padding-top: 16px;">
                        <span style="font-size: 16px; font-weight: 600; color: #4a5568; margin-right: 8px;">Total de plată:</span>
                        <span style="font-size: 20px; font-weight: 700; color: #1a202c;">${total} ${currency}</span>
                    </div>
                </div>
            </body>
            </html>
        `;

    return emailHtml;
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const validationError = validateOrder(body);
        if (validationError) {
            return NextResponse.json({ error: validationError }, { status: 400 });
        }

        const resendApiKey = process.env.RESEND_API_KEY;
        const recipientEmail = process.env.ORDER_RECIPIENT_EMAIL;

        if (!resendApiKey) {
            console.error('RESEND_API_KEY is not defined in environment variables.');
            return NextResponse.json(
                { error: 'Mail server is not configured (missing API key).' },
                { status: 500 },
            );
        }

        if (!recipientEmail) {
            console.error('ORDER_RECIPIENT_EMAIL is not defined in environment variables.');
            return NextResponse.json(
                { error: 'Mail server is not configured (missing recipient).' },
                { status: 500 },
            );
        }

        const emailHtml = createHtml(body);

        const resend = new Resend(resendApiKey);

        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: recipientEmail,
            subject: `Comandă nouă de la ${body?.name || 'user'}`,
            html: emailHtml,
        });

        if (error) {
            console.error('Error sending email via Resend:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (err: any) {
        console.error('Order API error:', err);
        return NextResponse.json(
            { error: err.message || 'Internal Server Error' },
            { status: 500 },
        );
    }
}
