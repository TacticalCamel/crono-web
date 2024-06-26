import {Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, UserCredential, updateProfile, onAuthStateChanged, User} from '@angular/fire/auth';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public static readonly USERS_COLLECTION = 'users';

    constructor(private auth: Auth) {

    }

    // register a user with email and password
    async register(email: string, password: string, username: string): Promise<UserCredential> {
        // create the user
        const credential: UserCredential = await createUserWithEmailAndPassword(this.auth, email, password);

        // set user's display name
        await updateProfile(credential.user, {displayName: username});

        return credential;
    }

    // login a user with email and password
    async login(email: string, password: string): Promise<UserCredential> {
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    // logout the current user
    async logout(): Promise<void> {
        return this.auth.signOut();
    }

    onAuthStateChanged(callback: (user: User | null) => void): void {
        onAuthStateChanged(this.auth, callback);
    }
}