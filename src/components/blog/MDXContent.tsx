import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypePrettyCode from 'rehype-pretty-code'
import { ChartBlock } from './ChartBlock'
import { CopyButton } from './CopyButton'
import { PortfolioVarianceChart } from './charts/PortfolioVarianceChart'
import { CorrelationHeatmap } from './charts/CorrelationHeatmap'
import { AMMCurveChart } from './charts/AMMCurveChart'
import { PriceImpactChart } from './charts/PriceImpactChart'
import { EfficientFrontierChart } from './charts/EfficientFrontierChart'
import { SharpeSortinoComparison } from './charts/SharpeSortinoComparison'
import { VaRComparisonChart } from './charts/VaRComparisonChart'
import { FactorModelChart } from './charts/FactorModelChart'
import { MeanVarianceOptimizer } from './charts/MeanVarianceOptimizer'
import type { ComponentPropsWithoutRef } from 'react'

// Custom pre — wraps every code block with a copy-on-hover button
function Pre({ children, ...props }: ComponentPropsWithoutRef<'pre'>) {
  // Extract raw text from the inner code element for the clipboard
  function extractText(node: React.ReactNode): string {
    if (typeof node === 'string') return node
    if (Array.isArray(node)) return node.map(extractText).join('')
    if (node && typeof node === 'object' && 'props' in (node as object)) {
      const el = node as React.ReactElement<{ children?: React.ReactNode }>
      return extractText(el.props.children)
    }
    return ''
  }
  const code = extractText(children)

  return (
    <div className="group relative my-6">
      <CopyButton code={code} />
      <pre {...props} className="overflow-x-auto rounded-xl text-sm">
        {children}
      </pre>
    </div>
  )
}

// Custom heading components — make titles visually distinct from body paragraphs
function H2({ children }: { children?: React.ReactNode }) {
  return (
    <h2 className="mt-12 mb-4 flex items-center gap-3 text-2xl font-bold text-white font-heading">
      <span className="block h-6 w-1 rounded-full bg-gradient-to-b from-brand-primary to-brand-accent" />
      {children}
    </h2>
  )
}

function H3({ children }: { children?: React.ReactNode }) {
  return (
    <h3 className="mt-8 mb-3 text-xl font-bold text-white font-heading">
      {children}
    </h3>
  )
}

function H4({ children }: { children?: React.ReactNode }) {
  return (
    <h4 className="mt-6 mb-2 text-lg font-semibold text-brand-primary font-heading">
      {children}
    </h4>
  )
}

// Custom components available in all MDX blog posts
const components = {
  // Override pre for universal copy button
  pre: Pre,
  // Distinct headings — titles stand apart from paragraphs
  h2: H2,
  h3: H3,
  h4: H4,
  // Chart infrastructure
  ChartBlock,
  // EP01 charts
  PortfolioVarianceChart,
  CorrelationHeatmap,
  // EP02 charts
  EfficientFrontierChart,
  MeanVarianceOptimizer,
  // EP03 charts
  SharpeSortinoComparison,
  // EP04 charts
  VaRComparisonChart,
  // EP05 charts
  FactorModelChart,
  // EP11 charts
  AMMCurveChart,
  PriceImpactChart,
}

interface Props {
  source: string
}

export function MDXContent({ source }: Props) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkMath],
          rehypePlugins: [
            rehypeKatex,
            [rehypePrettyCode, {
              theme: 'one-dark-pro',
              keepBackground: true,
            }],
          ],
        },
      }}
    />
  )
}
