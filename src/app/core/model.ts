export interface EventMetadata {
  backgroundUrl: string;
  logoUrl?: string;
  eventHeadline: string;
  speakers: SpeakerMetadata[];
  location: string;
  date: Date;
  sponsors?: SponsorMetadata[];
  partners?: PartnerMetadata[];
}

export interface SpeakerMetadata {
  name: string;
  talkTitle: string;
  imageUrl: string;
  twitterHandle?: string;
}

export interface SponsorMetadata {
  logoUrl: string;
}

export interface PartnerMetadata {
  logoUrl: string;
}
