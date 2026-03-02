import Hero from '@/components/Hero'
import WhoWeAre from '@/components/WhatWeDo'
import WhatWeValue from '@/components/WhatWeValue'
import MembersPreview from '@/components/MembersPreview'
import RecentMeetup from '@/components/RecentMeetup'

export default function Home() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <WhatWeValue />
      <MembersPreview />
      <RecentMeetup />
    </>
  )
}
