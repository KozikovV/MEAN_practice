export enum TIME_ZONE {
  ukraine = 'Europe/Kiev'
}


export interface CalendarEvent {
  end: TimeMark;
  start: TimeMark;
  description?: string;
}

export interface TimeMark {
  dateTime: string;
  timeZone: TIME_ZONE;
}
