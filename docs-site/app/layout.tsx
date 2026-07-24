import { Layout, Navbar, Footer } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import './custom.css'

export const metadata = {
  title: 'Gitwig Docs',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const navbar = (
    <Navbar 
      logo={<b>Gitwig</b>} 
      projectLink="https://github.com/tareqmy/gitwig" 
    />
  )
  const footer = <Footer>MIT 2026</Footer>

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/tareqmy/gitwig/tree/main/docs"
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
