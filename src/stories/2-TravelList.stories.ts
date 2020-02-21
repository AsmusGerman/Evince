import { moduleMetadata } from '@storybook/angular';
import { TravelListComponent } from "src/app/driver/travel/travel-list/travel-list.component";
import { MaterialModule } from 'src/app/shared/material/material.module';
import { Viaje } from 'src/app/core/model/viaje';
import { Recorrido } from 'src/app/models/recorrido';

export default {
  title: "TravelList",
  decorators: [
    moduleMetadata({
      imports: [MaterialModule]
    })
  ]
};

const iViajeActual = {
  id: "JJIPNIE",
  trayecto: {
    id: "mmpbb",
    terminalOrigen: "Mar del Plata",
    terminalDestino: "Bahia Blanca"
  },
  fechaHoraLlegadaEstipuladas: new Date()
}

const iRecorridosFinalizados: Array<Recorrido> = [
  {
    id: "1",
    trayectos: [
      {
        id: "0",
        terminalOrigen: "A",
        terminalDestino: "B",
      },
      {
        id: "1",
        terminalOrigen: "B",
        terminalDestino: "C",
      }
    ]
  },
  {
    id: "2",
    trayectos: [
      {
        id: "0",
        terminalOrigen: "A",
        terminalDestino: "D",
      },
      {
        id: "1",
        terminalOrigen: "D",
        terminalDestino: "C",
      }
    ]
  },
  {
    id: "3",
    trayectos: [
      {
        id: "0",
        terminalOrigen: "A",
        terminalDestino: "B",
      },
      {
        id: "1",
        terminalOrigen: "B",
        terminalDestino: "C",
      }
    ]
  },
  {
    id: "3",
    trayectos: [
      {
        id: "0",
        terminalOrigen: "A",
        terminalDestino: "B",
      },
      {
        id: "1",
        terminalOrigen: "B",
        terminalDestino: "C",
      }
    ]
  },
  {
    id: "3",
    trayectos: [
      {
        id: "0",
        terminalOrigen: "A",
        terminalDestino: "B",
      },
      {
        id: "1",
        terminalOrigen: "B",
        terminalDestino: "C",
      }
    ]
  },
  {
    id: "3",
    trayectos: [
      {
        id: "0",
        terminalOrigen: "A",
        terminalDestino: "B",
      },
      {
        id: "1",
        terminalOrigen: "B",
        terminalDestino: "C",
      }
    ]
  }
]

export const TravelListFoo = () => ({
  component: TravelListComponent,
  props: {
    iTerminalOrigen: "D",
    iTerminalDestino: "E",
    iViajeActual,
    iRecorridosFinalizados
  }
});
