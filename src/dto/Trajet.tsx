import { Bus } from "./Bus";
import { Courses } from "./Courses";


export interface Trajet {
    id_trajet:String,
    voiture: Bus,
    courses:Courses[]
}

