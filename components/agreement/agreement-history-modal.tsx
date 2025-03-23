"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { History, Clock } from "lucide-react"
import AgreementStatusBadge from "./agreement-status-badge"

interface HistoryItem {
  id: string
  date: string
  action: string
  user: string
  userType: "recruiter" | "student"
  status: "pending" | "accepted" | "declined" | "modified"
  notes?: string
}

export default function AgreementHistoryModal() {
  const [open, setOpen] = useState(false)

  // Mock history data
  const historyItems: HistoryItem[] = [
    {
      id: "hist-001",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      action: "Agreement created",
      user: "Sarah Williams",
      userType: "recruiter",
      status: "pending",
    },
    {
      id: "hist-002",
      date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
      action: "Requested changes",
      user: "Alex Johnson",
      userType: "student",
      status: "modified",
      notes: "Requested flexible start date and clarification on remote work policy.",
    },
    {
      id: "hist-003",
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      action: "Updated agreement",
      user: "Sarah Williams",
      userType: "recruiter",
      status: "pending",
      notes: "Adjusted start date and clarified remote work expectations.",
    },
    {
      id: "hist-004",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      action: "Agreement accepted",
      user: "Alex Johnson",
      userType: "student",
      status: "accepted",
    },
  ]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <History className="w-4 h-4" />
          <span>View History</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Agreement History</DialogTitle>
          <DialogDescription>Timeline of all changes and actions taken on this agreement.</DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[400px] pr-4">
          <div className="relative pl-6 border-l border-border">
            {historyItems.map((item, index) => (
              <div key={item.id} className="mb-6 last:mb-0">
                <div className="absolute w-3 h-3 rounded-full bg-primary -left-[6.5px]" />

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{item.action}</p>
                      <AgreementStatusBadge status={item.status} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      by {item.user} ({item.userType})
                    </p>
                    {item.notes && <p className="mt-2 text-sm italic text-muted-foreground">"{item.notes}"</p>}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground whitespace-nowrap">
                    <Clock className="w-3 h-3" />
                    <span>{formatDate(item.date)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

