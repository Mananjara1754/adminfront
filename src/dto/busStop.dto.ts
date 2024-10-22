import { Courses } from "./Courses";

export default interface BusStopDTO {
    stops1: Courses[];
    stops2: Courses[];
    destName1: string;
    destName2: string;
}