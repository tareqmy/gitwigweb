import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '../../mdx-components'

export const generateStaticParams = generateStaticParamsFor('mdxPath')

import { notFound } from 'next/navigation'

export async function generateMetadata(props: { params: Promise<{ mdxPath?: string[] }> }) {
  const params = await props.params
  try {
    const { metadata } = await importPage(params.mdxPath)
    return metadata
  } catch (e) {
    return {}
  }
}

const Wrapper = getMDXComponents().wrapper

export default async function Page(props: { params: Promise<{ mdxPath?: string[] }> }) {
  const params = await props.params
  try {
    const { default: MDXContent, toc, metadata, sourceCode } = await importPage(params.mdxPath)
    return (
      <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
        <MDXContent {...props} params={params} />
      </Wrapper>
    )
  } catch (e) {
    console.error('importPage Error:', e)
    notFound()
  }
}
