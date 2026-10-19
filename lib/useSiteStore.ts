'use client';
import {create} from 'zustand';

type SiteState = {
 selectedZone:string;
 setSelectedZone:(zone:string)=>void;
 lastTreatment:string|null;
 setLastTreatment:(name:string|null)=>void;
};
export const useSiteStore=create<SiteState>(set=>({
 selectedZone:'testa',setSelectedZone:(selectedZone)=>set({selectedZone}),
 lastTreatment:null,setLastTreatment:(lastTreatment)=>set({lastTreatment}),
}));
