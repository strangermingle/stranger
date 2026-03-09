export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 animate-pulse">
       <div className="bg-white border-b border-gray-200 dark:bg-zinc-900 dark:border-zinc-800 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-10 w-64 bg-gray-200 dark:bg-zinc-800 rounded-full mb-4" />
          <div className="h-4 w-32 bg-gray-200 dark:bg-zinc-800 rounded-full" />
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
             {[...Array(4)].map((_, i) => (
               <div key={i} className="h-10 bg-gray-100 dark:bg-zinc-800 rounded-lg" />
             ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
             <div key={i} className="bg-white dark:bg-zinc-900 h-96 rounded-3xl" />
          ))}
        </div>
      </div>
    </div>
  )
}
