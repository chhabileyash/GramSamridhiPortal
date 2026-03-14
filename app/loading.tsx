export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f2f4f7] text-[#082b57]">
      <div className="fixed inset-x-0 top-0 z-50 h-1 overflow-hidden bg-[#082b57]/15">
        <div className="h-full w-1/3 animate-[pulse_1s_ease-in-out_infinite] bg-[#f58320]" />
      </div>
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-center gap-6 px-6">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#082b57]/20 border-t-[#f58320]" />
        <div className="space-y-2 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#f58320]">
            Gram Panchayat Portal
          </p>
          <h2 className="text-2xl font-extrabold uppercase text-[#082b57]">
            Loading Page
          </h2>
          <p className="text-sm text-slate-600">
            Please wait while we fetch the latest data.
          </p>
        </div>
      </div>
    </main>
  );
}
