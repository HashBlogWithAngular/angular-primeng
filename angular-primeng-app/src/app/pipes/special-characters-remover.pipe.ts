import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'removeSpecialChars',
    standalone: true
})

export class RemoveSpecialCharsPipe  implements PipeTransform{
    transform(value: string) : string {
        return value.replace(/[{()}]/g, "").trim();
    }

}