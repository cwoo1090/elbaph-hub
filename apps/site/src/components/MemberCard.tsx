import type { Member } from '@/data/members'

type Props = {
  member: Member
  locale: 'ko' | 'en'
  dreamLabel: string
}

export default function MemberCard({ member, locale, dreamLabel }: Props) {
  return (
    <div className="border border-[#e5e5e5] bg-white p-8">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#f0ede8] text-base font-semibold text-[#1a1a1a] font-[family-name:var(--font-syne)]">
          {member.name[locale].charAt(0)}
        </div>
        <div>
          <h2 className="text-base font-semibold text-[#1a1a1a] font-[family-name:var(--font-syne)]">
            {member.name[locale]}
          </h2>
          {(member.linkedin || member.website) && (
            <div className="mt-1.5 flex gap-3">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#737373] hover:text-[#1a1a1a] transition-colors duration-150"
                >
                  LinkedIn
                </a>
              )}
              {member.website && (
                <a
                  href={member.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#737373] hover:text-[#1a1a1a] transition-colors duration-150"
                >
                  Website
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <p className="mt-6 text-sm italic leading-relaxed text-[#737373] border-l border-[#e5e5e5] pl-4">
        &ldquo;{member.oneLiner[locale]}&rdquo;
      </p>

      <div className="mt-6 space-y-2">
        {member.bio.map((b, i) => (
          <p key={i} className="text-sm leading-relaxed text-[#737373]">
            {b[locale]}
          </p>
        ))}
      </div>

      <div className="mt-6 border-t border-[#e5e5e5] pt-5">
        <span className="section-label mb-1">{dreamLabel}</span>
        <p className="text-sm font-medium text-[#1a1a1a]">
          {member.dream[locale]}
        </p>
      </div>
    </div>
  )
}
