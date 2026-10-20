/** Onboarding: the sent form becomes a checklist card for the new person, its tasks appearing one by one. */
export function Checklist({ heading, tasks, labels, values }: { heading: string; tasks: string[]; labels: string[]; values: string[] }) {
  return (
    <div data-reveal="micro" className="flex flex-col gap-2.5 rounded-ui border border-line p-2.5">
      <p className="truncate text-[15px] leading-tight font-semibold">{heading}</p>
      <dl className="grid grid-cols-[max-content_minmax(0,1fr)] gap-x-4 lg:grid-cols-2 lg:gap-x-2 gap-y-1 text-[13px]">
        {labels.map((label, i) => (
          <div key={label} className="contents">
            <dt className="truncate text-ink-muted">{label}</dt>
            <dd className="truncate">{values[i]}</dd>
          </div>
        ))}
      </dl>
      <ul className="flex flex-col gap-2 border-t border-line pt-2.5 text-[13px]">
        {tasks.map((task, i) => (
          <li key={task} data-reveal="micro" className="flex items-center gap-2" style={{ animationDelay: `${300 + i * 150}ms` }}>
            <span className="size-3.5 flex-none rounded-tag border border-line-input" />
            <span className="truncate">{task}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
