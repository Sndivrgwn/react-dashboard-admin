import { Link } from "react-router-dom";
import Icon from "../../template/Icon";

export default function AddButton({title="title", to}) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white/90"
    >
      <Icon name="plus" className="h-4 w-4" />
      {title}
    </Link>
  );
}
