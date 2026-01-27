"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Crown,
  Calendar,
  User,
  Mail,
  Phone,
  Building,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Search,
  Filter,
  Eye,
  FileText,
} from "lucide-react"
import { AppointmentCalendar } from "@/components/appointment-calendar"

interface AppointmentRequest {
  id: string
  name: string
  email: string
  phone: string
  organization: string
  inquiryType: string
  appointmentType: string
  preferredDate: string
  preferredTime: string
  duration: string
  attendees: string
  location: string
  urgency: string
  subject: string
  message: string
  status: "pending" | "approved" | "denied" | "scheduled" | "completed"
  submittedAt: string
  reviewedAt?: string
  reviewedBy?: string
  reviewNotes?: string
  scheduledDate?: string
  scheduledTime?: string
  scheduledLocation?: string
  protocolNotes?: string
}

interface ProtocolDashboardProps {
  language: "en" | "ar"
}

export function ProtocolDashboard({ language }: ProtocolDashboardProps) {
  const [requests, setRequests] = useState<AppointmentRequest[]>([])
  const [filteredRequests, setFilteredRequests] = useState<AppointmentRequest[]>([])
  const [selectedRequest, setSelectedRequest] = useState<AppointmentRequest | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [urgencyFilter, setUrgencyFilter] = useState<string>("all")
  const [reviewNotes, setReviewNotes] = useState("")
  const [scheduledDate, setScheduledDate] = useState("")
  const [scheduledTime, setScheduledTime] = useState("")
  const [scheduledLocation, setScheduledLocation] = useState("")
  const [protocolNotes, setProtocolNotes] = useState("")
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"table" | "calendar">("table")

  const content = {
    en: {
      title: "Royal Protocol Office",
      subtitle: "Appointment Request Management System",
      stats: {
        pending: "Pending Review",
        approved: "Approved",
        denied: "Denied",
        scheduled: "Scheduled",
        completed: "Completed",
      },
      filters: {
        search: "Search requests...",
        status: "Filter by Status",
        urgency: "Filter by Urgency",
        all: "All",
      },
      table: {
        name: "Name",
        type: "Type",
        date: "Requested Date",
        urgency: "Urgency",
        status: "Status",
        actions: "Actions",
        submitted: "Submitted",
      },
      actions: {
        view: "View Details",
        approve: "Approve",
        deny: "Deny",
        schedule: "Schedule",
        edit: "Edit",
        contact: "Contact",
      },
      dialog: {
        title: "Appointment Request Details",
        personalInfo: "Personal Information",
        appointmentDetails: "Appointment Details",
        message: "Message",
        review: "Review & Decision",
        scheduling: "Scheduling Details",
        protocolNotes: "Protocol Notes",
        reviewNotes: "Review Notes",
        scheduledDate: "Scheduled Date",
        scheduledTime: "Scheduled Time",
        scheduledLocation: "Scheduled Location",
        close: "Close",
        save: "Save Changes",
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
      urgencyLevels: {
        low: "Low",
        normal: "Normal",
        high: "High",
        urgent: "Urgent",
      },
      statusLabels: {
        pending: "Pending Review",
        approved: "Approved",
        denied: "Denied",
        scheduled: "Scheduled",
        completed: "Completed",
      },
      confirmations: {
        approve: {
          title: "Approve Appointment Request",
          description:
            "Are you sure you want to approve this appointment request? The applicant will be notified via email.",
        },
        deny: {
          title: "Deny Appointment Request",
          description:
            "Are you sure you want to deny this appointment request? Please provide a reason in the review notes.",
        },
        schedule: {
          title: "Schedule Appointment",
          description: "Confirm the final scheduling details for this approved appointment.",
        },
      },
    },
    ar: {
      title: "مكتب البروتوكول الملكي",
      subtitle: "نظام إدارة طلبات المواعيد",
      stats: {
        pending: "قيد المراجعة",
        approved: "موافق عليها",
        denied: "مرفوضة",
        scheduled: "مجدولة",
        completed: "مكتملة",
      },
      filters: {
        search: "البحث في الطلبات...",
        status: "تصفية حسب الحالة",
        urgency: "تصفية حسب الأولوية",
        all: "الكل",
      },
      table: {
        name: "الاسم",
        type: "النوع",
        date: "التاريخ المطلوب",
        urgency: "الأولوية",
        status: "الحالة",
        actions: "الإجراءات",
        submitted: "تاريخ التقديم",
      },
      actions: {
        view: "عرض التفاصيل",
        approve: "موافقة",
        deny: "رفض",
        schedule: "جدولة",
        edit: "تعديل",
        contact: "تواصل",
      },
      dialog: {
        title: "تفاصيل طلب الموعد",
        personalInfo: "المعلومات الشخصية",
        appointmentDetails: "تفاصيل الموعد",
        message: "الرسالة",
        review: "المراجعة والقرار",
        scheduling: "تفاصيل الجدولة",
        protocolNotes: "ملاحظات البروتوكول",
        reviewNotes: "ملاحظات المراجعة",
        scheduledDate: "التاريخ المجدول",
        scheduledTime: "الوقت المجدول",
        scheduledLocation: "المكان المجدول",
        close: "إغلاق",
        save: "حفظ التغييرات",
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
      urgencyLevels: {
        low: "منخفض",
        normal: "عادي",
        high: "عالي",
        urgent: "عاجل",
      },
      statusLabels: {
        pending: "قيد المراجعة",
        approved: "موافق عليها",
        denied: "مرفوضة",
        scheduled: "مجدولة",
        completed: "مكتملة",
      },
      confirmations: {
        approve: {
          title: "الموافقة على طلب الموعد",
          description: "هل أنت متأكد من الموافقة على طلب الموعد هذا؟ سيتم إشعار المتقدم عبر البريد الإلكتروني.",
        },
        deny: {
          title: "رفض طلب الموعد",
          description: "هل أنت متأكد من رفض طلب الموعد هذا؟ يرجى تقديم سبب في ملاحظات المراجعة.",
        },
        schedule: {
          title: "جدولة الموعد",
          description: "تأكيد تفاصيل الجدولة النهائية لهذا الموعد المعتمد.",
        },
      },
    },
  }

  const t = content[language]

  // Mock data - in real app, this would come from an API
  useEffect(() => {
    const mockRequests: AppointmentRequest[] = [
      {
        id: "REQ-001",
        name: "Dr. Ahmed Hassan",
        email: "ahmed.hassan@university.edu",
        phone: "+971-50-123-4567",
        organization: "Al Azhar University",
        inquiryType: "education",
        appointmentType: "educational",
        preferredDate: "2024-02-15",
        preferredTime: "10:00",
        duration: "60",
        attendees: "3",
        location: "palace",
        urgency: "normal",
        subject: "Educational Partnership Proposal",
        message:
          "We would like to discuss a potential educational partnership between Al Azhar University and the Al Waasi Empire's educational institutions.",
        status: "pending",
        submittedAt: "2024-01-28T09:30:00Z",
      },
      {
        id: "REQ-002",
        name: "Ambassador Sarah Mitchell",
        email: "s.mitchell@embassy.gov",
        phone: "+44-20-7946-0958",
        organization: "British Embassy",
        inquiryType: "diplomatic",
        appointmentType: "diplomatic",
        preferredDate: "2024-02-12",
        preferredTime: "14:00",
        duration: "45",
        attendees: "2",
        location: "office",
        urgency: "high",
        subject: "Trade Agreement Discussion",
        message: "Urgent discussion regarding the bilateral trade agreement between the UK and Al Waasi Empire.",
        status: "approved",
        submittedAt: "2024-01-25T11:15:00Z",
        reviewedAt: "2024-01-26T08:00:00Z",
        reviewedBy: "Protocol Officer Johnson",
        reviewNotes: "Approved for diplomatic priority. Scheduled for Royal Office.",
        scheduledDate: "2024-02-12",
        scheduledTime: "14:00",
        scheduledLocation: "office",
      },
      {
        id: "REQ-003",
        name: "Maria Rodriguez",
        email: "maria.r@humanitarian.org",
        phone: "+34-91-123-4567",
        organization: "International Red Cross",
        inquiryType: "humanitarian",
        appointmentType: "humanitarian",
        preferredDate: "2024-02-20",
        preferredTime: "09:00",
        duration: "90",
        attendees: "4",
        location: "virtual",
        urgency: "urgent",
        subject: "Emergency Humanitarian Aid",
        message: "Urgent discussion about humanitarian aid for recent natural disaster victims in neighboring regions.",
        status: "scheduled",
        submittedAt: "2024-01-27T16:45:00Z",
        reviewedAt: "2024-01-27T18:00:00Z",
        reviewedBy: "Senior Protocol Officer Al-Rashid",
        reviewNotes: "Approved due to humanitarian urgency. Virtual meeting arranged.",
        scheduledDate: "2024-02-18",
        scheduledTime: "09:00",
        scheduledLocation: "virtual",
        protocolNotes: "Ensure technical support is available. Translator may be needed.",
      },
      {
        id: "REQ-004",
        name: "James Thompson",
        email: "j.thompson@techcorp.com",
        phone: "+1-555-123-4567",
        organization: "TechCorp Industries",
        inquiryType: "business",
        appointmentType: "business",
        preferredDate: "2024-02-25",
        preferredTime: "11:00",
        duration: "60",
        attendees: "5",
        location: "palace",
        urgency: "low",
        subject: "Technology Investment Proposal",
        message:
          "Proposal for technology infrastructure investment in the Al Waasi Empire's digital transformation initiative.",
        status: "denied",
        submittedAt: "2024-01-24T14:20:00Z",
        reviewedAt: "2024-01-26T10:30:00Z",
        reviewedBy: "Protocol Officer Al-Mansouri",
        reviewNotes:
          "Denied - requires preliminary review by Ministry of Technology first. Please resubmit after ministry approval.",
      },
    ]
    setRequests(mockRequests)
    setFilteredRequests(mockRequests)
  }, [])

  // Filter requests based on search and filters
  useEffect(() => {
    let filtered = requests

    if (searchTerm) {
      filtered = filtered.filter(
        (req) =>
          req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          req.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          req.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
          req.subject.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((req) => req.status === statusFilter)
    }

    if (urgencyFilter !== "all") {
      filtered = filtered.filter((req) => req.urgency === urgencyFilter)
    }

    setFilteredRequests(filtered)
  }, [requests, searchTerm, statusFilter, urgencyFilter])

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      approved: "bg-green-100 text-green-800 border-green-200",
      denied: "bg-red-100 text-red-800 border-red-200",
      scheduled: "bg-blue-100 text-blue-800 border-blue-200",
      completed: "bg-gray-100 text-gray-800 border-gray-200",
    }
    return variants[status as keyof typeof variants] || variants.pending
  }

  const getUrgencyBadge = (urgency: string) => {
    const variants = {
      low: "bg-gray-100 text-gray-800",
      normal: "bg-blue-100 text-blue-800",
      high: "bg-orange-100 text-orange-800",
      urgent: "bg-red-100 text-red-800",
    }
    return variants[urgency as keyof typeof variants] || variants.normal
  }

  const handleApprove = async (requestId: string) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? {
              ...req,
              status: "approved" as const,
              reviewedAt: new Date().toISOString(),
              reviewedBy: "Current Protocol Officer",
              reviewNotes: reviewNotes || "Approved for scheduling",
            }
          : req,
      ),
    )
    setReviewNotes("")
    setIsReviewDialogOpen(false)
  }

  const handleDeny = async (requestId: string) => {
    if (!reviewNotes.trim()) {
      alert("Please provide a reason for denial in the review notes.")
      return
    }

    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? {
              ...req,
              status: "denied" as const,
              reviewedAt: new Date().toISOString(),
              reviewedBy: "Current Protocol Officer",
              reviewNotes,
            }
          : req,
      ),
    )
    setReviewNotes("")
    setIsReviewDialogOpen(false)
  }

  const handleSchedule = async (requestId: string) => {
    if (!scheduledDate || !scheduledTime || !scheduledLocation) {
      alert("Please fill in all scheduling details.")
      return
    }

    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? {
              ...req,
              status: "scheduled" as const,
              scheduledDate,
              scheduledTime,
              scheduledLocation,
              protocolNotes,
            }
          : req,
      ),
    )
    setScheduledDate("")
    setScheduledTime("")
    setScheduledLocation("")
    setProtocolNotes("")
    setIsReviewDialogOpen(false)
  }

  const openReviewDialog = (request: AppointmentRequest) => {
    setSelectedRequest(request)
    setReviewNotes(request.reviewNotes || "")
    setScheduledDate(request.scheduledDate || request.preferredDate)
    setScheduledTime(request.scheduledTime || request.preferredTime)
    setScheduledLocation(request.scheduledLocation || request.location)
    setProtocolNotes(request.protocolNotes || "")
    setIsReviewDialogOpen(true)
  }

  const getStats = () => {
    return {
      pending: requests.filter((r) => r.status === "pending").length,
      approved: requests.filter((r) => r.status === "approved").length,
      denied: requests.filter((r) => r.status === "denied").length,
      scheduled: requests.filter((r) => r.status === "scheduled").length,
      completed: requests.filter((r) => r.status === "completed").length,
    }
  }

  const stats = getStats()

  const convertToCalendarEvents = (requests: AppointmentRequest[]) => {
    return requests
      .filter((req) => req.status === "scheduled" && req.scheduledDate && req.scheduledTime)
      .map((req) => ({
        id: req.id,
        title: req.subject,
        name: req.name,
        email: req.email,
        organization: req.organization,
        appointmentType: req.appointmentType,
        date: req.scheduledDate!,
        time: req.scheduledTime!,
        duration: Number.parseInt(req.duration),
        location: req.scheduledLocation || req.location,
        attendees: Number.parseInt(req.attendees),
        status: "scheduled" as const,
        urgency: req.urgency as "low" | "normal" | "high" | "urgent",
        description: req.message,
        protocolNotes: req.protocolNotes,
      }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-emerald-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Crown className="h-8 w-8 text-amber-600" />
            <h1 className="text-3xl font-bold text-slate-800">{t.title}</h1>
          </div>
          <p className="text-slate-600">{t.subtitle}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card className="border-yellow-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <div className="text-sm text-slate-600">{t.stats.pending}</div>
            </CardContent>
          </Card>
          <Card className="border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
              <div className="text-sm text-slate-600">{t.stats.approved}</div>
            </CardContent>
          </Card>
          <Card className="border-red-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{stats.denied}</div>
              <div className="text-sm text-slate-600">{t.stats.denied}</div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.scheduled}</div>
              <div className="text-sm text-slate-600">{t.stats.scheduled}</div>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">{stats.completed}</div>
              <div className="text-sm text-slate-600">{t.stats.completed}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder={t.filters.search}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder={t.filters.status} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.filters.all}</SelectItem>
                  <SelectItem value="pending">{t.statusLabels.pending}</SelectItem>
                  <SelectItem value="approved">{t.statusLabels.approved}</SelectItem>
                  <SelectItem value="denied">{t.statusLabels.denied}</SelectItem>
                  <SelectItem value="scheduled">{t.statusLabels.scheduled}</SelectItem>
                  <SelectItem value="completed">{t.statusLabels.completed}</SelectItem>
                </SelectContent>
              </Select>
              <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder={t.filters.urgency} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.filters.all}</SelectItem>
                  <SelectItem value="urgent">{t.urgencyLevels.urgent}</SelectItem>
                  <SelectItem value="high">{t.urgencyLevels.high}</SelectItem>
                  <SelectItem value="normal">{t.urgencyLevels.normal}</SelectItem>
                  <SelectItem value="low">{t.urgencyLevels.low}</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Filter className="h-4 w-4" />
                Advanced Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* View Mode Toggle */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "table" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("table")}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Table View
              </Button>
              <Button
                variant={viewMode === "calendar" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("calendar")}
                className="flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                Calendar View
              </Button>
            </div>
          </CardContent>
        </Card>

        {viewMode === "table" ? (
          <Card>
            <CardHeader>
              <CardTitle>Appointment Requests ({filteredRequests.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium text-slate-600">{t.table.name}</th>
                      <th className="text-left p-3 font-medium text-slate-600">{t.table.type}</th>
                      <th className="text-left p-3 font-medium text-slate-600">{t.table.date}</th>
                      <th className="text-left p-3 font-medium text-slate-600">{t.table.urgency}</th>
                      <th className="text-left p-3 font-medium text-slate-600">{t.table.status}</th>
                      <th className="text-left p-3 font-medium text-slate-600">{t.table.actions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRequests.map((request) => (
                      <tr key={request.id} className="border-b hover:bg-slate-50">
                        <td className="p-3">
                          <div>
                            <div className="font-medium text-slate-800">{request.name}</div>
                            <div className="text-sm text-slate-500">{request.organization}</div>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge variant="outline" className="text-xs">
                            {t.appointmentTypes[request.appointmentType as keyof typeof t.appointmentTypes]}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="text-sm">
                            <div>{new Date(request.preferredDate).toLocaleDateString()}</div>
                            <div className="text-slate-500">{request.preferredTime}</div>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge className={`text-xs ${getUrgencyBadge(request.urgency)}`}>
                            {t.urgencyLevels[request.urgency as keyof typeof t.urgencyLevels]}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Badge className={`text-xs ${getStatusBadge(request.status)}`}>
                            {t.statusLabels[request.status as keyof typeof t.statusLabels]}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openReviewDialog(request)}
                              className="h-8 w-8 p-0"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {request.status === "pending" && (
                              <>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-green-600">
                                      <CheckCircle className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>{t.confirmations.approve.title}</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        {t.confirmations.approve.description}
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleApprove(request.id)}>
                                        Approve
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600">
                                      <XCircle className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>{t.confirmations.deny.title}</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        {t.confirmations.deny.description}
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDeny(request.id)}>Deny</AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </>
                            )}
                            {request.status === "approved" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openReviewDialog(request)}
                                className="h-8 w-8 p-0 text-blue-600"
                              >
                                <Calendar className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ) : (
          <AppointmentCalendar
            language={language}
            appointments={convertToCalendarEvents(requests)}
            onAppointmentClick={(appointment) => {
              const request = requests.find((r) => r.id === appointment.id)
              if (request) {
                openReviewDialog(request)
              }
            }}
            onDateClick={(date) => {
              console.log("Date clicked:", date)
              // Could open a "add appointment" dialog for this date
            }}
          />
        )}

        {/* Review Dialog */}
        <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-amber-600" />
                {t.dialog.title} - {selectedRequest?.id}
              </DialogTitle>
              <DialogDescription>
                {t.table.submitted}: {selectedRequest && new Date(selectedRequest.submittedAt).toLocaleString()}
              </DialogDescription>
            </DialogHeader>

            {selectedRequest && (
              <div className="space-y-6">
                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="h-5 w-5" />
                      {t.dialog.personalInfo}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-slate-500" />
                      <span className="font-medium">{selectedRequest.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-slate-500" />
                      <span>{selectedRequest.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-slate-500" />
                      <span>{selectedRequest.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-slate-500" />
                      <span>{selectedRequest.organization}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Appointment Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      {t.dialog.appointmentDetails}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-slate-600">Type</Label>
                      <p>{t.appointmentTypes[selectedRequest.appointmentType as keyof typeof t.appointmentTypes]}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-slate-600">Preferred Date & Time</Label>
                      <p>
                        {new Date(selectedRequest.preferredDate).toLocaleDateString()} at
                        {selectedRequest.preferredTime}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-slate-600">Duration</Label>
                      <p>{selectedRequest.duration} minutes</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-slate-600">Attendees</Label>
                      <p>{selectedRequest.attendees} people</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-slate-600">Preferred Location</Label>
                      <p>{t.locations[selectedRequest.location as keyof typeof t.locations]}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-slate-600">Urgency</Label>
                      <Badge className={`text-xs ${getUrgencyBadge(selectedRequest.urgency)}`}>
                        {t.urgencyLevels[selectedRequest.urgency as keyof typeof t.urgencyLevels]}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Message */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t.dialog.message}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-2">
                      <Label className="text-sm font-medium text-slate-600">Subject</Label>
                      <p>{selectedRequest.subject}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-slate-600">Message</Label>
                      <p className="whitespace-pre-wrap">{selectedRequest.message}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Review Section */}
                {selectedRequest.status === "pending" && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        {t.dialog.review}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="reviewNotes">{t.dialog.reviewNotes}</Label>
                        <Textarea
                          id="reviewNotes"
                          value={reviewNotes}
                          onChange={(e) => setReviewNotes(e.target.value)}
                          placeholder="Enter review notes and decision rationale..."
                          rows={3}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleApprove(selectedRequest.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          {t.actions.approve}
                        </Button>
                        <Button onClick={() => handleDeny(selectedRequest.id)} variant="destructive">
                          <XCircle className="h-4 w-4 mr-2" />
                          {t.actions.deny}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Scheduling Section */}
                {(selectedRequest.status === "approved" || selectedRequest.status === "scheduled") && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        {t.dialog.scheduling}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="scheduledDate">{t.dialog.scheduledDate}</Label>
                          <Input
                            id="scheduledDate"
                            type="date"
                            value={scheduledDate}
                            onChange={(e) => setScheduledDate(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="scheduledTime">{t.dialog.scheduledTime}</Label>
                          <Input
                            id="scheduledTime"
                            type="time"
                            value={scheduledTime}
                            onChange={(e) => setScheduledTime(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>{t.dialog.scheduledLocation}</Label>
                          <Select value={scheduledLocation} onValueChange={setScheduledLocation}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(t.locations).map(([key, value]) => (
                                <SelectItem key={key} value={key}>
                                  {value}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="protocolNotes">{t.dialog.protocolNotes}</Label>
                        <Textarea
                          id="protocolNotes"
                          value={protocolNotes}
                          onChange={(e) => setProtocolNotes(e.target.value)}
                          placeholder="Special instructions, security requirements, preparation notes..."
                          rows={3}
                        />
                      </div>
                      {selectedRequest.status === "approved" && (
                        <Button
                          onClick={() => handleSchedule(selectedRequest.id)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          {t.actions.schedule}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Review History */}
                {selectedRequest.reviewedAt && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Review History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p>
                          <strong>Reviewed by:</strong> {selectedRequest.reviewedBy}
                        </p>
                        <p>
                          <strong>Review Date:</strong> {new Date(selectedRequest.reviewedAt).toLocaleString()}
                        </p>
                        <p>
                          <strong>Notes:</strong> {selectedRequest.reviewNotes}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
                {t.dialog.close}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
