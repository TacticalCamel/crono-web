import {Injectable} from '@angular/core';
import {Firestore, collection, DocumentReference, doc, setDoc, deleteDoc, updateDoc, onSnapshot, Unsubscribe, QuerySnapshot, query, orderBy} from "@angular/fire/firestore";
import {Auth} from "@angular/fire/auth";
import {Event} from "../models/Event";
import {AuthService} from "./auth.service";
import {Activity} from "../models/Activity";

@Injectable({
    providedIn: 'root'
})
export class EventService {
    private static readonly COLLECTION_NAME = 'events';

    constructor(private firestore: Firestore, private auth: Auth) {

    }

    private getCollection() {
        const userId = this.auth.currentUser?.uid ?? null;

        if (!userId) {
            return null;
        }

        return collection(
            doc(collection(this.firestore, AuthService.USERS_COLLECTION), userId),
            EventService.COLLECTION_NAME
        );
    }

    async create(activity: Activity): Promise<boolean> {
        const collection = this.getCollection();

        if (!collection) {
            return false;
        }

        const document: DocumentReference = doc(collection);

        const entity: object = {
            id: document.id,
            activityId: activity.id,
            start: Date.now(),
            end: null,
        };

        await setDoc(document, entity);

        return true;
    }

    async update(entity: Event): Promise<boolean> {
        const collection = this.getCollection();

        if (!collection) {
            return false;
        }

        await updateDoc(doc(collection, entity.id), entity as object);

        return true;
    }

    async delete(id: string): Promise<boolean> {
        const collection = this.getCollection();

        if (!collection) {
            return false;
        }

        await deleteDoc(doc(collection, id));

        return true;
    }

    listen(listener: (snapshot: QuerySnapshot) => void): Unsubscribe | null {
        const collection = this.getCollection();

        if (!collection) {
            return null;
        }

        // TODO komplex lekérdezés 1 (nagyon komplex...)
        const q = query(collection, orderBy('start', 'desc'))

        return onSnapshot(q, listener);
    }
}