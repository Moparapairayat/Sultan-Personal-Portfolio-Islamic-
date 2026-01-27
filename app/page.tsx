"use client"

import { useState, useEffect, useRef } from "react" // Import useRef
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider" // Import Slider
import { ContactForm } from "@/components/contact-form"
import { PaymentForm } from "@/components/payment-form" // Import the new PaymentForm
import {
  Crown,
  BookOpen,
  Users,
  Award,
  Mail,
  Scroll,
  Building,
  GraduationCap,
  Star,
  Globe,
  Heart,
  Shield,
  Play,
  Pause,
  Volume2,
  VolumeX,
  CreditCard,
  MapPin,
  Phone,
} from "lucide-react"
import {
  IslamicBorderPattern,
  IslamicCornerPattern,
  IslamicCardPattern,
  Islamic3DStarPattern,
  Islamic3DGeometricPattern,
  ArabicCalligraphy,
  CalligraphyBorder,
} from "@/components/islamic-patterns"
import { PatternCustomizer } from "@/components/pattern-customizer"

interface PatternSettings {
  animate: boolean
  intensity: number
  variant: number
  show3D: boolean
  showCalligraphy: boolean
  mobileOptimized: boolean
}

const content = {
  en: {
    nav: {
      about: "About",
      achievements: "Achievements",
      education: "Education",
      leadership: "Leadership",
      projects: "Projects",
      publications: "Publications",
      gallery: "Gallery",
      testimonials: "Testimonials",
      contact: "Contact",
      skills: "Skills",
      blog: "Blog",
      awards: "Awards",
      donate: "Donate", // Added for new section
    },
    hero: {
      title: "Sultan Ayat Khan",
      subtitle: "Ruler of the Al Waasi Empire",
      description:
        "Leading with wisdom, honor, and dedication to the prosperity of our people and the preservation of our rich Islamic heritage.",
      arabicTitle: "السلطان آيات خان",
      arabicSubtitle: "حاكم الإمبراطورية الواسعية",
    },
    about: {
      title: "Biography",
      content:
        "Sultan Ayat Khan ascended to the throne of the Al Waasi Empire with a vision of modernizing the realm while preserving its deep-rooted Islamic traditions. Born into the noble House of Khan, he has dedicated his life to the service of his people, combining traditional wisdom with contemporary leadership approaches. His reign has been marked by significant economic growth, cultural renaissance, and diplomatic achievements that have elevated the Al Waasi Empire's standing on the global stage.",
    },
    achievements: {
      title: "Royal Achievements",
      items: [
        {
          title: "Economic Prosperity Initiative",
          description: "Led comprehensive economic reforms resulting in 40% GDP growth over 5 years",
          year: "2019-2024",
          icon: "💰",
        },
        {
          title: "Cultural Heritage Preservation",
          description: "Established the Al Waasi Cultural Foundation preserving over 500 historical sites",
          year: "2020",
          icon: "🏛️",
        },
        {
          title: "International Peace Accord",
          description: "Mediated historic peace agreement between neighboring kingdoms",
          year: "2022",
          icon: "🕊️",
        },
        {
          title: "Education Reform Program",
          description: "Launched empire-wide education initiative increasing literacy rate to 95%",
          year: "2021",
          icon: "📚",
        },
        {
          title: "Green Energy Transition",
          description: "Pioneered renewable energy adoption achieving 80% clean energy by 2024",
          year: "2023",
          icon: "🌱",
        },
        {
          title: "Digital Innovation Hub",
          description: "Established technology centers fostering innovation and entrepreneurship",
          year: "2022",
          icon: "💻",
        },
      ],
    },
    education: {
      title: "Royal Education",
      items: [
        {
          institution: "Oxford University",
          degree: "Master of Philosophy in International Relations",
          year: "2010-2012",
          honors: "Summa Cum Laude",
        },
        {
          institution: "Al-Azhar University",
          degree: "Bachelor of Islamic Studies",
          year: "2006-2010",
          honors: "First Class Honours",
        },
        {
          institution: "Royal Military Academy",
          degree: "Certificate in Strategic Leadership",
          year: "2005-2006",
          honors: "Distinguished Graduate",
        },
        {
          institution: "Harvard Business School",
          degree: "Executive Program in Leadership",
          year: "2013",
          honors: "Excellence Award",
        },
      ],
    },
    leadership: {
      title: "Leadership Roles",
      items: [
        {
          position: "Sultan of Al Waasi Empire",
          period: "2015 - Present",
          description: "Supreme ruler overseeing governance, diplomacy, and cultural affairs",
        },
        {
          position: "Chairman, Council of Islamic Nations",
          period: "2020 - Present",
          description: "Leading regional cooperation and Islamic unity initiatives",
        },
        {
          position: "Crown Prince of Al Waasi",
          period: "2012 - 2015",
          description: "Heir apparent managing internal affairs and modernization projects",
        },
        {
          position: "Ambassador for Peace",
          period: "2018 - Present",
          description: "UN Special Envoy for Middle Eastern diplomatic relations",
        },
      ],
    },
    projects: {
      title: "Signature Projects",
      items: [
        {
          name: "The Golden Minaret Complex",
          description: "Architectural marvel combining traditional Islamic design with modern sustainability",
          status: "Completed 2023",
          impact: "Cultural landmark visited by 2M+ annually",
        },
        {
          name: "Al Waasi Digital Initiative",
          description: "Empire-wide digital transformation program connecting all provinces",
          status: "Ongoing",
          impact: "99% digital connectivity achieved",
        },
        {
          name: "Green Oasis Project",
          description: "Environmental conservation program creating sustainable urban spaces",
          status: "Phase II",
          impact: "50,000 hectares of green space created",
        },
        {
          name: "Royal Education Network",
          description: "Comprehensive educational infrastructure development program",
          status: "Completed 2024",
          impact: "500+ schools built, 1M+ students benefited",
        },
      ],
    },
    publications: {
      title: "Publications & Speeches",
      items: [
        {
          title: "Wisdom of the Desert: Leadership in the Modern Age",
          type: "Book",
          year: "2023",
          description: "Philosophical treatise on combining traditional wisdom with contemporary leadership",
          impact: "Bestseller in 15 countries",
        },
        {
          title: "Unity in Diversity: The Al Waasi Model",
          type: "Speech at UN General Assembly",
          year: "2022",
          description: "Keynote address on multicultural governance and peaceful coexistence",
          impact: "Viewed by 50M+ globally",
        },
        {
          title: "Islamic Finance and Global Economics",
          type: "Research Paper",
          year: "2021",
          description: "Academic paper on integrating Islamic financial principles in modern economics",
          impact: "Cited in 200+ academic papers",
        },
        {
          title: "The Future of Islamic Civilization",
          type: "Documentary",
          year: "2024",
          description: "Comprehensive exploration of Islamic contributions to modern society",
          impact: "Emmy Award nomination",
        },
      ],
    },
    testimonials: {
      title: "Global Recognition",
      items: [
        {
          name: "Dr. Amina Hassan",
          title: "UNESCO Director-General",
          quote: "Sultan Ayat Khan's vision for cultural preservation while embracing modernity is truly inspiring.",
          country: "International",
        },
        {
          name: "Professor James Mitchell",
          title: "Oxford University",
          quote: "His Majesty's approach to leadership combines the best of Eastern wisdom and Western innovation.",
          country: "United Kingdom",
        },
        {
          name: "Sheikh Abdullah Al-Rashid",
          title: "Grand Imam of Al-Azhar",
          quote: "A true embodiment of Islamic values in contemporary leadership.",
          country: "Egypt",
        },
      ],
    },
    contact: {
      title: "Royal Contact",
      office: "Office of His Majesty Sultan Ayat Khan",
      address: "Royal Palace, Al Waasi Capital",
      email: "royal.office@alwaasi.gov",
      phone: "+971-2-SULTAN-1",
      socialMedia: {
        twitter: "@SultanAyatKhan",
        instagram: "@AlWaasiEmpire",
        linkedin: "Sultan Ayat Khan",
      },
    },
    skills: {
      title: "Royal Skills & Expertise",
      categories: [
        {
          name: "Leadership & Governance",
          skills: [
            { name: "Strategic Planning", level: 95 },
            { name: "Diplomatic Relations", level: 92 },
            { name: "Crisis Management", level: 88 },
            { name: "Public Speaking", level: 94 },
          ],
        },
        {
          name: "Cultural & Religious",
          skills: [
            { name: "Islamic Jurisprudence", level: 90 },
            { name: "Arabic Literature", level: 87 },
            { name: "Cultural Preservation", level: 93 },
            { name: "Interfaith Dialogue", level: 89 },
          ],
        },
        {
          name: "Modern Competencies",
          skills: [
            { name: "Digital Transformation", level: 85 },
            { name: "Economic Policy", level: 91 },
            { name: "Environmental Sustainability", level: 86 },
            { name: "International Law", level: 88 },
          ],
        },
      ],
    },
    blog: {
      title: "Royal Chronicles",
      subtitle: "Insights and reflections from the throne",
      posts: [
        {
          title: "The Future of Islamic Governance in the Digital Age",
          excerpt:
            "Exploring how traditional Islamic principles can guide modern digital transformation and governance in the 21st century.",
          date: "December 15, 2024",
          readTime: "8 min read",
          category: "Governance",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          title: "Bridging Cultures: Lessons from the Silk Road",
          excerpt:
            "Drawing parallels between ancient trade routes and modern diplomatic relations, fostering understanding between East and West.",
          date: "November 28, 2024",
          readTime: "6 min read",
          category: "Diplomacy",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          title: "Sustainable Development: An Islamic Perspective",
          excerpt:
            "How Islamic principles of stewardship (Khilafah) align with modern environmental conservation and sustainable development goals.",
          date: "November 10, 2024",
          readTime: "10 min read",
          category: "Environment",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          title: "Education as the Foundation of Empire",
          excerpt:
            "Reflecting on the transformative power of education and our empire-wide initiatives to promote literacy and learning.",
          date: "October 22, 2024",
          readTime: "7 min read",
          category: "Education",
          image: "/placeholder.svg?height=200&width=300",
        },
      ],
    },
    gallery: {
      title: "Imperial Gallery",
      subtitle: "Moments that define our reign",
      categories: [
        {
          name: "State Ceremonies",
          images: [
            {
              src: "/placeholder.svg?height=300&width=400",
              alt: "Coronation Ceremony",
              caption: "The historic coronation ceremony, 2015",
            },
            {
              src: "/placeholder.svg?height=300&width=400",
              alt: "State Banquet",
              caption: "Hosting world leaders at the Royal Palace",
            },
            {
              src: "/placeholder.svg?height=300&width=400",
              alt: "Peace Accord Signing",
              caption: "Signing the historic peace accord, 2022",
            },
          ],
        },
        {
          name: "Cultural Events",
          images: [
            {
              src: "/placeholder.svg?height=300&width=400",
              alt: "Cultural Festival",
              caption: "Annual Al Waasi Cultural Festival",
            },
            {
              src: "/placeholder.svg?height=300&width=400",
              alt: "Heritage Site Visit",
              caption: "Visiting restored heritage sites",
            },
            {
              src: "/placeholder.svg?height=300&width=400",
              alt: "Art Exhibition",
              caption: "Opening of the Imperial Art Museum",
            },
          ],
        },
        {
          name: "International Relations",
          images: [
            {
              src: "/placeholder.svg?height=300&width=400",
              alt: "UN General Assembly",
              caption: "Addressing the UN General Assembly",
            },
            {
              src: "/placeholder.svg?height=300&width=400",
              alt: "Summit Meeting",
              caption: "Islamic Nations Summit, 2023",
            },
            {
              src: "/placeholder.svg?height=300&width=400",
              alt: "Trade Agreement",
              caption: "Signing international trade agreements",
            },
          ],
        },
      ],
    },
    awards: {
      title: "Royal Honors & Recognition",
      items: [
        {
          title: "Global Peace Ambassador Award",
          organization: "United Nations",
          year: "2024",
          description: "For outstanding contributions to international peace and diplomatic relations",
          icon: "🕊️",
        },
        {
          title: "Islamic Leadership Excellence Award",
          organization: "Organization of Islamic Cooperation",
          year: "2023",
          description: "Recognizing exemplary leadership in promoting Islamic values and unity",
          icon: "🏆",
        },
        {
          title: "Environmental Stewardship Medal",
          organization: "Global Environmental Council",
          year: "2023",
          description: "For pioneering sustainable development initiatives in the Middle East",
          icon: "🌱",
        },
        {
          title: "Cultural Heritage Preservation Award",
          organization: "UNESCO",
          year: "2022",
          description: "For exceptional efforts in preserving and promoting cultural heritage",
          icon: "🏛️",
        },
        {
          title: "Education Innovation Prize",
          organization: "World Education Forum",
          year: "2021",
          description: "For revolutionary education reforms and literacy advancement programs",
          icon: "📚",
        },
        {
          title: "Humanitarian Leadership Medal",
          organization: "International Red Crescent",
          year: "2020",
          description: "For outstanding humanitarian efforts during global crises",
          icon: "❤️",
        },
      ],
    },
  },
  ar: {
    nav: {
      about: "نبذة",
      achievements: "الإنجازات",
      education: "التعليم",
      leadership: "القيادة",
      projects: "المشاريع",
      publications: "المنشورات",
      gallery: "المعرض",
      testimonials: "الشهادات",
      contact: "التواصل",
      skills: "المهارات",
      blog: "المدونة",
      awards: "الجوائز",
      donate: "تبرع", // Added for new section
    },
    hero: {
      title: "السلطان آيات خان",
      subtitle: "حاكم الإمبراطورية الواسعية",
      description: "نقود بالحكمة والشرف والتفاني من أجل ازدهار شعبنا والحفاظ على تراثنا الإسلامي العريق.",
      arabicTitle: "السلطان آيات خان",
      arabicSubtitle: "حاكم الإمبراطورية الواسعية",
    },
    about: {
      title: "السيرة الذاتية",
      content:
        "تولى السلطان آيات خان عرش الإمبراطورية الواسعية برؤية لتحديث المملكة مع الحفاظ على تقاليدها الإسلامية العريقة. وُلد في البيت النبيل لآل خان، وقد كرس حياته لخدمة شعبه، جامعاً بين الحكمة التقليدية ومناهج القيادة المعاصرة. تميز عهده بنمو اقتصادي كبير ونهضة ثقافية وإنجازات دبلوماسية رفعت من مكانة الإمبراطورية الواسعية على المسرح العالمي.",
    },
    achievements: {
      title: "الإنجازات الملكية",
      items: [
        {
          title: "مبادرة الازدهار الاقتصادي",
          description: "قاد إصلاحات اقتصادية شاملة أدت إلى نمو الناتج المحلي بنسبة 40% خلال 5 سنوات",
          year: "2019-2024",
          icon: "💰",
        },
        {
          title: "الحفاظ على التراث الثقافي",
          description: "أسس مؤسسة التراث الواسعي للحفاظ على أكثر من 500 موقع تاريخي",
          year: "2020",
          icon: "🏛️",
        },
        {
          title: "اتفاقية السلام الدولية",
          description: "توسط في اتفاقية سلام تاريخية بين الممالك المجاورة",
          year: "2022",
          icon: "🕊️",
        },
        {
          title: "برنامج إصلاح التعليم",
          description: "أطلق مبادرة تعليمية على مستوى الإمبراطورية رفعت معدل محو الأمية إلى 95%",
          year: "2021",
          icon: "📚",
        },
        {
          title: "التحول للطاقة الخضراء",
          description: "ريادة في اعتماد الطاقة المتجددة وتحقيق 80% طاقة نظيفة بحلول 2024",
          year: "2023",
          icon: "🌱",
        },
        {
          title: "مركز الابتكار الرقمي",
          description: "إنشاء مراكز تقنية لتعزيز الابتكار وريادة الأعمال",
          year: "2022",
          icon: "💻",
        },
      ],
    },
    education: {
      title: "التعليم الملكي",
      items: [
        {
          institution: "جامعة أكسفورد",
          degree: "ماجستير في الفلسفة - العلاقات الدولية",
          year: "2010-2012",
          honors: "بامتياز مع مرتبة الشرف",
        },
        {
          institution: "جامعة الأزهر",
          degree: "بكالوريوس الدراسات الإسلامية",
          year: "2006-2010",
          honors: "مرتبة الشرف الأولى",
        },
        {
          institution: "الأكاديمية العسكرية الملكية",
          degree: "شهادة في القيادة الاستراتيجية",
          year: "2005-2006",
          honors: "خريج متميز",
        },
        {
          institution: "كلية هارفارد للأعمال",
          degree: "برنامج تنفيذي في القيادة",
          year: "2013",
          honors: "جائزة التميز",
        },
      ],
    },
    leadership: {
      title: "المناصب القيادية",
      items: [
        {
          position: "سلطان الإمبراطورية الواسعية",
          period: "2015 - الحاضر",
          description: "الحاكم الأعلى المشرف على الحكم والدبلوماسية والشؤون الثقافية",
        },
        {
          position: "رئيس مجلس الأمم الإسلامية",
          period: "2020 - الحاضر",
          description: "قيادة مبادرات التعاون الإقليمي والوحدة الإسلامية",
        },
        {
          position: "ولي العهد الواسعي",
          period: "2012 - 2015",
          description: "وريث العرش المسؤول عن الشؤون الداخلية ومشاريع التحديث",
        },
        {
          position: "سفير السلام",
          period: "2018 - الحاضر",
          description: "مبعوث خاص للأمم المتحدة للعلاقات الدبلوماسية الشرق أوسطية",
        },
      ],
    },
    projects: {
      title: "المشاريع المميزة",
      items: [
        {
          name: "مجمع المئذنة الذهبية",
          description: "تحفة معمارية تجمع بين التصميم الإسلامي التقليدي والاستدامة الحديثة",
          status: "مكتمل 2023",
          impact: "معلم ثقافي يزوره أكثر من 2 مليون سنوياً",
        },
        {
          name: "المبادرة الرقمية الواسعية",
          description: "برنامج التحول الرقمي على مستوى الإمبراطورية يربط جميع المقاطعات",
          status: "جاري",
          impact: "تحقيق 99% اتصال رقمي",
        },
        {
          name: "مشروع الواحة الخضراء",
          description: "برنامج الحفاظ على البيئة لإنشاء مساحات حضرية مستدامة",
          status: "المرحلة الثانية",
          impact: "إنشاء 50,000 هكتار من المساحات الخضراء",
        },
        {
          name: "الشبكة التعليمية الملكية",
          description: "برنامج شامل لتطوير البنية التحتية التعليمية",
          status: "مكتمل 2024",
          impact: "بناء 500+ مدرسة، استفادة مليون+ طالب",
        },
      ],
    },
    publications: {
      title: "المنشورات والخطابات",
      items: [
        {
          title: "حكمة الصحراء: القيادة في العصر الحديث",
          type: "كتاب",
          year: "2023",
          description: "رسالة فلسفية حول الجمع بين الحكمة التقليدية والقيادة المعاصرة",
          impact: "الأكثر مبيعاً في 15 دولة",
        },
        {
          title: "الوحدة في التنوع: النموذج الواسعي",
          type: "خطاب في الجمعية العامة للأمم المتحدة",
          year: "2022",
          description: "خطاب رئيسي حول الحكم متعدد الثقافات والتعايش السلمي",
          impact: "شاهده أكثر من 50 مليون عالمياً",
        },
        {
          title: "التمويل الإسلامي والاقتصاد العالمي",
          type: "ورقة بحثية",
          year: "2021",
          description: "ورقة أكاديمية حول دمج مبادئ التمويل الإسلامي في الاقتصاد الحديث",
          impact: "مُستشهد بها في 200+ ورقة أكاديمية",
        },
        {
          title: "مستقبل الحضارة الإسلامية",
          type: "فيلم وثائقي",
          year: "2024",
          description: "استكشاف شامل لمساهمات الإسلام في المجتمع الحديث",
          impact: "ترشيح لجائزة إيمي",
        },
      ],
    },
    testimonials: {
      title: "الاعتراف العالمي",
      items: [
        {
          name: "د. أمينة حسن",
          title: "مديرة عامة اليونسكو",
          quote: "رؤية السلطان آيات خان للحفاظ على الثقافة مع احتضان الحداثة ملهمة حقاً.",
          country: "دولي",
        },
        {
          name: "البروفيسور جيمس ميتشل",
          title: "جامعة أكسفورد",
          quote: "نهج جلالته في القيادة يجمع بين أفضل ما في الحكمة الشرقية والابتكار الغربي.",
          country: "المملكة المتحدة",
        },
        {
          name: "الشيخ عبدالله الراشد",
          title: "الإمام الأكبر للأزهر",
          quote: "تجسيد حقيقي للقيم الإسلامية في القيادة المعاصرة.",
          country: "مصر",
        },
      ],
    },
    contact: {
      title: "Royal Contact",
      office: "مكتب صاحب الجلالة السلطان آيات خان",
      address: "القصر الملكي، عاصمة الواسعية",
      email: "royal.office@alwaasi.gov",
      phone: "+971-2-SULTAN-1",
      socialMedia: {
        twitter: "@SultanAyatKhan",
        instagram: "@AlWaasiEmpire",
        linkedin: "Sultan Ayat Khan",
      },
    },
    skills: {
      title: "المهارات والخبرات الملكية",
      categories: [
        {
          name: "القيادة والحكم",
          skills: [
            { name: "التخطيط الاستراتيجي", level: 95 },
            { name: "العلاقات الدبلوماسية", level: 92 },
            { name: "إدارة الأزمات", level: 88 },
            { name: "الخطابة العامة", level: 94 },
          ],
        },
        {
          name: "الثقافة والدين",
          skills: [
            { name: "الفقه الإسلامي", level: 90 },
            { name: "الأدب العربي", level: 87 },
            { name: "الحفاظ على التراث", level: 93 },
            { name: "الحوار بين الأديان", level: 89 },
          ],
        },
        {
          name: "الكفاءات الحديثة",
          skills: [
            { name: "التحول الرقمي", level: 85 },
            { name: "السياسة الاقتصادية", level: 91 },
            { name: "الاستدامة البيئية", level: 86 },
            { name: "القانون الدولي", level: 88 },
          ],
        },
      ],
    },
    blog: {
      title: "السجلات الملكية",
      subtitle: "رؤى وتأملات من العرش",
      posts: [
        {
          title: "مستقبل الحكم الإسلامي في العصر الرقمي",
          excerpt:
            "استكشاف كيف يمكن للمبادئ الإسلامية التقليدية أن توجه التحول الرقمي الحديث والحكم في القرن الحادي والعشرين.",
          date: "15 ديسمبر 2024",
          readTime: "8 دقائق قراءة",
          category: "الحكم",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          title: "ربط الثقافات: دروس من طريق الحرير",
          excerpt:
            "رسم أوجه التشابه بين طرق التجارة القديمة والعلاقات الدبلوماسية الحديثة، وتعزيز التفاهم بين الشرق والغرب.",
          date: "28 نوفمبر 2024",
          readTime: "6 دقائق قراءة",
          category: "الدبلوماسية",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          title: "التنمية المستدامة: منظور إسلامي",
          excerpt:
            "كيف تتماشى المبادئ الإسلامية للوصاية (الخلافة) مع الحفاظ على البيئة الحديثة وأهداف التنمية المستدامة.",
          date: "10 نوفمبر 2024",
          readTime: "10 دقائق قراءة",
          category: "البيئة",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          title: "التعليم كأساس للإمبراطورية",
          excerpt: "التفكير في القوة التحويلية للتعليم ومبادراتنا على مستوى الإمبراطورية لتعزيز محو الأمية والتعلم.",
          date: "22 أكتوبر 2024",
          readTime: "7 دقائق قراءة",
          category: "التعليم",
          image: "/placeholder.svg?height=200&width=300",
        },
      ],
    },
    gallery: {
      title: "المعرض الإمبراطوري",
      subtitle: "لحظات تحدد عهدنا",
      categories: [
        {
          name: "الاحتفالات الرسمية",
          images: [
            {
              src: "/placeholder.svg?height=300&width=400",
              alt: "حفل التتويج",
              caption: "حفل التتويج التاريخي، 2015",
            },
            {
              src: "/placeholder.svg?height=300&width=400",
              alt: "مأدبة رسمية",
              caption: "استضافة قادة العالم في القصر الملكي",
            },
            {
              src: "/placeholder.svg?height=300&width=400",
              alt: "توقيع اتفاقية السلام",
              caption: "توقيع اتفاقية السلام التاريخية، 2022",
            },
          ],
        },
        {
          name: "الفعاليات الثقافية",
          images: [
            {
              src: "/placeholder.svg?height=300&width=400",
              alt: "مهرجان ثقافي",
              caption: "مهرجان الواسعية الثقافي السنوي",
            },
            {
              src: "/placeholder.svg?height=300&width=400",
              alt: "زيارة موقع تراثي",
              caption: "زيارة المواقع التراثية المرممة",
            },
            {
              src: "/placeholder.svg?height=300&width=400",
              alt: "معرض فني",
              caption: "افتتاح متحف الفن الإمبراطوري",
            },
          ],
        },
        {
          name: "العلاقات الدولية",
          images: [
            {
              src: "/placeholder.svg?height=300&width=400",
              alt: "الجمعية العامة للأمم المتحدة",
              caption: "مخاطبة الجمعية العامة للأمم المتحدة",
            },
            {
              src: "/placeholder.svg?height=300&width=400",
              alt: "اجتماع قمة",
              caption: "قمة الأمم الإسلامية، 2023",
            },
            {
              src: "/placeholder.svg?height=300&width=400",
              alt: "اتفاقية تجارية",
              caption: "توقيع اتفاقيات التجارة الدولية",
            },
          ],
        },
      ],
    },
    awards: {
      title: "الأوسمة والتقدير الملكي",
      items: [
        {
          title: "جائزة سفير السلام العالمي",
          organization: "الأمم المتحدة",
          year: "2024",
          description: "للمساهمات المتميزة في السلام الدولي والعلاقات الدبلوماسية",
          icon: "🕊️",
        },
        {
          title: "جائزة التميز في القيادة الإسلامية",
          organization: "منظمة التعاون الإسلامي",
          year: "2023",
          description: "تقديراً للقيادة المثالية في تعزيز القيم والوحدة الإسلامية",
          icon: "🏆",
        },
        {
          title: "وسام الإشراف البيئي",
          organization: "المجلس البيئي العالمي",
          year: "2023",
          description: "لريادة مبادرات التنمية المستدامة في الشرق الأوسط",
          icon: "🌱",
        },
        {
          title: "جائزة الحفاظ على التراث الثقافي",
          organization: "اليونسكو",
          year: "2022",
          description: "للجهود الاستثنائية في الحفاظ على التراث الثقافي وتعزيزه",
          icon: "🏛️",
        },
        {
          title: "جائزة الابتكار التعليمي",
          organization: "المنتدى التعليمي العالمي",
          year: "2021",
          description: "للإصلاحات التعليمية الثورية وبرامج النهوض بمحو الأمية",
          icon: "📚",
        },
        {
          title: "وسام القيادة الإنسانية",
          organization: "الهلال الأحمر الدولي",
          year: "2020",
          description: "للجهود الإنسانية المتميزة خلال الأزمات العالمية",
          icon: "❤️",
        },
      ],
    },
  },
}

