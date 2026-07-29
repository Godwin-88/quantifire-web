import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

/**
 * OG image generation — three visual templates for the dual funnel:
 * 
 * type=service  → service name, 3 technology tags, "Book a Call" badge
 * type=content  → episode number, equation, "QuantiFire" branding
 * type=portfolio → project name, key metric number, stack pills
 */

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type') || 'service'
  const title = searchParams.get('title') || 'QuantiFire'
  const tagline = searchParams.get('tagline') || ''

  switch (type) {
    case 'content':
      return contentOG(title, tagline)
    case 'portfolio':
      return portfolioOG(title, tagline)
    default:
      return serviceOG(title, tagline)
  }
}

function serviceOG(title: string, tagline: string) {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0d0d1a 0%, #1a1a2e 50%, #0f0a2e 100%)',
          padding: 60,
          fontFamily: 'Inter',
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              'linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 16px',
            borderRadius: 999,
            border: '1px solid rgba(99,102,241,0.3)',
            background: 'rgba(99,102,241,0.1)',
            color: '#6366f1',
            fontSize: 14,
            fontWeight: 600,
            marginBottom: 24,
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: 999, background: '#0ea5e9' }} />
          QuantiFire — Digital Engineering
        </div>
        {/* Title */}
        <h1
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: '#f8fafc',
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            maxWidth: '80%',
          }}
        >
          {title}
        </h1>
        {/* Tagline */}
        {tagline && (
          <p style={{ fontSize: 22, color: '#94a3b8', marginTop: 16, maxWidth: '70%' }}>
            {tagline}
          </p>
        )}
        {/* CTA badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginTop: 32,
            padding: '12px 24px',
            borderRadius: 12,
            background: '#6366f1',
            color: 'white',
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          Book a Discovery Call →
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}

function contentOG(title: string, tagline: string) {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0d0d1a 0%, #16213e 50%, #0f3460 100%)',
          padding: 60,
          fontFamily: 'Inter',
          position: 'relative',
        }}
      >
        {/* Equation accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '40%',
            height: '100%',
            background:
              'linear-gradient(180deg, rgba(99,102,241,0.08) 0%, rgba(233,69,96,0.08) 100%)',
          }}
        />
        {/* Brand */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            left: 60,
            fontSize: 20,
            fontWeight: 700,
            color: '#6366f1',
            letterSpacing: '-0.02em',
          }}
        >
          QuantiFire Research
        </div>
        {/* Equation visual */}
        <div
          style={{
            fontSize: 28,
            color: '#e94560',
            fontWeight: 400,
            fontStyle: 'italic',
            marginBottom: 20,
            opacity: 0.8,
          }}
        >
          σ² = wᵀΣw
        </div>
        {/* Title */}
        <h1
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: '#f8fafc',
            margin: 0,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            textAlign: 'center',
            maxWidth: '85%',
          }}
        >
          {title}
        </h1>
        {/* Tagline */}
        {tagline && (
          <p style={{ fontSize: 20, color: '#94a3b8', marginTop: 16, textAlign: 'center', maxWidth: '70%' }}>
            {tagline}
          </p>
        )}
        {/* CTA */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginTop: 32,
            padding: '10px 20px',
            borderRadius: 999,
            border: '1px solid rgba(233,69,96,0.3)',
            color: '#e94560',
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          Free Jupyter Notebook →
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}

function portfolioOG(title: string, tagline: string) {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0d0d1a 0%, #1a1a2e 50%, #0f0a2e 100%)',
          padding: 60,
          fontFamily: 'Inter',
        }}
      >
        {/* Brand */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            left: 60,
            fontSize: 20,
            fontWeight: 700,
            color: '#6366f1',
          }}
        >
          QuantiFire Portfolio
        </div>
        {/* Key metric */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            color: '#6366f1',
            marginBottom: 8,
            lineHeight: 1,
          }}
        >
          {tagline || 'Shipped'}
        </div>
        {/* Title */}
        <h1
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: '#f8fafc',
            margin: 0,
            lineHeight: 1.15,
            textAlign: 'right',
            maxWidth: '70%',
          }}
        >
          {title}
        </h1>
        {/* Stack pills */}
        <div
          style={{
            display: 'flex',
            gap: 8,
            marginTop: 24,
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
          }}
        >
          {['Next.js', 'Python', 'Neo4j', 'Docker'].map((tech) => (
            <div
              key={tech}
              style={{
                padding: '6px 14px',
                borderRadius: 8,
                border: '1px solid rgba(148,163,184,0.2)',
                background: 'rgba(148,163,184,0.08)',
                color: '#94a3b8',
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}