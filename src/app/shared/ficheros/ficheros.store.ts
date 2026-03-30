import { computed, effect } from "@angular/core";
import { Fichero } from "@interfaces/ficheros"
import {
	getState,
	signalStore,
	withComputed,
	withHooks,
	withState,
} from "@ngrx/signals";
type FicheroState = {
	listaFicherosServidor: Fichero[][];
	isLoading: boolean;
};
const initialState: FicheroState = {
	listaFicherosServidor: [],
	isLoading: false,
};
export const FicherosStore = signalStore(
	{ providedIn: "root" },
	withState(initialState),
	withComputed(({ listaFicherosServidor }) => ({
		totalFicheros: computed(() => listaFicherosServidor().length),
	})),
	withHooks({
		onInit(store) {
			effect(() => {
				// 👇 The effect is re-executed on state change.
				const state = getState(store);
				console.log("counter state", state);
			});
		},
	}),
	// withMethods((store, ficherosService = inject(FicheroService)) => ({})),
);
