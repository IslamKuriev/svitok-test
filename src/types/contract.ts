export type RiskSeverity = 'low' | 'medium' | 'high' | 'critical';

export type RequisiteStatus = 'normal' | 'warning' | 'high';

export interface PartyDetails {
  fullName: string;
  shortName: string;
  inn: string;
  kpp: string;
  ogrn: string;
  legalAddress: string;
  actualAddress: string;
  bankAccount: string;
  bankName: string;
  bik: string;
  correspondentAccount: string;
  signatory: string;
  signatoryPosition: string;
  authorityBasis: string;
}

export interface ContractInfo {
  id: string;
  name: string;
  fileName: string;
  documentType: string;
  contractNumber: string;
  contractDate: string;
  placeOfConclusion: string;
  subject: string;
  totalAmount: string;
  currency: string;
  uploadedAt: string;
  supplier: PartyDetails;
  customer: PartyDetails;
}

export interface ContractRequisite {
  id: string;
  section: string;
  field: string;
  value: string;
  status: RequisiteStatus;
}

export interface RiskItem {
  id: string;
  title: string;
  description: string;
  severity: RiskSeverity;
  clause: string;
  recommendation: string;
}

export interface RiskCounts {
  high: number;
  warnings: number;
  normal: number;
}

export interface AutoFilledField {
  field: string;
  value: string;
  extractedFrom: string;
}

export interface ContractResult {
  contract: ContractInfo;
  requisites: ContractRequisite[];
  risks: RiskItem[];
  riskCounts: RiskCounts;
  summary: string;
  autoFilledFields: AutoFilledField[];
}
