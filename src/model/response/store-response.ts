import { Store } from "@prisma/client";

export type Json = 
  | string 
  | number 
  | boolean 
  | null 
  | { [key: string]: Json } 
  | Json[];

export type ApiStore = {
    id: string;
    userId: string;
    name: string;
    slug: string;
    description: string | null;
    logo: string | null;
    banner: string | null;
    address: string | null;
    phone: string | null;
    status: boolean;
    balance: string;
    bankInfo: string | null;
}

export function toStoreResponse(store: Store): ApiStore {
    return {
        id: store.id,
        userId: store.userId,
        name: store.name,
        slug: store.slug,
        description: store.description,
        logo: store.logo,
        banner: store.banner,
        address: store.address,
        phone: store.phone,
        status: store.status,
        balance: BigInt(store.balance).toString(),
        bankInfo: store.bankInfo
    };
  }
  