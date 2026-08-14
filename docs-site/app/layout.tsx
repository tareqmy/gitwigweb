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
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const navbar = (
    <Navbar 
      logo={
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg width="20" height="20" viewBox="0 0 32 32" aria-hidden="true">
            <g fill="none" stroke="#5FE39B" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 28.8 V17.8 C10 12.9 14 8.9 18.9 8.9" />
              <path d="M10 22.2 C10 18.7 12.8 15.9 16.3 15.9" />
              <path d="M18.9 8.9 C18.9 5 22.1 1.8 26 1.8 C26 5.7 22.8 8.9 18.9 8.9 Z" />
            </g>
            <circle cx="10" cy="28.8" r="2.3" fill="#5FE39B" />
            <circle cx="16.3" cy="15.9" r="2.3" fill="#5FE39B" />
          </svg>
          <b>Gitwig</b>
        </span>
      }
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
