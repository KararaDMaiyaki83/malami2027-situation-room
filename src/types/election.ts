export interface LGACollationData {
  id: string;
  name: string;
  zone: 'Central' | 'North' | 'South';
  totalPUs: number;
  reportedPUs: number;
  registeredVoters: number;
  bivasAccredited: number;
  adcVotes: number;
  apcVotes: number;
  pdpVotes: number;
  rejectedVotes: number;
  cancelledPVCs: number;
  status: 'LEADING' | 'WON' | 'TIGHT' | 'AUDIT_ALERT';
  leadMargin: number;
  ec8cSigned: boolean;
  legalLeadName: string;
}

export interface WardCollationData {
  id: string;
  lgaName: string;
  wardName: string;
  totalPUs: number;
  reportedPUs: number;
  adcVotes: number;
  apcVotes: number;
  pdpVotes: number;
  rejectedVotes: number;
  ec8bSigned: boolean;
  paralegalName: string;
}

export interface PollingUnitRecord {
  puCode: string;
  puName: string;
  wardName: string;
  lgaName: string;
  registeredVoters: number;
  bivasAccredited: number;
  adcVotes: number;
  apcVotes: number;
  pdpVotes: number;
  rejectedVotes: number;
  ec8aUploaded: boolean;
  ec8aVerified: boolean;
  ec8aImageUrl?: string;
  agentName: string;
  timestamp: string;
  hasOvervoting: boolean;
}

export type IncidentSeverity = 'CRITICAL' | 'MAJOR' | 'MINOR';
export type IncidentStatus = 'OPEN' | 'INVESTIGATING' | 'LEGAL_DISPATCHED' | 'RESOLVED' | 'PETITION_FILED';

export interface IncidentReport {
  id: string;
  title: string;
  severity: IncidentSeverity;
  lgaName: string;
  wardName: string;
  puCode?: string;
  description: string;
  reportedBy: string;
  reporterPhone: string;
  timestamp: string;
  status: IncidentStatus;
  legalCounselAssigned?: string;
  actionTaken?: string;
}

export interface BroadcastLog {
  id: string;
  sender: string;
  recipientGroup: string;
  message: string;
  channel: 'SMS_GATEWAY' | 'APP_PUSH' | 'VHF_RADIO';
  deliveryCount: number;
  timestamp: string;
}

export type ElectionSegmentId = 
  | 'STAGE_1_ARRIVAL_SETUP'
  | 'STAGE_2_BVAS_ZERO_CHECK'
  | 'STAGE_3_ACCREDITATION_VOTING'
  | 'STAGE_4_QUEUE_CUTOFF'
  | 'STAGE_5_BALLOT_SORTING_COUNTING'
  | 'STAGE_6_EC8A_ENDORSEMENT_UPLOAD';

export interface ElectionStageMeta {
  id: ElectionSegmentId;
  stageNumber: number;
  name: string;
  shortName: string;
  timeWindow: string;
  description: string;
  checkQuestions: string[];
}

export interface PVTIReVAuditRecord {
  id: string;
  puCode: string;
  puName: string;
  ward: string;
  lga: string;
  registeredVoters: number;
  agentSubmission: {
    adc: number;
    apc: number;
    pdp: number;
    nnpp: number;
    lp: number;
    others: number;
    accreditedVoters: number;
    rejectedVotes: number;
    totalVotesCast: number;
    photoUrl: string;
    timestamp: string;
    gpsCoords: string;
    proximityMeters: number;
    agentName: string;
    agentPhone: string;
    bvasZeroChecked: boolean;
  };
  irevSubmission: {
    adc: number;
    apc: number;
    pdp: number;
    nnpp: number;
    lp: number;
    others: number;
    accreditedVoters: number;
    rejectedVotes: number;
    totalVotesCast: number;
    sheetUrl: string;
    uploadTimestamp: string;
    bvasDeviceId: string;
    gpsCoords: string;
    proximityMeters: number;
    isBlurredOrIncomplete: boolean;
  };
  status: 'MATCHED' | 'VOTE_VARIANCE' | 'ACCREDITATION_MISMATCH' | 'TIME_LAG_ALERT';
  voteVariance: {
    adcDiff: number;
    apcDiff: number;
    pdpDiff: number;
    nnppDiff: number;
    lpDiff: number;
  };
  timeLagMinutes: number;
  distanceDiscrepancyMeters: number;
  flaggedForTribunal: boolean;
  tribunalEvidenceNotes?: string;
}
