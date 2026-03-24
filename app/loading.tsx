export default function Loading() {
  return (
    <main className="min-h-screen flex flex-col text-gray-800 font-sans bg-[#fcfcfc]">
      <div className="flex flex-1 items-start">
        {/* Placeholder Sidebar */}
        <div className="hidden md:flex flex-col w-64 border-r border-gray-200 bg-white h-screen shrink-0">
          <div className="p-6 border-b border-gray-200">
            <div className="animate-pulse bg-slate-200 h-8 w-3/4 rounded-sm"></div>
          </div>
          <div className="p-4 space-y-4 flex-1 mt-4">
            <div className="animate-pulse bg-slate-100 h-10 w-full rounded-sm"></div>
            <div className="animate-pulse bg-slate-100 h-10 w-full rounded-sm"></div>
            <div className="animate-pulse bg-slate-100 h-10 w-full rounded-sm"></div>
            <div className="animate-pulse bg-slate-100 h-10 w-full rounded-sm"></div>
          </div>
        </div>
        
        {/* Placeholder Main Content */}
        <div className="flex-1 p-8 min-w-0">
          <div className="mx-auto max-w-6xl">
            <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4 animate-in fade-in duration-300">
              <div className="space-y-3 w-full">
                <div className="animate-pulse bg-slate-200 h-8 w-64 rounded-sm"></div>
                <div className="animate-pulse bg-slate-100 h-4 w-96 max-w-full rounded-sm"></div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="animate-pulse bg-white h-[300px] w-full rounded-sm border border-gray-200 shadow-sm"></div>
                <div className="animate-pulse bg-white h-[200px] w-full rounded-sm border border-gray-200 shadow-sm"></div>
              </div>
              <div className="lg:col-span-1 space-y-6 hidden lg:block">
                <div className="animate-pulse bg-white h-[150px] w-full rounded-sm border border-gray-200 shadow-sm"></div>
                <div className="animate-pulse bg-white h-[150px] w-full rounded-sm border border-gray-200 shadow-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
