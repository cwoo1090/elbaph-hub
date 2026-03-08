import type { Member } from '@/data/members'

type Props = {
  member: Member
  locale: 'ko' | 'en'
  dreamLabel: string
  index: number
}

export default function MemberCard({ member, locale, dreamLabel, index }: Props) {
  return (
    <article className="bg-white p-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name[locale]}
            className="h-10 w-10 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f0ede8] text-sm font-semibold text-[#1a1a1a]">
            {member.name[locale].charAt(0)}
          </span>
        )}
        <div className="flex items-baseline gap-3">
          <h2 className="text-lg font-semibold text-[#1a1a1a]">
            {member.name[locale]}
          </h2>
          {(member.linkedin || member.website || member.website2) && (
            <div className="flex gap-2.5">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#a3a3a3] hover:text-[#1a1a1a] transition-colors duration-150"
                >
                  LinkedIn
                </a>
              )}
              {member.website && (
                <a
                  href={member.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#a3a3a3] hover:text-[#1a1a1a] transition-colors duration-150"
                >
                  Web
                </a>
              )}
              {member.website2 && (
                <a
                  href={member.website2.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#a3a3a3] hover:text-[#1a1a1a] transition-colors duration-150"
                >
                  {member.website2.label}
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* One-liner */}
      <p className="mt-6 text-base leading-relaxed text-[#1a1a1a]">
        &ldquo;{member.oneLiner[locale]}&rdquo;
      </p>

      {/* Bio */}
      <ul className="mt-5 space-y-1.5">
        {member.bio.map((b, i) => (
          <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-[#737373]">
            <span className="mt-[9px] h-px w-3 shrink-0 bg-[#d4d4d4]" />
            {b[locale]}
          </li>
        ))}
      </ul>

      {/* Dream */}
      <div className="mt-5 flex items-baseline gap-2">
        <span className="text-xs font-medium uppercase tracking-wider text-[#a3a3a3]">{dreamLabel}</span>
        <span className="text-sm font-medium text-[#1a1a1a]">{member.dream[locale]}</span>
      </div>
    </article>
  )
}
