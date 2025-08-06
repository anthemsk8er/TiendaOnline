import type { HeroData, FeaturesData, BenefitsData } from '../types';

interface ProductSectionsData {
  [productId: string]: {
    heroData?: HeroData;
    featuresData?: FeaturesData;
    benefitsData?: BenefitsData;
  };
}

// NOTE: Replace 'product-id-...' with the actual UUIDs
// of your products from your Supabase 'products' table.
// You can add as many products here as you need.
export const productSectionsData: ProductSectionsData = {
  'da04bbd8-ac9b-43cf-adb0-9cbcd67119c7': { // Melatonina
    heroData: {
      title: 'Tu Aliado para Noches de Descanso Profundo',
      subtitle: 'Recupera tu ritmo natural de sueño con nuestras gomitas de melatonina.',
      imageUrl: 'https://picsum.photos/id/1078/300/300',
      benefits: [
        { icon: 'BedIcon', title: 'Concilia el Sueño Rápido' },
        { icon: 'WellbeingIcon', title: 'Despierta Renovado' },
        { icon: 'ScienceBackedIcon', title: 'Fórmula No Adictiva' },
        { icon: 'LeafIcon', title: 'Ingredientes Naturales' },
      ],
    },
    featuresData: {
      title: 'DISEÑADO PARA UN DESCANSO ÓPTIMO',
      subtitle: 'Nuestra fórmula combina melatonina pura con extractos botánicos para calmar tu mente y cuerpo, preparándote para un sueño reparador sin interrupciones.',
      imageUrl: 'https://picsum.photos/id/1075/400/400',
      features: [
        { icon: 'PremiumQualityIcon', title: 'Melatonina Pura', description: 'Utilizamos melatonina de alta pureza para asegurar la máxima eficacia y ayudarte a regular tu ciclo circadiano.' },
        { icon: 'PlantIcon', title: 'Extractos Botánicos', description: 'Enriquecido con pasiflora y manzanilla, conocidos por sus propiedades relajantes que reducen la ansiedad.' },
        { icon: 'SmileyFaceIcon', title: 'Sin Somnolencia Matutina', description: 'Formulado para que despiertes sintiéndote con energía y claridad mental, no aturdido.' },
        { icon: 'CheckCircleIcon', title: 'Fácil de Tomar', description: 'Deliciosas gomitas con sabor a frutos del bosque que hacen que tu rutina nocturna sea un placer.' },
      ]
    },
    benefitsData: {
      backgroundImageUrl: 'https://picsum.photos/id/1041/800/650',
      benefits: [
        { icon: 'BedIcon', title: 'Mejora la Calidad del Sueño', description: 'No solo te ayuda a dormir más rápido, sino que promueve un sueño más profundo y continuo durante toda la noche.' },
        { icon: 'BrainIcon', title: 'Regula tu Reloj Interno', description: 'Ideal para personas con desfase horario (jet lag) o turnos de trabajo irregulares, ayudando a sincronizar tu cuerpo.' },
        { icon: 'ShieldCogIcon', title: 'Apoyo Antioxidante', description: 'La melatonina también es un potente antioxidante que ayuda a proteger tus células del daño mientras duermes.' },
      ]
    }
  },
  'c3e6e878-3b17-4866-9c43-98444a1e3559': { // Example ID for MacBook Pro
    heroData: {
      title: 'Potencia que se ve y se siente.',
      subtitle: 'El nuevo MacBook Pro con chip M2 Pro es monstruosamente rápido.',
      imageUrl: 'https://picsum.photos/id/1/300/300',
      benefits: [
        { icon: 'PremiumQualityIcon', title: 'Chip M2 Pro' },
        { icon: 'ScienceBackedIcon', title: 'Pantalla Liquid Retina' },
        { icon: 'WellbeingIcon', title: 'Hasta 18h de batería' },
        { icon: 'BrainIcon', title: 'Sistema de 6 altavoces' },
      ],
    },
    featuresData: {
      title: 'Creado para ir a toda máquina',
      subtitle: 'La arquitectura de los chips de Apple ofrece una eficiencia energética increíble. Pasa el día entero trabajando o jugando sin necesidad de conectarte a la corriente.',
      imageUrl: 'https://picsum.photos/id/17/400/400',
      features: [
        { icon: 'MentalBalanceIcon', title: 'Rendimiento bestial', description: 'La CPU de hasta 12 núcleos es hasta un 20% más rápida para que acabes tus proyectos en tiempo récord.'},
        { icon: 'BrainIcon', title: 'Gráficos de otro nivel', description: 'La GPU de hasta 19 núcleos acelera los flujos de trabajo más exigentes y los juegos con alta carga gráfica.'},
        { icon: 'PlantIcon', title: 'Neural Engine superdotado', description: 'El Neural Engine de 16 núcleos es un 40% más veloz en tareas de aprendizaje automático.'},
        { icon: 'WellbeingIcon', title: 'Memoria unificada', description: 'Hasta 32 GB de memoria unificada para que todo sea rápido y fluido.'}
      ]
    },
    benefitsData: {
      backgroundImageUrl: 'https://picsum.photos/id/10/800/650',
      benefits: [
        { icon: 'ShampooBottleIcon', title: 'Diseño espectacular', description: 'Disponible en gris espacial y plata, con un diseño compacto que es pura potencia.'},
        { icon: 'ShieldCogIcon', title: 'Conectividad pro', description: 'Puertos Thunderbolt 4, HDMI, ranura para tarjetas SDXC y Wi-Fi 6E para una versatilidad sin igual.'},
        { icon: 'CheckCircleIcon', title: 'macOS Ventura', description: 'Trabaja de forma más inteligente, comparte contenido y colabora como nunca en todas tus apps.'}
      ]
    }
  },
  'another-product-uuid': { // Example ID for Samsung Galaxy
    heroData: {
      title: 'Inspírate',
      subtitle: 'Galaxy S23 con la cámara más avanzada y el procesador más rápido.',
      imageUrl: 'https://picsum.photos/id/101/300/300',
      benefits: [
        { icon: 'PremiumQualityIcon', title: 'Cámara 50MP' },
        { icon: 'ScienceBackedIcon', title: 'Snapdragon 8 Gen 2' },
        { icon: 'WellbeingIcon', title: 'Pantalla 120Hz' },
        { icon: 'BrainIcon', title: 'Nightography' },
      ],
    },
  }
};
