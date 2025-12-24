import BasicTableOne from "./BasicTableOne";
import BasicTableTwo from "./BasicTableTwo";
import BasicTableThree from "./BasicTableThree";
import BasicTableFour from "./BasicTableFour";
import BasicTableFive from "./BasicTableFive";

export default function BasicTablesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-white/50">Tables</p>
          <h1 className="text-2xl font-semibold">Basic Tables</h1>
        </div>
        <p className="text-sm text-white/50">Tables / Basic</p>
      </div>

      <BasicTableOne />
      <BasicTableTwo />
      <BasicTableThree />
      <BasicTableFour />
      <BasicTableFive />
    </div>
  );
}
