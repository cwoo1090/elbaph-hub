import type { Member } from '@/data/members'

type Props = {
  member: Member
  locale: 'ko' | 'en'
  dreamLabel: string
}

export default function MemberCard({ member, locale, dreamLabel }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-8 transition-colors hover:bg-white/[0.08]">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/10 text-xl font-bold text-neutral-400">
          {member.name[locale].charAt(0)}
        </div>
        <div>
          <h2 className="text-lg font-semibold">{member.name[locale]}</h2>
          {(member.linkedin || member.website) && (
            <div className="mt-1 flex gap-3">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-neutral-500 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              )}
              {member.website && (
                <a
                  href={member.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-neutral-500 hover:text-white transition-colors"
                >
                  Website
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <p className="mt-6 text-sm italic leading-relaxed text-neutral-300">
        &ldquo;{member.oneLiner[locale]}&rdquo;
      </p>

      <div className="mt-6 space-y-2">
        {member.bio.map((b, i) => (
          <p key={i} className="text-sm leading-relaxed text-neutral-400">
            {b[locale]}
          </p>
        ))}
      </div>

      <div className="mt-6 rounded-lg bg-white/5 px-4 py-3">
        <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
          {dreamLabel}
        </span>
        <p className="mt-1 text-sm font-medium text-neutral-200">
          {member.dream[locale]}
        </p>
      </div>
    </div>
  )
}
