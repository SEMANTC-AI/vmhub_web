// vmhub-web/src/types/index.ts

export interface CampaignBase {
  enabled: boolean;
  message: string;
  coupon?: string;
}

export interface BirthdayCampaign extends CampaignBase {
  type: 'birthday';
  settings: {
    sendTime: string;
  };
}

export interface WelcomeCampaign extends CampaignBase {
  type: 'welcome';
  settings: {
    welcomeDelay: number;
    couponValidityDays: number;
  };
}

export interface ReactivationCampaign extends CampaignBase {
  type: 'reactivation';
  settings: {
    inactiveDays: number;
    couponValidityDays: number;
  };
}

export interface LoyaltyCampaign extends CampaignBase {
  type: 'loyalty';
  settings: {
    minimumPurchase: number;
    evaluationPeriod: number;
    vipDiscount: number;
    reminderFrequency: number;
    reminderMessage: string;
    maintenanceValue: number;
    renewalMessage: string;
  };
}

export type Campaign = 
  | BirthdayCampaign 
  | WelcomeCampaign 
  | ReactivationCampaign 
  | LoyaltyCampaign;

export type CampaignType = Campaign['type'];