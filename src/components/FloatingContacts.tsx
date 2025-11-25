import { MessageCircle, Phone as PhoneIcon } from "lucide-react";

export const FloatingContacts = () => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      {/* WhatsApp */}
      <a
        href="https://wa.me/385912345678"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366] hover:bg-[#20BA5A] text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>

      {/* Viber */}
      <a
        href="viber://chat?number=385912345678"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#7360F2] hover:bg-[#5F4FD1] text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Viber"
      >
        <PhoneIcon className="h-6 w-6" />
      </a>
    </div>
  );
};