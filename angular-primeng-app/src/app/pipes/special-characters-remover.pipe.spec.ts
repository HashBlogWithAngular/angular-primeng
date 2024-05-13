import { RemoveSpecialCharsPipe  } from "./special-characters-remover.pipe"

describe("RemoveSpecialCharsPipe ",()=>{
    const pipe = new RemoveSpecialCharsPipe ()
    
    it('should transform and return a string with no curly brackets and no spaces',()=>{
        expect(pipe.transform('{{name}} ')).toBe('name');
    })
})