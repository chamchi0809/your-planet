export class MinMax{
  min:number = Number.MAX_VALUE;
  max:number = Number.MIN_VALUE;

  AddValue(v:number){
    if(v > this.max) this.max = v;
    if(v < this.min) this.min = v;
  }

  ClearValue(){
    this.min = Number.MAX_VALUE;
    this.max = Number.MIN_VALUE;
  }
}