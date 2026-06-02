import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/blog/meetup-2-younghoon',
        destination: '/blog/meetup-2-younghun',
        permanent: true,
      },
    ]
  },
}

export default withNextIntl(nextConfig)
