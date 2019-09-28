export interface EventMetadata {
  backgroundUrl: string;
  imageUrl?: string;
  eventHeadline: string;
  speakers: SpeakerMetadata[];
  location: string;
  date: string;
  sponsors: SponsorMetadata[];
  partners?: PartnerMetadata[];
}

export interface SpeakerMetadata {
  name: string;
  talkTitle: string;
  imageUrl: string;
  twitterHandle?: string;
}

export interface SponsorMetadata {
  imageUrl: string;
}

export interface PartnerMetadata {
  imageUrl: string;
}
