"use client"

import { useState } from "react"
import { ProtocolDashboard } from "@/components/protocol-dashboard"
import { Button } from "@/components/ui/button"

export default function ProtocolPage() {
  const [language, setLanguage] = useState<"en" | "ar">("en")

  return (
    <div className="min-h-screen">
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

      <ProtocolDashboard language={language} />
    </div>
  )
}
