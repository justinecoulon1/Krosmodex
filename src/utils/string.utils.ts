export function normalizeString(str: string) {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
}

export function formatTimestamp(timestamp: number) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });
}
