"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  User,
  Users,
  Crown,
  Video,
  Building,
  Globe,
  Plus,
  Eye,
  AlertTriangle,
  AlertCircle,
  Zap,
  RefreshCw,
} from "lucide-react"

interface AppointmentEvent {
  id: string
  title: string
  name: string
  email: string
  organization: string
  appointmentType: string
  date: string
  time: string
  duration: number
  location: string
  attendees: number
  status: "scheduled" | "confirmed" | "completed" | "cancelled"
  urgency: "low" | "normal" | "high" | "urgent"
  description: string
  protocolNotes?: string
}

interface ConflictInfo {
  id: string
  type: "time_overlap" | "location_conflict" | "travel_time" | "resource_conflict"
  severity: "warning" | "error" | "critical"
  appointments: string[]
  message: string
  suggestions: string[]
}

interface CalendarProps {
  language: "en" | "ar"
  appointments: AppointmentEvent[]
  onAppointmentClick?: (appointment: AppointmentEvent) => void
  onDateClick?: (date: Date) => void
  onConflictResolve?: (conflictId: string, resolution: string) => void
}

type ViewMode = "month" | "week" | "day" | "agenda"

// Helper functions moved outside component to avoid re-initialization
const getTravelTime = (location1: string, location2: string): number => {
  const travelTimes: Record<string, Record<string, number>> = {
    palace: { office: 15, neutral: 30 },
    office: { palace: 15, neutral: 20 },
    neutral: { palace: 30, office: 20 },
  }
  return travelTimes[location1]?.[location2] || 30
}

const addMinutes = (date: Date, minutes: number): Date => {
  return new Date(date.getTime() + minutes * 60000)
}

const formatTimeHelper = (date: Date): string => {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
}

