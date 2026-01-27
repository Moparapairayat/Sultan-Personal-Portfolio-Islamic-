"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Settings, Palette, Zap } from "lucide-react"

interface PatternSettings {
  animate: boolean
  intensity: number
  variant: number
  show3D: boolean
  showCalligraphy: boolean
  mobileOptimized: boolean
}

interface PatternCustomizerProps {
  settings: PatternSettings
  onSettingsChange: (settings: PatternSettings) => void
}

export function PatternCustomizer({ settings, onSettingsChange }: PatternCustomizerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const updateSetting = (key: keyof PatternSettings, value: any) => {
    onSettingsChange({ ...settings, [key]: value })
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full w-12 h-12 bg-amber-600 hover:bg-amber-700 shadow-lg"
        size="icon"
      >
        <Settings className="h-5 w-5" />
      </Button>

      {isOpen && (
        <Card className="absolute bottom-16 right-0 w-80 shadow-2xl border-amber-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Palette className="h-5 w-5 text-amber-600" />
              Islamic Pattern Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Animation Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-600" />
                <span className="text-sm font-medium">Animations</span>
              </div>
              <Switch checked={settings.animate} onCheckedChange={(checked) => updateSetting("animate", checked)} />
            </div>

            {/* Pattern Intensity */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Pattern Intensity</span>
                <Badge variant="outline">{Math.round(settings.intensity * 100)}%</Badge>
              </div>
              <Slider
                value={[settings.intensity]}
                onValueChange={([value]) => updateSetting("intensity", value)}
                max={1}
                min={0.1}
                step={0.1}
                className="w-full"
              />
            </div>

            {/* Pattern Variant */}
            <div className="space-y-2">
              <span className="text-sm font-medium">Pattern Style</span>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((variant) => (
                  <Button
                    key={variant}
                    variant={settings.variant === variant ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateSetting("variant", variant)}
                    className="text-xs"
                  >
                    Style {variant}
                  </Button>
                ))}
              </div>
            </div>

            {/* 3D Effects Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">3D Effects</span>
              <Switch checked={settings.show3D} onCheckedChange={(checked) => updateSetting("show3D", checked)} />
            </div>

            {/* Calligraphy Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Arabic Calligraphy</span>
              <Switch
                checked={settings.showCalligraphy}
                onCheckedChange={(checked) => updateSetting("showCalligraphy", checked)}
              />
            </div>

            {/* Mobile Optimization */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Mobile Optimized</span>
              <Switch
                checked={settings.mobileOptimized}
                onCheckedChange={(checked) => updateSetting("mobileOptimized", checked)}
              />
            </div>

            {/* Quick Presets */}
            <div className="space-y-2 pt-2 border-t">
              <span className="text-sm font-medium">Quick Presets</span>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    onSettingsChange({
                      animate: true,
                      intensity: 0.8,
                      variant: 1,
                      show3D: true,
                      showCalligraphy: true,
                      mobileOptimized: false,
                    })
                  }
                  className="text-xs"
                >
                  Royal
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    onSettingsChange({
                      animate: false,
                      intensity: 0.3,
                      variant: 2,
                      show3D: false,
                      showCalligraphy: false,
                      mobileOptimized: true,
                    })
                  }
                  className="text-xs"
                >
                  Minimal
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
