import { EldLog } from "./eld-log";
import { Stop } from "./stop";

export interface Trip {
    current_location: string;
    pickup_location: string;
    dropoff_location: string;
    stops: Stop[];
    eld_logs: EldLog[];
  }