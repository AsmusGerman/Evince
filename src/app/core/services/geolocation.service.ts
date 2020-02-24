import { Injectable } from "@angular/core";

@Injectable()
export class GeolocationService {
  public locate(location) {
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(position => {
        console.log("[geolocalización] obteniendo datos de localización");
        location(position.coords);
      }, this.handleLocationError);
    }
    console.log("[geolocalización] sin capacidad de localización");
    return location();
  }

  handleLocationError(error) {
    switch (error.code) {
      case 3:
        console.log("[geolocalización] tiempo excedido");
        break;
      case 2:
        console.log("[geolocalización] sin datos");
        break;
      case 1:
        console.log("[geolocalización] sin permisos");
    }
  }
}
