
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