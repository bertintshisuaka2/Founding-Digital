import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-20 right-4 z-50 flex gap-2 bg-gray-900 border border-yellow-700 rounded-lg p-2">
      <Languages className="w-5 h-5 text-yellow-400" />
      <Button
        onClick={() => setLanguage("en")}
        variant="ghost"
        size="sm"
        className={`${
          language === "en"
            ? "bg-yellow-600 text-white hover:bg-yellow-700"
            : "text-gray-300 hover:text-white hover:bg-gray-800"
        }`}
      >
        EN
      </Button>
      <Button
        onClick={() => setLanguage("fr")}
        variant="ghost"
        size="sm"
        className={`${
          language === "fr"
            ? "bg-yellow-600 text-white hover:bg-yellow-700"
            : "text-gray-300 hover:text-white hover:bg-gray-800"
        }`}
      >
        FR
      </Button>
    </div>
  );
}

