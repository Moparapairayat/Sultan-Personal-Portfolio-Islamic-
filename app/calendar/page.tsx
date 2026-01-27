"use client"

import { useState } from "react"
import { AppointmentCalendar } from "@/components/appointment-calendar"
import { Button } from "@/components/ui/button"

// Mock appointment data with potential conflicts
const mockAppointments = [
  {
    id: "APT-001",
    title: "Educational Partnership Discussion",
    name: "Dr. Ahmed Hassan",
    email: "ahmed.hassan@university.edu",
    organization: "Al Azhar University",
    appointmentType: "educational",
    date: "2024-02-15",
    time: "10:00",
    duration: 60,
    location: "palace",
    attendees: 3,
    status: "scheduled" as const,
    urgency: "normal" as const,
    description:
      "Discussion about potential educational partnership between Al Azhar University and the Al Waasi Empire's educational institutions.",
    protocolNotes: "Prepare education ministry briefing documents. Arrange for translator if needed.",
  },
  {
    id: "APT-002",
    title: "Trade Agreement Discussion",
    name: "Ambassador Sarah Mitchell",
    email: "s.mitchell@embassy.gov",
    organization: "British Embassy",
    appointmentType: "diplomatic",
    date: "2024-02-15",
    time: "10:30", // CONFLICT: Overlaps with APT-001
    duration: 45,
    location: "palace", // CONFLICT: Same location as APT-001
    attendees: 2,
    status: "confirmed" as const,
    urgency: "high" as const,
    description: "Urgent discussion regarding the bilateral trade agreement between the UK and Al Waasi Empire.",
    protocolNotes: "High-priority diplomatic meeting. Ensure security protocols are followed.",
  },
  {
    id: "APT-003",
    title: "Humanitarian Aid Coordination",
    name: "Maria Rodriguez",
    email: "maria.r@humanitarian.org",
    organization: "International Red Cross",
    appointmentType: "humanitarian",
    date: "2024-02-15",
    time: "11:15", // CONFLICT: Not enough travel time from palace to office
    duration: 90,
    location: "office", // CONFLICT: Different location, insufficient travel time
    attendees: 4,
    status: "scheduled" as const,
    urgency: "urgent" as const,
    description: "Urgent discussion about humanitarian aid for recent natural disaster victims in neighboring regions.",
    protocolNotes: "Important humanitarian meeting. Ensure all relevant ministry representatives attend.",
  },
  {
    id: "APT-004",
    title: "Cultural Exchange Program",
    name: "Prof. Elena Rossi",
    email: "e.rossi@culturalcenter.it",
    organization: "Italian Cultural Center",
    appointmentType: "cultural",
    date: "2024-02-15",
    time: "14:00",
    duration: 75,
    location: "palace",
    attendees: 5,
    status: "scheduled" as const,
    urgency: "normal" as const,
    description:
      "Planning cultural exchange program between Italy and Al Waasi Empire, including art exhibitions and student exchanges.",
    protocolNotes:
      "Arrange for cultural ministry representatives to attend. Prepare portfolio of current cultural initiatives.",
  },
  {
    id: "APT-005",
    title: "Technology Investment Proposal",
    name: "James Thompson",
    email: "j.thompson@techcorp.com",
    organization: "TechCorp Industries",
    appointmentType: "business",
    date: "2024-02-15",
    time: "15:00",
    duration: 60,
    location: "office",
    attendees: 3,
    status: "scheduled" as const,
    urgency: "low" as const,
    description:
      "Proposal for technology infrastructure investment in the Al Waasi Empire's digital transformation initiative.",
    protocolNotes: "Business consultation - prepare economic impact analysis. Technology ministry briefing required.",
  },
  {
    id: "APT-006",
    title: "Royal Audience - Community Leader",
    name: "Sheikh Abdullah Al-Mansouri",
    email: "a.mansouri@community.org",
    organization: "Al Waasi Community Council",
    appointmentType: "audience",
    date: "2024-02-15",
    time: "16:00",
    duration: 30,
    location: "palace",
    attendees: 1,
    status: "confirmed" as const,
    urgency: "urgent" as const, // CONFLICT: Too many high-priority appointments in one day
    description: "Royal audience to discuss community development projects and local governance improvements.",
    protocolNotes: "Traditional royal audience format. Prepare ceremonial reception protocols.",
  },
  {
    id: "APT-007",
    title: "Virtual Summit - Regional Leaders",
    name: "Multiple Participants",
    email: "summit@regional.org",
    organization: "Regional Cooperation Council",
    appointmentType: "virtual",
    date: "2024-02-16",
    time: "13:00",
    duration: 120,
    location: "virtual",
    attendees: 8,
    status: "scheduled" as const,
    urgency: "high" as const,
    description: "Virtual summit with regional leaders to discuss economic cooperation and security matters.",
    protocolNotes:
      "Multi-party virtual meeting. Ensure secure connection and backup systems. Simultaneous translation required.",
  },
  {
    id: "APT-008",
    title: "Emergency Security Briefing",
    name: "General Hassan Al-Zahra",
    email: "h.alzahra@defense.gov",
    organization: "Ministry of Defense",
    appointmentType: "diplomatic",
    date: "2024-02-15",
    time: "09:00",
    duration: 45,
    location: "office",
    attendees: 4,
    status: "confirmed" as const,
    urgency: "urgent" as const,
    description: "Urgent security briefing regarding regional developments and defense preparations.",
    protocolNotes: "Classified briefing - ensure secure meeting room and cleared personnel only.",
  },
]

export default function CalendarPage() {
  const [language, setLanguage] = useState<"en" | "ar">("en")
  const [appointments, setAppointments] = useState(mockAppointments)

  const handleAppointmentClick = (appointment: any) => {
    console.log("Appointment clicked:", appointment)
    // Handle appointment click - could open edit dialog, etc.
  }

  const handleDateClick = (date: Date) => {
    console.log("Date clicked:", date)
    // Handle date click - could open "add appointment" dialog
  }

  const handleConflictResolve = (conflictId: string, resolution: string) => {
    console.log("Resolving conflict:", conflictId, "with resolution:", resolution)
    // Handle conflict resolution - could update appointments, send notifications, etc.
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-emerald-50 p-6">
      {/* Language Toggle */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <Button
          variant={language === "en" ? "default" : "outline"}
          size="sm"
          onClick={() => setLanguage("en")}
          className="text-xs"
        >
          EN
        </Button>
        <Button
          variant={language === "ar" ? "default" : "outline"}
          size="sm"
          onClick={() => setLanguage("ar")}
          className="text-xs"
        >
          العربية
        </Button>
      </div>

      <div className="max-w-7xl mx-auto">
        <AppointmentCalendar
          language={language}
          appointments={appointments}
          onAppointmentClick={handleAppointmentClick}
          onDateClick={handleDateClick}
          onConflictResolve={handleConflictResolve}
        />
      </div>
    </div>
  )
}
