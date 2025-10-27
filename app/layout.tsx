export const metadata = {
  title: 'Product Information - Email Responder',
  description: 'Get detailed product information sent to your email',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
