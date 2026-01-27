"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Send, CheckCircle, Calendar, Clock, Video, Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FormData {
  name: string
  email: string
  phone: string
  organization: string
  subject: string
  message: string
  inquiryType: string
  requestAppointment: boolean
  appointmentType: string
  preferredDate: string
  preferredTime: string
  duration: string
  attendees: string
  location: string
  urgency: string
  attachedFile: File | null
  captchaAnswer: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  message?: string
  inquiryType?: string
  appointmentType?: string
  preferredDate?: string
  preferredTime?: string
  duration?: string
  urgency?: string
  attachedFile?: string
  captchaAnswer?: string
}

interface ContactFormProps {
  language: "en" | "ar"
}

export function ContactForm({ language }: ContactFormProps) {
  const { toast } = useToast()

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    organization: "",
    subject: "",
    message: "",
    inquiryType: "",
    requestAppointment: false,
    appointmentType: "",
    preferredDate: "",
    preferredTime: "",
    duration: "",
    attendees: "1",
    location: "",
    urgency: "normal",
    attachedFile: null,
    captchaAnswer: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  // Simple CAPTCHA question and answer
  const captchaQuestion = language === "en" ? "What is 5 + 3?" : "ما هو ٥ + ٣؟"
  const correctCaptchaAnswer = language === "en" ? "8" : "٨" // Arabic numeral for 8

  const content = {
    en: {
      title: "Contact His Majesty",
      subtitle: "Send a message to the Royal Office",
      form: {
        name: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        organization: "Organization (Optional)",
        subject: "Subject",
        message: "Message",
        inquiryType: "Type of Inquiry",
        submit: "Send Message",
        submitting: "Sending...",
        requestAppointment: "Request an Audience/Meeting",
        appointmentType: "Type of Meeting",
        preferredDate: "Preferred Date",
        preferredTime: "Preferred Time",
        duration: "Expected Duration",
        attendees: "Number of Attendees",
        location: "Preferred Location",
        urgency: "Urgency Level",
        attachedFile: "Attach Document (Optional)",
        captcha: captchaQuestion,
        captchaPlaceholder: "Your answer",
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
      durations: {
        "15": "15 minutes",
        "30": "30 minutes",
        "45": "45 minutes",
        "60": "1 hour",
        "90": "1.5 hours",
        "120": "2 hours",
      },
      locations: {
        palace: "Royal Palace",
        office: "Royal Office",
        virtual: "Virtual Meeting",
        neutral: "Neutral Venue",
      },
      urgencyLevels: {
        low: "Low - Within 2 weeks",
        normal: "Normal - Within 1 week",
        high: "High - Within 3 days",
        urgent: "Urgent - Within 24 hours",
      },
      inquiryTypes: {
        diplomatic: "Diplomatic Relations",
        business: "Business Partnership",
        cultural: "Cultural Exchange",
        education: "Educational Initiative",
        humanitarian: "Humanitarian Aid",
        media: "Media Inquiry",
        general: "General Inquiry",
      },
      validation: {
        nameRequired: "Full name is required",
        emailRequired: "Email address is required",
        emailInvalid: "Please enter a valid email address",
        phoneInvalid: "Please enter a valid phone number",
        messageRequired: "Message is required",
        messageMinLength: "Message must be at least 10 characters",
        inquiryTypeRequired: "Please select an inquiry type",
        appointmentTypeRequired: "Please select a meeting type",
        preferredDateRequired: "Please select a preferred date",
        preferredTimeRequired: "Please select a preferred time",
        durationRequired: "Please select expected duration",
        urgencyRequired: "Please select urgency level",
        dateInPast: "Please select a future date",
        fileTooLarge: "File size exceeds 5MB limit.",
        fileInvalidType: "Only PDF, DOC, DOCX, JPG, PNG files are allowed.",
        captchaRequired: "Please answer the CAPTCHA question.",
        captchaIncorrect: "Incorrect CAPTCHA answer. Please try again.",
      },
      success: {
        title: "Message Sent Successfully",
        message: "Your message has been received by the Royal Office. We will respond within 48 hours.",
        appointmentMessage:
          "Your audience request has been received. The Royal Protocol Office will contact you within 24 hours to confirm the appointment details.",
      },
      error: {
        title: "Message Failed to Send",
        message: "There was an error sending your message. Please try again or contact us directly.",
      },
      contact: {
        office: "Office of His Majesty Sultan Ayat Khan",
        address: "Royal Palace, Al Waasi Capital",
        email: "royal.office@alwaasi.gov",
        phone: "+971-2-SULTAN-1",
      },
      appointmentInfo: {
        title: "Audience Guidelines",
        items: [
          "All audience requests are subject to approval by the Royal Protocol Office",
          "Diplomatic meetings require 48-hour advance notice",
          "Business consultations are scheduled on Tuesdays and Thursdays",
          "Cultural and educational meetings are prioritized during morning hours",
          "Virtual meetings are available for international participants",
        ],
      },
    },
    ar: {
      title: "التواصل مع جلالته",
      subtitle: "إرسال رسالة إلى المكتب الملكي",
      form: {
        name: "الاسم الكامل",
        email: "عنوان البريد الإلكتروني",
        phone: "رقم الهاتف",
        organization: "المؤسسة (اختياري)",
        subject: "الموضوع",
        message: "الرسالة",
        inquiryType: "نوع الاستفسار",
        submit: "إرسال الرسالة",
        submitting: "جاري الإرسال...",
        requestAppointment: "طلب مقابلة/اجتماع",
        appointmentType: "نوع الاجتماع",
        preferredDate: "التاريخ المفضل",
        preferredTime: "الوقت المفضل",
        duration: "المدة المتوقعة",
        attendees: "عدد الحضور",
        location: "المكان المفضل",
        urgency: "مستوى الأولوية",
        attachedFile: "إرفاق مستند (اختياري)",
        captcha: captchaQuestion,
        captchaPlaceholder: "إجابتك",
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
      durations: {
        "15": "15 دقيقة",
        "30": "30 دقيقة",
        "45": "45 دقيقة",
        "60": "ساعة واحدة",
        "90": "ساعة ونصف",
        "120": "ساعتان",
      },
      locations: {
        palace: "القصر الملكي",
        office: "المكتب الملكي",
        virtual: "اجتماع افتراضي",
        neutral: "مكان محايد",
      },
      urgencyLevels: {
        low: "منخفض - خلال أسبوعين",
        normal: "عادي - خلال أسبوع",
        high: "عالي - خلال 3 أيام",
        urgent: "عاجل - خلال 24 ساعة",
      },
      inquiryTypes: {
        diplomatic: "العلاقات الدبلوماسية",
        business: "الشراكة التجارية",
        cultural: "التبادل الثقافي",
        education: "المبادرة التعليمية",
        humanitarian: "المساعدات الإنسانية",
        media: "استفسار إعلامي",
        general: "استفسار عام",
      },
      validation: {
        nameRequired: "الاسم الكامل مطلوب",
        emailRequired: "عنوان البريد الإلكتروني مطلوب",
        emailInvalid: "يرجى إدخال عنوان بريد إلكتروني صحيح",
        phoneInvalid: "يرجى إدخال رقم هاتف صحيح",
        messageRequired: "الرسالة مطلوبة",
        messageMinLength: "يجب أن تكون الرسالة 10 أحرف على الأقل",
        inquiryTypeRequired: "يرجى اختيار نوع الاستفسار",
        appointmentTypeRequired: "يرجى اختيار نوع الاجتماع",
        preferredDateRequired: "يرجى اختيار التاريخ المفضل",
        preferredTimeRequired: "يرجى اختيار الوقت المفضل",
        durationRequired: "يرجى اختيار المدة المتوقعة",
        urgencyRequired: "يرجى اختيار مستوى الأولوية",
        dateInPast: "يرجى اختيار تاريخ مستقبلي",
        fileTooLarge: "حجم الملف يتجاوز 5 ميجابايت.",
        fileInvalidType: "يُسمح فقط بملفات PDF، DOC، DOCX، JPG، PNG.",
        captchaRequired: "يرجى الإجابة على سؤال التحقق.",
        captchaIncorrect: "إجابة التحقق غير صحيحة. يرجى المحاولة مرة أخرى.",
      },
      success: {
        title: "تم إرسال الرسالة بنجاح",
        message: "تم استلام رسالتك من قبل المكتب الملكي. سنرد خلال 48 ساعة.",
        appointmentMessage:
          "تم استلام طلب المقابلة. سيتواصل معك مكتب البروتوكول الملكي خلال 24 ساعة لتأكيد تفاصيل الموعد.",
      },
      error: {
        title: "فشل في إرسال الرسالة",
        message: "حدث خطأ في إرسال رسالتك. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة.",
      },
      contact: {
        office: "مكتب صاحب الجلالة السلطان آيات خان",
        address: "القصر الملكي، عاصمة الواسعية",
        email: "royal.office@alwaasi.gov",
        phone: "+971-2-SULTAN-1",
      },
      appointmentInfo: {
        title: "إرشادات المقابلات",
        items: [
          "جميع طلبات المقابلات تخضع لموافقة مكتب البروتوكول الملكي",
          "الاجتماعات الدبلوماسية تتطلب إشعار مسبق 48 ساعة",
          "الاستشارات التجارية تُجدول أيام الثلاثاء والخميس",
          "الاجتماعات الثقافية والتعليمية لها أولوية في ساعات الصباح",
          "الاجتماعات الافتراضية متاحة للمشاركين الدوليين",
        ],
      },
    },
  }

  const t = content[language]

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) newErrors.name = t.validation.nameRequired
    if (!formData.email.trim()) {
      newErrors.email = t.validation.emailRequired
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.validation.emailInvalid
    }
    if (formData.phone.trim() && !/^[+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-()]/g, ""))) {
      newErrors.phone = t.validation.phoneInvalid
    }
    if (!formData.message.trim()) {
      newErrors.message = t.validation.messageRequired
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t.validation.messageMinLength
    }
    if (!formData.inquiryType) newErrors.inquiryType = t.validation.inquiryTypeRequired

    if (formData.requestAppointment) {
      if (!formData.appointmentType) newErrors.appointmentType = t.validation.appointmentTypeRequired
      if (!formData.preferredDate) {
        newErrors.preferredDate = t.validation.preferredDateRequired
      } else {
        const selectedDate = new Date(formData.preferredDate)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        if (selectedDate < today) newErrors.preferredDate = t.validation.dateInPast
      }
      if (!formData.preferredTime) newErrors.preferredTime = t.validation.preferredTimeRequired
      if (!formData.duration) newErrors.duration = t.validation.durationRequired
      if (!formData.urgency) newErrors.urgency = t.validation.urgencyRequired
    }

    // File upload validation
    if (formData.attachedFile) {
      const MAX_FILE_SIZE_MB = 5
      const ALLOWED_FILE_TYPES = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/jpeg",
        "image/png",
      ]
      if (formData.attachedFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        newErrors.attachedFile = t.validation.fileTooLarge
      }
      if (!ALLOWED_FILE_TYPES.includes(formData.attachedFile.type)) {
        newErrors.attachedFile = t.validation.fileInvalidType
      }
    }

    // CAPTCHA validation
    if (!formData.captchaAnswer.trim()) {
      newErrors.captchaAnswer = t.validation.captchaRequired
    } else if (formData.captchaAnswer.trim() !== correctCaptchaAnswer) {
      newErrors.captchaAnswer = t.validation.captchaIncorrect
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: t.error.title,
        description: "Please correct the errors in the form.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Simulate API call for form submission
      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (Math.random() > 0.1) {
        setSubmitStatus("success")
        toast({
          title: t.success.title,
          description: formData.requestAppointment ? t.success.appointmentMessage : t.success.message,
          variant: "success",
        })
        // Reset form on success
        setFormData({
          name: "",
          email: "",
          phone: "",
          organization: "",
          subject: "",
          message: "",
          inquiryType: "",
          requestAppointment: false,
          appointmentType: "",
          preferredDate: "",
          preferredTime: "",
          duration: "",
          attendees: "1",
          location: "",
          urgency: "normal",
          attachedFile: null,
          captchaAnswer: "",
        })
      } else {
        setSubmitStatus("error")
        toast({
          title: t.error.title,
          description: t.error.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
      toast({
        title: t.error.title,
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string | boolean | File | null) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleInputChange("attachedFile", e.target.files[0])
    } else {
      handleInputChange("attachedFile", null)
    }
  }

  if (submitStatus === "success") {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="border-green-200 shadow-2xl glass-effect">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-slate-800 mb-4">{t.success.title}</h3>
            <p className="text-slate-600 mb-6">
              {formData.requestAppointment ? t.success.appointmentMessage : t.success.message}
            </p>
            <Button onClick={() => setSubmitStatus("idle")} className="bg-amber-600 hover:bg-amber-700 text-white">
              Send Another Message
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <Card className="border-amber-200 shadow-2xl glass-effect">
      <CardHeader>
        <CardTitle className="text-2xl text-slate-800 flex items-center gap-3">
          <Send className="h-6 w-6 text-amber-600" />
          {t.title}
        </CardTitle>
        <p className="text-slate-600">{t.subtitle}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-700">
              {t.form.name} *
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={errors.name ? "border-red-500" : ""}
              placeholder={t.form.name}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700">
              {t.form.email} *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={errors.email ? "border-red-500" : ""}
              placeholder={t.form.email}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-slate-700">
              {t.form.phone}
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className={errors.phone ? "border-red-500" : ""}
              placeholder={t.form.phone}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          {/* Organization Field */}
          <div className="space-y-2">
            <Label htmlFor="organization" className="text-slate-700">
              {t.form.organization}
            </Label>
            <Input
              id="organization"
              type="text"
              value={formData.organization}
              onChange={(e) => handleInputChange("organization", e.target.value)}
              placeholder={t.form.organization}
            />
          </div>

          {/* Inquiry Type */}
          <div className="space-y-2">
            <Label className="text-slate-700">{t.form.inquiryType} *</Label>
            <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange("inquiryType", value)}>
              <SelectTrigger className={errors.inquiryType ? "border-red-500" : ""}>
                <SelectValue placeholder={t.form.inquiryType} />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(t.inquiryTypes).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.inquiryType && <p className="text-red-500 text-sm">{errors.inquiryType}</p>}
          </div>

          {/* Attached File */}
          <div className="space-y-2">
            <Label htmlFor="attachedFile" className="text-slate-700 flex items-center gap-2">
              <Upload className="h-4 w-4 text-slate-600" />
              {t.form.attachedFile}
            </Label>
            <Input
              id="attachedFile"
              type="file"
              onChange={handleFileChange}
              className={errors.attachedFile ? "border-red-500" : ""}
              accept=".pdf,.doc,.docx,.jpg,.png"
            />
            {formData.attachedFile && <p className="text-sm text-slate-500">Selected: {formData.attachedFile.name}</p>}
            {errors.attachedFile && <p className="text-red-500 text-sm">{errors.attachedFile}</p>}
            <p className="text-xs text-slate-500">Max 5MB. PDF, DOC, DOCX, JPG, PNG only.</p>
          </div>

          {/* Appointment Request Toggle */}
          <div className="space-y-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="requestAppointment"
                checked={formData.requestAppointment}
                onChange={(e) => handleInputChange("requestAppointment", e.target.checked)}
                className="rounded border-amber-300 text-amber-600 focus:ring-amber-500"
              />
              <Label htmlFor="requestAppointment" className="text-slate-700 font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4 text-amber-600" />
                {t.form.requestAppointment}
              </Label>
            </div>

            {formData.requestAppointment && (
              <div className="space-y-4 mt-4 p-4 bg-white rounded-lg border border-amber-100">
                {/* Appointment Type */}
                <div className="space-y-2">
                  <Label className="text-slate-700">{t.form.appointmentType} *</Label>
                  <Select
                    value={formData.appointmentType}
                    onValueChange={(value) => handleInputChange("appointmentType", value)}
                  >
                    <SelectTrigger className={errors.appointmentType ? "border-red-500" : ""}>
                      <SelectValue placeholder={t.form.appointmentType} />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(t.appointmentTypes).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.appointmentType && <p className="text-red-500 text-sm">{errors.appointmentType}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Preferred Date */}
                  <div className="space-y-2">
                    <Label htmlFor="preferredDate" className="text-slate-700">
                      {t.form.preferredDate} *
                    </Label>
                    <Input
                      id="preferredDate"
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                      className={errors.preferredDate ? "border-red-500" : ""}
                      min={new Date().toISOString().split("T")[0]}
                    />
                    {errors.preferredDate && <p className="text-red-500 text-sm">{errors.preferredDate}</p>}
                  </div>

                  {/* Preferred Time */}
                  <div className="space-y-2">
                    <Label htmlFor="preferredTime" className="text-slate-700">
                      {t.form.preferredTime} *
                    </Label>
                    <Input
                      id="preferredTime"
                      type="time"
                      value={formData.preferredTime}
                      onChange={(e) => handleInputChange("preferredTime", e.target.value)}
                      className={errors.preferredTime ? "border-red-500" : ""}
                    />
                    {errors.preferredTime && <p className="text-red-500 text-sm">{errors.preferredTime}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Duration */}
                  <div className="space-y-2">
                    <Label className="text-slate-700">{t.form.duration} *</Label>
                    <Select value={formData.duration} onValueChange={(value) => handleInputChange("duration", value)}>
                      <SelectTrigger className={errors.duration ? "border-red-500" : ""}>
                        <SelectValue placeholder={t.form.duration} />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(t.durations).map(([key, value]) => (
                          <SelectItem key={key} value={key}>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              {value}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.duration && <p className="text-red-500 text-sm">{errors.duration}</p>}
                  </div>

                  {/* Number of Attendees */}
                  <div className="space-y-2">
                    <Label htmlFor="attendees" className="text-slate-700">
                      {t.form.attendees}
                    </Label>
                    <Input
                      id="attendees"
                      type="number"
                      min="1"
                      max="20"
                      value={formData.attendees}
                      onChange={(e) => handleInputChange("attendees", e.target.value)}
                      placeholder="1"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Location */}
                  <div className="space-y-2">
                    <Label className="text-slate-700">{t.form.location}</Label>
                    <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t.form.location} />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(t.locations).map(([key, value]) => (
                          <SelectItem key={key} value={key}>
                            <div className="flex items-center gap-2">
                              {key === "virtual" ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                              {value}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Urgency */}
                  <div className="space-y-2">
                    <Label className="text-slate-700">{t.form.urgency} *</Label>
                    <Select value={formData.urgency} onValueChange={(value) => handleInputChange("urgency", value)}>
                      <SelectTrigger className={errors.urgency ? "border-red-500" : ""}>
                        <SelectValue placeholder={t.form.urgency} />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(t.urgencyLevels).map(([key, value]) => (
                          <SelectItem key={key} value={key}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.urgency && <p className="text-red-500 text-sm">{errors.urgency}</p>}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Subject Field */}
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-slate-700">
              {t.form.subject}
            </Label>
            <Input
              id="subject"
              type="text"
              value={formData.subject}
              onChange={(e) => handleInputChange("subject", e.target.value)}
              placeholder={t.form.subject}
            />
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-slate-700">
              {t.form.message} *
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              className={errors.message ? "border-red-500" : ""}
              placeholder={t.form.message}
              rows={5}
            />
            {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
          </div>

          {/* CAPTCHA Field */}
          <div className="space-y-2">
            <Label htmlFor="captcha" className="text-slate-700">
              {t.form.captcha} *
            </Label>
            <Input
              id="captcha"
              type="text"
              value={formData.captchaAnswer}
              onChange={(e) => handleInputChange("captchaAnswer", e.target.value)}
              className={errors.captchaAnswer ? "border-red-500" : ""}
              placeholder={t.form.captchaPlaceholder}
            />
            {errors.captchaAnswer && <p className="text-red-500 text-sm">{errors.captchaAnswer}</p>}
            <p className="text-xs text-slate-500">
              This is a simple client-side check. For production, consider a robust server-side CAPTCHA (e.g.,
              reCAPTCHA).
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                {t.form.submitting}
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                {t.form.submit}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
