
export const provisionQueryKeys = {
    all: ['provision'] as const,
    categories: ['provision', 'categories'] as const,
    topFive: (id?: number) => ['provision', 'top-five', id] as const,
    barberProvisions: (id: number) => ['provision', 'barber-provisions', id] as const,
}
