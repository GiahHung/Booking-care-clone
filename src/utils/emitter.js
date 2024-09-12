import exp from 'constants';
import EventEmitter from 'events' 

const _Emitter = new EventEmitter();
_Emitter.setMaxListeners(0);

export const emitter = _Emitter;