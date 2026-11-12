export type SectionId = 'loss' | 'underground' | 'food' | 'rivers' | 'recovery' | 'cities';

export type SourceStatus = 'verified' | 'secondary' | 'pending';

export interface SourceRecord {
  id: string;
  title: string;
  publisher: string;
  url: string;
  published: string;
  retrieved: string;
  licence: string;
  figure: string;
  caveat: string;
  status: SourceStatus;
  recheckBy: string;
}

export interface Chunk {
  id: string;
  sourceId: string;
  section: SectionId | 'site';
  text: string;
}

export interface SiteState {
  progress: number; // 0 to 1, whole page
  activeSection: SectionId | 'intro' | 'footer';
  sectionProgress: Record<SectionId, number>; // 0 to 1 each
  readSections: SectionId[];
  voice: 'idle' | 'listening' | 'thinking' | 'speaking';
  mode: 'guide' | 'specialist';
  specialist: SectionId | null;
}

// Agent tool call interfaces
export interface SearchDocsParams {
  query: string;
  section?: SectionId;
}

export interface SearchDocsResult {
  chunks: Chunk[];
  sources: SourceRecord[];
}

export interface NavigateToParams {
  section: SectionId;
}

export interface StartBriefParams {
  section: SectionId;
}

export interface HandOffParams {
  section: SectionId;
}

export interface ReturnToGuideParams {
  summary: string;
}

// WebSocket message contracts
export type ClientWsMessage =
  | { type: 'audio_chunk'; data: string }
  | { type: 'text'; text: string }
  | { type: 'interrupt' }
  | { type: 'context'; section: SectionId };

export type ServerWsMessage =
  | { type: 'transcript_partial'; text: string }
  | { type: 'transcript_final'; text: string }
  | { type: 'reply_text_delta'; text: string }
  | { type: 'reply_audio_chunk'; data: string }
  | { type: 'navigate'; section: SectionId }
  | { type: 'sources'; sources: SourceRecord[] }
  | { type: 'state'; state: Partial<SiteState> }
  | { type: 'error'; message: string };
