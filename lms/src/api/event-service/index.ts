import EventEmitter from "events";

class EventMediator {
    static instance:any;
    static mediator = new EventEmitter();
}

export default EventMediator;
