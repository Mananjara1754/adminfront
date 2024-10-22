import { PersonnelRevisite } from "./PersonnelRevisite";

export interface Courses {
    lat:number,
    lon:number,
    place_name:String,
    people:PersonnelRevisite[],
}
