# Kanban board

Shows clients what we work on — the "no black box" promise. On the marketing site it is a
**read-only illustration** inside a `<Sheet>` marked „Beispiel“. Data comes from
`messages/de.ts` / `messages/en.ts`, typed.

## Data shape

```ts
type TaskStatus = "open" | "in_progress" | "review" | "done";
type Task = {
  id: string;
  title: string;
  tag: string;            // "Workflow", "Formular" …
  assignee: { initials: string; name: string };
  due?: string;           // display string, already formatted: "23.10."
  doneOn?: string;        // for status "done"
  dueSoon?: boolean;      // turns the date warning-colored
};
```

## Columns

| status | DE | EN | Header marker |
|---|---|---|---|
| `open` | Offen | Open | — |
| `in_progress` | In Arbeit | In progress | 7 px blue dot |
| `review` | Review | Review | — |
| `done` | Erledigt | Done | — |

Column: `flex flex-col gap-2.5 border border-line bg-paper p-3`.
Header: name `text-[14px] font-bold` left, count `font-mono text-label text-ink-muted` right, two digits („02“).

## Task card

```tsx
<li className={cn("flex flex-col gap-3 rounded-ui border bg-surface p-3.5",
                  status === "in_progress" ? "border-blueprint" : "border-line")}>
  <span className="text-[14px] font-semibold">
    {status === "done" && <Check aria-hidden className="mr-2 inline size-4 text-success" strokeWidth={2} />}
    {title}
  </span>
  <Tag>{tag}</Tag>
  <div className="flex items-center justify-between">
    <Avatar size="sm" {...assignee} />
    <span className={cn("font-mono text-[11px]", dueSoon ? "font-semibold text-warning" : "text-ink-muted")}>
      {status === "done" ? `Erledigt ${doneOn}` : `Fällig ${due}`}
    </span>
  </div>
</li>
```

| Card state | Visual |
|---|---|
| default | `border-line` |
| active (in progress) | `border-blueprint` |
| due soon | date in `text-warning font-semibold` + the word („Fällig morgen“) |
| done | green check icon before title, date reads „Erledigt …“ |

## Layout and semantics

- Board: `grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-start`.
- Each column is a `<section aria-labelledby>` with an `<h3>` (visually the column header) and a `<ul>` of cards.
- Mobile: columns stack. Never horizontal-scroll the page; if a real app needs side-scroll, scroll inside the board container with `overflow-x-auto` and `snap-x`.
- Above the board (optional): 3 stat tiles + segmented progress bar (see [`data-display.md`](./data-display.md)).
- Footer of the sheet: „Ansicht für Kunden · nur lesen“ / "Client view · read-only".
- No drag-and-drop on the marketing site. If a future app adds it: keyboard alternative + `aria-live` announcements are required.
