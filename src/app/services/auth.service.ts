import {Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from '@angular/fire/auth';
import {Firestore, collectionData, collection} from '@angular/fire/firestore';

import {Injectable} from '@angular/core';
import {UserModel} from '../models/user.model';
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // create a collection of users in the Firestore database
    private user$: Observable<any[]>;

    // inject AngularFireAuth and AngularFirestore into the constructor
    constructor(private auth: Auth, private firestore: Firestore) {
        // create a collection of users in the Firestore database
        const itemCollection = collection(this.firestore, 'guests');
        this.user$ = collectionData(itemCollection);
    }

    // register a new user with email, password, and username
    // this method will return a Promise<boolean> that resolves to true if the user is registered successfully
    // and resolves to false if the user is not registered successfully
    async register(email: string, password: string, username: string): Promise<boolean> {
        // create a new user with email and password
        try {
            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);

            if (!userCredential.user) {
                return false;
            }

            // create a user model from the email and username
            const model: UserModel = {
                uid: userCredential.user.uid,
                email: email,
                username: username
            };

            // register the user to the Firestore database


            return true;
        } catch (error) {
            console.error(error);

            return false;
        }
    }

    // login a user with email and password
    // this method will return a Promise<boolean> that resolves to true if the user is logged in successfully
    // and resolves to false if the user is not logged in successfully
    async login(email: string, password: string): Promise<boolean> {
        try {
            await signInWithEmailAndPassword(this.auth, email, password);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    // logout the current user
    // this method will return a Promise<boolean> that resolves to true if the user is logged out successfully
    // and resolves to false if the user is not logged out successfully
    async logout(): Promise<boolean> {
        try {
            await this.auth.signOut();
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}