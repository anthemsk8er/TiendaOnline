/**
 * Utilidades para manejar números de WhatsApp con alternancia
 */

export interface WhatsAppContact {
  name: string;
  phoneNumber: string;
}

export const whatsappContacts: WhatsAppContact[] = [
  {
    name: "Juan Carlos Alvarez",
    phoneNumber: "955249392"
  },
  {
    name: "Roberto Revoredo", 
    phoneNumber: "933201671"
  }
];

// Variable global para alternar entre los números
let currentContactIndex = 0;

/**
 * Obtiene el siguiente número de WhatsApp en secuencia alternante
 * @returns {WhatsAppContact} El contacto de WhatsApp seleccionado
 */
export function getNextWhatsAppContact(): WhatsAppContact {
  const contact = whatsappContacts[currentContactIndex];
  // Alternar al siguiente contacto
  currentContactIndex = (currentContactIndex + 1) % whatsappContacts.length;
  return contact;
}

/**
 * Genera la URL de WhatsApp para un contacto específico
 * @param contact - El contacto de WhatsApp
 * @param message - El mensaje a enviar
 * @returns {string} La URL completa de WhatsApp
 */
export function generateWhatsAppUrl(contact: WhatsAppContact, message: string): string {
  return `https://wa.me/51${contact.phoneNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Abre WhatsApp con el siguiente contacto en secuencia y mensaje específico
 * @param message - El mensaje a enviar
 */
export function openAlternatingWhatsApp(message: string): void {
  const contact = getNextWhatsAppContact();
  const url = generateWhatsAppUrl(contact, message);
  window.open(url, '_blank');
}
