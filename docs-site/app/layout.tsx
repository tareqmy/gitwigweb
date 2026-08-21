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
        <span className="gw-lockup">
          <svg className="gw-mark" viewBox="-7.5 34.8 63.18 95.2" aria-hidden="true">
            {/* Brand mark; geometry mirrors branding/logo-mark.svg in the gitwig repo. */}
            <mask id="gw-doc-cut" maskUnits="userSpaceOnUse" x="-16" y="24" width="88" height="116">
              <rect x="-16" y="24" width="88" height="116" fill="#fff" />
              <path d="M8 8 C21 7 29 15 27 40 C13 41 6 29 8 8 Z" transform="translate(13 40)" fill="#000" />
              <circle cx="13" cy="109" r="7" fill="#000" />
            </mask>
            <g mask="url(#gw-doc-cut)">
              <path d="M28.2 93.24H24.24Q15 93.24 10.26 88.2Q5.52 83.16 5.52 73.68V54.36Q5.52 44.88 10.68 39.84Q15.84 34.8 25.32 34.8H53.04Q55.68 34.8 55.68 37.32V96.48Q55.68 105.84 50.46 110.88Q45.24 115.92 35.88 115.92H12.84Q11.4 115.92 10.86 115.38Q10.32 114.84 10.32 113.52V105.24Q10.32 102.72 12.84 102.72H33.36Q37.2 102.72 38.82 101.1Q40.44 99.48 40.44 95.76V86.64H39.96Q38.64 89.88 35.28 91.56Q31.92 93.24 28.2 93.24ZM40.44 70.92V49.32Q40.44 48 39 48H27.72Q23.88 48 22.32 49.62Q20.76 51.24 20.76 55.08V72.96Q20.76 76.8 22.32 78.36Q23.88 79.92 27.72 79.92H32.16Q40.44 79.92 40.44 70.92Z" fill="currentColor" />
              <rect x="15" y="42" width="32" height="46" rx="12" fill="currentColor" />
            </g>
            <circle cx="13" cy="109" r="7" fill="none" stroke="var(--gw-copper)" strokeWidth="4" />
            <circle cx="1" cy="120" r="3.5" fill="var(--gw-copper)" opacity="0.75" />
            <circle cx="-5.5" cy="128" r="2" fill="var(--gw-copper)" opacity="0.45" />
          </svg>
          <b className="gw-wordmark">git<span style={{ color: 'var(--gw-verdigris)' }}>wig</span></b>
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
