import type { Offer } from '@/types'

export const offers: Offer[] = [
  {
    id: 'o1',
    title: 'Golden Weekend Deal',
    description: '25% off all orders above $40. Use code at checkout.',
    discountCode: 'GOLD25',
    discountPercent: 25,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    validUntil: '2026-04-30',
    minOrder: 40,
  },
  {
    id: 'o2',
    title: 'First Order Special',
    description: 'New here? Get 30% off your very first order.',
    discountCode: 'WELCOME30',
    discountPercent: 30,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    validUntil: '2026-12-31',
    minOrder: 20,
  },
  {
    id: 'o3',
    title: 'Late Night Feast',
    description: 'Order after 10 PM and get 20% off. Because midnight hunger is real.',
    discountCode: 'NIGHT20',
    discountPercent: 20,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
    validUntil: '2026-05-31',
    minOrder: 30,
  },
  {
    id: 'o4',
    title: 'Premium Bundle',
    description: 'Spend $60 or more and unlock 15% off plus free dessert.',
    discountCode: 'PREMIUM15',
    discountPercent: 15,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80',
    validUntil: '2026-05-15',
    minOrder: 60,
  },
]

export const validDiscountCodes: Record<string, { percent: number; minOrder: number }> = {
  GOLD25: { percent: 25, minOrder: 40 },
  WELCOME30: { percent: 30, minOrder: 20 },
  NIGHT20: { percent: 20, minOrder: 30 },
  PREMIUM15: { percent: 15, minOrder: 60 },
}
