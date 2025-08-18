import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

export function LoadingOverlay({ visible = false, message, className }) {
  if (!visible) return null

  return (
    <div
      className={cn(
        "absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg",
        className
      )}
    >
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        {message && (
          <p className="text-sm text-gray-600 font-medium">{message}</p>
        )}
      </div>
    </div>
  )
}
