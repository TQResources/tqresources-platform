export type CompanyId = "japan" | "hong-kong";

export type Currency = "USD" | "JPY" | "EUR" | "CNY" | "HKD";

export type Incoterm = "FOB" | "CFR" | "CIF";

export type QuantityUnit = "MT" | "KG" | "PCS";

export type DocumentType =
  | "proforma-invoice"
  | "sales-contract"
  | "commercial-invoice"
  | "packing-list"
  | "analysis-report";

export type ContractStatus =
  | "draft"
  | "confirmed"
  | "partially-shipped"
  | "completed"
  | "cancelled";

export type ShipmentStatus =
  | "planned"
  | "booked"
  | "shipped"
  | "arrived"
  | "completed"
  | "cancelled";

export type InvoiceStatus =
  | "draft"
  | "issued"
  | "revised"
  | "cancelled";

export type ProformaInvoiceStatus =
  | "not-required"
  | "draft"
  | "issued"
  | "revised"
  | "cancelled";

export type PaymentStatus =
  | "unpaid"
  | "partially-paid"
  | "paid"
  | "cancelled";

export interface Address {
  line1: string;
  line2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  bankAddress?: string;
   branchName?: string;
  branchCode?: string;
  branchAddress?: string;

  accountName: string;
  accountNumber?: string;

  iban?: string;
  swiftCode: string;

  currency: Currency;

  intermediaryBankName?: string;
  intermediaryBankSwiftCode?: string;

  notes?: string;
  active: boolean;
}

export interface NumberingRules {
  proformaInvoicePrefix: string;
  salesContractPrefix: string;
  commercialInvoicePrefix: string;
  packingListPrefix: string;
  analysisReportPrefix: string;
}

export interface CompanyProfile {
  id: CompanyId;

  legalName: string;
  localName?: string;
  shortName: string;

  registrationNumber?: string;

  address: Address;

  phone?: string;
  email: string;
  website?: string;

  representativeName: string;

  logoPath: string;
  stampPath?: string;
  signaturePath?: string;

  banks: BankAccount[];

  numberingRules: NumberingRules;

  active: boolean;
}

export interface CustomerContact {
  id: string;
  name: string;
  position?: string;
  email?: string;
  phone?: string;
  active: boolean;
}

export interface CustomerDefaultSettings {
  currency: Currency;
  incoterm: Incoterm;

  loadingPort?: string;
  destinationPort?: string;

  depositRate: number;

  paymentTerms?: string;
  shipmentTerms?: string;
  arbitration?: string;
  claimTerms?: string;
  inspectionTerms?: string;

  requiredDocuments?: string[];
}

export interface CustomerProfile {
  id: string;

  legalName: string;
  shortName: string;

  country: string;
  address: Address;

  registrationNumber?: string;

  contacts: CustomerContact[];

  defaultSettings: CustomerDefaultSettings;

  notes?: string;

  active: boolean;
}

export interface ChemicalSpecification {
  element: string;

  minimum?: number;
  maximum?: number;

  unit: "%" | "ppm";

  displayValue: string;
}

export interface ProductDefaultSettings {
  unit: QuantityUnit;

  packaging?: string;
  quantityTolerance?: string;

  inspectionTerms?: string;
  qualityDescription?: string;

  analysisSpecifications?: ChemicalSpecification[];
}

export interface ProductProfile {
  id: string;

  name: string;
  invoiceName: string;
  contractName: string;

  category: "aluminum" | "copper" | "zinc" | "scrap" | "other";

  hsCode?: string;
  originCountry?: string;
  standard?: string;

  defaultSettings: ProductDefaultSettings;

  active: boolean;
}

export interface CustomerProductSettings {
  currency?: Currency;
  incoterm?: Incoterm;

  loadingPort?: string;
  destinationPort?: string;

  depositRate?: number;

  paymentTerms?: string;
  shipmentTerms?: string;

  packaging?: string;
  quantityTolerance?: string;

  qualityTerms?: string;
  inspectionTerms?: string;
  claimTerms?: string;
  arbitration?: string;

  requiredDocuments?: string[];
}

export interface CustomerProductProfile {
  id: string;

  companyId?: CompanyId;
  customerId: string;
  productId: string;

  customProductName?: string;
  customContractDescription?: string;
  customInvoiceDescription?: string;

  settings: CustomerProductSettings;

  notes?: string;

  active: boolean;
}

export interface TradeItem {
  id: string;

  productId: string;

  description: string;
  specification?: string;

  quantity: number;
  unit: QuantityUnit;

  unitPrice: number;
  currency: Currency;

  amount: number;

  packageCount?: number;
  packageType?: string;

  netWeight?: number;
  grossWeight?: number;
  measurement?: number;
}

export interface ProformaInvoice {
  id: string;

  contractId: string;

  proformaInvoiceNumber: string;
  proformaInvoiceDate: string;

  revisionNumber: number;

  status: ProformaInvoiceStatus;

  depositRate: number;
  depositAmount: number;

  currency: Currency;

  items: TradeItem[];

  bankAccountId?: string;

  validUntil?: string;

  paymentTerms?: string;

  replacesProformaInvoiceId?: string;

  notes?: string;

  createdAt: string;
  updatedAt: string;
}

export interface CommercialInvoice {
  id: string;

  contractId: string;
  shipmentId?: string;

  sequenceNumber: 1 | 2 | 3 | 4;

  invoiceNumber: string;
  invoiceDate: string;

  revisionNumber: number;

  status: InvoiceStatus;
  paymentStatus: PaymentStatus;

  currency: Currency;

  items: TradeItem[];

  totalQuantity: number;
  totalAmount: number;

  bankAccountId?: string;

  billOfLadingNumber?: string;

  vesselName?: string;
  voyageNumber?: string;

  portOfLoading?: string;
  portOfDischarge?: string;
  finalDestination?: string;

  etd?: string;
  eta?: string;

  replacesInvoiceId?: string;

  notes?: string;

  createdAt: string;
  updatedAt: string;
}

export interface Shipment {
  id: string;

  contractId: string;

  shipmentNumber: number;

  status: ShipmentStatus;

  shipmentDate?: string;

  items: TradeItem[];

  totalQuantity: number;
  totalAmount: number;

  vesselName?: string;
  voyageNumber?: string;

  portOfLoading?: string;
  portOfDischarge?: string;
  finalDestination?: string;

  etd?: string;
  eta?: string;

  billOfLadingNumber?: string;

  containerNumbers?: string[];
  sealNumbers?: string[];

  netWeight?: number;
  grossWeight?: number;
  measurement?: number;

  packingListNumber?: string;
  analysisReportNumber?: string;

  notes?: string;

  createdAt: string;
  updatedAt: string;
}

export interface TradeContract {
  id: string;

  contractNumber: string;
  contractDate: string;

  companyId: CompanyId;
  customerId: string;

  currency: Currency;
  incoterm: Incoterm;

  loadingPort?: string;
  destinationPort?: string;

  items: TradeItem[];

  totalQuantity: number;
  totalAmount: number;

  depositRate: number;
  depositAmount: number;

  proformaInvoiceStatus: ProformaInvoiceStatus;
  proformaInvoice?: ProformaInvoice;

  commercialInvoices: CommercialInvoice[];

  shipments: Shipment[];

  paymentTerms?: string;
  shipmentTerms?: string;
  qualityTerms?: string;
  inspectionTerms?: string;
  quantityTolerance?: string;
  packagingTerms?: string;
  claimTerms?: string;
  arbitrationTerms?: string;

  requiredDocuments?: string[];

  status: ContractStatus;

  notes?: string;

  createdAt: string;
  updatedAt: string;
}