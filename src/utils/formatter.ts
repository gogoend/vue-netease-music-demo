type TimeUnit = 's' | 'ms'
import { Artist } from "@/types/song";

export const numberWithLeadZero = function (val: number | string): string {
    return val >= 10 ? String(val) : `0${val}`
}

export const formatArtists = function (artists: Artist[]): string {
    return artists.map((item: Artist) => item.name).join(" / ");
}

export const timeToString = function (time: number | string, unit: TimeUnit = 's'): string {
    time = Number(time)
    if (Number(time) < 0) {
        time = 0
    }
    if (unit === 'ms') {
        time = Math.round(time / 1000)
    }

    const sec = time % 60,
          min = (time - sec) / 60 % 60,
          hour = (time - sec - min * 60) / 60 / 60

    return `${numberWithLeadZero(hour)}:${numberWithLeadZero(min)}:${numberWithLeadZero(sec)}`
}