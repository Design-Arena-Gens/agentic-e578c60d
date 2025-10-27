import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, name, message } = await request.json();

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      );
    }

    // Simulate email sending (in production, you would use nodemailer or a service like SendGrid)
    console.log('Sending product information to:', email);
    console.log('Customer name:', name);
    console.log('Message:', message);

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In production, you would send an actual email here with product info and links
    const emailContent = {
      to: email,
      subject: 'Your Product Information Package',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #667eea;">Hi ${name}!</h2>
          <p>Thank you for your interest in our products. Here's the information you requested:</p>

          <div style="background-color: #f7fafc; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #2d3748;">Featured Products</h3>

            <div style="margin: 15px 0;">
              <h4>Premium Software Suite</h4>
              <p>All-in-one solution for business management</p>
              <p><strong>Price:</strong> $99/month</p>
              <a href="https://example.com/products/premium" style="color: #667eea;">Learn More →</a>
            </div>

            <div style="margin: 15px 0;">
              <h4>Enterprise Package</h4>
              <p>Advanced features for large organizations</p>
              <p><strong>Price:</strong> $299/month</p>
              <a href="https://example.com/products/enterprise" style="color: #667eea;">Learn More →</a>
            </div>

            <div style="margin: 15px 0;">
              <h4>Starter Plan</h4>
              <p>Perfect for small businesses and startups</p>
              <p><strong>Price:</strong> $29/month</p>
              <a href="https://example.com/products/starter" style="color: #667eea;">Learn More →</a>
            </div>
          </div>

          <div style="background-color: #c6f6d5; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #22543d;">Special Offer!</h3>
            <p>Get 20% off your first month with code: <strong>WELCOME20</strong></p>
          </div>

          <h3 style="color: #2d3748;">Useful Resources</h3>
          <ul>
            <li><a href="https://example.com/demo" style="color: #667eea;">Watch Demo Video</a></li>
            <li><a href="https://example.com/docs" style="color: #667eea;">Documentation</a></li>
            <li><a href="https://example.com/pricing" style="color: #667eea;">Detailed Pricing</a></li>
            <li><a href="https://example.com/support" style="color: #667eea;">Support Center</a></li>
          </ul>

          ${message ? `<p><em>Your message: "${message}"</em></p><p>We'll follow up with you shortly regarding your inquiry.</p>` : ''}

          <p style="margin-top: 30px;">Best regards,<br>The Product Team</p>

          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
          <p style="color: #718096; font-size: 12px;">
            This email was sent because you requested product information from our website.
          </p>
        </div>
      `
    };

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      preview: emailContent
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
