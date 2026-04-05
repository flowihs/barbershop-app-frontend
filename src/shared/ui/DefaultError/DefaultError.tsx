  
function DefaultError({ text }: {
    text: string
}) {
    return (
      <div className="flex min-h-[50vh] w-full items-center justify-center p-4">
        <p className="text-center text-sm text-red-500">
          {text}
        </p>
      </div>
    )
  }

export default DefaultError;