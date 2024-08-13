export class WebSocketEx {
    public constructor(private readonly url: string) {}

    public subscribe(topic: string) {
        const ws = new StateWebSocket(this.url);
        console.log('X', ws);
        ws.addEventListener("open", (event: Event) => {
            console.log("OPEN", event);
        });
        ws.addEventListener("message", (event: MessageEvent<unknown>) => {
            console.log("MESSAGE", event);
            ws.close();
        });
        ws.addEventListener("error", (event: Event) => {
            console.log("ERROR", event);
        });
        ws.addEventListener("close", (event: CloseEvent) => {
            console.log("CLOSE", event);
        });
        ws.addEventListener("state", (event: StateEvent) => {
            console.log("STATE", event);
        });
    }
}

export enum WebSocketState {
    Connecting = 'Connecting',
    Open = 'Open',
    Closing = 'Closing',
    Closed = 'Closed'
}

export class StateEvent extends Event {
    public readonly state: WebSocketState;

    public constructor(numericState: number) {
        super('state');

        switch (numericState) {
            case WebSocket.CONNECTING:
                this.state = WebSocketState.Connecting;
                break;
            case WebSocket.OPEN:
                this.state = WebSocketState.Open;
                break;
            case WebSocket.CLOSING:
                this.state = WebSocketState.Closing;
                break;
            case WebSocket.CLOSED:
                this.state = WebSocketState.Closed;
                break;
            default:
                throw new Error(`Invalid socket state ${numericState}`);
        }
    }
}

export interface StateWebSocketEventMap extends WebSocketEventMap {
    readonly state: StateEvent;
}

export interface StateWebSocket {
    addEventListener<K extends keyof StateWebSocketEventMap>(type: K, listener: (ev: StateWebSocketEventMap[K]) => unknown, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof StateWebSocketEventMap>(type: K, listener: (ev: StateWebSocketEventMap[K]) => unknown, options?: boolean | EventListenerOptions): void;
}

export class StateWebSocket extends WebSocket implements StateWebSocket {
    public onstate: ((ev: StateEvent) => unknown) | null = null;

    public constructor(url: string) {
        super(url);

        setTimeout(() => this.#dispatchStateEvent());

        this.addEventListener('open', this.#openHandler);
        this.addEventListener('close', this.#closeHandler);
    }

    public override close(code?: number, reason?: string): void {
        super.close(code, reason);
        this.#dispatchStateEvent();
    }

    #openHandler(): void {
        this.#dispatchStateEvent();
    }

    #closeHandler(): void {
        this.#dispatchStateEvent();
        this.removeEventListener('open', this.#openHandler);
        this.removeEventListener('close', this.#closeHandler);
    };

    #dispatchStateEvent(): void {
        const event = new StateEvent(this.readyState);
        this.dispatchEvent(event);
        this.onstate?.(event);
    }
}
