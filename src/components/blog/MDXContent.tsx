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

// Custom components available in all MDX blog posts
const components = {
  // Override pre for universal copy button
  pre: Pre,
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