export function AppointmentCalendar({
  language,
  appointments,
  onAppointmentClick,
  onDateClick,
  onConflictResolve,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<ViewMode>("month")
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentEvent | null>(null)
  const [filteredAppointments, setFilteredAppointments] = useState<AppointmentEvent[]>(appointments)
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [showConflictsOnly, setShowConflictsOnly] = useState(false)
  const [selectedConflict, setSelectedConflict] = useState<ConflictInfo | null>(null)
  const [isConflictDialogOpen, setIsConflictDialogOpen] = useState(false)

  const content = {
    en: {
      title: "Royal Appointment Calendar",
      conflictDetection: "Conflict Detection",
      viewModes: {
        month: "Month",
        week: "Week",
        day: "Day",
        agenda: "Agenda",
      },
      filters: {
        type: "Filter by Type",
        status: "Filter by Status",
        all: "All",
        showConflicts: "Show Conflicts Only",
      },
      conflicts: {
        title: "Scheduling Conflicts",
        detected: "conflicts detected",
        types: {
          time_overlap: "Time Overlap",
          location_conflict: "Location Conflict",
          travel_time: "Travel Time Issue",
          resource_conflict: "Resource Conflict",
        },
        severity: {
          warning: "Warning",
          error: "Error",
          critical: "Critical",
        },
        suggestions: "Suggested Resolutions",
        resolve: "Resolve Conflict",
        viewDetails: "View Conflict Details",
        noConflicts: "No scheduling conflicts detected",
        autoResolve: "Auto-Resolve",
        manualResolve: "Manual Resolution Required",
      },
      appointmentTypes: {
        audience: "Royal Audience",
        diplomatic: "Diplomatic Meeting",
        business: "Business Consultation",
        cultural: "Cultural Discussion",
        educational: "Educational Meeting",
        humanitarian: "Humanitarian Discussion",
        virtual: "Virtual Meeting",
      },
      locations: {
        palace: "Royal Palace",
        office: "Royal Office",
        virtual: "Virtual Meeting",
        neutral: "Neutral Venue",
      },
      statusLabels: {
        scheduled: "Scheduled",
        confirmed: "Confirmed",
        completed: "Completed",
        cancelled: "Cancelled",
      },
      urgencyLevels: {
        low: "Low",
        normal: "Normal",
        high: "High",
        urgent: "Urgent",
      },
      weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      today: "Today",
      noAppointments: "No appointments scheduled",
      appointmentDetails: "Appointment Details",
      duration: "Duration",
      attendees: "Attendees",
      protocolNotes: "Protocol Notes",
      close: "Close",
      addAppointment: "Add Appointment",
      viewDetails: "View Details",
      conflictIndicator: "Scheduling Conflict",
    },
    ar: {
      title: "تقويم المواعيد الملكية",
      conflictDetection: "كشف التعارض",
      viewModes: {
        month: "شهر",
        week: "أسبوع",
        day: "يوم",
        agenda: "جدول الأعمال",
      },
      filters: {
        type: "تصفية حسب النوع",
        status: "تصفية حسب الحالة",
        all: "الكل",
        showConflicts: "إظهار التعارضات فقط",
      },
      conflicts: {
        title: "تعارضات الجدولة",
        detected: "تعارض مكتشف",
        types: {
          time_overlap: "تداخل الوقت",
          location_conflict: "تعارض المكان",
          travel_time: "مشكلة وقت السفر",
          resource_conflict: "تعارض الموارد",
        },
        severity: {
          warning: "تحذير",
          error: "خطأ",
          critical: "حرج",
        },
        suggestions: "الحلول المقترحة",
        resolve: "حل التعارض",
        viewDetails: "عرض تفاصيل التعارض",
        noConflicts: "لم يتم اكتشاف تعارضات في الجدولة",
        autoResolve: "حل تلقائي",
        manualResolve: "يتطلب حل يدوي",
      },
      appointmentTypes: {
        audience: "مقابلة ملكية",
        diplomatic: "اجتماع دبلوماسي",
        business: "استشارة تجارية",
        cultural: "نقاش ثقافي",
        educational: "اجتماع تعليمي",
        humanitarian: "نقاش إنساني",
        virtual: "اجتماع افتراضي",
      },
      locations: {
        palace: "القصر الملكي",
        office: "المكتب الملكي",
        virtual: "اجتماع افتراضي",
        neutral: "مكان محايد",
      },
      statusLabels: {
        scheduled: "مجدول",
        confirmed: "مؤكد",
        completed: "مكتمل",
        cancelled: "ملغي",
      },
      urgencyLevels: {
        low: "منخفض",
        normal: "عادي",
        high: "عالي",
        urgent: "عاجل",
      },
      weekDays: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
      months: [
        "يناير",
        "فبراير",
        "مارس",
        "أبريل",
        "مايو",
        "يونيو",
        "يوليو",
        "أغسطس",
        "سبتمبر",
        "أكتوبر",
        "نوفمبر",
        "ديسمبر",
      ],
      today: "اليوم",
      noAppointments: "لا توجد مواعيد مجدولة",
      appointmentDetails: "تفاصيل الموعد",
      duration: "المدة",
      attendees: "الحضور",
      protocolNotes: "ملاحظات البروتوكول",
      close: "إغلاق",
      addAppointment: "إضافة موعد",
      viewDetails: "عرض التفاصيل",
      conflictIndicator: "تعارض في الجدولة",
    },
  }

  const t = content[language]

  // Conflict detection logic - moved to separate useMemo with proper dependencies
  const conflicts = useMemo(() => {
    if (!appointments || appointments.length === 0) {
      return []
    }

    const detectedConflicts: ConflictInfo[] = []
    const activeAppointments = appointments.filter((apt) => apt.status === "scheduled" || apt.status === "confirmed")

    // Check for time overlaps
    for (let i = 0; i < activeAppointments.length; i++) {
      for (let j = i + 1; j < activeAppointments.length; j++) {
        const apt1 = activeAppointments[i]
        const apt2 = activeAppointments[j]

        if (apt1.date === apt2.date) {
          const start1 = new Date(`${apt1.date}T${apt1.time}`)
          const end1 = new Date(start1.getTime() + apt1.duration * 60000)
          const start2 = new Date(`${apt2.date}T${apt2.time}`)
          const end2 = new Date(start2.getTime() + apt2.duration * 60000)

          // Check for time overlap
          if (start1 < end2 && start2 < end1) {
            const overlapMinutes =
              Math.min(end1.getTime(), end2.getTime()) - Math.max(start1.getTime(), start2.getTime())
            const overlapDuration = Math.floor(overlapMinutes / 60000)

            detectedConflicts.push({
              id: `overlap_${apt1.id}_${apt2.id}`,
              type: "time_overlap",
              severity: overlapDuration > 30 ? "critical" : overlapDuration > 15 ? "error" : "warning",
              appointments: [apt1.id, apt2.id],
              message: `Time overlap detected: ${apt1.name} and ${apt2.name} have overlapping schedules (${overlapDuration} minutes)`,
              suggestions: [
                `Reschedule ${apt1.name} to ${formatTimeHelper(addMinutes(end2, 15))}`,
                `Reschedule ${apt2.name} to ${formatTimeHelper(addMinutes(end1, 15))}`,
                `Reduce duration of one appointment`,
                `Move one appointment to a different day`,
              ],
            })
          }

          // Check for location conflicts (same physical location, insufficient travel time)
          if (
            apt1.location === apt2.location &&
            apt1.location !== "virtual" &&
            Math.abs(start1.getTime() - start2.getTime()) < 30 * 60000
          ) {
            detectedConflicts.push({
              id: `location_${apt1.id}_${apt2.id}`,
              type: "location_conflict",
              severity: "error",
              appointments: [apt1.id, apt2.id],
              message: `Location conflict: Both appointments scheduled at ${t.locations[apt1.location as keyof typeof t.locations]} with insufficient time between them`,
              suggestions: [
                `Allow 30 minutes between appointments at the same location`,
                `Move one appointment to a different location`,
                `Schedule back-to-back appointments with same participants`,
              ],
            })
          }

          // Check for travel time issues (different physical locations)
          if (apt1.location !== apt2.location && apt1.location !== "virtual" && apt2.location !== "virtual") {
            const timeBetween = Math.abs(start1.getTime() - start2.getTime()) / 60000
            const requiredTravelTime = getTravelTime(apt1.location, apt2.location)

            if (timeBetween < requiredTravelTime) {
              detectedConflicts.push({
                id: `travel_${apt1.id}_${apt2.id}`,
                type: "travel_time",
                severity: "warning",
                appointments: [apt1.id, apt2.id],
                message: `Insufficient travel time between ${t.locations[apt1.location as keyof typeof t.locations]} and ${t.locations[apt2.location as keyof typeof t.locations]} (${Math.floor(timeBetween)} minutes available, ${requiredTravelTime} minutes required)`,
                suggestions: [
                  `Allow ${requiredTravelTime} minutes travel time between locations`,
                  `Use virtual meeting for one appointment`,
                  `Reschedule to allow adequate travel time`,
                ],
              })
            }
          }
        }
      }
    }

    // Check for resource conflicts (same high-priority participants)
    const highPriorityTypes = ["diplomatic", "audience"]
    const sameDayAppointments = activeAppointments.reduce(
      (acc, apt) => {
        if (!acc[apt.date]) acc[apt.date] = []
        acc[apt.date].push(apt)
        return acc
      },
      {} as Record<string, AppointmentEvent[]>,
    )

    Object.entries(sameDayAppointments).forEach(([date, dayAppointments]) => {
      const highPriorityAppts = dayAppointments.filter(
        (apt) => highPriorityTypes.includes(apt.appointmentType) || apt.urgency === "urgent",
      )

      if (highPriorityAppts.length > 3) {
        detectedConflicts.push({
          id: `resource_${date}`,
          type: "resource_conflict",
          severity: "warning",
          appointments: highPriorityAppts.map((apt) => apt.id),
          message: `High workload detected: ${highPriorityAppts.length} high-priority appointments scheduled on ${new Date(date).toLocaleDateString()}`,
          suggestions: [
            `Consider rescheduling some appointments to adjacent days`,
            `Combine related appointments where possible`,
            `Delegate some meetings to senior staff`,
            `Schedule buffer time between high-priority meetings`,
          ],
        })
      }
    })

    return detectedConflicts
  }, [appointments, t.locations])

  const getAppointmentConflicts = (appointmentId: string): ConflictInfo[] => {
    return conflicts.filter((conflict) => conflict.appointments.includes(appointmentId))
  }

  const hasConflict = (appointmentId: string): boolean => {
    return getAppointmentConflicts(appointmentId).length > 0
  }

  const getConflictSeverity = (appointmentId: string): "warning" | "error" | "critical" | null => {
    const appointmentConflicts = getAppointmentConflicts(appointmentId)
    if (appointmentConflicts.length === 0) return null

    const severities = appointmentConflicts.map((c) => c.severity)
    if (severities.includes("critical")) return "critical"
    if (severities.includes("error")) return "error"
    return "warning"
  }

  // Filter appointments based on search and filters
  useEffect(() => {
    let filtered = appointments

    if (typeFilter !== "all") {
      filtered = filtered.filter((apt) => apt.appointmentType === typeFilter)
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((apt) => apt.status === statusFilter)
    }

    if (showConflictsOnly) {
      filtered = filtered.filter((apt) => hasConflict(apt.id))
    }

    setFilteredAppointments(filtered)
  }, [appointments, typeFilter, statusFilter, showConflictsOnly, conflicts])

  const getStatusColor = (status: string) => {
    const colors = {
      scheduled: "bg-blue-100 text-blue-800 border-blue-200",
      confirmed: "bg-green-100 text-green-800 border-green-200",
      completed: "bg-gray-100 text-gray-800 border-gray-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
    }
    return colors[status as keyof typeof colors] || colors.scheduled
  }

  const getUrgencyColor = (urgency: string) => {
    const colors = {
      low: "border-l-gray-400",
      normal: "border-l-blue-400",
      high: "border-l-orange-400",
      urgent: "border-l-red-400",
    }
    return colors[urgency as keyof typeof colors] || colors.normal
  }

  const getConflictColor = (severity: "warning" | "error" | "critical" | null) => {
    if (!severity) return ""
    const colors = {
      warning: "border-l-yellow-500 bg-yellow-50",
      error: "border-l-orange-500 bg-orange-50",
      critical: "border-l-red-500 bg-red-50",
    }
    return colors[severity]
  }

  const getTypeIcon = (type: string) => {
    const icons = {
      audience: Crown,
      diplomatic: Globe,
      business: Building,
      cultural: Users,
      educational: User,
      humanitarian: User,
      virtual: Video,
    }
    const IconComponent = icons[type as keyof typeof icons] || User
    return <IconComponent className="h-4 w-4" />
  }

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)

    switch (viewMode) {
      case "month":
        newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1))
        break
      case "week":
        newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7))
        break
      case "day":
        newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1))
        break
    }

    setCurrentDate(newDate)
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const getAppointmentsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return filteredAppointments.filter((apt) => apt.date === dateStr)
  }

  const getAppointmentsForWeek = (startDate: Date) => {
    const weekAppointments = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      weekAppointments.push({
        date,
        appointments: getAppointmentsForDate(date),
      })
    }
    return weekAppointments
  }

  const getMonthDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    const current = new Date(startDate)

    for (let i = 0; i < 42; i++) {
      days.push({
        date: new Date(current),
        isCurrentMonth: current.getMonth() === month,
        isToday: current.toDateString() === new Date().toDateString(),
        appointments: getAppointmentsForDate(current),
      })
      current.setDate(current.getDate() + 1)
    }

    return days
  }

  const getWeekStart = () => {
    const date = new Date(currentDate)
    const day = date.getDay()
    const diff = date.getDate() - day
    return new Date(date.setDate(diff))
  }

  const formatTimeDisplay = (time: string) => {
    const [hours, minutes] = time.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  const handleAppointmentClick = (appointment: AppointmentEvent) => {
    setSelectedAppointment(appointment)
    setIsDetailDialogOpen(true)
    onAppointmentClick?.(appointment)
  }

  const handleConflictClick = (conflict: ConflictInfo) => {
    setSelectedConflict(conflict)
    setIsConflictDialogOpen(true)
  }

  const renderConflictIndicator = (appointment: AppointmentEvent) => {
    const severity = getConflictSeverity(appointment.id)
    if (!severity) return null

    const icons = {
      warning: AlertTriangle,
      error: AlertCircle,
      critical: Zap,
    }
    const IconComponent = icons[severity]
    const colors = {
      warning: "text-yellow-600",
      error: "text-orange-600",
      critical: "text-red-600",
    }

    return (
      <div className={`absolute -top-1 -right-1 ${colors[severity]}`} title={t.conflictIndicator}>
        <IconComponent className="h-4 w-4" />
      </div>
    )
  }

  const renderMonthView = () => {
    const days = getMonthDays()

    return (
      <div className="grid grid-cols-7 gap-1">
        {/* Week day headers */}
        {t.weekDays.map((day) => (
          <div key={day} className="p-2 text-center text-sm font-medium text-slate-600 bg-slate-50">
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {days.map((day, index) => (
          <div
            key={index}
            className={`min-h-[120px] p-1 border border-slate-200 cursor-pointer hover:bg-slate-50 ${
              !day.isCurrentMonth ? "bg-slate-50 text-slate-400" : ""
            } ${day.isToday ? "bg-amber-50 border-amber-200" : ""}`}
            onClick={() => onDateClick?.(day.date)}
          >
            <div className={`text-sm font-medium mb-1 ${day.isToday ? "text-amber-600" : ""}`}>
              {day.date.getDate()}
            </div>
            <div className="space-y-1">
              {day.appointments.slice(0, 3).map((apt) => {
                const conflictSeverity = getConflictSeverity(apt.id)
                return (
                  <div
                    key={apt.id}
                    className={`text-xs p-1 rounded cursor-pointer hover:opacity-80 border-l-2 relative ${
                      conflictSeverity ? getConflictColor(conflictSeverity) : getUrgencyColor(apt.urgency)
                    } ${getStatusColor(apt.status)}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAppointmentClick(apt)
                    }}
                  >
                    <div className="font-medium truncate">{formatTimeDisplay(apt.time)}</div>
                    <div className="truncate">{apt.name}</div>
                    {renderConflictIndicator(apt)}
                  </div>
                )
              })}
              {day.appointments.length > 3 && (
                <div className="text-xs text-slate-500 text-center">+{day.appointments.length - 3} more</div>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }

  const renderWeekView = () => {
    const weekStart = getWeekStart()
    const weekDays = getAppointmentsForWeek(weekStart)

    return (
      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day, index) => (
          <div key={index} className="border border-slate-200">
            <div
              className={`p-2 text-center font-medium border-b ${
                day.date.toDateString() === new Date().toDateString() ? "bg-amber-50 text-amber-600" : "bg-slate-50"
              }`}
            >
              <div className="text-sm">{t.weekDays[day.date.getDay()]}</div>
              <div className="text-lg">{day.date.getDate()}</div>
            </div>
            <div className="p-2 min-h-[400px] space-y-2">
              {day.appointments.map((apt) => {
                const conflictSeverity = getConflictSeverity(apt.id)
                return (
                  <div
                    key={apt.id}
                    className={`p-2 rounded cursor-pointer hover:opacity-80 border-l-2 relative ${
                      conflictSeverity ? getConflictColor(conflictSeverity) : getUrgencyColor(apt.urgency)
                    } ${getStatusColor(apt.status)}`}
                    onClick={() => handleAppointmentClick(apt)}
                  >
                    <div className="font-medium text-sm">{formatTimeDisplay(apt.time)}</div>
                    <div className="text-xs truncate">{apt.name}</div>
                    <div className="text-xs text-slate-600 truncate">{apt.organization}</div>
                    {renderConflictIndicator(apt)}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    )
  }

  const renderDayView = () => {
    const dayAppointments = getAppointmentsForDate(currentDate)
    const hours = Array.from({ length: 24 }, (_, i) => i)

    return (
      <div className="space-y-1">
        {hours.map((hour) => {
          const hourAppointments = dayAppointments.filter((apt) => {
            const aptHour = Number.parseInt(apt.time.split(":")[0])
            return aptHour === hour
          })

          return (
            <div key={hour} className="flex border-b border-slate-100">
              <div className="w-20 p-2 text-sm text-slate-600 border-r">
                {hour === 0 ? "12 AM" : hour <= 12 ? `${hour} AM` : `${hour - 12} PM`}
              </div>
              <div className="flex-1 p-2 min-h-[60px]">
                {hourAppointments.map((apt) => {
                  const conflictSeverity = getConflictSeverity(apt.id)
                  return (
                    <div
                      key={apt.id}
                      className={`p-2 mb-1 rounded cursor-pointer hover:opacity-80 border-l-2 relative ${
                        conflictSeverity ? getConflictColor(conflictSeverity) : getUrgencyColor(apt.urgency)
                      } ${getStatusColor(apt.status)}`}
                      onClick={() => handleAppointmentClick(apt)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{apt.name}</div>
                        <div className="text-sm text-slate-600">{formatTimeDisplay(apt.time)}</div>
                      </div>
                      <div className="text-sm text-slate-600">{apt.organization}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                        {getTypeIcon(apt.appointmentType)}
                        {t.appointmentTypes[apt.appointmentType as keyof typeof t.appointmentTypes]}
                      </div>
                      {renderConflictIndicator(apt)}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const renderAgendaView = () => {
    const sortedAppointments = [...filteredAppointments].sort(
      (a, b) => new Date(`${a.date} ${a.time}`).getTime() - new Date(`${b.date} ${b.time}`).getTime(),
    )

    const groupedByDate = sortedAppointments.reduce(
      (groups, apt) => {
        const date = apt.date
        if (!groups[date]) {
          groups[date] = []
        }
        groups[date].push(apt)
        return groups
      },
      {} as Record<string, AppointmentEvent[]>,
    )

    return (
      <div className="space-y-6">
        {Object.entries(groupedByDate).map(([date, appointments]) => (
          <div key={date}>
            <h3 className="text-lg font-semibold text-slate-800 mb-3 border-b pb-2">
              {new Date(date).toLocaleDateString(language === "ar" ? "ar-SA" : "en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h3>
            <div className="space-y-3">
              {appointments.map((apt) => {
                const conflictSeverity = getConflictSeverity(apt.id)
                return (
                  <Card
                    key={apt.id}
                    className={`cursor-pointer hover:shadow-md transition-shadow border-l-4 relative ${
                      conflictSeverity ? getConflictColor(conflictSeverity) : getUrgencyColor(apt.urgency)
                    }`}
                    onClick={() => handleAppointmentClick(apt)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getTypeIcon(apt.appointmentType)}
                            <span className="font-medium text-slate-800">{apt.name}</span>
                            <Badge className={`text-xs ${getStatusColor(apt.status)}`}>
                              {t.statusLabels[apt.status as keyof typeof t.statusLabels]}
                            </Badge>
                            {conflictSeverity && (
                              <Badge variant="destructive" className="text-xs">
                                {t.conflicts.severity[conflictSeverity]}
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-slate-600 mb-1">{apt.organization}</div>
                          <div className="text-sm text-slate-600">
                            {t.appointmentTypes[apt.appointmentType as keyof typeof t.appointmentTypes]}
                          </div>
                        </div>
                        <div className="text-right text-sm text-slate-600">
                          <div className="flex items-center gap-1 mb-1">
                            <Clock className="h-4 w-4" />
                            {formatTimeDisplay(apt.time)} ({apt.duration} min)
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {t.locations[apt.location as keyof typeof t.locations]}
                          </div>
                        </div>
                      </div>
                      {renderConflictIndicator(apt)}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        ))}
        {Object.keys(groupedByDate).length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>{t.noAppointments}</p>
          </div>
        )}
      </div>
    )
  }

  const getViewTitle = () => {
    switch (viewMode) {
      case "month":
        return `${t.months[currentDate.getMonth()]} ${currentDate.getFullYear()}`
      case "week":
        const weekStart = getWeekStart()
        const weekEnd = new Date(weekStart)
        weekEnd.setDate(weekEnd.getDate() + 6)
        return `${weekStart.getDate()} - ${weekEnd.getDate()} ${t.months[weekStart.getMonth()]} ${weekStart.getFullYear()}`
      case "day":
        return currentDate.toLocaleDateString(language === "ar" ? "ar-SA" : "en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      case "agenda":
        return "Upcoming Appointments"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-6">
      {/* Conflict Alert */}
      {conflicts.length > 0 && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertTitle className="text-orange-800">{t.conflicts.title}</AlertTitle>
          <AlertDescription className="text-orange-700">
            {conflicts.length} {t.conflicts.detected}.
            <Button
              variant="link"
              className="p-0 ml-2 text-orange-600 hover:text-orange-800"
              onClick={() => setShowConflictsOnly(!showConflictsOnly)}
            >
              {showConflictsOnly ? "Show All" : t.filters.showConflicts}
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-6 w-6 text-amber-600" />
              {t.title}
              {conflicts.length > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {conflicts.length} {t.conflicts.detected}
                </Badge>
              )}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={goToToday}>
                {t.today}
              </Button>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                {t.addAppointment}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* View Mode Selector */}
            <div className="flex items-center gap-2">
              {(["month", "week", "day", "agenda"] as ViewMode[]).map((mode) => (
                <Button
                  key={mode}
                  variant={viewMode === mode ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode(mode)}
                  className="text-xs"
                >
                  {t.viewModes[mode]}
                </Button>
              ))}
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder={t.filters.type} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.filters.all}</SelectItem>
                  {Object.entries(t.appointmentTypes).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder={t.filters.status} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.filters.all}</SelectItem>
                  {Object.entries(t.statusLabels).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant={showConflictsOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setShowConflictsOnly(!showConflictsOnly)}
                className="flex items-center gap-2"
              >
                <AlertTriangle className="h-4 w-4" />
                {t.filters.showConflicts}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conflicts Summary */}
      {conflicts.length > 0 && (
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <AlertTriangle className="h-5 w-5" />
              {t.conflicts.title} ({conflicts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {conflicts.slice(0, 3).map((conflict) => (
                <div
                  key={conflict.id}
                  className={`p-3 rounded-lg border cursor-pointer hover:shadow-md transition-shadow ${
                    conflict.severity === "critical"
                      ? "border-red-200 bg-red-50"
                      : conflict.severity === "error"
                        ? "border-orange-200 bg-orange-50"
                        : "border-yellow-200 bg-yellow-50"
                  }`}
                  onClick={() => handleConflictClick(conflict)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {t.conflicts.types[conflict.type]}
                        </Badge>
                        <Badge
                          variant={conflict.severity === "critical" ? "destructive" : "secondary"}
                          className="text-xs"
                        >
                          {t.conflicts.severity[conflict.severity]}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-700">{conflict.message}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {conflicts.length > 3 && (
                <div className="text-center">
                  <Button variant="outline" size="sm">
                    View All {conflicts.length} Conflicts
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      {viewMode !== "agenda" && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm" onClick={() => navigateDate("prev")}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-semibold text-slate-800">{getViewTitle()}</h2>
              <Button variant="outline" size="sm" onClick={() => navigateDate("next")}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Calendar View */}
      <Card>
        <CardContent className="p-4">
          {viewMode === "month" && renderMonthView()}
          {viewMode === "week" && renderWeekView()}
          {viewMode === "day" && renderDayView()}
          {viewMode === "agenda" && renderAgendaView()}
        </CardContent>
      </Card>

      {/* Appointment Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-amber-600" />
              {t.appointmentDetails}
              {selectedAppointment && hasConflict(selectedAppointment.id) && (
                <Badge variant="destructive" className="ml-2">
                  {t.conflictIndicator}
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>

          {selectedAppointment && (
            <div className="space-y-4">
              {/* Conflict Warning */}
              {hasConflict(selectedAppointment.id) && (
                <Alert className="border-orange-200 bg-orange-50">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <AlertTitle className="text-orange-800">Scheduling Conflicts Detected</AlertTitle>
                  <AlertDescription className="text-orange-700">
                    This appointment has {getAppointmentConflicts(selectedAppointment.id).length} scheduling
                    conflict(s).
                    <Button
                      variant="link"
                      className="p-0 ml-2 text-orange-600 hover:text-orange-800"
                      onClick={() => {
                        const conflicts = getAppointmentConflicts(selectedAppointment.id)
                        if (conflicts.length > 0) {
                          handleConflictClick(conflicts[0])
                        }
                      }}
                    >
                      View Details
                    </Button>
                  </AlertDescription>
                </Alert>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {getTypeIcon(selectedAppointment.appointmentType)}
                    <span className="font-medium text-slate-800">{selectedAppointment.name}</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-1">{selectedAppointment.organization}</p>
                  <p className="text-sm text-slate-600">{selectedAppointment.email}</p>
                </div>
                <div className="space-y-2">
                  <Badge className={`${getStatusColor(selectedAppointment.status)}`}>
                    {t.statusLabels[selectedAppointment.status as keyof typeof t.statusLabels]}
                  </Badge>
                  <div className="text-sm text-slate-600">
                    {t.appointmentTypes[selectedAppointment.appointmentType as keyof typeof t.appointmentTypes]}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-slate-500" />
                    <span>{new Date(selectedAppointment.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-slate-500" />
                    <span>{formatTimeDisplay(selectedAppointment.time)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-slate-500" />
                    <span>{t.locations[selectedAppointment.location as keyof typeof t.locations]}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">{t.duration}:</span> {selectedAppointment.duration} minutes
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">{t.attendees}:</span> {selectedAppointment.attendees}
                  </div>
                </div>
              </div>

              {selectedAppointment.description && (
                <div className="pt-4 border-t">
                  <h4 className="font-medium text-slate-800 mb-2">Description</h4>
                  <p className="text-sm text-slate-600">{selectedAppointment.description}</p>
                </div>
              )}

              {selectedAppointment.protocolNotes && (
                <div className="pt-4 border-t">
                  <h4 className="font-medium text-slate-800 mb-2">{t.protocolNotes}</h4>
                  <p className="text-sm text-slate-600">{selectedAppointment.protocolNotes}</p>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
                  {t.close}
                </Button>
                <Button className="bg-amber-600 hover:bg-amber-700">
                  <Eye className="h-4 w-4 mr-2" />
                  {t.viewDetails}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Conflict Detail Dialog */}
      <Dialog open={isConflictDialogOpen} onOpenChange={setIsConflictDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              {t.conflicts.viewDetails}
            </DialogTitle>
          </DialogHeader>

          {selectedConflict && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{t.conflicts.types[selectedConflict.type]}</Badge>
                <Badge variant={selectedConflict.severity === "critical" ? "destructive" : "secondary"}>
                  {t.conflicts.severity[selectedConflict.severity]}
                </Badge>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-slate-700">{selectedConflict.message}</p>
              </div>

              <div>
                <h4 className="font-medium text-slate-800 mb-3">{t.conflicts.suggestions}</h4>
                <div className="space-y-2">
                  {selectedConflict.suggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 bg-blue-50 rounded">
                      <RefreshCw className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-700">{suggestion}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-slate-800 mb-3">Affected Appointments</h4>
                <div className="space-y-2">
                  {selectedConflict.appointments.map((aptId) => {
                    const appointment = appointments.find((apt) => apt.id === aptId)
                    if (!appointment) return null

                    return (
                      <div key={aptId} className="flex items-center justify-between p-2 border rounded">
                        <div>
                          <div className="font-medium text-sm">{appointment.name}</div>
                          <div className="text-xs text-slate-600">
                            {new Date(appointment.date).toLocaleDateString()} at {formatTimeDisplay(appointment.time)}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedAppointment(appointment)
                            setIsConflictDialogOpen(false)
                            setIsDetailDialogOpen(true)
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsConflictDialogOpen(false)}>
                  {t.close}
                </Button>
                <Button
                  className="bg-orange-600 hover:bg-orange-700"
                  onClick={() => {
                    onConflictResolve?.(selectedConflict.id, "manual")
                    setIsConflictDialogOpen(false)
                  }}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  {t.conflicts.resolve}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
