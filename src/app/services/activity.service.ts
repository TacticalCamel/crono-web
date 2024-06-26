import {Injectable} from '@angular/core';
import {Firestore, collection, DocumentReference, doc, setDoc, deleteDoc, updateDoc, onSnapshot, Unsubscribe, QuerySnapshot, getDoc, query, orderBy} from "@angular/fire/firestore";
import {Auth} from "@angular/fire/auth";
import {AuthService} from "./auth.service";
import {Activity} from "../models/Activity";

@Injectable({
    providedIn: 'root'
})
export class ActivityService {
    private static readonly COLLECTION_NAME = 'activities';

    constructor(private firestore: Firestore, private auth: Auth) {

    }

    private getCollection() {
        const userId = this.auth.currentUser?.uid ?? null;

        if (!userId) {
            return null;
        }

        return collection(
            doc(collection(this.firestore, AuthService.USERS_COLLECTION), userId),
            ActivityService.COLLECTION_NAME
        );
    }

    async readOne(id: string): Promise<Activity | null> {
        const collection = this.getCollection();

        if (!collection) {
            return null;
        }

        const docRef = doc(collection, id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return null;
        }

        return docSnap.data() as Activity;
    }

    async create(name: string, score: number, isFixedScore: boolean): Promise<boolean> {
        const collection = this.getCollection();

        if (!collection) {
            return false;
        }

        const document: DocumentReference = doc(collection);

        const entity: object = {
            id: document.id,
            name: name,
            score: score,
            isFixedScore: isFixedScore
        };

        await setDoc(document, entity);

        return true;
    }

    async update(entity: Activity): Promise<boolean> {
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

        // TODO komplex lekérdezés 2 (szintén nagyon komplex)
        const q = query(collection, orderBy('name', 'asc'));

        return onSnapshot(collection, listener);
    }
}