export interface LogEvent {
  time: string;
  status: string;
  location: string;
}

export interface LogSummary {
  driving: number;
  on_duty_not_driving: number;
  sleeper_berth: number;
  off_duty: number;
}

export interface EldLog {
  driver_name: string;
  carrier: string;
  truck_number: string;
  trailer_numbers: string;
  date: string;
  shipping_doc: string;
  events: LogEvent[];
  hours_summary: LogSummary;
}
