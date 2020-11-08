type SongFormat = 'aac' | 'm4a' | 'wma' | 'flac' | 'mp3'

export interface Song {
    album: Album;
    alias: string[];
    artists: Artist[];
    copyrightId: number;
    duration: number;
    fee: number;
    ftype: number;
    id: number;
    mark: number;
    mvid: number;
    name: string;
    rUrl: string | null;
    rtype: number;
    status: number;
}

export interface Album {
    artist: Artist;
    copyrightId: number;
    id: number;
    mark: number;
    name: string;
    picId: number;
    publishTime: number;
    size: number;
    status: number;
}

export interface Artist {
    albumSize: number;
    alias: string[];
    id: number;
    img1v1: number;
    img1v1Url: string;
    name: string;
    picId: number;
    picUrl: string | null;
    trans: unknown
}

export interface SongFile {
    id: number,
    url: string,
    br: number,
    size: number,
    md5: string,
    code: number,
    expi: number,
    type: SongFormat,
    gain: number,
    fee: number,
    uf: null | any,
    payed: 0,
    flag: number,
    canExtend: boolean,
    freeTrialInfo: null | any,
    level: string,
    encodeType: SongFormat,
    freeTrialPrivilege: {
        resConsumable: boolean,
        userConsumable: boolean
    },
    urlSource: number,
    [key: string]: any
}

export interface PlayingNow {
    file: SongFile | null,
    info: Song | null
}

export namespace API {
    interface UrlP {
        id: number
    }
}