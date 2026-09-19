export type UserRole = 
  | 'SITUATION_ROOM'
  | 'LGA_SUPERVISOR'
  | 'RA_SUPERVISOR'
  | 'PU_AGENT';

export type { ElectionSegmentId } from './election';

export interface AppUser {
  id: string;
  name: string;
  role: UserRole;
  title: string;
  assignedLGA?: string;
  assignedWard?: string;
  assignedPU?: string;
  phone: string;
  badgeNumber: string;
  pin: string;
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
  registeredAt?: string;
  pvcNumber?: string;
}

export const INITIAL_USERS: AppUser[] = [
  // LEVEL 4: STATE SITUATION ROOM COORDINATORS & PRINCIPAL
  {
    id: 'usr-sit-01',
    name: 'Abubakar Malami, SAN, CON',
    role: 'SITUATION_ROOM',
    title: 'Gubernatorial Candidate & Strategic Commander',
    assignedLGA: 'Statewide Master Command (Birnin Kebbi)',
    phone: '+234 803 000 2027',
    badgeNumber: 'ADC-KB-001',
    pin: '2027',
    status: 'APPROVED',
  },
  {
    id: 'usr-sit-02',
    name: 'Barr. Farouk Umar',
    role: 'SITUATION_ROOM',
    title: 'Director of Central Situation Room (All 21 LGAs & 3,745 PUs)',
    assignedLGA: 'Central Command Headquarters',
    phone: '+234 802 333 4455',
    badgeNumber: 'ADC-SR-DIR',
    pin: '7700',
    status: 'APPROVED',
  },

  // LEVEL 3: LGA SUPERVISORS & LEGAL SHIELD
  {
    id: 'usr-lga-01',
    name: 'Barr. Sanusi Dangaladima',
    role: 'LGA_SUPERVISOR',
    title: 'LGA Collation Lead & Legal Shield Counsel (15 Wards & 275 PUs)',
    assignedLGA: 'Birnin Kebbi',
    phone: '+234 803 111 8899',
    badgeNumber: 'ADC-LGA-BK01',
    pin: '3311',
    status: 'APPROVED',
  },
  {
    id: 'usr-lga-02',
    name: 'Barr. Bello Kalgo',
    role: 'LGA_SUPERVISOR',
    title: 'LGA Collation Lead & Legal Counsel (10 Wards & 98 PUs)',
    assignedLGA: 'Kalgo',
    phone: '+234 803 222 9988',
    badgeNumber: 'ADC-LGA-KL02',
    pin: '3322',
    status: 'APPROVED',
  },
  {
    id: 'usr-lga-03',
    name: 'Barr. Danjuma Zuru',
    role: 'LGA_SUPERVISOR',
    title: 'LGA Collation Lead & Zuru Emirate Counsel (11 Wards & 215 PUs)',
    assignedLGA: 'Zuru',
    phone: '+234 806 444 1122',
    badgeNumber: 'ADC-LGA-ZR03',
    pin: '3333',
    status: 'APPROVED',
  },
  {
    id: 'usr-lga-04',
    name: 'Barr. Suleiman Argungu',
    role: 'LGA_SUPERVISOR',
    title: 'LGA Collation Lead & Argungu Emirate Counsel (11 Wards & 210 PUs)',
    assignedLGA: 'Argungu',
    phone: '+234 802 777 6655',
    badgeNumber: 'ADC-LGA-AR04',
    pin: '3344',
    status: 'APPROVED',
  },

  // LEVEL 2: REGISTRATION AREA (RA) / WARD SUPERVISORS
  {
    id: 'usr-ra-01',
    name: 'Usman Dangaladima',
    role: 'RA_SUPERVISOR',
    title: 'RA Supervisor & Collation Paralegal (Dangaladima Ward - 15 PUs)',
    assignedLGA: 'Birnin Kebbi',
    assignedWard: 'Dangaladima Ward',
    phone: '+234 806 333 7744',
    badgeNumber: 'ADC-WSP-BK04',
    pin: '4411',
    status: 'APPROVED',
  },
  {
    id: 'usr-ra-02',
    name: 'Murtala Aliero',
    role: 'RA_SUPERVISOR',
    title: 'RA Supervisor (Aliero Dangaladima Ward - 12 PUs)',
    assignedLGA: 'Aliero',
    assignedWard: 'Aliero Dangaladima',
    phone: '+234 814 222 5533',
    badgeNumber: 'ADC-WSP-AL01',
    pin: '4422',
    status: 'APPROVED',
  },
  {
    id: 'usr-ra-03',
    name: 'Yohanna Ribah',
    role: 'RA_SUPERVISOR',
    title: 'RA Supervisor (Ribah Ward - 18 PUs)',
    assignedLGA: 'Danko/Wasagu',
    assignedWard: 'Ribah Ward',
    phone: '+234 803 888 1234',
    badgeNumber: 'ADC-WSP-DW02',
    pin: '4433',
    status: 'APPROVED',
  },

  // LEVEL 1: POLLING UNIT AGENTS
  {
    id: 'usr-pu-01',
    name: 'Muhammad Bello Kamba',
    role: 'PU_AGENT',
    title: 'Accredited PU Agent (PU 21-01-04-008)',
    assignedLGA: 'Birnin Kebbi',
    assignedWard: 'Dangaladima Ward',
    assignedPU: 'PU 21-01-04-008 (Primary School)',
    phone: '+234 814 555 1234',
    badgeNumber: 'ADC-PUA-9941',
    pin: '5511',
    status: 'APPROVED',
  },
  {
    id: 'usr-pu-02',
    name: 'Ibrahim Illo',
    role: 'PU_AGENT',
    title: 'Accredited PU Agent (PU 21-13-04-012)',
    assignedLGA: 'Bagudo',
    assignedWard: 'Illo Ward',
    assignedPU: 'PU 21-13-04-012 (Illo Dispensary)',
    phone: '+234 803 912 3456',
    badgeNumber: 'ADC-PUA-8812',
    pin: '5522',
    status: 'APPROVED',
  },
  {
    id: 'usr-pu-03',
    name: 'Garba Zuru',
    role: 'PU_AGENT',
    title: 'Accredited PU Agent (PU 21-15-01-009)',
    assignedLGA: 'Zuru',
    assignedWard: 'Zuru Urban Ward',
    assignedPU: 'PU 21-15-01-009 (Town Hall Square)',
    phone: '+234 805 444 8877',
    badgeNumber: 'ADC-PUA-7733',
    pin: '5533',
    status: 'APPROVED',
  }
];
