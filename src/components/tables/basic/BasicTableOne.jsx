const rows = [
  {
    name: "Lindsey Curtis",
    role: "Web Designer",
    project: "Agency Website",
    team: ["LC", "JM", "AR"],
    status: "Active",
    budget: "$3.9K",
  },
  {
    name: "Kaiya George",
    role: "Project Manager",
    project: "Technology",
    team: ["KG", "PS"],
    status: "Pending",
    budget: "$24.9K",
  },
  {
    name: "Zain Geidt",
    role: "Content Writing",
    project: "Blog Writing",
    team: ["ZG"],
    status: "Active",
    budget: "$12.7K",
  },
  {
    name: "Abram Schleifer",
    role: "Digital Marketer",
    project: "Social Media",
    team: ["AS", "WN", "TY"],
    status: "Cancelled",
    budget: "$2.8K",
  },
  {
    name: "Carla George",
    role: "Front-end Developer",
    project: "Website",
    team: ["CG", "NH", "BD"],
    status: "Active",
    budget: "$4.5K",
  },
];

const statusStyles = {
  Active: "bg-emerald-500/15 text-emerald-300",
  Pending: "bg-amber-500/15 text-amber-300",
  Cancelled: "bg-rose-500/15 text-rose-300",
};

export default function BasicTableOne() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-black/20 backdrop-blur">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white/70">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5M5.25 6.75v10.5A2.25 2.25 0 0 0 7.5 19.5h9A2.25 2.25 0 0 0 18.75 17.25V6.75M5.25 6.75V5.25A2.25 2.25 0 0 1 7.5 3h9A2.25 2.25 0 0 1 18.75 5.25v1.5M12 3v16.5" />
          </svg>
        </span>
        <h2 className="text-lg font-semibold text-white">Basic Table 1</h2>
      </div>
      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-950/60 text-left text-white/60">
            <tr>
              <th className="px-6 py-4 font-medium">User</th>
              <th className="px-6 py-4 font-medium">Project</th>
              <th className="px-6 py-4 font-medium">Team</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Budget</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-white/80">
            {rows.map((row) => (
              <tr key={row.name} className="hover:bg-white/5">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white">
                      {row.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{row.name}</p>
                      <p className="text-xs text-white/50">{row.role}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-white/70">{row.project}</td>
                <td className="px-6 py-4">
                  <div className="flex -space-x-2">
                    {row.team.map((member) => (
                      <div
                        key={member}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-950 bg-white/10 text-[10px] font-semibold text-white"
                      >
                        {member}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={[
                      "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
                      statusStyles[row.status],
                    ].join(" ")}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4 font-semibold text-white/80">
                  {row.budget}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
