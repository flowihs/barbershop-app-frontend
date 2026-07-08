function DefaultError({ text }: {
    text: string
}) {
    return (
      <div className="flex items-cetner gap-4">
        <div>
            <p className="text-xs text-text-secondary">
                {text}
            </p>
        </div>
      </div>
    )
  }

export default DefaultError;