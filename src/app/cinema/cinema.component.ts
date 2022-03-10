import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CinemaService } from '../service/cinema.service';


@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  cities:any;
  cinemas:any;
  ticketViews:any;
  halls:any;
  places:any;
  filmId=0;
  currentCinema:any;
  currentCity:any;
  currentTicketViews:any;
  selectedTicket:any;



  constructor(public _cinema:CinemaService) { }

  ngOnInit(): void {
    this._cinema.getCities().subscribe(
      (data:any)=>{
        this.cities=data;
        console.log(data);
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  onGetCinema(city:any){
    this.currentCity=city;
    this.halls=null;
    this._cinema.getCinema(city).subscribe(
      (data:any)=>{
        this.cinemas = data;
        console.log(data);
        
      }
    )
  }
  onGetHalls(c:any){
    this.currentCinema=c;
    this._cinema.getHalls(c).subscribe(
      (data:any)=>{
        this.halls=data;
        console.log(data);
    },
    (error)=>{
      console.log(error);
      
    });
  }

  onGetTicketPlaces(s:any){
    this.currentTicketViews=s;
    
    this.filmId=s.filmDto.filmId;

    this._cinema.getTicketPlaces(this.currentTicketViews).subscribe(
      (data:any)=>{
        this.places=data;
        console.log(data);
        this.selectedTicket=[];
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }
  onSelectTicket(t:any){
    if(!t.selected){
      t.selected=true;
      this.selectedTicket.push(t);
    } else {
      t.selected=false;
      this.selectedTicket.splice(this.selectedTicket.indexOf(t), 1);
    }
    console.log(this.selectedTicket);
    
    
  }

  getTicketClass(t:any){
    let cl = "btn margin ";
    if(t.reserve==true){
      cl+="btn-danger";
    } else if(t.selected){
      cl+="btn-warning";
    } else {
      cl+="btn-success";
    }
    return cl;
  }
  onPayTickets(dataForm:any){
    let tickets:any = [];
    this.selectedTicket.forEach((t:any)=>{
      tickets.push(t.id);
    })
    
    
    
    this._cinema.payTickets(tickets, this.currentTicketViews.seanceId).subscribe(
      (data)=>{
        alert("Все хорошо");
        this.onGetTicketPlaces(this.currentTicketViews);
      },
      (error)=>{
        console.log(error);
        
      }
    )
    
    
  }


}
