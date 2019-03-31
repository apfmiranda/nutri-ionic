export interface Post {
    id:                    number;
    date:                  Date;
    date_gmt:              Date;
    guid:                  GUID;
    modified:              Date;
    modified_gmt:          Date;
    slug:                  string;
    status:                string;
    type:                  string;
    link:                  string;
    title:                 GUID;
    content:               Content;
    excerpt:               Content;
    author:                number;
    featured_media:        number;
    comment_status:        string;
    ping_status:           string;
    sticky:                boolean;
    template:              string;
    format:                string;
    meta:                  any[];
    categories:            number[];
    tags:                  any[];
    better_featured_image: BetterFeaturedImage;
    _links:                Links;
}

export interface Links {
    self:               About[];
    collection:         About[];
    about:              About[];
    author:             Author[];
    replies:            Author[];
    'version-history':  About[];
    'wp:featuredmedia': Author[];
    'wp:attachment':    About[];
    'wp:term':          WpTerm[];
    curies:             Cury[];
}

export interface About {
    href: string;
}

export interface Author {
    embeddable: boolean;
    href:       string;
}

export interface Cury {
    name:      string;
    href:      string;
    templated: boolean;
}

export interface WpTerm {
    taxonomy:   string;
    embeddable: boolean;
    href:       string;
}

export interface BetterFeaturedImage {
    id:            number;
    alt_text:      string;
    caption:       string;
    description:   string;
    media_type:    string;
    media_details: MediaDetails;
    post:          number;
    source_url:    string;
}

export interface MediaDetails {
    width:      number;
    height:     number;
    file:       string;
    sizes:      Sizes;
    image_meta: ImageMeta;
}

export interface ImageMeta {
    aperture:          string;
    credit:            string;
    camera:            string;
    caption:           string;
    created_timestamp: string;
    copyright:         string;
    focal_length:      string;
    iso:               string;
    shutter_speed:     string;
    title:             string;
    orientation:       string;
    keywords:          any[];
}

export interface Sizes {
    thumbnail: Medium;
    medium:    Medium;
}

export interface Medium {
    file:        string;
    width:       number;
    height:      number;
    'mime-type': string;
    source_url:  string;
}

export interface Content {
    rendered:  string;
    protected: boolean;
}

export interface GUID {
    rendered: string;
}
