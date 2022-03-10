import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {



  public host = "http://localhost:8080";
  constructor(private http:HttpClient) { }

  getCities(){
    return this.http.get(`${this.host}/api/cities`);
  }

  getCinema(city: any) {
    return this.http.get(`${this.host}/api/cities/${city.cityId}/cinemas`);
  }

  getHalls(c: any) {
    return this.http.get(`${this.host}/api/cities/cinemas/${c.cinemaId}/halls`);
  }
  getTicketView(hall: any) {
    let url = hall._links.ticketViews.href.replace("{?projection}", "");
    console.log(url);
    
    return this.http.get(url+"?projection=p1");
  }
  getFilm(arg0: any) {
    return this.http.get(arg0.film.image);
  }

  getTicketPlaces(v: any) {
    return this.http.get(`${this.host}/api/cities/cinemas/halls/seances/${v.seanceId}`);
  }

  payTickets(tickets: any, ticketId:any) {
    return this.http.post(`${this.host}/api/tickets/seance/`+ticketId, tickets);
  }
}
