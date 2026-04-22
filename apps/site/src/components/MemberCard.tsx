import Image from 'next/image'
import type { Member } from '@/data/members'

type Props = {
  member: Member
  locale: 'ko' | 'en'
}

export default function MemberCard({ member, locale }: Props) {
  return (
    <article className="bg-white p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.name[locale]}
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f0ede8] text-sm font-semibold text-[#1a1a1a]">
            {member.name.en.charAt(0)}
          </span>
        )}
        <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
          <h2 className="font-[family-name:var(--font-syne)] text-xl font-semibold text-[#1a1a1a] md:text-lg">
            {member.name[locale]}
          </h2>
          {(member.linkedin || member.website || member.website2) && (
            <div className="flex flex-wrap gap-x-2.5 gap-y-1">
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

      {/* Fields */}
      {member.fields && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {member.fields.map((f) => (
            <span
              key={f}
              className="rounded-sm border border-[#e5e5e5] px-2 py-0.5 text-[11px] font-medium tracking-wide text-[#737373]"
            >
              {f}
            </span>
          ))}
        </div>
      )}

      {/* One-liner */}
      <p className="mt-5 text-[15px] leading-7 text-[#1a1a1a] md:text-base md:leading-relaxed">
        &ldquo;{member.oneLiner[locale]}&rdquo;
      </p>

      {/* Bio */}
      <ul className="mt-4 space-y-1.5">
        {member.bio.map((b, i) => (
          <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-[#737373]">
            <span className="mt-[9px] h-px w-3 shrink-0 bg-[#d4d4d4]" />
            {b[locale]}
          </li>
        ))}
      </ul>
    </article>
  )
}
