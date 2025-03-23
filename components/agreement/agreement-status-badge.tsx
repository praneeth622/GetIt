import { cn } from "@/lib/utils"

type StatusType = "pending" | "accepted" | "declined" | "modified"

interface AgreementStatusBadgeProps {
  status: StatusType
  className?: string
}

export default function AgreementStatusBadge({ status, className }: AgreementStatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800"
      case "accepted":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
      case "declined":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800"
      case "modified":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
    }
  }

  const getStatusText = () => {
    switch (status) {
      case "pending":
        return "Pending"
      case "accepted":
        return "Accepted"
      case "declined":
        return "Declined"
      case "modified":
        return "Modified"
      default:
        return "Unknown"
    }
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        getStatusStyles(),
        className,
      )}
    >
      {getStatusText()}
    </span>
  )
}

