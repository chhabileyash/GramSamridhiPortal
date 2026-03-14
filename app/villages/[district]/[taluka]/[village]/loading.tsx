export default function VillageLoading() {
  return (
    <main className="min-h-screen bg-[#f2f4f7] text-[#082b57]">
      <div className="fixed inset-x-0 top-0 z-50 h-1 overflow-hidden bg-[#082b57]/15">
        <div className="h-full w-1/3 animate-[pulse_1s_ease-in-out_infinite] bg-[#f58320]" />
      </div>
      <section className="relative overflow-hidden border-b-4 border-[#f58320] bg-[#082b57] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="h-4 w-40 animate-pulse bg-white/30" />
          <div className="mt-4 h-10 w-80 animate-pulse bg-white/30" />
          <div className="mt-4 h-5 w-96 max-w-full animate-pulse bg-white/20" />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-10 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="h-44 animate-pulse border border-slate-200 bg-white" />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-24 animate-pulse border border-slate-200 bg-white"
              />
            ))}
          </div>
        </div>
        <div className="h-96 animate-pulse border border-[#082b57] bg-[#082b57]/90" />
      </section>
    </main>
  );
}
