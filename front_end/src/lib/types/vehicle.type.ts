import type { RegisterVisitorList } from "$lib/consts/access.options";


export type  Vehicle ={
    idVehicle:string
    plate: string;
    color: string;
    vehicleType: string;
    model: string;
    brands: string;
    passenger:RegisterVisitorList[]
}
