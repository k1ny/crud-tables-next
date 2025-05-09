export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent" />
        <p className="text-white text-lg font-medium">Загрузка...</p>
      </div>
    </div>
  );
}
