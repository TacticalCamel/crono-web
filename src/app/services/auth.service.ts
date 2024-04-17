import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection  } from '@angular/fire/compat/firestore';
import { UserModel } from '../models/user.model';

@Injectable({providedIn: 'root'})
export class AuthService {
    private usersCollection: AngularFirestoreCollection<UserModel>;
    //user: Observable<UserModel | null>;

    constructor(private fireAuth: AngularFireAuth, private firestore: AngularFirestore) {
        this.usersCollection = this.firestore.collection<UserModel>('users');
        //this.user = this.usersCollection.valueChanges();
    }

    async register(user: UserModel): Promise<boolean> {
        try {
            const credentials = await this.fireAuth.createUserWithEmailAndPassword(user.email, user.password!);
            const userRef = this.firestore.collection('users').doc(credentials.user!.uid);
            await userRef.set({ ...user, uid: credentials.user!.uid });

            return true;
        }
        catch (err) {
            console.error(err);
            return false;
        }
    }

    async login(email: string, password: string): Promise<boolean> {
        try {
            await this.fireAuth.signInWithEmailAndPassword(email, password);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    async logout(): Promise<void> {
        await this.fireAuth.signOut();
    }
}