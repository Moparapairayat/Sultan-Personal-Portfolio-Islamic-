"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Send, CheckCircle, AlertCircle } from "lucide-react"
import { createPiprapayCharge } from "@/app/actions/piprapay"
import { useToast } from "@/hooks/use-toast"

interface PaymentFormData {
  name: string
  email: string
  paymentAmount: string
  paymentMethod: string
  subject: string // To be used for product description in Piprapay
}

interface PaymentFormErrors {
  name?: string
  email?: string
  paymentAmount?: string
  paymentMethod?: string
}

interface PaymentFormProps {
  language: "en" | "ar"
}

export function PaymentForm({ language }: PaymentFormProps) {
  const { toast } = useToast()

  const [formData, setFormData] = useState<PaymentFormData>({
    name: "",
    email: "",
    paymentAmount: "",
    paymentMethod: "",
    subject: "Donation/Service Payment", // Default subject for payment
  })

  const [errors, setErrors] = useState<PaymentFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const content = {
    en: {
      title: "Make a Donation or Payment",
      subtitle: "Support the Royal Initiatives or make a service payment",
      form: {
        name: "Full Name",
        email: "Email Address",
        paymentAmount: "Amount (BDT)",
        paymentMethod: "Payment Method",
        proceedToPayment: "Proceed to Payment",
        paymentDisclaimer: "Note: Actual payment processing requires a secure backend integration.",
        predefinedAmounts: "Quick Amounts",
      },
      paymentMethods: {
        bKash: "bKash",
        piprapay: "Piprapay",
      },
      validation: {
        nameRequired: "Full name is required",
        emailRequired: "Email address is required",
        emailInvalid: "Please enter a valid email address",
        paymentAmountRequired: "Payment amount is required",
        paymentAmountInvalid: "Please enter a valid amount (e.g., 100.00)",
        paymentMethodRequired: "Please select a payment method",
      },
      success: {
        title: "Payment Initiated",
        message: "Redirecting to payment gateway...",
        bKashMessage: "Your bKash payment request has been received. Please complete the payment via bKash app.",
      },
      error: {
        title: "Payment Failed",
        message: "There was an error initiating your payment. Please try again or contact support.",
      },
    },
    ar: {
      title: "تقديم تبرع أو دفع",
      subtitle: "ادعم المبادرات الملكية أو قم بدفع مقابل خدمة",
      form: {
        name: "الاسم الكامل",
        email: "عنوان البريد الإلكتروني",
        paymentAmount: "المبلغ (BDT)",
        paymentMethod: "طريقة الدفع",
        proceedToPayment: "المتابعة للدفع",
        paymentDisclaimer: "ملاحظة: معالجة الدفع الفعلية تتطلب تكاملًا آمنًا من جانب الخادم.",
        predefinedAmounts: "مبالغ سريعة",
      },
      paymentMethods: {
        bKash: "بِكاش",
        piprapay: "بيبرا باي",
      },
      validation: {
        nameRequired: "الاسم الكامل مطلوب",
        emailRequired: "عنوان البريد الإلكتروني مطلوب",
        emailInvalid: "يرجى إدخال عنوان بريد إلكتروني صحيح",
        paymentAmountRequired: "مبلغ الدفع مطلوب",
        paymentAmountInvalid: "يرجى إدخال مبلغ صالح (مثال: 100.00)",
        paymentMethodRequired: "يرجى اختيار طريقة الدفع",
      },
      success: {
        title: "تم بدء عملية الدفع",
        message: "جاري التحويل إلى بوابة الدفع...",
        bKashMessage: "تم استلام طلب دفع بيكاش الخاص بك. يرجى إكمال الدفع عبر تطبيق بيكاش.",
      },
      error: {
        title: "فشل الدفع",
        message: "حدث خطأ أثناء بدء عملية الدفع. يرجى المحاولة مرة أخرى أو الاتصال بالدعم.",
      },
    },
  }

  const t = content[language]

  const validateForm = (): boolean => {
    const newErrors: PaymentFormErrors = {}

    if (!formData.name.trim()) newErrors.name = t.validation.nameRequired
    if (!formData.email.trim()) {
      newErrors.email = t.validation.emailRequired
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.validation.emailInvalid
    }
    if (!formData.paymentAmount.trim()) {
      newErrors.paymentAmount = t.validation.paymentAmountRequired
    } else if (!/^\d+(\.\d{1,2})?$/.test(formData.paymentAmount)) {
      newErrors.paymentAmount = t.validation.paymentAmountInvalid
    }
    if (!formData.paymentMethod) newErrors.paymentMethod = t.validation.paymentMethodRequired

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
      if (formData.paymentMethod === "piprapay") {
        const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
        const amount = Number.parseFloat(formData.paymentAmount)

        const result = await createPiprapayCharge(
          amount,
          "BDT",
          formData.name,
          formData.email,
          orderId,
          formData.subject,
        )

        if (result.success && result.redirect_url) {
          toast({
            title: t.success.title,
            description: t.success.message,
            variant: "success",
          })
          window.location.href = result.redirect_url
        } else {
          toast({
            title: t.error.title,
            description: result.error || "Failed to initiate payment with Piprapay.",
            variant: "destructive",
          })
          setSubmitStatus("error")
        }
      } else if (formData.paymentMethod === "bKash") {
        // Simulate bKash payment initiation
        await new Promise((resolve) => setTimeout(resolve, 2000))
        toast({
          title: t.success.title,
          description: t.success.bKashMessage,
          variant: "success",
        })
        setSubmitStatus("success")
        // In a real app, you'd likely redirect to a bKash payment page or show a modal
      }
    } catch (error) {
      console.error("Payment submission error:", error)
      toast({
        title: t.error.title,
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof PaymentFormData, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }))
  }

  const handlePredefinedAmount = (amount: number) => {
    setFormData((prev) => ({
      ...prev,
      paymentAmount: amount.toFixed(2),
    }))
  }

  if (submitStatus === "success") {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="border-green-200 shadow-2xl glass-effect">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-slate-800 mb-4">{t.success.title}</h3>
            <p className="text-slate-600 mb-6">
              {formData.paymentMethod === "bKash" ? t.success.bKashMessage : t.success.message}
            </p>
            <Button onClick={() => setSubmitStatus("idle")} className="bg-amber-600 hover:bg-amber-700 text-white">
              Make Another Payment
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
          <CreditCard className="h-6 w-6 text-emerald-600" />
          {t.title}
        </CardTitle>
        <p className="text-slate-600">{t.subtitle}</p>
      </CardHeader>
      <CardContent>
        {submitStatus === "error" && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-red-800">{t.error.title}</h4>
              <p className="text-red-600 text-sm">{t.error.message}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="paymentName" className="text-slate-700">
              {t.form.name} *
            </Label>
            <Input
              id="paymentName"
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
            <Label htmlFor="paymentEmail" className="text-slate-700">
              {t.form.email} *
            </Label>
            <Input
              id="paymentEmail"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={errors.email ? "border-red-500" : ""}
              placeholder={t.form.email}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Predefined Amounts */}
          <div className="space-y-2">
            <Label className="text-slate-700">{t.form.predefinedAmounts}</Label>
            <div className="flex flex-wrap gap-2">
              {[100, 500, 1000, 2000, 5000].map((amount) => (
                <Button
                  key={amount}
                  type="button"
                  variant={formData.paymentAmount === amount.toFixed(2) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePredefinedAmount(amount)}
                  className="text-xs"
                >
                  {amount} BDT
                </Button>
              ))}
            </div>
          </div>

          {/* Payment Amount */}
          <div className="space-y-2">
            <Label htmlFor="paymentAmount" className="text-slate-700">
              {t.form.paymentAmount} *
            </Label>
            <Input
              id="paymentAmount"
              type="text" // Use text to allow for decimal input, validate with regex
              value={formData.paymentAmount}
              onChange={(e) => handleInputChange("paymentAmount", e.target.value)}
              className={errors.paymentAmount ? "border-red-500" : ""}
              placeholder="e.g., 100.00"
            />
            {errors.paymentAmount && <p className="text-red-500 text-sm">{errors.paymentAmount}</p>}
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <Label className="text-slate-700">{t.form.paymentMethod} *</Label>
            <Select value={formData.paymentMethod} onValueChange={(value) => handleInputChange("paymentMethod", value)}>
              <SelectTrigger className={errors.paymentMethod ? "border-red-500" : ""}>
                <SelectValue placeholder={t.form.paymentMethod} />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(t.paymentMethods).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.paymentMethod && <p className="text-red-500 text-sm">{errors.paymentMethod}</p>}
          </div>
          <p className="text-sm text-slate-500 italic mt-2">{t.form.paymentDisclaimer}</p>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                {t.form.proceedToPayment}
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                {t.form.proceedToPayment}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
