import type { ContractRequisite, RiskItem } from '../types/contract';

export function getHighRisks(risks: RiskItem[]): RiskItem[] {
  return risks.filter((risk) => risk.severity === 'high' || risk.severity === 'critical');
}

export function getWarningRisks(risks: RiskItem[]): RiskItem[] {
  return risks.filter((risk) => risk.severity === 'medium');
}

export function getNormalRequisites(requisites: ContractRequisite[]): ContractRequisite[] {
  return requisites.filter((requisite) => requisite.status === 'normal');
}
