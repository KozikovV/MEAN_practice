import { Injectable } from '@angular/core';
import { GoogleAuthService, GoogleApiService } from 'ng-gapi';
import { HttpClient } from '@angular/common/http';
import { CalendarEvent, TIME_ZONE } from '../config/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  public static SESSION_STORAGE_KEY: string = 'accessToken';
  // private user: GoogleUser;
  private user: any;

  private cListUrl: string = 'https://www.googleapis.com/calendar/v3/users/me/calendarList/';
  private calendarUrl: string = 'https://www.googleapis.com/calendar/v3/calendars/';

  private applicationUrl: string = 'http://localhost:4200/';

  constructor(
    private googleAuth: GoogleAuthService,
    private http: HttpClient
  ) { }

  public getToken(): string {
    const token: string = sessionStorage.getItem(CalendarService.SESSION_STORAGE_KEY);
    if (!token) {
        throw new Error('no token set , authentication required');
    }
    return sessionStorage.getItem(CalendarService.SESSION_STORAGE_KEY);
  }

  public signIn(): void {
    this.googleAuth.getAuth()
        .subscribe((auth) => {
            auth.signIn().then(res => this.signInSuccessHandler(res));
        });
  }

  getCalendar() {
    return this.http.get(`${this.cListUrl}${this.calendarId}`);
  }

  setCalendarEvent(calendarEvent: CalendarEvent): Observable<any> {
    return this.http.post(`${this.calendarUrl}${this.calendarId}/events`, calendarEvent);
  }

  private signInSuccessHandler(res: any) {
        this.user = res;
        sessionStorage.setItem('calendarId', this.user.w3.U3);
        sessionStorage.setItem(
          CalendarService.SESSION_STORAGE_KEY, res.getAuthResponse().access_token
        );
   }

  get calendarId(): string {
    return sessionStorage.getItem('calendarId');
  }

  dateConverter(serializedDate): string {
    const date = new Date(serializedDate).toISOString();
    return date.slice(0, date.indexOf('T'));
  }

  createCalendarEvent(serializedTime, serializedDate): CalendarEvent {
    const date = this.dateConverter(serializedDate);
    const time = serializedTime;
    return {
      end: {
        dateTime: `${date}T${time}:00`,
        timeZone: TIME_ZONE.ukraine
      },
      start: {
        dateTime: `${date}T${time}:00`,
        timeZone: TIME_ZONE.ukraine
      }
    };
  }

  createEventLink(trainingId: string): string {
    return `${this.applicationUrl}today-training/${trainingId}`;
  }
}
