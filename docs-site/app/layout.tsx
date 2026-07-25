import { Layout, Navbar, Footer } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import './custom.css'

export const metadata = {
  title: 'Gitwig Docs - Terminal Git UI',
  description: 'Documentation for Gitwig, a fast, keyboard-driven Terminal User Interface (TUI) for Git built in Rust. A SourceTree alternative for the terminal.',
  keywords: ['gitwig', 'git tui', 'terminal git ui', 'rust git client', 'lazygit alternative', 'sourcetree alternative', 'git terminal interface', 'git gui', 'gitwig dev'],
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🌿</text></svg>',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const navbar = (
    <Navbar 
      logo={<b>Gitwig</b>} 
      projectLink="https://github.com/tareqmy/gitwig" 
    >
      <a href="https://gitwig.dev" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
        ← Back to gitwig.dev
      </a>
    </Navbar>
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
