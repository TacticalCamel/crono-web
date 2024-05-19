import {Injectable} from '@angular/core';
import {Firestore, collection, DocumentReference, doc, setDoc, deleteDoc, updateDoc, onSnapshot, Unsubscribe, QuerySnapshot} from "@angular/fire/firestore";
import {Auth} from "@angular/fire/auth";
import {Category} from "../models/Category";
import {AuthService} from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private static readonly COLLECTION_NAME = 'categories';

    constructor(private firestore: Firestore, private auth: Auth) {

    }

    private getCollection() {
        const userId = this.auth.currentUser?.uid ?? null;

        if (!userId) {
            return null;
        }

        return collection(
            doc(collection(this.firestore, AuthService.USERS_COLLECTION), userId),
            CategoryService.COLLECTION_NAME
        );
    }

    async create(name: string): Promise<boolean> {
        const collection = this.getCollection();

        if (!collection) {
            return false;
        }

        const document: DocumentReference = doc(collection);

        const entity: object = {
            id: document.id,
            name: name
        };

        await setDoc(document, entity);

        return true;
    }

    async update(entity: Category): Promise<boolean> {
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

        return onSnapshot(collection, listener);
    }
}