import { User, UserRepository } from "../../domain";
import { admin, db } from "./FirestoreConfig";

export class FirestoreUserRepository implements UserRepository {
  async addUser(user: User): Promise<void> {
    await db.collection("users").add({
      name: user.name,
      email: user.email,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  }

  async getUser(id: string): Promise<User | null> {
    const doc = await db.collection("users").doc(id).get();
    if (!doc.exists) {
      return null;
    }
    const data = doc.data();
    return new User(doc.id, data!.name, data!.email, data!.createdAt.toDate());
  }
  
}
