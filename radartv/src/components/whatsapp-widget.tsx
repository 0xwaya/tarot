import { MessageCircle } from 'lucide-react';

import { whatsappContact, whatsappLink } from '@/content/site';

export function WhatsAppWidget() {
  const label = whatsappContact.number ? 'Escribir por WhatsApp' : 'Contactar por correo';

  return (
    <a className="whatsapp-widget" href={whatsappLink} rel="noreferrer" target="_blank">
      <MessageCircle size={18} />
      <span>{label}</span>
    </a>
  );
}
