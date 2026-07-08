
export default function DefaultLoading() {
    return (
        <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-bg-secondary animate-pulse" />
                <div className="h-5 w-32 rounded-md bg-bg-secondary animate-pulse" />
        </div>
    )
}