import { ResultModel } from './model/result.model';
import { ResultEventModel } from './model/result-event.model';

export class ResultService {
  public result : ResultModel = {
    id : 0,
    idOwner :0,
    idRecipients:[],
    isSeen:false,
    eventResults: [],
    contentOfResult:"",
  };
  public newResults  : ResultModel [] ;
  public resultIsSeen  : ResultModel [] ;  
  public resultUnSeen  : ResultModel [] ;
   
  constructor() { 
    this.newResults= [];
    this.resultIsSeen = [];
    this.resultUnSeen = [];

  }
  

  public addResult(newResult:ResultModel) {
    this.newResults.push(newResult);
  }

  public seenResult(idResult:number) {

  }

  public unseenResult(idResult:number) {

  }

  public getAllResult() : Array<ResultModel> {
    
    return this.newResults.concat(this.resultIsSeen) ;
  }

  public getAllResultSeen() : Array<ResultModel> {
    return [];
  }

  public getAllResultUnSeen() : Array<ResultModel> {
    return [];
  }

  public numberOfEventSeen() : number
  {
    return 0;
  }
}
