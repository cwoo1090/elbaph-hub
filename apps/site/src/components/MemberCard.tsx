import type { Member } from '@/data/members'

type Props = {
  member: Member
  locale: 'ko' | 'en'
  dreamLabel: string
}

const avatarGradients = [
  'avatar-gradient-0',
  'avatar-gradient-1',
  'avatar-gradient-2',
  'avatar-gradient-3',
  'avatar-gradient-4',
]

const memberOrder = ['chulwoo', 'taekyu', 'yechan', 'younghoon', 'jaehwan']

export default function MemberCard({ member, locale, dreamLabel }: Props) {
  const gradientIndex = memberOrder.indexOf(member.id)
  const gradientClass = avatarGradients[gradientIndex >= 0 ? gradientIndex : 0]

  return (
    <div className="card-glow rounded-2xl p-8">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-xl font-bold text-white ${gradientClass}`}
          style={{ fontFamily: 'var(--font-syne)', fontWeight: 700 }}
        >
          {member.name[locale].charAt(0)}
        </div>
        <div>
          <h2
            className="text-lg font-semibold font-[family-name:var(--font-syne)]"
            style={{ fontWeight: 600 }}
          >
            {member.name[locale]}
          </h2>
          {(member.linkedin || member.website) && (
            <div className="mt-1.5 flex gap-3">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-neutral-500 hover:text-[#f59e0b] transition-colors duration-200"
                >
                  LinkedIn
                </a>
              )}
              {member.website && (
                <a
                  href={member.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-neutral-500 hover:text-[#f59e0b] transition-colors duration-200"
                >
                  Website
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <p className="mt-6 text-sm italic leading-relaxed text-neutral-300 border-l-2 border-[#f59e0b]/30 pl-4">
        &ldquo;{member.oneLiner[locale]}&rdquo;
      </p>

      <div className="mt-6 space-y-2">
        {member.bio.map((b, i) => (
          <p key={i} className="text-sm leading-relaxed text-neutral-400">
            {b[locale]}
          </p>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-[#f59e0b]/15 bg-[#f59e0b]/5 px-4 py-3.5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f59e0b]/70">
          {dreamLabel}
        </span>
        <p className="mt-1 text-sm font-medium text-neutral-200">
          {member.dream[locale]}
        </p>
      </div>
    </div>
  )
}
