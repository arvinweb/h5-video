export interface UserFace {
  id: string;
  username: string;
  isSuper: number;
  token: string;
  money: number;
  total: string;
  goldCoin: string;
  type: number; // 0: 游客  1 普通会员   2： VIP会员
}
export interface othersUserFace {
  avatar: string;
  id: number;
  name: string;
  username: string;
  followCount: number;
}