export default function SultanPortfolio() {
  const [language, setLanguage] = useState<"en" | "ar">("en")
  const [patternSettings, setPatternSettings] = useState<PatternSettings>({
    animate: true,
    intensity: 0.5,
    variant: 1,
    show3D: true,
    showCalligraphy: true,
    mobileOptimized: false,
  })

  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5) // Default volume to 50%
  const [autoplayFailed, setAutoplayFailed] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const isRTL = language === "ar"
  const t = content[language]
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768

  // Auto-enable mobile optimization on mobile devices
  useEffect(() => {
    if (isMobile && !patternSettings.mobileOptimized) {
      setPatternSettings((prev) => ({ ...prev, mobileOptimized: true }))
    }
  }, [isMobile, patternSettings.mobileOptimized])

  // Attempt to autoplay music once on component mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true) // Successfully started playing
        })
        .catch((e) => {
          console.warn("Autoplay blocked or failed:", e)
          setIsPlaying(false) // Ensure UI reflects paused state
          setAutoplayFailed(true) // Mark that autoplay failed
        })
    }
  }, []) // Empty dependency array ensures this runs only once on mount

  // Sync audio state with isPlaying state (for user interactions)
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        // Only attempt play if it's currently paused (e.g., after initial autoplay failed or user paused)
        if (audioRef.current.paused) {
          audioRef.current.play().catch((e) => console.error("Audio play failed on user interaction:", e))
        }
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  // Sync audio volume with volume state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
  }

  const toggleMute = () => {
    if (audioRef.current) {
      if (audioRef.current.volume === 0) {
        setVolume(0.5) // Unmute to default 50%
      } else {
        setVolume(0) // Mute
      }
    }
  }

  const getPatternClasses = () => {
    let classes = ""
    if (patternSettings.mobileOptimized && isMobile) {
      classes += " pattern-mobile-optimized"
    }
    if (patternSettings.show3D) {
      classes += " pattern-3d pattern-shadow"
    }
    return classes
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-amber-50 via-white to-emerald-50 ${isRTL ? "rtl" : "ltr"}`}>
      {/* Audio Player for Background Music */}
      <audio
        ref={audioRef} // Assign ref to audio element
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SpotiDownloader.com%20-%20Bismi%C5%9Fah%20-%20Aytekin%20Ata%C5%9F-lbo0nH1EVYUFiCVBtkzOY9MPGy8xsG.mp3"
        loop
        crossOrigin="anonymous"
        aria-label="Background music: Bismişah by Aytekin Ataş"
        autoPlay // Added this attribute
      >
        Your browser does not support the audio element.
      </audio>

      {/* Pattern Customizer */}
      <PatternCustomizer settings={patternSettings} onSettingsChange={setPatternSettings} />

      {/* Music Controls */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-amber-200">
        <Button
          variant="ghost"
          size="icon"
          onClick={togglePlayPause}
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? <Pause className="h-5 w-5 text-amber-600" /> : <Play className="h-5 w-5 text-amber-600" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMute}
          aria-label={volume === 0 ? "Unmute music" : "Mute music"}
        >
          {volume === 0 ? (
            <VolumeX className="h-5 w-5 text-amber-600" />
          ) : (
            <Volume2 className="h-5 w-5 text-amber-600" />
          )}
        </Button>
        <Slider
          value={[volume]}
          max={1}
          step={0.01}
          onValueChange={handleVolumeChange}
          className="w-24"
          aria-label="Music volume"
        />
      </div>

      {autoplayFailed && (
        <div className="fixed bottom-20 right-4 z-50 p-2 text-sm bg-red-500 text-white rounded-md shadow-lg">
          Empire Tune
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 glass-effect border-b border-amber-200 animate-glow">
        <div className="absolute bottom-0 left-0 right-0 text-amber-600">
          <IslamicBorderPattern animate={patternSettings.animate} />
        </div>
        <div className="container mx-auto px-4 py-4 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Crown className={`h-8 w-8 text-amber-600 ${patternSettings.animate ? "animate-pulse" : ""}`} />
              <span className="text-xl font-bold text-slate-800">Al Waasi Empire</span>
              {patternSettings.showCalligraphy && (
                <ArabicCalligraphy text="الإمبراطورية الواسعية" className="text-sm opacity-20 hidden md:block" />
              )}
            </div>

            <nav className="hidden md:flex items-center gap-6">
              {Object.entries(t.nav).map(([key, value]) => (
                <a
                  key={key}
                  href={`#${key}`}
                  className="text-slate-600 hover:text-amber-600 transition-all duration-300 hover:scale-105"
                >
                  {value}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Button
                variant={language === "en" ? "default" : "outline"}
                size="sm"
                onClick={() => setLanguage("en")}
                className="text-xs transition-all duration-300 hover:scale-105"
              >
                EN
              </Button>
              <Button
                variant={language === "ar" ? "default" : "outline"}
                size="sm"
                onClick={() => setLanguage("ar")}
                className="text-xs transition-all duration-300 hover:scale-105"
              >
                العربية
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 to-emerald-600/10"></div>
        <div className={`absolute inset-0 text-amber-600 ${getPatternClasses()}`}>
          {patternSettings.show3D ? (
            <Islamic3DStarPattern animate={patternSettings.animate} intensity={patternSettings.intensity} />
          ) : (
            <Islamic3DGeometricPattern
              animate={patternSettings.animate}
              intensity={patternSettings.intensity}
              variant={patternSettings.variant}
            />
          )}
        </div>

        {patternSettings.showCalligraphy && (
          <>
            <ArabicCalligraphy
              text="بسم الله الرحمن الرحيم"
              className="top-10 left-10 text-6xl opacity-5 animate-float"
            />
            <ArabicCalligraphy
              text="الحمد لله رب العالمين"
              className="bottom-10 right-10 text-4xl opacity-5 animate-float"
            />
          </>
        )}

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Portrait */}
            <div className="relative mb-8">
              <img
                src="https://imgcdn.stablediffusionweb.com/2024/3/20/600335cf-48c2-4246-a4b6-6406844c250e.jpg?height=200&width=200"
                alt="Sultan Ayat Khan"
                width={200}
                height={200}
                className={`mx-auto rounded-full border-4 border-amber-300 shadow-2xl ${patternSettings.animate ? "animate-glow" : ""}`}
              />
              {patternSettings.show3D && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400/20 to-emerald-400/20 animate-pulse" />
              )}
            </div>

            <h1
              className={`text-5xl md:text-6xl font-bold text-slate-800 mb-4 font-serif ${patternSettings.animate ? "animate-float" : ""}`}
            >
              {t.hero.title}
            </h1>

            {patternSettings.showCalligraphy && (
              <div className="mb-4">
                <ArabicCalligraphy text={t.hero.arabicTitle} className="text-3xl opacity-30 relative" />
              </div>
            )}

            <p className="text-xl text-amber-700 mb-6 font-medium">{t.hero.subtitle}</p>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">{t.hero.description}</p>

            <div className="mt-8 flex justify-center gap-4">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg">
                <Crown className="h-4 w-4 mr-2" />
                Explore Legacy
              </Button>
              <Button
                variant="outline"
                className="border-amber-600 text-amber-600 hover:bg-amber-50 px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 bg-transparent"
              >
                <Globe className="h-4 w-4 mr-2" />
                Global Impact
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section id="about" className="py-16 bg-white relative overflow-hidden">
        <div className={`absolute inset-0 text-emerald-600 ${getPatternClasses()}`}>
          <Islamic3DGeometricPattern
            animate={patternSettings.animate}
            intensity={patternSettings.intensity * 0.3}
            variant={2}
          />
        </div>

        {patternSettings.showCalligraphy && <CalligraphyBorder animate={patternSettings.animate} />}

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center font-serif flex items-center justify-center gap-3">
              <BookOpen className="h-8 w-8 text-amber-600" />
              {t.about.title}
            </h2>
            <Card className="border-amber-200 shadow-2xl relative overflow-hidden glass-effect">
              <div className={`absolute inset-0 text-emerald-600 ${getPatternClasses()}`}>
                <IslamicCardPattern animate={patternSettings.animate} />
              </div>
              <CardContent className="p-8 relative z-10">
                <p className="text-lg text-slate-700 leading-relaxed">{t.about.content}</p>

                <div className="mt-6 grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-amber-50 rounded-lg">
                    <Crown className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-slate-800">9+</div>
                    <div className="text-sm text-slate-600">Years of Reign</div>
                  </div>
                  <div className="text-center p-4 bg-emerald-50 rounded-lg">
                    <Users className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-slate-800">50M+</div>
                    <div className="text-sm text-slate-600">Citizens Served</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Globe className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-slate-800">25+</div>
                    <div className="text-sm text-slate-600">International Awards</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section
        id="achievements"
        className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-emerald-50 relative overflow-hidden"
      >
        <div className={`absolute inset-0 text-amber-300 opacity-40 ${getPatternClasses()}`}>
          <Islamic3DGeometricPattern
            animate={patternSettings.animate}
            intensity={patternSettings.intensity}
            variant={3}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <Award className="h-10 w-10 text-amber-600 animate-bounce" />
              <h2 className="text-4xl font-bold text-slate-800 font-serif">
                {t.achievements.title}
              </h2>
              <Award className="h-10 w-10 text-amber-600 animate-bounce" style={{animationDelay: '0.2s'}} />
            </div>
            <div className="h-1 w-24 bg-gradient-to-r from-amber-600 to-emerald-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {t.achievements.items.map((achievement, index) => (
              <div
                key={index}
                className="group relative"
                style={{
                  animation: patternSettings.animate ? `slideUp 0.6s ease-out ${index * 0.1}s both` : 'none'
                }}
              >
                <Card
                  className={`border-2 border-amber-200 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden bg-white backdrop-blur-sm ${patternSettings.animate ? "hover:border-amber-400" : ""}`}
                >
                  {/* Animated background gradient */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="absolute top-0 right-0 text-amber-600 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
                    <IslamicCornerPattern animate={patternSettings.animate} />
                  </div>
                  
                  <CardHeader className="relative z-10 pb-3">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-4xl transform group-hover:scale-110 transition-transform duration-300">
                        {achievement.icon}
                      </div>
                      <Badge 
                        variant="secondary" 
                        className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 font-semibold border border-amber-300"
                      >
                        {achievement.year}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-slate-800 group-hover:text-amber-700 transition-colors duration-300">
                      {achievement.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="relative z-10">
                    <p className="text-slate-600 group-hover:text-slate-700 transition-colors duration-300 mb-4">
                      {achievement.description}
                    </p>
                    {achievement.impact && (
                      <div className="text-sm text-emerald-600 font-medium bg-gradient-to-r from-emerald-50 to-teal-50 p-3 rounded-lg border border-emerald-200">
                        <span className="font-bold">Impact:</span> {achievement.impact}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Floating decorative elements */}
        <style>{`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
        `}</style>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 bg-white relative overflow-hidden">
        <div className={`absolute inset-0 text-blue-600 ${getPatternClasses()}`}>
          <Islamic3DGeometricPattern
            animate={patternSettings.animate}
            intensity={patternSettings.intensity * 0.2}
            variant={1}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-slate-800 mb-12 text-center font-serif flex items-center justify-center gap-3">
            <GraduationCap className="h-8 w-8 text-amber-600" />
            {t.education.title}
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {t.education.items.map((edu, index) => (
              <Card
                key={index}
                className="border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300 glass-effect"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-slate-800 mb-1">{edu.institution}</h3>
                      <p className="text-lg text-slate-600 mb-2">{edu.degree}</p>
                      <p className="text-sm text-amber-600 font-medium">{edu.honors}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-2">
                        {edu.year}
                      </Badge>
                      <div className="text-right">
                        <Star className="h-4 w-4 text-amber-500 inline" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership" className="py-16 bg-gradient-to-br from-emerald-50 to-amber-50 relative overflow-hidden">
        <div className={`absolute inset-0 text-emerald-700 ${getPatternClasses()}`}>
          <Islamic3DStarPattern animate={patternSettings.animate} intensity={patternSettings.intensity} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-slate-800 mb-12 text-center font-serif flex items-center justify-center gap-3">
            <Users className="h-8 w-8 text-amber-600" />
            {t.leadership.title}
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {t.leadership.items.map((role, index) => (
              <Card
                key={index}
                className="border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300 glass-effect"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-slate-800 mb-2">{role.position}</h3>
                      <p className="text-slate-600">{role.description}</p>
                    </div>
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 whitespace-nowrap">
                      {role.period}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 bg-white relative overflow-hidden">
        <div className={`absolute inset-0 text-purple-600 ${getPatternClasses()}`}>
          <Islamic3DGeometricPattern
            animate={patternSettings.animate}
            intensity={patternSettings.intensity * 0.3}
            variant={2}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-slate-800 mb-12 text-center font-serif flex items-center justify-center gap-3">
            <Building className="h-8 w-8 text-amber-600" />
            {t.projects.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {t.projects.items.map((project, index) => (
              <Card
                key={index}
                className="border-amber-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 glass-effect"
              >
                <CardHeader>
                  <CardTitle className="text-lg text-slate-800 mb-2">{project.name}</CardTitle>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="w-fit">
                      {project.status}
                    </Badge>
                    <Shield className="h-5 w-5 text-emerald-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-3">{project.description}</p>
                  {project.impact && (
                    <div className="text-sm text-blue-600 font-medium bg-blue-50 p-2 rounded">{project.impact}</div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section
        id="publications"
        className="py-16 bg-gradient-to-br from-amber-50 to-emerald-50 relative overflow-hidden"
      >
        <div className={`absolute inset-0 text-amber-600 ${getPatternClasses()}`}>
          <Islamic3DGeometricPattern
            animate={patternSettings.animate}
            intensity={patternSettings.intensity}
            variant={3}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-slate-800 mb-12 text-center font-serif flex items-center justify-center gap-3">
            <Scroll className="h-8 w-8 text-amber-600" />
            {t.publications.title}
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {t.publications.items.map((pub, index) => (
              <Card
                key={index}
                className="border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300 glass-effect"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-slate-800 mb-2">{pub.title}</h3>
                      <p className="text-slate-600 mb-3">{pub.description}</p>
                      {pub.impact && (
                        <div className="text-sm text-green-600 font-medium bg-green-50 p-2 rounded">{pub.impact}</div>
                      )}
                    </div>
                    <div className="text-right ml-4">
                      <Badge variant="secondary" className="mb-2">
                        {pub.year}
                      </Badge>
                      <p className="text-sm text-amber-600 font-medium">{pub.type}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-white relative overflow-hidden">
        <div className={`absolute inset-0 text-indigo-600 ${getPatternClasses()}`}>
          <Islamic3DStarPattern animate={patternSettings.animate} intensity={patternSettings.intensity * 0.4} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-slate-800 mb-12 text-center font-serif flex items-center justify-center gap-3">
            <Heart className="h-8 w-8 text-amber-600" />
            {t.testimonials.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {t.testimonials.items.map((testimonial, index) => (
              <Card
                key={index}
                className="border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300 glass-effect"
              >
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="flex text-amber-400 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-slate-600 italic">"{testimonial.quote}"</p>
                  </div>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-slate-800">{testimonial.name}</p>
                    <p className="text-sm text-slate-600">{testimonial.title}</p>
                    <p className="text-xs text-amber-600">{testimonial.country}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gradient-to-br from-slate-50 to-amber-50 relative overflow-hidden">
        <div className={`absolute inset-0 text-slate-600 ${getPatternClasses()}`}>
          <Islamic3DGeometricPattern
            animate={patternSettings.animate}
            intensity={patternSettings.intensity * 0.2}
            variant={1}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-slate-800 mb-12 text-center font-serif flex items-center justify-center gap-3">
            <Mail className="h-8 w-8 text-amber-600" />
            {language === "en" ? "Royal Contact" : "التواصل الملكي"}
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <ContactForm language={language} />
              {/* Contact Information */}
              <div className="space-y-6">
                <Card className="border-amber-200 shadow-lg glass-effect">
                  <CardHeader>
                    <CardTitle className="text-xl text-slate-800 flex items-center gap-3">
                      <Building className="h-5 w-5 text-amber-600" />
                      {t.contact.office}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                      <MapPin className="h-5 w-5 text-amber-600" />
                      <span className="text-slate-700">{t.contact.address}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                      <Mail className="h-5 w-5 text-emerald-600" />
                      <span className="text-slate-700">{t.contact.email}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Phone className="h-5 w-5 text-blue-600" />
                      <span className="text-slate-700">{t.contact.phone}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-amber-200 shadow-lg glass-effect">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-slate-800 mb-3">Response Time</h4>
                    <p className="text-slate-600 text-sm mb-4">
                      The Royal Office typically responds to inquiries within 48 hours during business days.
                    </p>
                    <Separator className="my-4" />
                    <h4 className="font-semibold text-slate-800 mb-3">Office Hours</h4>
                    <div className="text-sm text-slate-600 space-y-1">
                      <p>Sunday - Thursday: 8:00 AM - 6:00 PM</p>
                      <p>Friday: 8:00 AM - 12:00 PM</p>
                      <p>Saturday: Closed</p>
                    </div>
                  </CardContent>
                </Card>
                {/* The appointment info card will now be conditionally rendered inside ContactForm based on its internal state */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment/Donation Section (New Section) */}
      <section id="donate" className="py-16 bg-gradient-to-br from-emerald-50 to-blue-50 relative overflow-hidden">
        <div className={`absolute inset-0 text-emerald-600 ${getPatternClasses()}`}>
          <Islamic3DStarPattern animate={patternSettings.animate} intensity={patternSettings.intensity * 0.3} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-slate-800 mb-12 text-center font-serif flex items-center justify-center gap-3">
            <CreditCard className="h-8 w-8 text-emerald-600" />
            {t.nav.donate}
          </h2>
          <div className="max-w-2xl mx-auto">
            <PaymentForm language={language} />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 bg-white relative overflow-hidden">
        <div className={`absolute inset-0 text-purple-600 ${getPatternClasses()}`}>
          <Islamic3DGeometricPattern
            animate={patternSettings.animate}
            intensity={patternSettings.intensity * 0.3}
            variant={1}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-slate-800 mb-12 text-center font-serif flex items-center justify-center gap-3">
            <Star className="h-8 w-8 text-amber-600" />
            {t.skills.title}
          </h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {t.skills.categories.map((category, index) => (
                <Card
                  key={index}
                  className="border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300 glass-effect"
                >
                  <CardHeader>
                    <CardTitle className="text-xl text-slate-800 text-center">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-slate-700">{skill.name}</span>
                          <span className="text-sm text-amber-600 font-semibold">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-amber-500 to-emerald-500 h-2 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-16 bg-gradient-to-br from-slate-50 to-amber-50 relative overflow-hidden">
        <div className={`absolute inset-0 text-indigo-600 ${getPatternClasses()}`}>
          <Islamic3DStarPattern animate={patternSettings.animate} intensity={patternSettings.intensity * 0.2} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4 font-serif flex items-center justify-center gap-3">
              <BookOpen className="h-8 w-8 text-amber-600" />
              {t.blog.title}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">{t.blog.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {t.blog.posts.map((post, index) => (
              <Card
                key={index}
                className="border-amber-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 glass-effect overflow-hidden"
              >
                <div className="aspect-video bg-gradient-to-br from-amber-100 to-emerald-100 flex items-center justify-center">
                  <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                      {post.category}
                    </Badge>
                    <span className="text-sm text-slate-500">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-slate-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">{post.date}</span>
                    <Button variant="outline" size="sm" className="hover:bg-amber-50 bg-transparent">
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 bg-white relative overflow-hidden">
        <div className={`absolute inset-0 text-emerald-600 ${getPatternClasses()}`}>
          <Islamic3DGeometricPattern
            animate={patternSettings.animate}
            intensity={patternSettings.intensity * 0.2}
            variant={2}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4 font-serif flex items-center justify-center gap-3">
              <Globe className="h-8 w-8 text-amber-600" />
              {t.gallery.title}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">{t.gallery.subtitle}</p>
          </div>

          <div className="space-y-12">
            {t.gallery.categories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h3 className="text-2xl font-semibold text-slate-800 mb-6 text-center">{category.name}</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {category.images.map((image, imageIndex) => (
                    <Card
                      key={imageIndex}
                      className="border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden glass-effect"
                    >
                      <div className="aspect-video bg-gradient-to-br from-amber-100 to-emerald-100">
                        <img
                          src={image.src || "/placeholder.svg"}
                          alt={image.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <p className="text-sm text-slate-600 text-center">{image.caption}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section id="awards" className="py-16 bg-gradient-to-br from-amber-50 to-emerald-50 relative overflow-hidden">
        <div className={`absolute inset-0 text-amber-600 ${getPatternClasses()}`}>
          <Islamic3DStarPattern animate={patternSettings.animate} intensity={patternSettings.intensity * 0.3} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-slate-800 mb-12 text-center font-serif flex items-center justify-center gap-3">
            <Award className="h-8 w-8 text-amber-600" />
            {t.awards.title}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {t.awards.items.map((award, index) => (
              <Card
                key={index}
                className="border-amber-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 glass-effect"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{award.icon}</div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">{award.title}</h3>
                  <p className="text-amber-600 font-medium mb-2">{award.organization}</p>
                  <Badge variant="secondary" className="mb-3">
                    {award.year}
                  </Badge>
                  <p className="text-sm text-slate-600">{award.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12 relative overflow-hidden">
        <div className={`absolute inset-0 text-slate-600 ${getPatternClasses()}`}>
          <Islamic3DGeometricPattern
            animate={patternSettings.animate}
            intensity={patternSettings.intensity * 0.1}
            variant={2}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Crown className={`h-8 w-8 text-amber-400 ${patternSettings.animate ? "animate-pulse" : ""}`} />
              <span className="text-2xl font-bold">Al Waasi Empire</span>
            </div>

            {patternSettings.showCalligraphy && (
              <ArabicCalligraphy text="الإمبراطورية الواسعية" className="text-xl opacity-30 mb-4" />
            )}

            <p className="text-slate-400 max-w-2xl mx-auto">
              Preserving tradition, embracing innovation, and leading with wisdom for the prosperity of all nations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <h4 className="font-semibold mb-3 text-amber-400">Legacy</h4>
              <p className="text-sm text-slate-400">9 years of transformative leadership</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-3 text-amber-400">Impact</h4>
              <p className="text-sm text-slate-400">50M+ lives touched globally</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-3 text-amber-400">Vision</h4>
              <p className="text-sm text-slate-400">Building bridges between cultures</p>
            </div>
          </div>

          <Separator className="bg-slate-600 mb-6" />

          <div className="text-center">
            <p className="text-slate-400">© 2024 Office of His Majesty Sultan Ayat Khan. All rights reserved.</p>
            <p className="text-xs text-slate-500 mt-2">Designed with Islamic heritage and modern excellence in mind.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
