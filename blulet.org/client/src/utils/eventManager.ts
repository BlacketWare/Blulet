class EventManager {
    _subscriptions: Map<string, Set<(payload: any) => void>> = new Map<string, Set<(payload: any) => void>>();

    subscribe(event: string, callback: () => void) {
        if (!this._subscriptions.has(event)) this._subscriptions.set(event, new Set<(payload: any) => void>());

        this._subscriptions.get(event)!.add(callback);

        return () => this.unsubscribe(event, callback);
    }

    unsubscribe(event: string, callback: () => void) {
        if (this._subscriptions.has(event)) this._subscriptions.get(event)!.delete(callback);
        else console.warn(`EventManager: Event "${event}" does not exist.`);
    }

    dispatch(event: string, payload: any) {
        if (this._subscriptions.has(event)) this._subscriptions.get(event)!.forEach(callback => callback(payload));
        else console.warn(`EventManager: Event "${event}" does not exist.`);
    }
}
const eventManager = new EventManager();

export default eventManager;